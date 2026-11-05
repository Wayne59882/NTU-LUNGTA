"""Teaching-unit detection on uploaded PDFs: titles and page ranges.

Synthetic PDFs reproduce what teachers upload: a PowerPoint deck whose
bookmarks are out of page order, with a default "未命名的章節" section and a
repeated name; a deck without bookmarks that has section-title slides; and a
textbook with a normal chapter outline (unchanged behaviour).
"""
import os
from pathlib import Path
import sys

ROOT = Path(__file__).resolve().parents[2]
sys.path.insert(0, str(Path(os.environ.get('VHTA_TEST_APP') or ROOT / 'app')))
import fitz  # noqa: E402
import course_runtime as C  # noqa: E402

FONT = str(ROOT / 'app/web/shared/assets/fonts/NotoSansTC-Regular.otf')


def write(page, text, x, y, size):
    kwargs = {'fontsize': size}
    if any('㐀' <= ch <= '鿿' for ch in text) and Path(FONT).exists():
        kwargs.update(fontname='notosanstc', fontfile=FONT)
    elif any('㐀' <= ch <= '鿿' for ch in text):
        kwargs.update(fontname='china-t')
    page.insert_text((x, y), text, **kwargs)


def content_slide(doc, title):
    page = doc.new_page(width=960, height=540)
    write(page, title, 40, 60, 36)               # slide title at the top
    for n in range(4):
        write(page, 'Body point %d about %s with supporting detail text.' % (n + 1, title), 60, 140 + 50 * n, 20)


def section_slide(doc, title):
    page = doc.new_page(width=960, height=540)
    write(page, title, 200, 280, 48)             # large, vertically centred, nothing else


def deck(pages, sections=(), titles=()):
    doc = fitz.open()
    sections, titles = dict(sections), dict(titles)
    for number in range(1, pages + 1):
        if number in sections:
            section_slide(doc, sections[number])
        else:
            content_slide(doc, titles.get(number, 'Topic slide %d' % number))
    return doc


# 1. PowerPoint deck: bookmarks out of page order (as in the reported upload).
# Page 30 starts the untitled section; its slide title names the unit.
doc = deck(100, {70: 'Histone modification'}, {30: 'Microbiome sequencing'})
doc.set_toc([[1, 'Epigenetics', 40], [1, 'DNA methylation', 45], [1, 'Transcriptome', 20], [1, 'metagenomics', 21],
             [1, '未命名的章節', 30], [1, 'Transcriptome', 2], [1, 'Cancer application', 3]])
units = C._course_chapters(doc)
assert units == [
    ('Transcriptome', 2, 2), ('Cancer application', 3, 19), ('Transcriptome (2)', 20, 20), ('metagenomics', 21, 29),
    ('Microbiome sequencing', 30, 39), ('Epigenetics', 40, 44), ('DNA methylation', 45, 69), ('Histone modification', 70, 100),
], units
covered = [p for _, a, b in units for p in range(a, b + 1)]
assert covered == sorted(set(covered)), 'units never overlap and stay in page order'

# 2. Deck without bookmarks: section-title slides form the units; closing slides are not topics.
doc = deck(40, {1: 'Genomics Lecture 1', 6: 'Hybridization methods', 18: 'Microarray analysis', 31: 'Sequencing', 40: 'Thank you'})
units = C._course_chapters(doc)
assert units == [('Genomics Lecture 1', 1, 5), ('Hybridization methods', 6, 17), ('Microarray analysis', 18, 30), ('Sequencing', 31, 40)], units

# 3. Deck without bookmarks or section slides: one unit to review, as before.
assert C._course_chapters(deck(12)) == [('Entire PDF — review or upload separate chapter PDFs', 1, 12)]

# 4. Textbook (portrait) with a normal outline: front matter skipped, ranges unchanged.
book = fitz.open()
for number in range(1, 61):
    page = book.new_page(width=595, height=842)
    write(page, 'Textbook page %d text about physiology and its mechanisms.' % number, 50, 80, 11)
book.set_toc([[1, 'Cover', 1], [1, 'Preface', 3], [1, 'Chapter 1 Cells', 5], [2, 'Membranes', 8],
              [1, 'Chapter 2 Nerves', 20], [1, 'Chapter 3 Muscle', 41], [1, 'Index', 59]])
assert C._course_chapters(book) == [('Chapter 1 Cells', 5, 19), ('Chapter 2 Nerves', 20, 40), ('Chapter 3 Muscle', 41, 60)]

# 5. Office print titles become the file's own name.
assert C._course_title('Microsoft PowerPoint - Genomic study 2026_01_hybridization.pptm', 'x.pdf') == 'Genomic study 2026_01_hybridization'
assert C._course_title('Microsoft Word - Lecture notes.docx', 'x.pdf') == 'Lecture notes'
# 6. Upload inspection and build: the teacher's corrected names and page ranges are used.
import tempfile  # noqa: E402
with tempfile.TemporaryDirectory() as temporary:
    directory = Path(temporary)
    C.COURSE_ROOT = directory / 'courses'; C.STAGING_ROOT = C.COURSE_ROOT / '_staging'; C.STAGING_ROOT.mkdir(parents=True)
    pdf = directory / 'deck.pdf'
    doc = deck(40, {6: 'Hybridization methods', 18: 'Microarray analysis', 31: 'Sequencing'})
    doc.set_metadata({'title': 'Microsoft PowerPoint - Genomic study 2026_01_hybridization.pptm'})
    doc.save(str(pdf))
    manager = C.CourseManager()
    stage = manager.inspect([('deck.pdf', pdf)])
    assert stage['course_name'] == 'Genomic study 2026_01_hybridization', stage['course_name']
    # Opening slides before the first section slide form their own unit, named by the first slide.
    assert [(u['title'], u['start_page'], u['end_page']) for u in stage['units']] == [
        ('Topic slide 1', 1, 5), ('Hybridization methods', 6, 17), ('Microarray analysis', 18, 30), ('Sequencing', 31, 40)], stage['units']
    started = []
    manager._build = lambda *args: started.append(args[2])
    first = stage['units'][1]
    try:
        manager.start_build(stage['stage_id'], 'Genomics', 'none', [dict(id=first['id'], title='x', start_page=12, end_page=41)], 'gemma', None)
        raise AssertionError('pages beyond the PDF must be refused')
    except ValueError as error:
        assert 'between 1 and 40' in str(error), error
    manager.start_build(stage['stage_id'], 'Genomics', 'none',
                        [dict(id=first['id'], title='DNA hybridization', start_page=2, end_page=17)], 'gemma', None)
    for _ in range(50):
        if started: break
        import time; time.sleep(.02)
    unit = started[0][0]
    assert (unit['title'], unit['start_page'], unit['end_page'], unit['pages_corrected']) == ('DNA hybridization', 2, 17, True), unit
print('[OK] unit detection: out-of-order bookmarks put in page order, untitled sections named from slides, '
      'repeated names told apart, long units split at section slides, outline-free decks, textbooks unchanged, '
      'Office titles cleaned, teacher-corrected names and pages used for the build')
