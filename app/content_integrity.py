"""Subject-neutral text integrity checks for every uploaded course (Python 3.6)."""
import re
import unicodedata
from math_integrity import math_issues

_UNREADABLE=re.compile(r'[\ufffd\ue000-\uf8ff\U000f0000-\U000ffffd\U00100000-\U0010fffd]|\(cid:\d+\)')
_CONTROLS=re.compile(r'[\x00-\x08\x0b\x0c\x0e-\x1f\x7f\ud800-\udfff]')
_MOJIBAKE=re.compile(r'ï¿½|â€™|â€œ|â€\x9d|â€“|â€”|Ã©|Ã¼|Ã¶|Ã¤|Â°|Âµ|Â±')
_SUP=str.maketrans('0123456789+-=()','⁰¹²³⁴⁵⁶⁷⁸⁹⁺⁻⁼⁽⁾')
_SUB=str.maketrans('0123456789+-=()','₀₁₂₃₄₅₆₇₈₉₊₋₌₍₎')

class ContentIntegrityError(ValueError):pass

def text_issues(value,check_math=True):
    text=str(value or '');issues=[]
    if _UNREADABLE.search(text):issues.append('unmapped or missing character')
    if _CONTROLS.search(text):issues.append('invalid control character')
    if _MOJIBAKE.search(text):issues.append('suspected text encoding damage')
    if check_math:
        prose=re.sub(r'```[\s\S]*?```|`[^`\n]+`','',text)
        issues.extend(math_issues(prose))
    return list(dict.fromkeys(issues))

def clean_course_text(value,location='Course content',check_math=True):
    """No NFKC, unit substitutions, figure removal or discipline-specific rewrites."""
    text=str(value or '').replace('\r\n','\n').replace('\r','\n')
    issues=text_issues(text,check_math=check_math)
    if issues:raise ContentIntegrityError(location+': '+', '.join(issues)+'. Check the source page or regenerate this item.')
    return unicodedata.normalize('NFC',text).strip()

def question_text_ok(question):
    if not isinstance(question,dict):return False
    choices=question.get('choices') or []
    reasons=question.get('choice_explanations') or []
    if not isinstance(choices,list) or not isinstance(reasons,list):return False
    return not any(text_issues(x) for x in [question.get('stem',''),question.get('explanation','')]+choices+reasons)

def extract_page(page,page_number):
    """Read a text-layer page once, retaining line breaks and source provenance.

    Sparse scanned pages require OCR/vision; do not silently skip them. Embedded
    figures on text pages remain available in the original PDF but aren't read
    as image content by this text extractor.
    """
    getter=getattr(page,'get_text',None) or getattr(page,'getText',None)
    raw=str(getter('text') or '')
    # Text extraction often flattens visually lowered CO₂ into CO2. Recover
    # numeric script position only when the PDF spans explicitly support it.
    # flags=0 excludes decoded image bytes from dictionary extraction.
    try:
        data=getter('dict',flags=0);lines=[];changed=False
        for block in data.get('blocks',[]):
            for line in block.get('lines',[]):
                spans=line.get('spans',[])
                base=max(spans,key=lambda span:float(span.get('size',0))) if spans else {}
                size=float(base.get('size') or 0);baseline=(base.get('origin') or [0,0])[1]
                pieces=[]
                for span in spans:
                    value=str(span.get('text') or '')
                    shift=(span.get('origin') or [0,baseline])[1]-baseline
                    small=size and float(span.get('size') or size)<size*.9
                    if value and re.match(r'^[0-9+\-=()]+$',value) and small:
                        if shift < -size*.12:value=value.translate(_SUP);changed=True
                        elif shift > size*.12:value=value.translate(_SUB);changed=True
                    pieces.append(value)
                lines.append(''.join(pieces))
        if changed:raw='\n'.join(lines)
    except (AttributeError,TypeError,ValueError):pass
    issues=text_issues(raw,check_math=False)
    if issues:raise ContentIntegrityError('PDF page %s: %s. Run OCR or use a PDF with correct text encoding.'%(page_number,', '.join(issues)))
    images=getattr(page,'get_images',None) or getattr(page,'getImageList',None)
    has_images=bool(images()) if images else False
    meaningful=len(re.findall(r'[^\W_]',raw,flags=re.UNICODE))
    if has_images and meaningful<12:
        raise ContentIntegrityError('PDF page %s has image content without enough searchable text. OCR or visual analysis is required; this page was not read.'%page_number)
    return {'page':int(page_number),'text':unicodedata.normalize('NFC',raw).strip(),
            'has_images':has_images,'image_content_read':False,'text_status':'readable' if meaningful else 'blank'}

SOURCE_RULE=(' Apply the same integrity rules to every subject. Preserve technical names, '
    'negation, numerical values, units, superscripts, subscripts and symbols exactly. '
    'Do not substitute physiology terms for symbols belonging to another subject. '
    'Keep each table value linked to its row/column labels; do not infer missing cells. '
    'Do not claim to interpret figures that were not supplied as images. '
    'OCR transcriptions are provisional; never reconstruct uncertain equations, table associations or figure relationships from them. '
    'If any required source content is incomplete or unreadable, omit that item rather than guessing. ')
