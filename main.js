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

const navbarMenu = document.querySelector('.navbar__menu');
navbarMenu.addEventListener('click', (event) => {
    const target = event.target;
    const link = target.dataset.link;

    if (link == null) {
        return;
    }

    const scrollTo = document.getElementById(link);
    scrollTo.scrollIntoView({ behavior: "smooth" });
});