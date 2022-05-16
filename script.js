'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(modal => modal.addEventListener('click', openModal));

// for (let i = 0; i < btnsOpenModal.length; i++)
//   btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});
//moving to section  1 via button
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

btnScrollTo.addEventListener('click', function (e) {
  const section1Cords = section1.getBoundingClientRect();

  // window.scrollTo({
  //   left: section1Cords.left + window.pageXOffset,
  //   top: section1Cords.top + window.pageYOffset,
  //   behavior: 'smooth',
  // });
  section1.scrollIntoView({ behavior: 'smooth' });
});

///random color bubbling
// const randInt = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);
// const randColor = () =>
//   `rgb(${randInt(0, 256)}, ${randInt(0, 256)} , ${randInt(0, 256)})`;
/// page navigation/////////////
// document.querySelectorAll('.nav__link').forEach(function (value) {
//   value.addEventListener('click', function (e) {
//     e.preventDefault();
//     const id = this.getAttribute('href');
//     document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
//   });
// });
document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();

  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    //console.log(id);
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});
//////
///////////////////////////////////////
// DOM Traversing
// const h1 = document.querySelector('h1');

// // Going downwards: child
// console.log(h1.querySelectorAll('.highlight'));
// console.log(h1.childNodes);
// console.log(h1.children);
// h1.firstElementChild.style.color = 'white';
// h1.lastElementChild.style.color = 'orangered';

// // Going upwards: parents
// console.log(h1.parentNode);
// console.log(h1.parentElement);

// h1.closest('.header').style.background = 'var(--gradient-secondary)';

// h1.closest('h1').style.background = 'var(--gradient-primary)';

// // Going sideways: siblings
// console.log(h1.previousElementSibling);
// console.log(h1.nextElementSibling);

// console.log(h1.previousSibling);
// console.log(h1.nextSibling);

// console.log(h1.parentElement.children);
// [...h1.parentElement.children].forEach(function (el) {
//   if (el !== h1) el.style.transform = 'scale(0.5)';
// });

///////////////////////////////////////
///////tabbed content ///////////
//tab buttons/////
const tabs = document.querySelectorAll('.operations__tab');

////tab buttons container////////
const tabsContainer = document.querySelector('.operations__tab-container');

///////tab content//////////

const tabsContent = document.querySelectorAll('.operations__content');

// tabs.forEach(tab =>
//   tab.addEventListener('click', function (e) {
//     //console.log(tab);
//   })
// );

tabsContainer.addEventListener('click', function (e) {
  e.preventDefault();
  const clicked = e.target.closest('.operations__tab');
  //guard clause
  if (!clicked) return;
  //active tab
  tabs.forEach(tab => tab.classList.remove('operations__tab--active'));
  clicked.classList.add('operations__tab--active');
  //remove active tabs first
  tabsContent.forEach(content =>
    content.classList.remove('operations__content--active')
  );
  //active content area
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});
///////////////focus animation
const handle = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');
    siblings.forEach(value => {
      if (value != link) value.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};
const nav = document.querySelector('.nav');
nav.addEventListener('mouseover', handle.bind(0.5));
nav.addEventListener('mouseout', handle.bind(1));
//nav.classList.add('sticky');

//sticky navigation bar
// const section1Cords = section1.getBoundingClientRect();

// window.addEventListener('scroll', function () {
//   if (window.scrollY > section1Cords.top) {
//     nav.classList.add('sticky');
//   } else {
//     nav.classList.remove('sticky');
//   }
// });
// mocdren sticky nav bar//////

const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;

const stickyMethod = function (entries) {
  const [entry] = entries;
  // console.log(entry);
  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};

const headerObserver = new IntersectionObserver(stickyMethod, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});

headerObserver.observe(header);

/////revel section////
const sections = document.querySelectorAll('.section');
const revelSection = function (entries, observer) {
  const [entry] = entries;
  //console.log(entry);
  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};
const sectionObserver = new IntersectionObserver(revelSection, {
  root: null,
  threshold: 0.15,
});

sections.forEach(function (section) {
  sectionObserver.observe(section);
  //section.classList.add('section--hidden');
});
////loading images smalls to big///

const imgs = document.querySelectorAll('img[data-src]');

const loadImg = function (entries, observer) {
  const [entry] = entries;
  //console.log(entry);
  if (!entry.isIntersecting) return;
  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });
  observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '200px',
});

imgs.forEach(img => imgObserver.observe(img));

////slider////////////
const slides = document.querySelectorAll('.slide');
let currentSlide = 0;
const maxSlides = slides.length;
//const slider = document.querySelector('.slider');
const btnLeft = document.querySelector('.slider__btn--left');
const btnRight = document.querySelector('.slider__btn--right');
const dotsContainer = document.querySelector('.dots');

// slider.style.transform = 'scale(0.4) translateX(-800px)';
// slider.style.overflow = 'visible';

const gotoSlide = function (slide) {
  slides.forEach(
    (slide, index) =>
      (slide.style.transform = `translateX(${100 * (index - currentSlide)}%)`)
  );
};

const createDots = function () {
  slides.forEach(function (_, index) {
    dotsContainer.insertAdjacentHTML(
      'beforeend',
      `<button class="dots__dot" data-slide="${index}"></button>`
    );
  });
};

gotoSlide(0);
createDots();

const activeDot = function (slide) {
  document
    .querySelectorAll('.dots__dot')
    .forEach(dot => dot.classList.remove('dots__dot--active'));

  document
    .querySelector(`.dots__dot[data-slide="${slide}"]`)
    .classList.add('dots__dot--active');
};
const nextSlide = function () {
  if (currentSlide === maxSlides - 1) {
    currentSlide = 0;
  } else {
    currentSlide++;
  }
  gotoSlide(currentSlide);
  activeDot(currentSlide);
};
const prevSlide = function () {
  if (currentSlide === 0) {
    currentSlide = maxSlides - 1;
  } else {
    currentSlide--;
  }

  gotoSlide(currentSlide);
  activeDot(currentSlide);
};
btnRight.addEventListener('click', nextSlide);

btnLeft.addEventListener('click', prevSlide);

/// keyboard event

document.addEventListener('keydown', function (e) {
  if (e.key === 'ArrowLeft') prevSlide();
  if (e.key === 'ArrowRight') nextSlide();
});

dotsContainer.addEventListener('click', function (e) {
  if (e.target.classList.contains('dots__dot')) {
    //console.log(e.target);
    const slide = e.target.dataset.slide;
    console.log(typeof slide);
    gotoSlide(slide);
    activeDot(slide);
  }
});
activeDot(currentSlide);
