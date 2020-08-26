'use strict';

//Make navbar transparent when it is on the top;

const navbar = document.querySelector('#navbar');
const navbarHeight = navbar.getBoundingClientRect().height;

document.addEventListener('scroll', () => {
    console.log(window.scrollX);
    console.log(window.scrollY);
    console.log(`navbarHeight : ${navbarHeight}`);
    if (window.scrollY > navbarHeight) {
        navbar.classList.add('navbar--move');
    }
    else {
        navbar.classList.remove('navbar--move');
    }
});

//Handle scrolling when tapping on the navbar menu;

function scrollIntoView(selection) {
    const scrollTo = document.querySelector(selection);
    scrollTo.scrollIntoView({ behavior: "smooth" });
}

const navbarMenu = document.querySelector('.navbar__menu');

navbarMenu.addEventListener('click', (event) => {
    const target = event.target;
    const link = target.dataset.link;

    if (link == null) {
        return;
    }

    scrollIntoView(link);
});

//Handle click on "contact me" button on home;

const contact_btn = document.querySelector('.home__contact');

contact_btn.addEventListener('click', () => {
    scrollIntoView('#contact');
});

//Make home slowly fade to transparent as the window scrolls down;

const home = document.getElementById('home');
const homeHeight = home.getBoundingClientRect().height;
const homeElements = document.querySelectorAll('.home');
document.addEventListener('scroll', () => {
    for (let i = 0; i < homeElements.length; i++) {
        homeElements[i].style.opacity = 1 - window.scrollY / (homeHeight - navbarHeight);
    };
});