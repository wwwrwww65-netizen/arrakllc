import re

with open('styles.css', 'r', encoding='utf-8') as f:
    content = f.read()

# Fix game grid and inst-game-card CSS
game_sq_fix = '''
/* Games Grid - Proper Square Icons */
.games-grid-3x3 {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 12px;
    position: relative;
    z-index: 2;
}

.game-sq {
    border-radius: 16px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    align-items: center;
    background: transparent;
    transition: transform 0.3s;
    text-decoration: none;
    gap: 6px;
}

.game-sq:hover {
    transform: translateY(-5px) scale(1.05);
}

.game-sq img {
    width: 100%;
    aspect-ratio: 1 / 1;
    object-fit: cover;
    border-radius: 16px;
    border: 1px solid rgba(255,255,255,0.1);
    display: block;
    color: transparent;
}

.game-label {
    font-size: 0.7rem;
    color: rgba(255,255,255,0.7);
    text-align: center;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 100%;
}
'''

# Fix .inst-game-card to use square icons properly
inst_card_fix = '''
/* Installment Game Cards - Square icons */
.inst-game-card {
    min-width: 80px;
    width: 80px;
    height: 80px;
    border-radius: 16px;
    overflow: hidden;
    position: relative;
    background: var(--bg-surface);
    flex-shrink: 0;
}

.inst-game-card img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    color: transparent;
}
'''

# Remove old .games-grid-3x3 and .game-sq blocks
content = re.sub(r'\.games-grid-3x3 \{[^}]*\}\s*', '', content, flags=re.DOTALL)
content = re.sub(r'\.game-sq \{[^}]*\}\s*', '', content, flags=re.DOTALL)
content = re.sub(r'\.game-sq:hover \{[^}]*\}\s*', '', content, flags=re.DOTALL)
content = re.sub(r'\.game-sq img \{[^}]*\}\s*', '', content, flags=re.DOTALL)
content = re.sub(r'\.inst-game-card \{[^}]*\}\s*', '', content, flags=re.DOTALL)
content = re.sub(r'\.inst-game-card img \{[^}]*\}\s*', '', content, flags=re.DOTALL)

# Append fixed CSS at end
content += '\n' + game_sq_fix + inst_card_fix

with open('styles.css', 'w', encoding='utf-8') as f:
    f.write(content)

print("SUCCESS: game card CSS fixed")
