document.addEventListener("DOMContentLoaded", () => {
    const counters = document.querySelectorAll('.stat-number');
    const speed = 200; // The lower the slower

    const startCounting = (el) => {
        const target = +el.getAttribute('data-target');
        const count = +el.innerText.replace('+', '');
        
        // Calculate the increment
        const inc = target / speed;

        if (count < target) {
            el.innerText = `+${Math.ceil(count + inc)}`;
            setTimeout(() => startCounting(el), 1);
        } else {
            el.innerText = `+${target}`;
        }
    };

    // Intersection Observer to trigger when visible
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                startCounting(entry.target);
                observer.unobserve(entry.target); // Run only once
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => observer.observe(counter));
});