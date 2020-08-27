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

//Show "arrow up" button when scrolling down;

const arrowUp = document.querySelector('.arrowUp_icon');
document.addEventListener('scroll', () => {
    if (window.scrollY > homeHeight / 2)
        arrowUp.classList.add('visible')
    else
        arrowUp.classList.remove('visible')
});

arrowUp.addEventListener('click', () => {
    scrollIntoView('#home');
});

//Project

const workBtnContainer = document.querySelector('.work__categories');
const projectContainer = document.querySelector('.work__projects');
const projects = document.querySelectorAll('.project');

workBtnContainer.addEventListener('click', (e) => {
    const filter = e.target.dataset.filter || e.target.parentNode.dataset.filter;
    if (filter == null)
        return;

    const preSelected = workBtnContainer.querySelector('.active');
    const curSelected = e.target;

    preSelected.classList.remove('active');
    curSelected.classList.add('active');

    projectContainer.classList.add('anim-out');
    setTimeout(() => {
        projects.forEach((project) => {
            if (filter === '*' || filter === project.dataset.type) {
                project.classList.remove('invisible');
            }
            else {
                project.classList.add('invisible');
            }
        });
        projectContainer.classList.remove('anim-out');
    }, 300)
});

