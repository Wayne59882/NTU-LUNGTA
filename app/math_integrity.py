"""Preserve TeX in generated JSON; reject damage instead of guessing symbols.

Compatible with the production Python 3.6 runtime. No model or network calls.
"""
import json
import re

MATH_PATTERN = re.compile(r'\$\$[\s\S]+?\$\$|(?<![\\$])\$(?!\$)[^$]+?(?<!\\)\$(?!\$)|\\\[[\s\S]+?\\\]|\\\([\s\S]+?\\\)')
_COMMANDS = set(('nabla bullet boldsymbol text textbf textrm times frac dfrac tfrac '
    'right left begin end beta bar bmod binom nu neq notin not rho rangle rbrace '
    'theta tau tan tfrac mathrm mathbf mathcal operatorname partial Delta delta '
    'sum prod int iint oint alpha gamma Gamma epsilon varepsilon lambda Lambda '
    'mu pi Pi sigma Sigma omega Omega cdot cdots ldots dots sqrt vec hat dot ddot '
    'infty leq geq approx pm mp div nabla boldsymbol underbrace overbrace').split())
_COMMAND = re.compile(r'[A-Za-z]+')
_BROKEN = re.compile(r'(?<![A-Za-z])(?:abla|ullet|oldsymbol|ext\s*\{|rac\s*\{|imes|ight\b|egin\s*\{)')

JSON_MATH_RULE = (' Preserve every mathematical sign, derivative order, subscript, exponent and grouping. '
    'Write equations between $...$ or $$...$$. Inside JSON strings encode every TeX '
    'backslash as \\\\ (two backslashes in the JSON source), e.g. "\\\\nabla". '
    'Never infer an unreadable equation from its name. Omit questions requiring an '
    'equation whose exact symbols are not readable in the evidence. Distinguish '
    'first and second derivatives and check that the options remain distinct mathematically. ')

def loads_model_json(raw):
    """Lexically quote lone, recognized TeX commands inside JSON strings only.

    json.loads accepts \u005cnabla as a newline followed by 'abla' and \u005cbullet as
    backspace+'ullet'. Intercept those before decoding. Already escaped JSON,
    normal newlines, Unicode escapes, quotes and prose are unchanged.
    """
    raw=str(raw or '')
    out=[];inside=False;i=0
    while i<len(raw):
        c=raw[i]
        if c=='"':inside=not inside;out.append(c);i+=1;continue
        if inside and c=='\\' and i+1<len(raw):
            if raw[i+1] in ('\\','"','/'):
                out.append(raw[i:i+2]);i+=2;continue
            match=_COMMAND.match(raw,i+1)
            if match and match.group() in _COMMANDS:
                out.append('\\\\'+match.group());i=match.end();continue
            out.append(raw[i:i+2]);i+=2;continue
        out.append(c);i+=1
    return json.loads(''.join(out))

def math_issues(value):
    text=str(value or '')
    errors=[]
    if re.search(r'[\x00-\x08\x0b\x0c\x0e-\x1f\ufffd]',text):
        errors.append('unreadable character or decoded TeX escape')
    if _BROKEN.search(text):errors.append('truncated TeX command')
    for match in MATH_PATTERN.finditer(text):
        token=match.group()
        if '\u25a1' in token:errors.append('missing mathematical symbol')
        if re.search(r'[\ue000-\uf8ff]',token):errors.append('unmapped mathematical font glyph')
        # Ignore escaped braces, which denote literal set brackets.
        body=re.sub(r'\\[{}]','',token)
        depth=0
        for c in body:
            if c=='{':depth+=1
            elif c=='}':depth-=1
            if depth<0:break
        if depth!=0:errors.append('unbalanced formula braces')
        if re.search(r'(?:^|\n)\s*(?:abla|ullet|imes|ext\{)',token):
            errors.append('decoded TeX escape')
    # A lone currency sign is ordinary prose. Only reject an unmatched dollar
    # when it clearly starts an equation or TeX command.
    rest=MATH_PATTERN.sub('',text)
    if re.search(r'\$[^$\n]*(?:\\[A-Za-z]+|[_^=])',rest):errors.append('unclosed math delimiter')
    return list(dict.fromkeys(errors))

def question_math_ok(question):
    if not isinstance(question,dict):return False
    if not isinstance(question.get('choices',[]),list):return False
    if not isinstance(question.get('choice_explanations',[]) or [],list):return False
    fields=[question.get('stem',''),question.get('explanation','')]
    fields.extend(question.get('choices') or [])
    fields.extend(question.get('choice_explanations') or [])
    return not any(math_issues(x) for x in fields)

def protect_math(value):
    saved=[]
    def keep(m):
        saved.append(m.group())
        return 'MATHKEEPZZZ%sZZZ'%len(saved)
    return MATH_PATTERN.sub(keep,str(value or '')),saved

def restore_math(value,saved):
    for i,formula in enumerate(saved,1):value=value.replace('MATHKEEPZZZ%sZZZ'%i,formula)
    return value
