
const arabicMonths = ["يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو", "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"];

var dynamicReviews = document.querySelector('.dynamic-reviews');

const API_URL = 'https://script.google.com/macros/s/AKfycbxoTlBLq-4BLASSYXNjbma_cb8ooNdxZ5USVCU3S4HhY1Xqg2J17FRs3Ijqc-M0Glhj3Q/exec';

async function fetchFromSheet() {
    try {
        const res = await fetch(API_URL, {
            method: "GET",
            redirect: "follow" // This is the secret sauce for Google Apps Script
        });
        const reviews = await res.json(); // Data is already filtered and clean JSON

        var box = "";
        var counter = 0;

        reviews.forEach(rowData => {
            counter++;
            
            // 1. Handle Date
            let formattedDate = "2026 مارس"; // Default
            if (rowData.date) {
                const d = new Date(rowData.date);
                formattedDate = `${d.getFullYear()} ${arabicMonths[d.getMonth()]}`;
            }

            // 2. Initials Logic
            const name = rowData.name || "Anonymous";
            const nameParts = name.trim().split(' ');
            const initials = nameParts.length > 1 
                ? (nameParts[0][0] + ' ' + nameParts[nameParts.length - 1][0]).toUpperCase() 
                : (name.slice(0, 2).split('').join(' ')).toUpperCase();

            // 3. Stars Logic
            let starsHtml = '';
            for (let i = 1; i <= 5; i++) {
                starsHtml += i <= rowData.stars ? '<i class="bi bi-star-fill"></i>' : '<i class="bi bi-star"></i>';
            }

            // 4. Build Template
            box = `<div class="col-lg-4 mb-3">
                    <div class="testimonial-card" style="height: 250px;">
                        <span class="quote-mark">“</span>
                        <p class="mb-4">${rowData.review}</p>
                        <hr class="border-light opacity-50">
                        <div class="d-flex align-items-center">
                            <div class="avatar-circle ms-3">${initials}</div>
                            <div>
                                <h6 class="mb-0 fw-bold mb-1">${name}</h6>
                                <small class="text-muted"><i class="bi bi-calendar3 me-1 ms-1"></i>${formattedDate}</small>
                                <div class="star-rating">${starsHtml}</div>
                            </div>
                        </div>
                    </div>
                </div>` + box;

            // Carousel grouping logic
            if (counter % 3 == 0) {
                dynamicReviews.innerHTML += `<div class="carousel-item">
                                                <div class="row px-md-5 d-flex justify-content-center align-items-center">
                                                    ${box}
                                                </div>
                                            </div>`;
                box = "";
            }
        });

        // Handle remaining items
        if (box !== "") {
            dynamicReviews.innerHTML += `<div class="carousel-item">
                                            <div class="row px-md-5 d-flex justify-content-center align-items-center">
                                                ${box}
                                            </div>
                                        </div>`;
        }

    } catch (e) {
        console.error('Error loading reviews:', e);
    }
}

// USE THE URL FROM THE "DEPLOY" POPUP, NOT THE BROWSER URL BAR
const SCRIPT_ENDPOINT = 'https://script.google.com/macros/s/AKfycbxoTlBLq-4BLASSYXNjbma_cb8ooNdxZ5USVCU3S4HhY1Xqg2J17FRs3Ijqc-M0Glhj3Q/exec';

const om_form = document.getElementById('omReviewEngine');
const om_btn = document.getElementById('om_submit_trigger');

om_form.addEventListener('submit', async (e) => {
    
    e.preventDefault(); // Prevent the default form submission behavior
    om_btn.disabled = true;
    om_btn.innerText = "Submitting...";
    // 1. Collect the data from the form fields
    const selectedStar = document.querySelector('input[name="om_stars"]:checked').value;
    
    const submittedData = {
        name: document.getElementById('om_reviewer_name').value,
        stars: selectedStar,
        review: document.getElementById('om_reviewer_text').value
    };

    // 2. Pass that data to your sending function
    await sendReview(submittedData);
});

// 3. The Modified Send Function
async function sendReview(dataObject) {
    try {
        await fetch(SCRIPT_ENDPOINT, {
            method: 'POST',
            mode: 'no-cors', 
            headers: {
                'Content-Type': 'application/json',
            },
            // Now sending the ACTUAL dataObject instead of dummyReview
            body: JSON.stringify(dataObject),
        });
        
        om_form.reset(); // Clears the form and stars
        om_btn.disabled = false;
        om_btn.innerText = "Submit Feedback";
        alert("Thank you for your feedback!");

    } catch (error) {
        console.error("Error!", error.message);
    }
}



fetchFromSheet();