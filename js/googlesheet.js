
const arabicMonths = ["يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو", "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"];

var dynamicReviews = document.querySelector('.dynamic-reviews');

async function fetchFromSheet() {

  const url = `https://docs.google.com/spreadsheets/d/1d5iR_3MssVvM2QKEc6JnCqgDtMoGW4SDUIrmSFd9eSY/gviz/tq?tqx=out:json&sheet=Reviews`;
  try {
    const res  = await fetch(url);
    const text = await res.text();
    const json = JSON.parse(text.match(/\((.+)\)/s)[1]);
    const rows = json.table.rows;

    var box = "";
    var counter = 0;

    for (var i = 0; i < rows.length; i++) 
    {   
        var rowData = rows[i].c;
        if (!rowData || !rowData[0] || !rowData[1]) continue; // Skip empty rows

        var rawDate = rowData[0].v ? rowData[0].v.toString() : ""; 
        var name    = rowData[1].v ? rowData[1].v : "Anonymous";
        var stars   = rowData[2].v ? parseInt(rowData[2].v) : 5;
        var review  = rowData[3].v ? rowData[3].v : "";

        if(rows[i].c[4].v == "approved")
        {
            counter++;
            var name = rows[i].c[1].v;
            var stars = parseInt(rows[i].c[2].v); 
            var review = rows[i].c[3].v;

            var formattedDate = "";
            if (rawDate.includes("Date")) {
                var dateNumbers = rawDate.match(/\d+/g); 
                if (dateNumbers) {
                    var year = dateNumbers[0];
                    var monthIndex = parseInt(dateNumbers[1]); 
                    formattedDate = `${year} ${arabicMonths[monthIndex]}`;
                }
            } else {
                formattedDate = "2026 مارس"; // Fallback
            }
            

            // --- Initials Logic ---
            var nameParts = name.trim().split(' ');

            var initials = nameParts.length > 1 
                // Adds a space between first letter and last letter
                ? (nameParts[0][0] + ' ' + nameParts[nameParts.length - 1][0]).toUpperCase() 
                // Adds a space between the first and second letter of a single name
                : (name.slice(0, 1) + ' ' + name.slice(1, 2)).toUpperCase();

            // --- Specific HTML for each Star Count ---
            var starsHtml = '';
            switch(stars) {
                case 5:
                    starsHtml = '<i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i>';
                    break;
                case 4:
                    starsHtml = '<i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star"></i>';
                    break;
                case 3:
                    starsHtml = '<i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star"></i><i class="bi bi-star"></i>';
                    break;
                case 2:
                    starsHtml = '<i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star"></i><i class="bi bi-star"></i><i class="bi bi-star"></i>';
                    break;
                case 1:
                    starsHtml = '<i class="bi bi-star-fill"></i><i class="bi bi-star"></i><i class="bi bi-star"></i><i class="bi bi-star"></i><i class="bi bi-star"></i>';
                    break;
                default:
                    starsHtml = '<i class="bi bi-star"></i><i class="bi bi-star"></i><i class="bi bi-star"></i><i class="bi bi-star"></i><i class="bi bi-star"></i>';
            }

            // --- The Template ---
            box = `<div class="col-lg-4 mb-3">
                    <div class="testimonial-card" style="height: 250px;">
                        <span class="quote-mark">“</span>
                        <p class="mb-4">${review}</p>
                        <hr class="border-light opacity-50">
                        <div class="d-flex align-items-center">
                            <div class="avatar-circle ms-3">${initials}</div>
                            <div>
                                <h6 class="mb-0 fw-bold mb-1">${name}</h6>
                                <small class="text-muted"><i class="bi bi-calendar3 me-1 ms-1"></i>${formattedDate}</small>
                                <div class="star-rating">
                                    ${starsHtml}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>` + box;
            
            if(counter % 3 == 0) {
                dynamicReviews.innerHTML += `<div class="carousel-item">
                                            <div class="row px-md-5 d-flex justify-content-center align-items-center">
                                                ${box}
                                            </div>
                                        </div>`;
                box = "";
                counter = 0;
            }
        }
            
    }

        if(box !== "") 
        {
            dynamicReviews.innerHTML += `<div class="carousel-item">
                                        <div class="row px-md-5 d-flex justify-content-center align-items-center">
                                            ${box}
                                        </div>
                                    </div>`;
        }
        
        } catch(e) {
            console.warn('Sheet fetch failed, using demo data.', e);
        }
    }

// USE THE URL FROM THE "DEPLOY" POPUP, NOT THE BROWSER URL BAR
const SCRIPT_ENDPOINT = 'https://script.google.com/macros/s/AKfycbwoDorMnL7Lr_hzkOnhYs8u3pPraIqJGR_2E0FRtdc2fFuutlxuHnBi89ck_IFB1x6n1A/exec';

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