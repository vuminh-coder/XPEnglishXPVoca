import glob

for f in glob.glob('features/listening/data/lessons/movies/*/*.ts'):
    if 'index.ts' in f:
        continue
    with open(f, 'r', encoding='utf-8') as fp:
        content = fp.read()
    has_quiz_prop = 'quiz:' in content or 'quiz :' in content
    has_quiz_def = 'VideoQuizData' in content
    if not has_quiz_prop:
        print('MISSING quiz prop:', f)
