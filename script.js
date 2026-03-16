// Sticky Navbar functionality
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Add simple interaction to buttons
document.querySelectorAll('.btn-primary').forEach(button => {
    button.addEventListener('click', function(e) {
        if(this.getAttribute('href') && this.getAttribute('href').startsWith('#')) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        } else if(!this.getAttribute('href')) {
            // Cart button animation
            const originalText = this.innerHTML;
            this.innerHTML = '<i class="fa-solid fa-check"></i> تمت الإضافة';
            this.style.background = '#25d366'; // Success color
            this.style.boxShadow = '0 4px 15px rgba(37, 211, 102, 0.4)';
            
            // Update cart badge
            const badge = document.querySelector('.cart-badge');
            let count = parseInt(badge.textContent);
            badge.textContent = count + 1;
            
            // Animation effect for badge
            badge.style.transform = 'scale(1.5)';
            setTimeout(() => {
                badge.style.transform = 'scale(1)';
            }, 300);

            setTimeout(() => {
                this.innerHTML = originalText;
                this.style.background = '';
                this.style.boxShadow = '';
            }, 2000);
        }
    });
});
