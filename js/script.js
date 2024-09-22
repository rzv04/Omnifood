// Load FAQ answers then immediately hide to calculate the height
// Wouldn't work if display dimensions change

// Display current year in the footer
const yearEl = document.querySelector(".year");
const year = new Date().getFullYear();
yearEl.textContent = year;

const btnNavEl = document.querySelector(".btn-mobile-nav");
const headerEl = document.querySelector(".header");

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
    // console.log(ent);
    if (ent.isIntersecting === false) {
      document.body.classList.add("sticky");
    } else {
      document.body.classList.remove("sticky");
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
  //   console.log(isSupported);

  if (!isSupported) document.body.classList.add("no-flexbox-gap");
}
checkFlexGap();

// // Toggle FAQ section answers
// const questionsList = document.querySelector(".questions-list");
// questionsList.addEventListener("click", function (e) {
//   const clickParentTarget = e.target.parentNode;
//   if (clickParentTarget.matches(".faq-button")) {
//     const parentQuestion = clickParentTarget.parentNode.parentNode;
//     const questionParagraph = parentQuestion.querySelector("p");
//     const [chevronUp, chevronDown] = clickParentTarget.children;
//     chevronUp.classList.toggle("hidden");
//     chevronDown.classList.toggle("hidden");
//     questionParagraph.classList.toggle("hidden");
//   }
// });

function handleFAQButtons() {
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

      // Toggle answer with .3s transition
      // targetAnswer.classList.toggle("hidden");
      // targetAnswer.classList.toggle("visible");
    }
  });
}

handleFAQButtons();
