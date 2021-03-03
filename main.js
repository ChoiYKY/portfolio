"use strict";

//Make navbar transparent when it is on the top;

let pageCnt = 1;

const sections = ["#home", "#about", "#skills", "#work", "#contact"];

if (window.performance) {
  pageCnt = 1;
  scrollIntoView("#home");
}

const navbar = document.querySelector("#navbar");
const navbarHeight = navbar.getBoundingClientRect().height;

document.addEventListener("scroll", () => {
  // console.log(`scroll : ${window.scrollY}`);
  if (window.scrollY > navbarHeight) {
    navbar.classList.add("navbar--move");
  } else {
    navbar.classList.remove("navbar--move");
  }
});

//Handle scrolling when tapping on the navbar menu;

function scrollIntoView(selection) {
  const scrollTo = document.querySelector(selection);

  const down = document.querySelector(".arrowDown_icon");
  const up = document.querySelector(".arrowUp_icon");

  scrollTo.scrollIntoView({ behavior: "smooth" });
  if (selection == "#home") {
    for (let i = 1; i < sections.length; i++) {
      const otherPage = document.querySelector(sections[i]);
      otherPage.classList.remove("cur-page");
    }
    up.classList.remove("visible");
  } else if (selection == "#contact") {
    down.classList.add("invisible");
    up.classList.add("visible");
    const contactPage = document.querySelector("#contact");
    contactPage.classList.add("cur-page");
  } else {
    down.classList.remove("invisible");
    up.classList.add("visible");
  }
}

const navbarMenu1 = document.querySelector(".navbar__menu1");
const navbarMenu2 = document.querySelector(".navbar__menu2");

navbarMenu1.addEventListener("click", (event) => {
  let prev;
  const target = event.target;
  const link = target.dataset.link;

  if (link == null) {
    return;
  }

  for (let i = 1; i < sections.length - 1; i++) {
    if (link == sections[i] && i > 1) {
      console.log(sections[i - 1]);
      prev = sections[i - 1];
    }
  }

  const targetSection = document.querySelector(link);
  scrollIntoView(link);
  setTimeout(() => {
    targetSection.classList.add("cur-page");
  }, 500);
  const prevSection = document.querySelector(prev);
  if (prevSection) {
    prevSection.classList.remove("cur-page");
  }
  navbarMenu2.classList.remove("open");
});

// Navbar toggle button for small screen;

const toggle_btn = document.querySelector(".navbar__toggle-btn");
toggle_btn.addEventListener("click", () => {
  navbarMenu2.classList.toggle("open");
});

//Handle click on "contact me" button on home;

const contact_btn = document.querySelector(".home__contact");

contact_btn.addEventListener("click", () => {
  scrollIntoView("#contact");
  pageCnt = 5;
});

//Make home slowly fade to transparent as the window scrolls down;

const home = document.getElementById("home");
let homeHeight = home.getBoundingClientRect().height;
const homeElements = document.querySelectorAll(".home");
document.addEventListener("scroll", () => {
  for (let i = 0; i < homeElements.length; i++) {
    homeElements[i].style.opacity = 1 - window.scrollY / homeHeight;
  }
});

// scroll "arrow down"

const arrowDown = document.querySelector(".arrowDown_icon");

arrowDown.addEventListener("click", () => {
  const targetSection = document.querySelector(sections[pageCnt]);
  scrollIntoView(sections[pageCnt]);
  setTimeout(() => {
    targetSection.classList.add("cur-page");
  }, 500);
  const prevSection = document.querySelector(sections[pageCnt - 1]);
  if (prevSection) {
    prevSection.classList.remove("cur-page");
  }
  pageCnt++;
});

const arrowUp = document.querySelector(".arrowUp_icon");
arrowUp.addEventListener("click", () => {
  const targetSection = document.querySelector(sections[pageCnt - 2]);
  scrollIntoView(sections[pageCnt - 2]);
  setTimeout(() => {
    targetSection.classList.add("cur-page");
  }, 500);
  const prevSection = document.querySelector(sections[pageCnt - 1]);
  if (prevSection) {
    prevSection.classList.remove("cur-page");
  }
  pageCnt--;
});
// document.addEventListener("scroll", () => {
//   if (window.scrollY > homeHeight / 2) arrowUp.classList.add("visible");
//   else arrowUp.classList.remove("visible");
// });

// const arrowUP = document.querySelector(".arrowUp_icon");
// arrowUP.addEventListener("click", () => {
//   scrollIntoView("#home");
// });

//Filter Projects

const workBtnContainer = document.querySelector(".work__categories");
const projectContainer = document.querySelector(".work__projects");
const projects = document.querySelectorAll(".project");

workBtnContainer.addEventListener("click", (e) => {
  const filter = e.target.dataset.filter || e.target.parentNode.dataset.filter;
  if (filter == null) return;

  const preSelected = workBtnContainer.querySelector(".active");
  const curSelected =
    e.target.nodeName === "BUTTON" ? e.target : e.target.parentNode;

  preSelected.classList.remove("active");
  curSelected.classList.add("active");

  projectContainer.classList.add("anim-out");
  setTimeout(() => {
    projects.forEach((project) => {
      if (filter === "*" || filter === project.dataset.type) {
        project.classList.remove("invisible");
      } else {
        project.classList.add("invisible");
      }
    });
    projectContainer.classList.remove("anim-out");
  }, 300);
});

