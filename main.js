"use strict";

//Make navbar transparent when it is on the top;

let pageCnt = 1;

const sections = ["#home", "#about", "#skills", "#work", "#contact"];

window.onload = function () {
  pageCnt = 1;
  scrollIntoView("#home");
};

if (window.performance) {
  pageCnt = 1;
  scrollIntoView("#home");
}

const navbar = document.querySelector("#navbar");
const navbarHeight = navbar.getBoundingClientRect().height;

document.addEventListener("scroll", () => {
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
