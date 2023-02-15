document.body.onscroll = (e) => {
    if (scrollY > 0) {
        document.querySelector('.header').classList.add('fixed');
    } else {
        document.querySelector('.header').classList.remove('fixed');
    }
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

const MenuObserver = new IntersectionObserver((observables) => {
    observables.forEach(observable => {
        const menuItem = document.querySelector(`a[href='#${observable.target.id}']`)
                        || document.createElement('a');
        if (observable.isIntersecting) {
            menuItem.classList.add('active');
        } else {
            menuItem.classList.remove('active');
        }
    });
}, {
    threshold: .5
});

sections.forEach(section => MenuObserver.observe(section));

/* SCROLL INTO VIEW BY LINK */
// document.querySelectorAll("a[href^='#']").forEach(anchor => {
//     anchor.addEventListener('click', (e) => {
//         e.preventDefault();
//         document.querySelector(e.target.getAttribute('href')).scrollIntoView({
//             behavior: "smooth"
//         });
//     });
// });