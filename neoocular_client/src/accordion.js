document.querySelectorAll('.toggle-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const content = btn.nextElementSibling;
        const icon = btn.querySelector('.icon');

        // Close all open accordions
        document.querySelectorAll('.toggle-btn').forEach(otherBtn => {
            if (otherBtn !== btn) {
                otherBtn.nextElementSibling.classList.add('hidden');
                otherBtn.querySelector('.icon').textContent = '+';
            }
        });

        // Toggle current one
        content.classList.toggle('hidden');
        icon.textContent = content.classList.contains('hidden') ? '+' : '−';
    });
});