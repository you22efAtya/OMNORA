const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.querySelectorAll('.col-lg-7, .col-lg-4.offset-lg-1').forEach(col => {
                col.classList.add('animate-in');
            });
            observer.unobserve(entry.target); // only animate once
        }
    });
}, { threshold: 0.2 });

document.querySelectorAll('.section-spacing').forEach(section => {
    observer.observe(section);
});

const image = document.querySelector('.AboutUsImage');

const observer2 = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            image.classList.add('in-view');
            observer2.unobserve(image); // animate only once
        }
    });
}, { threshold: 0.3 });

if(image)
{
    observer2.observe(image);
}


const AboutUs1 = document.querySelector('.secAboutus');
const parAboutUs = document.querySelector('.parAboutUs');
const iconsec = document.querySelectorAll('.iconsec');
const whyTitle = document.querySelector('.section-title');
const whySubtitle = document.querySelector('.section-subtitle');
const featureItem = document.querySelectorAll('.feature-item');
const serviceCardCol1 = document.querySelectorAll('.r1');
const serviceCardCol2 = document.querySelectorAll('.r2');
const servicesHeader = document.querySelector('.services-header');


const observer3 = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            AboutUs1.classList.add('Animate');
            parAboutUs.classList.add('Animate');
            iconsec.forEach(icon => icon.classList.add('Animate'));

        }
    });
}, { threshold: 0.3 });


const observer4 = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            featureItem.forEach(item => item.classList.add('animate'));
            whyTitle.classList.add('animate');
            whySubtitle.classList.add('animate');

        }
    });
}, { threshold: 0.3 });

const observer5 = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            servicesHeader.classList.add('animate');
            serviceCardCol1.forEach(item => item.classList.add('animate'));
        }
    });
}, { threshold: 0.3 });

const observer6 = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            serviceCardCol2.forEach(item => item.classList.add('animate'));
        }
    });
}, { threshold: 0.3 });

if(AboutUs1)
{
    observer3.observe(AboutUs1);
    observer3.observe(parAboutUs);
    iconsec.forEach(icon => observer3.observe(icon));
}
else if(whyTitle)
{
    observer4.observe(whyTitle);
    observer4.observe(whySubtitle);
    observer4.observe(featureItem);
}
else
{
    observer5.observe(servicesHeader);
    serviceCardCol1.forEach(item => observer5.observe(item));
    serviceCardCol2.forEach(item => observer6.observe(item));
}


