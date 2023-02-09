document.body.onscroll = (e) => {
    if (scrollY > 0) {
        document.querySelector('.header').classList.add('fixed');
    } else {
        document.querySelector('.header').classList.remove('fixed');
    }
};

const observer = new IntersectionObserver(function(observables) {
    observables.forEach(observable => {
        const menuItem = document.querySelector(`a[href='#${observable.target.id}']`)
                        || document.createElement('a');
        if (observable.isIntersecting) {
            menuItem.classList.add('active');
            if (!observable.target.classList.contains('observed'))
                observable.target.classList.add('observed');
            // observer.unobserve(observable.target);
        } else {
            menuItem.classList.remove('active');
        }
    });
}, {
    threshold: [0.5]
});

const sections = document.querySelectorAll('section');
sections.forEach(section => observer.observe(section));

/* SCROLL INTO VIEW BY LINK */
// document.querySelectorAll("a[href^='#']").forEach(anchor => {
//     anchor.addEventListener('click', (e) => {
//         e.preventDefault();
//         document.querySelector(e.target.getAttribute('href')).scrollIntoView({
//             behavior: "smooth"
//         });
//     });
// });