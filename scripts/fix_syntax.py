content = open('scripts/generate_one_day_data.py', encoding='utf-8').read()
# Replace any broken /\", with /",
content = content.replace('/\\",', '/",')
content = content.replace('/"', '/",')
content = content.replace('/",,', '/",')
open('scripts/generate_one_day_data.py', 'w', encoding='utf-8').write(content)
print('Fixed quotes and commas successfully!')
