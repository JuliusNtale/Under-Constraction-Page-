// Moved from <script> in index.html
// Configuration
const launchDate = new Date("2026-06-01").getTime();
const startDate = new Date("2024-06-01").getTime();
const totalDuration = launchDate - startDate;

// Countdown Timer
function updateCountdown() {
    const now = new Date().getTime();
    const distance = launchDate - now;
    // Calculate progress percentage
    const elapsed = now - startDate;
    let progressPercentage = Math.max(0, Math.min(100, (elapsed / totalDuration * 100)));
    // Update progress bar
    document.getElementById('progress-bar').style.width = progressPercentage + '%';
    document.getElementById('progress-percentage').textContent = Math.round(progressPercentage) + '%';
    // Time calculations
    const months = Math.floor(distance / (1000 * 60 * 60 * 24 * 30));
    const weeks = Math.floor((distance % (1000 * 60 * 60 * 24 * 30)) / (1000 * 60 * 60 * 24 * 7));
    const days = Math.floor((distance % (1000 * 60 * 60 * 24 * 7)) / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    // Update display
    document.querySelector('.months').textContent = months.toString().padStart(2, '0');
    document.querySelector('.weeks').textContent = weeks.toString().padStart(2, '0');
    document.querySelector('.days').textContent = days.toString().padStart(2, '0');
    document.querySelector('.hours').textContent = hours.toString().padStart(2, '0');
    document.querySelector('.minutes').textContent = minutes.toString().padStart(2, '0');
    document.querySelector('.seconds').textContent = seconds.toString().padStart(2, '0');
    // Launch message
    if (distance < 0) {
        clearInterval(countdownTimer);
        const countdownContainer = document.getElementById('countdown-container');
        countdownContainer.innerHTML = '<div class="launch-message">WE\'RE LIVE!<small>Thank you for your patience</small></div>';
        document.getElementById('main-heading').textContent = 'WELCOME!';
        document.getElementById('main-slogan').textContent = 'Our website is now live. Explore and enjoy!';
    }
}

// Initialize countdown
const countdownTimer = setInterval(updateCountdown, 1000);
updateCountdown();

// Form submission
const subscribeForm = document.getElementById('subscribe-form');
if (subscribeForm) {
    subscribeForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        const email = this.querySelector('.email-input').value;
        const button = this.querySelector('.notify-btn');
        const successMessage = document.getElementById('success-message');
        // Validate email
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            alert('Please enter a valid email address');
            return;
        }
        // Update button state
        button.textContent = 'Sending...';
        button.disabled = true;
        try {
            // Send form data
            const formData = new FormData(this);
            const response = await fetch(this.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });
            if (response.ok) {
                // Show success
                successMessage.textContent = 'Thank you! We\'ll notify you when we launch.';
                successMessage.style.display = 'block';
                this.querySelector('.email-input').value = '';
                // Reset button
                setTimeout(() => {
                    button.textContent = 'Subscribed!';
                    setTimeout(() => {
                        button.textContent = 'Notify Me';
                        button.disabled = false;
                    }, 2000);
                }, 1000);
            } else {
                throw new Error('Form submission failed');
            }
        } catch (error) {
            alert('There was a problem with your submission. Please try again.');
            button.textContent = 'Notify Me';
            button.disabled = false;
        }
    });
}

// Countdown hover effect
const countdownPs = document.querySelectorAll('.countdown-container p');
countdownPs.forEach(item => {
    item.addEventListener('mouseover', function() {
        this.style.transform = 'scale(1.05)';
    });
    item.addEventListener('mouseout', function() {
        this.style.transform = 'scale(1)';
    });
});
