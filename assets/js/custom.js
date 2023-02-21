document.body.onscroll = (e) => {
};

const observer = new IntersectionObserver(function(observables) {
    observables.forEach(observable => {
        if (observable.isIntersecting) {
            observable.target.classList.add('observed');
            observer.unobserve(observable.target);
        }
    });
}, {
    root: null,
    threshold: .25,
    rootMargin: '0px'
});

const sections = document.querySelectorAll('section');
sections.forEach(section => observer.observe(section));

// Activate menu Item Link while scrolling in the view section
const links = ['about', 'skills', 'work', 'contact'].map(e => document.querySelector(`a[href='#${e}']`));
function activateMenu() {
    let currentId = null;
    sections.forEach(section => {
        const sTop = section.offsetTop;
        const sHeight = section.offsetHeight;
        if (scrollY >= (sTop - sHeight / 3)) {
            currentId = section.getAttribute('id');
        }
    });
    links.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(currentId)) {
            link.classList.add('active')
        }
    });
}

window.addEventListener('scroll', () => {
    // set fixed header
    if (scrollY > 0) {
        document.querySelector('.header').classList.add('fixed');
    } else {
        document.querySelector('.header').classList.remove('fixed');
    }
    activateMenu();
});