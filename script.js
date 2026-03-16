// Update Add to Cart Buttons
document.querySelectorAll('.add-to-cart-btn').forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Cart animation style
        const originalHTML = this.innerHTML;
        this.innerHTML = '<i class="fa-solid fa-check"></i> تمت الإضافة';
        this.style.background = '#25d366'; // Success Green
        this.style.color = '#fff';
        this.style.borderColor = '#25d366';
        
        // Update both desktop and mobile cart badges
        const badges = document.querySelectorAll('.badge, .nav-badge');
        
        badges.forEach(badge => {
            let count = parseInt(badge.textContent);
            badge.textContent = count + 1;
            
            // Pop animation
            badge.style.transform = 'scale(1.5)';
            setTimeout(() => {
                badge.style.transform = 'scale(1)';
            }, 300);
        });

        // Revert button
        setTimeout(() => {
            this.innerHTML = originalHTML;
            this.style.background = '';
            this.style.color = '';
            this.style.borderColor = '';
        }, 2000);
    });
});

// Horizontal Scrolling for Slider/Categories with Mouse
const scrollContainers = document.querySelectorAll('.banner-slider, .h-scroll-container');

scrollContainers.forEach(container => {
    let isDown = false;
    let startX;
    let scrollLeft;

    container.addEventListener('mousedown', (e) => {
        isDown = true;
        startX = e.pageX - container.offsetLeft;
        scrollLeft = container.scrollLeft;
    });
    
    container.addEventListener('mouseleave', () => {
        isDown = false;
    });
    
    container.addEventListener('mouseup', () => {
        isDown = false;
    });
    
    container.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - container.offsetLeft;
        const walk = (x - startX) * 2; // Scroll-fast
        container.scrollLeft = scrollLeft - walk;
    });
});
