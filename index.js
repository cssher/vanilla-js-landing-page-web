const aboutLink = document.querySelector(".about");
const superuserLink = document.querySelector(".super-users");
const pressLink = document.querySelector(".press");
const aboutSection = document.querySelector(".section-two");
const superusersSection = document.querySelector(".section-three");
const pressSection = document.querySelector(".section-four");

//IMPLEMENTING SMOOTH SCROLL THE OLD-SCHOOL BRUTE FORCE WAY -This is not as efficient as the we have to attach function to it everytime we add an event listner.

// aboutLink.addEventListener("click", function () {
//   aboutSection.scrollIntoView({ behavior: "smooth" });
// });

// superuserLink.addEventListener("click", function () {
//   superusersSection.scrollIntoView({ behavior: "smooth" });
// });

// pressLink.addEventListener("click", function () {
//   pressSection.scrollIntoView({ behavior: "smooth" });
// });

//IMPLEMENTING SMOOTH SCROLL BY USING EVENT PROPAGATION TECHNIQUE (Event Bubbling) - This is efficient because only one function is called as the event bubbles up.

const navLinks = document.querySelector(".nav-links");

navLinks.addEventListener("click", function (e) {
  if (e.target.classList.contains("link")) {
    if (e.target.classList.contains("about")) {
      aboutSection.scrollIntoView({ behavior: "smooth" });
    } else if (e.target.classList.contains("super-users")) {
      superusersSection.scrollIntoView({ behavior: "smooth" });
    } else if (e.target.classList.contains("press")) {
      pressSection.scrollIntoView({ behavior: "smooth" });
    }
  }
});

//TABS FUNCTIONALITY USING EVENT DELEGATION METHOD

const tabsBar = document.querySelector(".tab-bar");
const tabsBtn = document.querySelectorAll(".tab-btn");
const tabContents = document.querySelectorAll(".tab-content");

tabsBar.addEventListener("click", function (e) {
  const tabButtonClicked = e.target.closest(".tab-btn");

  if (!tabButtonClicked) return;

  tabsBtn.forEach(function (btn) {
    btn.classList.remove("tab-active");
  });

  tabContents.forEach(function (tabContent) {
    tabContent.classList.remove("tab-content-active");
  });

  tabButtonClicked.classList.add("tab-active");

  document
    .querySelector(`.tab-${tabButtonClicked.dataset.tab}`)
    .classList.add("tab-content-active");
});

//FADE OTHER NAV LINKS UPON HOVERUNG A PARTICULAR NAV LINK BY PASSING ARGUMENTS IN EVERNT HANDLERS
const navBar = document.querySelector(".nav-bar");

const fadeLinks = function (e, opacity) {
  const targetLinkClicked = e.target.classList.contains("link");
  if (targetLinkClicked) {
    const targetLink = e.target;

    const siblingLinks = targetLink
      .closest(".nav-bar")
      .querySelectorAll(".link");

    siblingLinks.forEach((elem) => {
      if (elem != targetLink) {
        elem.style.opacity = opacity;
      }
    });
  }
};
//NOTE: We use "mouseover" event here because 'mouseenter' event does not bubble. Same for 'mouseleave' event it also does not bubble. Hence we are using mouseover & mouseout events,

//EXAMPLE-1: How we pass arguments in event listener call back function. (bind method/ arrow functions can also be used)
navBar.addEventListener("mouseover", function (e) {
  fadeLinks(e, 0.5);
});

navBar.addEventListener("mouseout", function (e) {
  fadeLinks(e, 1);
});

//IMPLEMENTING STICKY NAV BAR ON-SCROLL USING THE OBSERVER API

const targetSection = document.querySelector(".section-one");

const headernavBarHeight = document.querySelector(".header-section");

const navBarHeight = headernavBarHeight.getBoundingClientRect().height;

const obsCallback = (entries) => {
  const [entry] = entries;
  if (!entry.isIntersecting) {
    headernavBarHeight.classList.add("sticky");
  } else {
    headernavBarHeight.classList.remove("sticky");
  }
};

const obsOptions = {
  root: null,
  threshold: 0,
  rootMargin: `-${navBarHeight}px`,
};

const scrollObserver = new IntersectionObserver(obsCallback, obsOptions);
scrollObserver.observe(targetSection);

////////////////////////////////////////

//IMPLEMENTING ONSCROLL FADE UP TEXT APPEAR EFFECT USING OBSERVER API

const allSections = document.querySelectorAll(".all-secs");

const sectionObsCall = (entries, observer) => {
  const [entry] = entries;

  if (!entry.isIntersecting) return;
  entry.target.classList.remove("section-hidden");

  observer.unobserve(entry.target);
};

const sectionObsOptions = {
  root: null,
  threshold: 0.15,
};

const fadeUpObserver = new IntersectionObserver(
  sectionObsCall,
  sectionObsOptions
);

allSections.forEach((section) => {
  fadeUpObserver.observe(section);
  section.classList.add("section-hidden");
});

//////////////////////////////////////////

//LAZY LOADING IMAGES USING OBSERVER API

const images = document.querySelectorAll("img[data-src]");

const imgCallback = (entries, observer) => {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  // Replace src with data-src
  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener("load", function () {
    entry.target.classList.remove("lazy-img");
  });

  observer.unobserve(entry.target);
};

const imgOptions = {
  root: null,
  threshold: 0,
  rootMargin: "200px",
};

const imgObserver = new IntersectionObserver(imgCallback, imgOptions);

images.forEach((image) => imgObserver.observe(image));

////////////////////////

//MAKING SLIDER USING TRANSFORM TRANSLATE-Y CSS PROPERTIES

const slider = function () {
  const slides = document.querySelectorAll(".slide");
  const btnLeft = document.querySelector(".slider__btn--left");
  const btnRight = document.querySelector(".slider__btn--right");

  let curSlide = 0;
  const maxSlide = slides.length;

  const goToSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };

  // Next slide
  const nextSlide = function () {
    if (curSlide === maxSlide - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    }

    goToSlide(curSlide);
  };

  const prevSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlide - 1;
    } else {
      curSlide--;
    }
    goToSlide(curSlide);
  };

  const init = function () {
    goToSlide(0);
  };
  init();

  // Event handlers
  btnRight.addEventListener("click", nextSlide);
  btnLeft.addEventListener("click", prevSlide);
};
slider();

////////////////////

//ASK USER BEFORE CLOSING TAB

window.addEventListener("beforeunload", function (e) {
  e.preventDefault();
  e.returnValue = "";
});
