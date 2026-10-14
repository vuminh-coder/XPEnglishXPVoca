import os
import re
import sys

sys.stdout.reconfigure(encoding='utf-8')

lessons_dir = 'features/listening/data/lessons'
results = []
for f in sorted(os.listdir(lessons_dir)):
    if f.endswith('.ts') and f.startswith('lesson_'):
        path = os.path.join(lessons_dir, f)
        with open(path, 'r', encoding='utf-8') as file:
            content = file.read()
            m_cat = re.search(r'categoryId:\s*["\']([^"\']+)["\']', content)
            m_title = re.search(r'title:\s*["\']([^"\']+)["\']', content)
            m_ext = re.search(r'externalId:\s*["\']([^"\']+)["\']', content)
            m_segs = re.findall(r'orderIndex:\s*(\d+)', content)
            cat = m_cat.group(1) if m_cat else 'unknown'
            title = m_title.group(1) if m_title else 'unknown'
            ext = m_ext.group(1) if m_ext else 'unknown'
            results.append((cat, f, len(m_segs), ext, title))

results.sort(key=lambda x: (x[0], x[1]))
print(f'{"CATEGORY":<20} | {"STATUS":<9} | {"SEGS":<5} | {"EXT_ID":<12} | {"TITLE (FILE)"}')
print("-" * 90)
for cat, fname, seg_count, ext, title in results:
    test_cov = os.path.exists(f'__tests__/{fname[:-3]}_complete_data_coverage.test.ts')
    cov_str = '[MASTER]' if test_cov else '[PENDING]'
    print(f'{cat:<20} | {cov_str:<9} | {seg_count:>4}  | {ext:<12} | {title} ({fname})')
