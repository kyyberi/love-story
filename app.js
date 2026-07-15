const storyContent = {
  opening: {
    title: "Chào vợ yêu",
    subtitle: "Câu chuyện của chúng ta",
    button: "Mở câu chuyện"
  },
  wedding: {
    datePlaceholder: "[WEDDING DATE]",
    photoPath: "assets/photos/wedding.webp"
  },
  ending: {
    hidden: "Anh vẫn chọn em",
    hiddenEnglish: "I still choose you"
  }
};

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

const els = {
  start: document.querySelector("#startStory"),
  story: document.querySelector("#story"),
  restart: document.querySelector("#restartStory"),
  surpriseStar: document.querySelector("#surpriseStar"),
  surpriseMessage: document.querySelector("#surpriseMessage"),
  sections: Array.from(document.querySelectorAll(".story-section"))
};

let activeIndex = 0;
let isTransitioning = false;

function startStory() {
  if (isTransitioning) return;

  els.story.classList.add("is-started");
  document.body.classList.add("story-active");
  showSection(0);

  requestAnimationFrame(() => {
    els.story.focus({ preventScroll: true });
    window.scrollTo({ top: 0, behavior: "auto" });
  });
}

function restartStory() {
  if (isTransitioning) return;

  els.surpriseMessage.hidden = true;
  els.story.classList.remove("is-started");
  els.story.classList.remove("is-transitioning");
  document.body.classList.remove("story-active");
  activeIndex = 0;
  els.sections.forEach((section) => {
    section.classList.remove("is-active", "is-visible", "is-before");
    section.removeAttribute("aria-hidden");
    section.inert = true;
  });
  isTransitioning = false;
  window.scrollTo({
    top: 0,
    behavior: prefersReducedMotion.matches ? "auto" : "smooth"
  });
}

function revealSurprise() {
  els.surpriseMessage.hidden = false;
  els.surpriseMessage.setAttribute(
    "aria-label",
    `${storyContent.ending.hidden}. ${storyContent.ending.hiddenEnglish}.`
  );
}

function showSection(index) {
  if (isTransitioning) return;

  const nextIndex = Math.max(0, Math.min(index, els.sections.length - 1));
  const previousIndex = activeIndex;
  const isChanging = nextIndex !== previousIndex || !els.sections[nextIndex].classList.contains("is-active");
  activeIndex = nextIndex;

  if (isChanging && !prefersReducedMotion.matches) {
    isTransitioning = true;
    els.story.classList.add("is-transitioning");
    window.setTimeout(() => {
      isTransitioning = false;
      els.story.classList.remove("is-transitioning");
    }, 760);
  }

  els.sections.forEach((section, sectionIndex) => {
    const isActive = sectionIndex === activeIndex;
    section.classList.toggle("is-active", isActive);
    section.classList.toggle("is-visible", isActive);
    section.classList.toggle("is-before", sectionIndex < activeIndex);
    section.setAttribute("aria-hidden", String(!isActive));
    section.inert = !isActive;
    if (isActive) {
      section.scrollTop = 0;
    }
  });

  requestAnimationFrame(() => {
    els.sections[activeIndex].focus({ preventScroll: true });
  });
}

function goNext() {
  if (isTransitioning) return;
  showSection(activeIndex + 1);
}

function setupStepButtons() {
  const labels = [
    "Tiếp tục",
    "Đi tiếp",
    "Đúng lúc",
    "Mỉm cười tiếp",
    "Những khoảnh khắc",
    "Ngày cưới",
    "Một từ nhỏ",
    "Đồng ý",
    "Chương sau"
  ];

  els.sections.forEach((section, index) => {
    section.inert = true;
    section.setAttribute("aria-hidden", "true");
    section.setAttribute("tabindex", "-1");

    if (index >= els.sections.length - 1) return;

    const button = document.createElement("button");
    button.className = "continue-button";
    button.type = "button";
    button.textContent = labels[index] || "Tiếp tục";
    button.setAttribute("aria-label", "Continue to the next part of the story");
    button.addEventListener("click", goNext);
    section.append(button);
  });
}

function handleBrokenImages() {
  document.querySelectorAll("img").forEach((img) => {
    img.addEventListener("error", () => {
      img.remove();
    });
  });
}

els.start.addEventListener("click", startStory);
els.restart.addEventListener("click", restartStory);
els.surpriseStar.addEventListener("click", revealSurprise);

setupStepButtons();
handleBrokenImages();
