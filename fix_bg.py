import re

with open('styles.css', 'r', encoding='utf-8') as f:
    content = f.read()

new_body = '''body {
    background-color: #060810;
    color: var(--text-main);
    font-family: var(--font-main);
    line-height: 1.6;
    min-height: 100vh;
    overflow-x: hidden;
    position: relative;
    padding-bottom: 80px;
}'''

# Add aurora animations after body
aurora_css = '''

/* === AURORA ANIMATED BACKGROUND === */
.aurora-wrap {
    position: fixed;
    inset: 0;
    z-index: 0;
    overflow: hidden;
    pointer-events: none;
}

.aurora-wrap::before {
    content: '';
    position: absolute;
    width: 120vw;
    height: 120vw;
    top: -60vw;
    right: -30vw;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(92, 36, 255, 0.18) 0%, rgba(92, 36, 255, 0.04) 50%, transparent 70%);
    animation: aurora-drift 14s ease-in-out infinite alternate;
}

.aurora-wrap::after {
    content: '';
    position: absolute;
    width: 100vw;
    height: 100vw;
    bottom: -40vw;
    left: -30vw;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(0, 225, 255, 0.12) 0%, rgba(0, 225, 255, 0.03) 50%, transparent 70%);
    animation: aurora-drift2 18s ease-in-out infinite alternate;
}

.aurora-orb {
    position: absolute;
    border-radius: 50%;
    filter: blur(80px);
    opacity: 0;
    animation: orb-appear 20s infinite ease-in-out;
}

.aurora-orb:nth-child(1) {
    width: 400px; height: 400px;
    top: 20%; left: 15%;
    background: radial-gradient(circle, rgba(139, 92, 246, 0.35), transparent 70%);
    animation-duration: 16s;
    animation-delay: 0s;
}

.aurora-orb:nth-child(2) {
    width: 300px; height: 300px;
    top: 60%; right: 10%;
    background: radial-gradient(circle, rgba(6, 182, 212, 0.3), transparent 70%);
    animation-duration: 20s;
    animation-delay: 4s;
}

.aurora-orb:nth-child(3) {
    width: 250px; height: 250px;
    top: 40%; left: 50%;
    background: radial-gradient(circle, rgba(236, 72, 153, 0.2), transparent 70%);
    animation-duration: 24s;
    animation-delay: 8s;
}

@keyframes aurora-drift {
    0%   { transform: translate(0, 0) scale(1); }
    33%  { transform: translate(-10vw, 5vw) scale(1.2); }
    66%  { transform: translate(5vw, -8vw) scale(0.9); }
    100% { transform: translate(-5vw, 10vw) scale(1.1); }
}

@keyframes aurora-drift2 {
    0%   { transform: translate(0, 0) scale(1); }
    33%  { transform: translate(8vw, -5vw) scale(1.15); }
    66%  { transform: translate(-10vw, 8vw) scale(0.95); }
    100% { transform: translate(5vw, -10vw) scale(1.2); }
}

@keyframes orb-appear {
    0%   { opacity: 0; transform: scale(0.6) translateY(30px); }
    20%  { opacity: 1; transform: scale(1) translateY(0); }
    80%  { opacity: 1; transform: scale(1.1) translateY(-20px); }
    100% { opacity: 0; transform: scale(0.8) translateY(-40px); }
}

/* Main wrapper to ensure content appears above aurora */
main, header, footer, nav {
    position: relative;
    z-index: 2;
}
'''

new_content = re.sub(
    r'body\s*\{[^}]*\}',
    new_body + aurora_css,
    content,
    count=1,
    flags=re.DOTALL
)

if new_content != content:
    with open('styles.css', 'w', encoding='utf-8') as f:
        f.write(new_content)
    print("SUCCESS: aurora background added")
else:
    print("ERROR: pattern not matched")
