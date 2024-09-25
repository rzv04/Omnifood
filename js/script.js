
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
