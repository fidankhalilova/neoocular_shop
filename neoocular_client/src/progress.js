document.addEventListener('DOMContentLoaded', () => {
    const progressBars = document.querySelectorAll('.progress-bar');

    progressBars.forEach(bar => {
        const targetWidth = bar.getAttribute('data-progress') + '%';
        bar.style.width = targetWidth;
    });
});