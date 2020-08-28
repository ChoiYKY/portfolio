'use strict';

//Make navbar transparent when it is on the top;

const navbar = document.querySelector('#navbar');
const navbarHeight = navbar.getBoundingClientRect().height;

document.addEventListener('scroll', () => {
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

const navbarMenu1 = document.querySelector('.navbar__menu1');
const navbarMenu2 = document.querySelector('.navbar__menu2');

navbarMenu1.addEventListener('click', (event) => {
    const target = event.target;
    const link = target.dataset.link;

    if (link == null) {
        return;
    }
    navbarMenu2.classList.remove('open');
    scrollIntoView(link);
});

// Navbar toggle button for small screen;

const toggle_btn = document.querySelector('.navbar__toggle-btn');
toggle_btn.addEventListener('click', () => {
    navbarMenu2.classList.toggle('open');
});

//Handle click on "contact me" button on home;

const contact_btn = document.querySelector('.home__contact');

contact_btn.addEventListener('click', () => {
    scrollIntoView('#contact');
});

//Make home slowly fade to transparent as the window scrolls down;

const home = document.getElementById('home');
let homeHeight = home.getBoundingClientRect().height;
const homeElements = document.querySelectorAll('.home');
document.addEventListener('scroll', () => {
    for (let i = 0; i < homeElements.length; i++) {
        homeElements[i].style.opacity = 1 - window.scrollY / homeHeight;
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

//Filter Projects

const workBtnContainer = document.querySelector('.work__categories');
const projectContainer = document.querySelector('.work__projects');
const projects = document.querySelectorAll('.project');

workBtnContainer.addEventListener('click', (e) => {
    const filter = e.target.dataset.filter || e.target.parentNode.dataset.filter;
    if (filter == null)
        return;

    const preSelected = workBtnContainer.querySelector('.active');
    const curSelected = e.target.nodeName === 'BUTTON' ? e.target : e.target.parentNode;

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
    }, 300);
});

//Set border to selected Navbar menu;

const about = document.getElementById('about');
let aboutHeight = about.getBoundingClientRect().height;

const skills = document.getElementById('skills');
let skillsHeight = skills.getBoundingClientRect().height;

const work = document.getElementById('work');
let workHeight = work.getBoundingClientRect().height;

const testimomials = document.getElementById('testimonials');
let testimonialsHeight = testimomials.getBoundingClientRect().height;

const contact = document.getElementById('contact');
let contactHeight = contact.getBoundingClientRect().height;

let sectionScroll = [0, homeHeight - 30, aboutHeight - 30, skillsHeight - 30, workHeight - 30, testimonialsHeight - 30, contactHeight - 30];
let scrollLimit = document.documentElement.scrollHeight - window.innerHeight - 10;

for (let i = 1; i < sectionScroll.length; i++) {
    sectionScroll[i] += sectionScroll[i - 1];
}

window.visualViewport.addEventListener('resize', () => {
    homeHeight = home.getBoundingClientRect().height;
    aboutHeight = about.getBoundingClientRect().height;
    skillsHeight = skills.getBoundingClientRect().height;
    workHeight = work.getBoundingClientRect().height;
    testimonialsHeight = testimomials.getBoundingClientRect().height;
    contactHeight = contact.getBoundingClientRect().height;

    sectionScroll = [0, homeHeight - 30, aboutHeight - 30, skillsHeight - 30, workHeight - 30, testimonialsHeight - 30, contactHeight - 30];
    scrollLimit = document.documentElement.scrollHeight - window.innerHeight - 30;

    for (let i = 1; i < sectionScroll.length; i++) {
        sectionScroll[i] += sectionScroll[i - 1];
    }
});

const navbarMenu = document.querySelectorAll('.navbar__menu__item');
document.addEventListener('scroll', () => {
    const preSection = document.querySelector('.selected');
    for (let i = 0; i < sectionScroll.length - 1; i++) {
        if (scrollLimit <= window.scrollY) {
            preSection.classList.remove('selected');
            navbarMenu[navbarMenu.length - 1].classList.add('selected');
            return;
        }
        if (sectionScroll[i] <= window.scrollY && window.scrollY < sectionScroll[i + 1]) {
            preSection.classList.remove('selected');
            navbarMenu[i].classList.add('selected');
            return;
        }
    }
});

window.visualViewport.addEventListener('resize', () => {
    console.log(`limit : ${scrollLimit}`);
    const preSection = document.querySelector('.selected');
    for (let i = 0; i < sectionScroll.length - 1; i++) {
        if (scrollLimit <= window.scrollY) {
            preSection.classList.remove('selected');
            navbarMenu[navbarMenu.length - 1].classList.add('selected');
            return;
        }
        if (sectionScroll[i] <= window.scrollY && window.scrollY < sectionScroll[i + 1]) {
            preSection.classList.remove('selected');
            navbarMenu[i].classList.add('selected');
            return;
        }
    }
});
