// ON SCROLL CODE LINE ANIMATION
window.addEventListener('scroll', () => {
  const codeLines = document.querySelectorAll('.glowing');
  codeLines.forEach((line, index) => {
    const scrollX = window.scrollY;
    const translateX = index % 2 === 0 ? `${scrollX / 25}px` : `-${scrollX / 25}px`;
    line.style.transform = `translateX(${translateX})`;
  });
});


// INFINITE MARQUEE
document.addEventListener('DOMContentLoaded', _ => {
  const items = [...document.getElementsByClassName('list__item')];
  const containerElem = document.getElementById('containerElem');
  const leftSideOfContainer = containerElem.getBoundingClientRect().left;
  const listElem = document.getElementById('list');
  let currentLeftValue = 0;

  window.setInterval(animationLoop, 100);

  function animationLoop() {
    const firstListItem = listElem.querySelector('.list__item:first-child');

    let rightSideOfFirstItem = firstListItem.getBoundingClientRect().right;
    if (rightSideOfFirstItem == leftSideOfContainer) {
      currentLeftValue = -1;
      listElem.appendChild(firstListItem);
    }
    listElem.style.marginLeft = `${currentLeftValue}px`;
    currentLeftValue--;
  }
});


// FAQ CODE
const items = document.querySelectorAll('.accordion button');

function toggleAccordion() {
  const itemToggle = this.getAttribute('aria-expanded');

  for (let i = 0; i < items.length; i++) {
    items[i].setAttribute('aria-expanded', 'false');
  }

  if (itemToggle == 'false') {
    this.setAttribute('aria-expanded', 'true');
  }
}

items.forEach((item) => item.addEventListener('click', toggleAccordion));


// SCROLL ANIMATION
const sr = ScrollReveal({
  duration: 1000,
  delay: 200,
});

function resetAnimation(element) {
  sr.get().reveal(element);
}

function initScrollReveal() {
  // Hero Section
  sr.reveal('.hero h1', {
    origin: 'top',
    distance: '50px'
  });
  sr.reveal('.hero h3', {
    origin: 'top',
    distance: '50px',
    delay: 400
  });
  sr.reveal('.hero h4', {
    origin: 'top',
    distance: '50px',
    delay: 800
  });
  sr.reveal('.animation', {
    origin: 'top',
    distance: '50px',
    delay: 750
  });

  sr.reveal('.code-lines h2', {
    origin: 'bottom',
    distance: '50px',
    interval: 200
  });

  sr.reveal('.about-DOD h1', {
    origin: 'top',
    distance: '50px'
  });
  sr.reveal('.about-DOD h4', {
    origin: 'top',
    distance: '50px',
    delay: 400
  });
  sr.reveal('.about-DOD p', {
    origin: 'top',
    distance: '50px',
    delay: 800
  });
  sr.reveal('.about-DOD a', {
    origin: 'top',
    distance: '50px',
    delay: 1200
  });

  sr.reveal('.prizes h1', {
    origin: 'top',
    distance: '50px'
  });
  sr.reveal('.prize_1', {
    origin: 'left',
    distance: '50px'
  });
  sr.reveal('.prize_2', {
    origin: 'bottom',
    distance: '50px',
    delay: 200
  });
  sr.reveal('.prize_3', {
    origin: 'right',
    distance: '50px',
    delay: 400
  });
  sr.reveal('.prize_4', {
    origin: 'left',
    distance: '50px',
    delay: 600
  });
  sr.reveal('.prize_5', {
    origin: 'bottom',
    distance: '50px',
    delay: 800
  });
  sr.reveal('.prize_6', {
    origin: 'right',
    distance: '50px',
    delay: 1000
  });
  sr.reveal('.prize_7', {
    origin: 'left',
    distance: '50px',
    delay: 1200
  });

  sr.reveal('.sponsors h1', {
    origin: 'top',
    distance: '50px'
  });

  if (window.innerWidth > 600) {
    sr.reveal('.list__item img', {
      origin: 'bottom',
      distance: '50px',
      interval: 200
    });
  }

  sr.reveal('.become-spoonsor', {
    origin: 'bottom',
    distance: '50px',
    delay: 800
  });

  sr.reveal('.faq_and_rules h1', {
    origin: 'top',
    distance: '50px'
  });
  sr.reveal('.accordion-item', {
    origin: 'bottom',
    distance: '20px'
  });

  sr.reveal('footer h1', {
    origin: 'bottom',
    distance: '50px'
  });
  sr.reveal('footer ul', {
    origin: 'bottom',
    distance: '50px',
    interval: 200
  });
  sr.reveal('.fyi_logo', {
    origin: 'bottom',
    distance: '50px',
    interval: 100
  });
}

initScrollReveal();

document.addEventListener('scrollreveal:after_reveal', function(event) {
  const element = event.detail.target;
  resetAnimation(element);
});


// NAVBAR
document.addEventListener('DOMContentLoaded', function() {
  const body = document.querySelector('body');
  const open = document.querySelector('.hamburger');
  const close = document.querySelector('.close-btn');
  const links = document.querySelector('.links');

  function openNav() {
    body.style.overflow = "hidden";
    links.style.display = "flex";
    links.classList.add('open');
  }

  function closeNav() {
    body.style.overflow = "auto";
    links.style.display = "none";
    // links.classList.remove('open');
  }

  close.addEventListener("click", closeNav);

  open.addEventListener("click", openNav);

  // Close on link click and scroll to section
  links.addEventListener('click', function(event) {
    if (event.target.tagName === 'A') {
      setTimeout(() => {
        closeNav();
      }, 300);

      // Smoothly scroll to the target section
      const targetSectionId = event.target.getAttribute('href').substring(1);
      const targetSection = document.getElementById(targetSectionId);

      if (targetSection) {
        targetSection.scrollIntoView({
          behavior: 'smooth'
        });
      }
    }
  });
});

