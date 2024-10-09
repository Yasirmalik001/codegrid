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

document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);

  function animateChars(chars, reverse = false) {
    const staggerOptions = {
      each: 0.35,
      from: reverse ? "start" : "end",
      ease: "linear",
    };

    gsap.fromTo(
      chars,
      { fontWeight: 100 },
      {
        fontWeight: 900,
        duration: 1,
        ease: "none",
        stagger: staggerOptions,
        scrollTrigger: {
          trigger: chars[0].closest(".marquee-container"),
          start: "50% bottom",
          end: "top top",
          scrub: true,
        },
      }
    );
  }

  const splitText = new SplitType(".item h1", { types: "chars" });

  const marqueeContainers = document.querySelectorAll(".marquee-container");

  marqueeContainers.forEach((container, index) => {
    let start = "0%";
    let end = "-15%";

    if (index % 2 === 0) {
      start = "0%";
      end = "10%";
    }

    const marquee = container.querySelector(".marquee");
    const words = marquee.querySelectorAll(".item h1");

    gsap.fromTo(
      marquee,
      {
        x: start,
      },
      {
        x: end,
        scrollTrigger: {
          trigger: container,
          start: "top bottom",
          end: "150% top",
          scrub: true,
        },
      }
    );

    words.forEach((word) => {
      const chars = Array.from(word.querySelectorAll(".char"));
      if (chars.length) {
        const reverse = index % 2 !== 0;
        animateChars(chars, reverse);
      }
    });
  });

  const lenis = new Lenis();
  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);
});
