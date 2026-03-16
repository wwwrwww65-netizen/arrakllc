import os
import re

aurora_html = '''    <!-- Aurora Animated Background -->
    <div class="aurora-wrap">
        <div class="aurora-orb"></div>
        <div class="aurora-orb"></div>
        <div class="aurora-orb"></div>
    </div>
'''

files = ['product.html', 'game.html', 'cart.html', 'categories.html', 'account.html']

for fname in files:
    if not os.path.exists(fname):
        print(f"SKIP: {fname} not found")
        continue
    with open(fname, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Update CSS version
    content = re.sub(r'styles\.css\?v=\d+', 'styles.css?v=10', content)
    
    # Add aurora-wrap after <body>
    if '<div class="aurora-wrap">' not in content:
        content = content.replace('<body>', '<body>\n' + aurora_html, 1)
    
    with open(fname, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"OK: {fname} updated")

print("All pages done.")
