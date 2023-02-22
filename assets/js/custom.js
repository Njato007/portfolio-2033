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


function sendEmail() {
    const e = event;
    e.preventDefault();
    const name_form = document.getElementById('name');
    const email_form = document.getElementById('email');
    const message_form = document.getElementById('message');
    Email.send({
        Username: "njatosportfolio@gmail.com",
        Host: "smtp.elasticemail.com",
        Password: "DE798B4722A07CE34A8CE39F1AC4E505C79E",
        To : 'njatotianafiononana@gmail.com',
        From : 'njatosportfolio@gmail.com',
        Subject : "Someone got in touch",
        Body : `<html>
            <body style="background-color: #f5f5f5; padding: 2em">
                <div style="width: 500px; background: #fff; padding: 2em; border: 3px solid #24aea9; margin: 0 auto;">
                    <h2 style="color: #24aea9;">From Portfolio</h2>
                    <p class="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; font-size: 14px;"><b style="color: #20303a;">Name:</b> ${name_form.value}</p>
                    <p class="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; font-size: 14px;"><b style="color: #20303a;">Email:</b> ${email_form.value}</p>
                    <p class="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; font-size: 14px; white-space: pre;"><b style="color: #20303a;">Message:</b> <br> ${message_form.value.replace(/\n/g, '<br>\n')}</p>
                    <hr>
                    <p class="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; font-size: 14px;">Date: ${new Date().toLocaleDateString()}</p>
                </div>
            </body>
        </html>`
    }).then(
        message => {
            const Form = document.forms[0];
            Form.classList.add('success');
            e.target.reset();
            message_form.style.height = "";
            setTimeout(() => {
                Form.classList.remove('success')
            }, 5000);
        }
    ).catch(err => alert(err));
}