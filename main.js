// Select all magnetic button elements
const magneticBtns = document.querySelectorAll(".magnetic-btn");

// Function to handle active animation
const activeAnimation = (e, btn, btnText) => {
  let boundBox = btn.getBoundingClientRect();
  const magneticBtnStrength = 20;
  const magneticBtnTextStrength = 30;
  const newX = ((e.clientX - boundBox.left) / btn.offsetWidth).toFixed(2) - 0.5;
  const newY = ((e.clientY - boundBox.top) / btn.offsetHeight).toFixed(2) - 0.5;

  gsap.to(btn, {
    x: newX * magneticBtnStrength,
    y: newY * magneticBtnStrength,
    duration: 1,
    ease: "Power4.easeOut",
  });

  gsap.to(btnText, {
    x: newX * magneticBtnTextStrength,
    y: newY * magneticBtnTextStrength,
    duration: 1,
    ease: "Power4.easeOut",
  });
};

// Function to remove animation
const removeAnimation = (btn, btnText) => {
  gsap.to([btn, btnText], {
    x: 0,
    y: 0,
    duration: 0.5,
    ease: "elastic.out",
  });
};

// Debounce function
const debounce = (func, wait) => {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
};

// Add event listeners to each magnetic button element
magneticBtns.forEach((btn) => {
  const btnText = btn.querySelector(".magnetic-btn-animation");
  let timeoutId;

  const debouncedMouseMove = debounce((e) => {
    activeAnimation(e, btn, btnText);
    clearTimeout(timeoutId);
  }, 10);

  btn.addEventListener("mousemove", debouncedMouseMove);

  btn.addEventListener("mouseleave", () => {
    timeoutId = setTimeout(() => removeAnimation(btn, btnText), 500);
  });

  btn.addEventListener("mouseleave", () => removeAnimation(btn, btnText));
});

