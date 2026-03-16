// Update Add to Cart Buttons
document.querySelectorAll('.add-to-cart-btn').forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation(); // Prevent triggering the product card click
        
        // Cart animation style
        const originalHTML = this.innerHTML;
        this.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> جاري الإضافة...';
        
        setTimeout(() => {
            this.innerHTML = '<i class="fa-solid fa-check"></i> تمت الإضافة';
            this.style.background = '#10b981'; // Success Green
            this.style.color = '#fff';
            this.style.borderColor = '#10b981';
            
            // Show global toast if it exists
            const toast = document.getElementById('cartToast');
            if(toast) {
                toast.classList.add('show');
                setTimeout(() => toast.classList.remove('show'), 2500);
            }
            
            // Update both desktop and mobile cart badges
            const badges = document.querySelectorAll('.badge, .nav-badge');
            
            badges.forEach(badge => {
                let count = parseInt(badge.textContent || '0');
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
        }, 500);
    });
});

// Sidebar Menu Toggle Logic
const menuBtn = document.querySelector('.menu-btn');
const closeBtn = document.getElementById('closeMenu');
const sideMenu = document.getElementById('sideMenu');
const overlay = document.getElementById('menuOverlay');

function toggleMenu() {
    if(sideMenu && overlay) {
        sideMenu.classList.toggle('active');
        overlay.classList.toggle('active');
    }
}

if(menuBtn) menuBtn.addEventListener('click', toggleMenu);
if(closeBtn) closeBtn.addEventListener('click', toggleMenu);
if(overlay) overlay.addEventListener('click', toggleMenu);

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
