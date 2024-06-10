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

  window.addEventListener("mouseleave", () => removeAnimation(btn, btnText));
});