document.addEventListener("DOMContentLoaded", function () {
  const titles = [
    [
      ["S", "A", "A", "L", "A", ".", "N", "L", "", ""],
      ["T", "H", "E", "M", "E", "", "", "", "", ""],
    ],
    [
      ["F", "E", "M", "I", "K", "O", ".", "D", "K", ""],
      ["T", "H", "E", "M", "E", "", "", "", "", ""],
    ],
    [
      ["C", "A", "R", "S", "O", "U", "N", "D", "", ""],
      ["T", "H", "E", "M", "E", "", "", "", "", ""],
    ],
    [
      ["A", "T", "L", "E", "T", "", "", "", "", ""],
      ["P", "O", "S", "I", "N", "G", "", "", "", ""],
    ],
    [
      ["S", "A", "A", "L", "A", ".", "N", "L", "", ""],
      ["T", "H", "E", "M", "E", "", "", "", "", ""],
    ],
    [
      ["F", "E", "M", "I", "K", "O", ".", "D", "K", ""],
      ["T", "H", "E", "M", "E", "", "", "", "", ""],
    ],
    [
      ["C", "A", "R", "S", "O", "U", "N", "D", "", ""],
      ["T", "H", "E", "M", "E", "", "", "", "", ""],
    ],
    [
      ["A", "T", "L", "E", "T", "", "", "", "", ""],
      ["P", "O", "S", "I", "N", "G", "", "", "", ""],
    ],
    [
      ["S", "A", "A", "L", "A", ".", "N", "L", "", ""],
      ["T", "H", "E", "M", "E", "", "", "", "", ""],
    ],
    [
      ["F", "E", "M", "I", "K", "O", ".", "D", "K", ""],
      ["T", "H", "E", "M", "E", "", "", "", "", ""],
    ],
    [
      ["A", "T", "L", "E", "T", "", "", "", "", ""],
      ["P", "O", "S", "I", "N", "G", "", "", "", ""],
    ],
    [
      ["C", "A", "R", "S", "O", "U", "N", "D", "", ""],
      ["T", "H", "E", "M", "E", "", "", "", "", ""],
    ],
  ];

  gsap.registerPlugin(CustomEase);
  CustomEase.create(
    "hop",
    "M0,0 C0.071,0.505 0.192,0.726 0.318,0.852 0.45,0.984 0.504,1 1,1"
  );

  const sliderNav = document.querySelector(".Awwards-theme-showing-slider-nav");
  const sliderContainer = document.querySelector(
    ".Awwards-theme-showing-slides"
  );
  const bgOverlay = document.querySelector(".Awwards-theme-showing-bg-overlay");
  const slideTitle = document.querySelector(
    ".Awwards-theme-showing-slide-title"
  );
  const numberOfItems = titles.length; // Match the length of the titles array
  let currentIndex = 0;

  function getRandom() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  function updateTitle(newIndex, color) {
    if (!slideTitle) {
      console.error('Element ".Awwards-theme-showing-slider-title" not found.');
      return;
    }

    if (newIndex < 0 || newIndex >= titles.length) {
      console.error(
        `Invalid index: ${newIndex}. Must be between 0 and ${
          titles.length - 1
        }.`
      );
      return;
    }

    const title = titles[newIndex];
    const titleRows = slideTitle.querySelectorAll(
      ".Awwards-theme-showing-slider-title-row"
    );

    titleRows.forEach((row, rowIndex) => {
      row.querySelectorAll(".letter").forEach((letter, letterIndex) => {
        const existingSpan = letter.querySelector("span");
        if (existingSpan) {
          letter.removeChild(existingSpan);
        }

        const newSpan = document.createElement("span");
        const direction = newIndex > currentIndex ? 150 : -150;
        gsap.set(newSpan, {
          x: direction,
          color: color,
        });

        newSpan.textContent =
          (title[rowIndex] && title[rowIndex][letterIndex]) || "";
        letter.appendChild(newSpan);
        gsap.to(newSpan, {
          x: 0,
          duration: 1,
          ease: "hop",
          delay: 0.125,
        });
      });
    });
  }

  function goToSlide(index) {
    if (index === currentIndex) {
      return;
    }

    document
      .querySelectorAll(".Awwards-theme-showing-nav-item-wrapper")
      .forEach((nav) => {
        nav.classList.remove("active");
      });
    document
      .querySelectorAll(".Awwards-theme-showing-nav-item-wrapper")
      [index].classList.add("active");

    const translateX = -index * 100;
    gsap.to(sliderContainer, {
      x: `${translateX}vw`,
      duration: 1.5,
      ease: "hop",
    });

    const newColor = getRandom();
    gsap.to(bgOverlay, {
      backgroundColor: newColor,
      duration: 1.5,
      ease: "hop",
    });

    updateTitle(index, newColor);
    currentIndex = index;
  }

  for (let i = 0; i < numberOfItems; i++) {
    const navItemWrapper = document.createElement("div");
    navItemWrapper.classList.add("Awwards-theme-showing-nav-item-wrapper");
    if (i === 0) {
      navItemWrapper.classList.add("active");
    }
    const navItem = document.createElement("div");
    navItem.classList.add("Awwards-theme-showing-nav-item");

    navItemWrapper.appendChild(navItem);
    sliderNav.appendChild(navItemWrapper);

    navItemWrapper.addEventListener("click", () => {
      goToSlide(i);
      resetAutoSlide(); // Reset the auto-slide timer on manual navigation
    });

    const slide = document.createElement("div");
    slide.classList.add("Awwards-theme-showing-slide");
    if (i === 0) {
      slide.classList.add("active");
    }

    const imgWrapper = document.createElement("div");
    imgWrapper.classList.add("Awwards-theme-showing-img-wrapper");
    const img = document.createElement("img");
    img.src = `./assets/img-${i + 1}.webp`;
    img.alt = "";

    imgWrapper.appendChild(img);
    slide.appendChild(imgWrapper);
    sliderContainer.appendChild(slide);
  }

  updateTitle(0, getComputedStyle(bgOverlay).backgroundColor);

  let autoSlideInterval;

  function startAutoSlide() {
    autoSlideInterval = setInterval(() => {
      let nextIndex = currentIndex + 1;
      if (nextIndex >= numberOfItems) {
        nextIndex = 0;
      }
      goToSlide(nextIndex);
    }, 5000); // Change slide every 3 seconds
  }

  function resetAutoSlide() {
    clearInterval(autoSlideInterval);
    startAutoSlide();
  }

  startAutoSlide();
});