//Set border to selected Navbar menu;

// const about = document.getElementById("about");
// let aboutHeight = about.getBoundingClientRect().height;

// const skills = document.getElementById("skills");
// let skillsHeight = skills.getBoundingClientRect().height;

// const work = document.getElementById("work");
// let workHeight = work.getBoundingClientRect().height;

// const testimomials = document.getElementById("testimonials");
// let testimonialsHeight = testimomials.getBoundingClientRect().height;

// const contact = document.getElementById("contact");
// let contactHeight = contact.getBoundingClientRect().height;

// let sectionScroll = [
//   0,
//   homeHeight - 30,
//   aboutHeight - 30,
//   skillsHeight - 30,
//   workHeight - 30,
//   testimonialsHeight - 30,
//   contactHeight - 30,
// ];
// let scrollLimit =
//   document.documentElement.scrollHeight - window.innerHeight - 10;

// for (let i = 1; i < sectionScroll.length; i++) {
//   sectionScroll[i] += sectionScroll[i - 1];
// }

// window.visualViewport.addEventListener("resize", () => {
//   homeHeight = home.getBoundingClientRect().height;
//   aboutHeight = about.getBoundingClientRect().height;
//   skillsHeight = skills.getBoundingClientRect().height;
//   workHeight = work.getBoundingClientRect().height;
//   testimonialsHeight = testimomials.getBoundingClientRect().height;
//   contactHeight = contact.getBoundingClientRect().height;

//   sectionScroll = [
//     0,
//     homeHeight - 30,
//     aboutHeight - 30,
//     skillsHeight - 30,
//     workHeight - 30,
//     testimonialsHeight - 30,
//     contactHeight - 30,
//   ];
//   scrollLimit = document.documentElement.scrollHeight - window.innerHeight - 30;

//   for (let i = 1; i < sectionScroll.length; i++) {
//     sectionScroll[i] += sectionScroll[i - 1];
//   }
// });

// const navbarMenu = document.querySelectorAll(".navbar__menu__item");
// document.addEventListener("scroll", () => {
//   const preSection = document.querySelector(".selected");
//   for (let i = 0; i < sectionScroll.length - 1; i++) {
//     if (scrollLimit <= window.scrollY) {
//       preSection.classList.remove("selected");
//       navbarMenu[navbarMenu.length - 1].classList.add("selected");
//       return;
//     }
//     if (
//       sectionScroll[i] <= window.scrollY &&
//       window.scrollY < sectionScroll[i + 1]
//     ) {
//       preSection.classList.remove("selected");
//       navbarMenu[i].classList.add("selected");
//       return;
//     }
//   }
// });

// window.visualViewport.addEventListener("resize", () => {
//   console.log(`limit : ${scrollLimit}`);
//   const preSection = document.querySelector(".selected");
//   for (let i = 0; i < sectionScroll.length - 1; i++) {
//     if (scrollLimit <= window.scrollY) {
//       preSection.classList.remove("selected");
//       navbarMenu[navbarMenu.length - 1].classList.add("selected");
//       return;
//     }
//     if (
//       sectionScroll[i] <= window.scrollY &&
//       window.scrollY < sectionScroll[i + 1]
//     ) {
//       preSection.classList.remove("selected");
//       navbarMenu[i].classList.add("selected");
//       return;
//     }
//   }
// });

//****************

// let prevPage = 0;

// document.addEventListener("scroll", () => {
//   if (screen.height == window.scrollY) {
//     console.log(
//       `screen.height: ${screen.height} and window.scrollY = ${window.scrollY} goodgood!!!`
//     );
//   }

//   // curPage.classList.toggle("cur-page");
//   for (let i = 5; i > 0; i--) {
//     if (
//       screen.height * i - 200 <= window.scrollY &&
//       window.scrollY <= screen.height * (i + 1) - 200 &&
//       prevPage !== i
//     ) {
//       const curPage = document.querySelector(sections[i]);
//       console.log(curPage);
//       curPage.classList.add("cur-page");
//       prevPage = i;
//       return;
//     }
//   }
// });

// image slider

let slideIndex = 0;

function plusDivs(n) {
  slideIndex += n;
  showDivs(slideIndex);
}

function showDivs(n) {
  const x = document.querySelectorAll(".major");
  if (n > x.length - 1) {
    slideIndex = 0;
  }
  if (n < 0) {
    slideIndex = x.length - 1;
  }
  for (let i = 0; i < x.length; i++) {
    x[i].classList.remove("visible");
  }
  console.log(slideIndex);
  x[slideIndex].classList.add("visible");
}

//******************

const nameCard = document.querySelector(".contact__name-card");

nameCard.addEventListener("click", () => {
  nameCard.classList.toggle("back");
  nameCard.innerHTML = `
    <h1 class="contact__title">Let's Talk</h1>
    <h2 class="contact__email">numeru@naver.com</h2>
    <div class="contact__links">
      <a href="https://github.com/numeru">
        <i class="fab fa-github"></i>
      </a>
    </div>
    <p class="contact__right">Choi - All rights reserved</p>
  `;
});
