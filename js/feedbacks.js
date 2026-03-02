 // 1. MODAL LOGIC: Capture service name when button clicked
    const modal = new bootstrap.Modal(document.getElementById('inquiryModal'));
    const serviceNameSpan = document.getElementById('selectedServiceName');

    document.querySelectorAll('.open-modal').forEach(button => {
        button.addEventListener('click', function() {
            const service = this.getAttribute('data-service');
            serviceNameSpan.innerText = service;
            modal.show();
        });
    });

    // 2. FORM SUBMISSION LOGIC
    document.getElementById('growthForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const btn = this.querySelector('button');
        const originalText = btn.innerText;
        
        // Show loading state
        btn.disabled = true;
        btn.innerHTML = '<span class="spinner-border spinner-border-sm" role="status"></span> Sending...';

        // Simulate API call
        setTimeout(() => {
            alert('Your request for ' + serviceNameSpan.innerText + ' has been sent! We will contact you shortly.');
            btn.disabled = false;
            btn.innerText = originalText;
            modal.hide();
            this.reset();
        }, 1500);
    });