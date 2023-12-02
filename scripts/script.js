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
// document.addEventListener('DOMContentLoaded', _ => {
//   const items = [...document.getElementsByClassName('list__item')];
//   const containerElem = document.getElementById('containerElem');
//   const leftSideOfContainer = containerElem.getBoundingClientRect().left;
//   const listElem = document.getElementById('list');
//   let currentLeftValue = 0;

//   window.setInterval(animationLoop, 100);

//   function animationLoop() {
//     const firstListItem = listElem.querySelector('.list__item:first-child');

//     let rightSideOfFirstItem = firstListItem.getBoundingClientRect().right;
//     if (rightSideOfFirstItem == leftSideOfContainer) {
//       currentLeftValue = -1;
//       listElem.appendChild(firstListItem);
//     }
//     listElem.style.marginLeft = `${currentLeftValue}px`;
//     currentLeftValue--;
//   }
// });

let loops = gsap.utils.toArray('.list').map((line, i) => {
    const links = line.querySelectorAll(".list li"),
    tl = horizontalLoop(links, {
        repeat: -1, 
        speed: 1 + i * 0.025,
        draggable: true,
        reversed: false,
        paddingRight: parseFloat(gsap.getProperty(links[0], "marginRight", "px"))
        });
  links.forEach(link => {
    link.addEventListener("mouseenter", () => gsap.to(tl, {timeScale: 0, overwrite: true}));
    link.addEventListener("mouseleave", () => gsap.to(tl, {timeScale: 1, overwrite: true}));
  });
});

let currentScroll = 0;
let scrollDirection = 1;

function horizontalLoop(items, config) {
	items = gsap.utils.toArray(items);
	config = config || {};
	let tl = gsap.timeline({repeat: config.repeat, paused: config.paused, defaults: {ease: "none"}, onReverseComplete: () => tl.totalTime(tl.rawTime() + tl.duration() * 100)}),
		length = items.length,
		startX = items[0].offsetLeft,
		times = [],
		widths = [],
		xPercents = [],
		curIndex = 0,
		pixelsPerSecond = (config.speed || 1) * 100,
		snap = config.snap === false ? v => v : gsap.utils.snap(config.snap || 1), // some browsers shift by a pixel to accommodate flex layouts, so for example if width is 20% the first element's width might be 242px, and the next 243px, alternating back and forth. So we snap to 5 percentage points to make things look more natural
		populateWidths = () => items.forEach((el, i) => {
      widths[i] = parseFloat(gsap.getProperty(el, "width", "px"));
      xPercents[i] = snap(parseFloat(gsap.getProperty(el, "x", "px")) / widths[i] * 100 + gsap.getProperty(el, "xPercent"));
    }),
    getTotalWidth = () => items[length-1].offsetLeft + xPercents[length-1] / 100 * widths[length-1] - startX + items[length-1].offsetWidth * gsap.getProperty(items[length-1], "scaleX") + (parseFloat(config.paddingRight) || 0),
      totalWidth, curX, distanceToStart, distanceToLoop, item, i;
	populateWidths();
  gsap.set(items, { // convert "x" to "xPercent" to make things responsive, and populate the widths/xPercents Arrays to make lookups faster.
		xPercent: i => xPercents[i]
	});
	gsap.set(items, {x: 0});
	totalWidth = getTotalWidth();
	for (i = 0; i < length; i++) {
		item = items[i];
		curX = xPercents[i] / 100 * widths[i];
		distanceToStart = item.offsetLeft + curX - startX;
		distanceToLoop = distanceToStart + widths[i] * gsap.getProperty(item, "scaleX");
		tl.to(item, {xPercent: snap((curX - distanceToLoop) / widths[i] * 100), duration: distanceToLoop / pixelsPerSecond}, 0)
		  .fromTo(item, {xPercent: snap((curX - distanceToLoop + totalWidth) / widths[i] * 100)}, {xPercent: xPercents[i], duration: (curX - distanceToLoop + totalWidth - curX) / pixelsPerSecond, immediateRender: false}, distanceToLoop / pixelsPerSecond)
		  .add("label" + i, distanceToStart / pixelsPerSecond);
		times[i] = distanceToStart / pixelsPerSecond;
	}
	function toIndex(index, vars) {
		vars = vars || {};
		(Math.abs(index - curIndex) > length / 2) && (index += index > curIndex ? -length : length); // always go in the shortest direction
		let newIndex = gsap.utils.wrap(0, length, index),
			time = times[newIndex];
		if (time > tl.time() !== index > curIndex) { // if we're wrapping the timeline's playhead, make the proper adjustments
			vars.modifiers = {time: gsap.utils.wrap(0, tl.duration())};
			time += tl.duration() * (index > curIndex ? 1 : -1);
		}
		curIndex = newIndex;
		vars.overwrite = true;
		return tl.tweenTo(time, vars);
	}
	tl.next = vars => toIndex(curIndex+1, vars);
	tl.previous = vars => toIndex(curIndex-1, vars);
	tl.current = () => curIndex;
	tl.toIndex = (index, vars) => toIndex(index, vars);
  tl.updateIndex = () => curIndex = Math.round(tl.progress() * (items.length - 1));
	tl.times = times;
  tl.progress(1, true).progress(0, true); // pre-render for performance
  if (config.reversed) {
    tl.vars.onReverseComplete();
    tl.reverse();
  }
  if (config.draggable && typeof(Draggable) === "function") {
    let proxy = document.createElement("div"),
        wrap = gsap.utils.wrap(0, 1),
        ratio, startProgress, draggable, dragSnap, roundFactor,
        align = () => tl.progress(wrap(startProgress + (draggable.startX - draggable.x) * ratio)),
        syncIndex = () => tl.updateIndex();
    typeof(InertiaPlugin) === "undefined" && console.warn("InertiaPlugin required for momentum-based scrolling and snapping. https://greensock.com/club");
    draggable = Draggable.create(proxy, {
      trigger: items[0].parentNode,
      type: "x",
      onPress() {
        startProgress = tl.progress();
        tl.progress(0);
        populateWidths();
        totalWidth = getTotalWidth();
        ratio = 1 / totalWidth;
        dragSnap = totalWidth / items.length;
        roundFactor = Math.pow(10, ((dragSnap + "").split(".")[1] || "").length);
        tl.progress(startProgress);
      },
      onDrag: align,
      onThrowUpdate: align,
      inertia: true,
      snap: value => {
        let n = Math.round(parseFloat(value) / dragSnap) * dragSnap * roundFactor;
        return (n - n % 1) / roundFactor;
      },
      onRelease: syncIndex,
      onThrowComplete: () => gsap.set(proxy, {x: 0}) && syncIndex()
    })[0];
  }
  
	return tl;
}



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

