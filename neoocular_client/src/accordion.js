document.querySelectorAll('.toggle-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const content = btn.nextElementSibling;
        const icon = btn.querySelector('.icon');

        // Close all others
        document.querySelectorAll('.accordion-content').forEach(other => {
            if (other !== content) {
                other.style.maxHeight = null;
                other.previousElementSibling.querySelector('.icon').textContent = '+';
            }
        });

        // Toggle selected
        if (content.style.maxHeight) {
            content.style.maxHeight = null;
            icon.textContent = '+';
        } else {
            content.style.maxHeight = content.scrollHeight + "px";
            icon.textContent = '−';
        }
    });
});