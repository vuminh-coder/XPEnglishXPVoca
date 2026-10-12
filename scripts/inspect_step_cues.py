with open('C:/Users/VU VAN MINH/.gemini/antigravity/brain/75160da0-6646-41c9-817c-8e932ebd6caa/.system_generated/steps/1474/content.md', 'r', encoding='utf-8') as f:
    c = f.read()

pos = c.find('data-cue-idx="1705"')
print(c[pos-300:pos+300])
