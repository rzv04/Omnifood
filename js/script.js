// Display current year in the footer
const yearEl = document.querySelector(".year");
const year = new Date().getFullYear();
yearEl.textContent = year;

const btnNavEl = document.querySelector(".btn-mobile-nav");
const headerEl = document.querySelector(".header");
const scrollProgressContainer = document.querySelector(
  ".scroll-progress-container"
);
btnNavEl.addEventListener("click", function () {
  headerEl.classList.toggle("nav-open");
});

const allLinks = document.querySelectorAll("a:link");
allLinks.forEach(function (link) {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    const href = link.getAttribute("href");

    // scroll back to top
    if (href === "#") {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
    if (href !== "#" && href.startsWith("#")) {
      const sectionEl = document.querySelector(href);
      sectionEl.scrollIntoView({ behavior: "smooth" });
    }
    if (link.classList.contains("main-nav-link")) {
      headerEl.classList.toggle("nav-open");
    }
  });
});
const sectionHeroEl = document.querySelector(".section-hero");
const obs = new IntersectionObserver(
  function (entries) {
    const ent = entries[0];
    if (ent.isIntersecting === false) {
      document.body.classList.add("sticky");
      // enable height and calculate width
      scrollProgressContainer.style.height = "5px";
      let documentHeight = document.documentElement.scrollHeight;
      let viewportHeight = document.documentElement.clientHeight;
      window.onscroll = function () {
        let percentageScrolled =
          (window.scrollY / (documentHeight - viewportHeight)) * 100;
        scrollProgressContainer.style.width = percentageScrolled + "%";
      };
    } else {
      document.body.classList.remove("sticky");
      // reset height to 0
      scrollProgressContainer.style.height = "0";
    }
  },
  {
    root: null,
    threshold: 0,
    rootMargin: "-80px",
  }
);
obs.observe(sectionHeroEl);

///////////////////////////////////////////////////////////
// Fixing flexbox gap property missing in some Safari versions
function checkFlexGap() {
  var flex = document.createElement("div");
  flex.style.display = "flex";
  flex.style.flexDirection = "column";
  flex.style.rowGap = "1px";

  flex.appendChild(document.createElement("div"));
  flex.appendChild(document.createElement("div"));

  document.body.appendChild(flex);
  var isSupported = flex.scrollHeight === 1;
  flex.parentNode.removeChild(flex);

  if (!isSupported) document.body.classList.add("no-flexbox-gap");
}
checkFlexGap();

function handleFAQButtons() {
  // Toggle FAQ section answers
  const questionsList = document.querySelector(".questions-list");
  questionsList.addEventListener("click", function (e) {
    const target = e.target;
    const answerWrapper = target
      .closest(".question")
      .querySelector(".answer-wrapper");
    if (target.matches(".chevron")) {
      // Rotate chevron
      target.classList.toggle("rotate-up");

      answerWrapper.classList.toggle("open");
    }
  });
}

handleFAQButtons();

// Select main container and its steps children
const stepsContainer = document.querySelector(".steps-container");
const stepContainers = stepsContainer.children;
const howContainer = document.querySelector(".how-container");
const mealContainer = document.querySelector(".meal-subheading-container");
const subHeadingContainer = document.querySelector(
  ".pricing-subheading-container"
);
const testimonialImgs = document.querySelectorAll(".testimonial-img");
// console.log(howContainer);
// Describe observer behavior: play animation once in viewport
// Define the observer callback function
function observerCallback(entries, observer) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const target = entry.target;
      if (target.matches(".step-1") || target.matches(".step-3")) {
        target.style.animation = "scale-in-right ease-in-out 0.8s forwards";
      } else if (target.matches(".step-2")) {
        target.style.animation = "scale-in-left ease-in-out 0.8s forwards";
      } else if (
        target.matches(".how-container") ||
        target.matches(".meal-subheading-container") ||
        target.matches(".pricing-subheading-container")
      ) {
        target.style.animation = "slideDown 1s ease 0s forwards";
      } else if (target.matches(".testimonial-img")) {
        target.style.animation = "slideDown 1s ease 0s forwards";
      }

      observer.unobserve(target);
    }
  });
}

// Create a single observer object
const observer = new IntersectionObserver(observerCallback, {
  root: null,
  rootMargin: "200px",
  threshold: 0,
});

// Observe step containers
for (let stepContainer of stepContainers) {
  observer.observe(stepContainer);
}

// Observe how container
observer.observe(howContainer);
observer.observe(subHeadingContainer);
observer.observe(mealContainer);
for (let testimonialImg of testimonialImgs) observer.observe(testimonialImg);
