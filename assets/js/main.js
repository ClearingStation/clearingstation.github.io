// FAQ accordion toggle
document.querySelectorAll('.faq-question').forEach(function(btn) {
    btn.addEventListener('click', function() {
        var item = this.parentElement;
        // Close others
        document.querySelectorAll('.faq-item.active').forEach(function(el) {
            if (el !== item) el.classList.remove('active');
        });
        // Toggle current
        item.classList.toggle('active');
    });
});
