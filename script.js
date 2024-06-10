document.addEventListener("DOMContentLoaded", () => {
  const menuItems = document.querySelectorAll(".menu-item");
  menuItems.forEach((item) => {
    let words = item.children[0].innerText.trim().split(/\s+/); // Split by whitespace
    let styledContent = "";
    words.forEach((word) => {
      let styledLetters = "";
      word.split("").forEach((letter, idx) => {
        styledLetters += `<span style="--index: ${idx};">${letter}</span>`;
      });
      styledContent += `${styledLetters}&nbsp;`; // Preserve space between words
    });
    item.children[0].innerHTML = styledContent;
    let cloneDiv = item.children[0].cloneNode(true);
    cloneDiv.style.position = "absolute";
    cloneDiv.style.left = "0";
    cloneDiv.style.top = "0";
    item.appendChild(cloneDiv);
  });

  let Hamburger = document.querySelector(".menu-btn-open");
  window.addEventListener("scroll", (e) => {
    e.preventDefault();
    if (scrollY > 150) {
      Hamburger.classList.add("show");
    } else {
      Hamburger.classList.remove("show");
    }
  });
  let HamburgerBtn = document.querySelector(".btn-hamburger");
  const button = document.querySelector(".button");
  const menu = document.querySelector(".menu-overlay");

  button.addEventListener("click", (e) => {
    button.classList.toggle("-menu-open");
    HamburgerBtn.style.display = "none";
    menu.classList.toggle("showing");
  });

  let tl = gsap.timeline({ paused: true });

  tl.to(".menu-overlay", {
    duration: 1,
    clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)", // Corrected clipPath value
    ease: "power2.out",
  });

  tl.from(
    ".menu-link, .btn",
    {
      opacity: 0,
      y: 60,
      stagger: 0.05,
      duration: 0.35,
      ease: "power1.inout",
    },
    "<"
  );

  tl.to(
    ".video-preview",
    {
      duration: 0.35,
      height: "200px",
      ease: "power2.out",
    },
    "<"
  );

  tl.to(
    ".menu-divider",
    {
      duration: 2,
      width: "100%",
      ease: "power4.out",
    },
    "<"
  );

  function openMenu() {
    document.querySelector(".menu-overlay").style.pointerEvents = "all";
    tl.play();
  }
  openMenu();

  function closeMenu() {
    document.querySelector(".menu-overlay").style.pointerEvents = "none";
    setTimeout(() => {
      HamburgerBtn.style.display = "block";
    }, 2000);

    tl.reverse();
  }
  closeMenu();

  document.querySelector(".menu-btn-open").addEventListener("click", openMenu); // Corrected selector
  document
    .querySelector(".menu-close-open")
    .addEventListener("click", closeMenu); // Corrected selector
  tl.reverse();

  const animProjectImgWrapper = document.querySelector(
    ".anim-project__img-wrapper"
  );
  const animProjectImgs = document.querySelectorAll(".anim-project__img");
  const projects = document.querySelectorAll(".project");
  const projectWrapper = document.querySelector(".project-gallery__wrapper");

  let mm = gsap.matchMedia();

  mm.add("(min-width: 768px)", () => {
    function mouseEnter() {
      gsap.to(animProjectImgWrapper, { scale: 1 });
    }
    function mouseLeave() {
      gsap.to(animProjectImgWrapper, { scale: 0 });
    }

    projectWrapper.addEventListener("mouseenter", mouseEnter);
    projectWrapper.addEventListener("mouseleave", mouseLeave);

    projects.forEach((project) => {
      project.addEventListener("mouseenter", () => {
        let scrollPercent = project.getAttribute("data-scroll");
        let imgHeight =
          document.querySelector(".anim-project__img").clientHeight;
        let gap = 32;
        let scrollY = imgHeight * -1 * scrollPercent - gap * scrollPercent;

        gsap.to(animProjectImgs, {
          y: scrollY,
          ease: "sine.in",
        });
      });
    });

    let mouseXPosition;
    let mouseYPosition;
    let offsetX = animProjectImgWrapper.clientWidth / 2;
    let offsetY = animProjectImgWrapper.clientHeight / 2;
    let delay = 0.3;

    function trackCursor(e) {
      mouseXPosition = e.clientX - offsetX;
      mouseYPosition = e.clientY - offsetY;

      gsap.to(animProjectImgWrapper, {
        top: mouseYPosition,
        left: mouseXPosition,
        ease: "none",
        duration: delay,
      });
    }

    function resetAnimation() {
      gsap.to([animProjectImgs, animProjectImgWrapper], {
        clearProps: "all",
      });
    }
    projectWrapper.addEventListener("mousemove", trackCursor);
    projectWrapper.addEventListener("mouseleave", resetAnimation);

    return () => {
      projectWrapper.removeEventListener("mouseenter", mouseEnter);
      projectWrapper.removeEventListener("mousemove", trackCursor);
    };
  });

  window.addEventListener("resize", gsap.matchMediaRefresh());

  const accordionsWrapper = document.querySelector(".accordion-wrapper");

  const accordionsData = [
    {
      id: 1,
      name: "Accordion 01",
      details:
        "Lorem ipsum, dolor sit amet  adipisicing elit. Natus, aspernatur.",
    },
    {
      id: 2,
      name: "Accordion 02",
      details:
        "Lorem ipsum, dolor sit amet  adipisicing elit. Natus, aspernatur.",
    },
    {
      id: 3,
      name: "Accordion 03",
      details:
        "Lorem ipsum, dolor sit amet  adipisicing elit. Natus, aspernatur.",
    },
    {
      id: 4,
      name: "Accordion 04",
      details:
        "Lorem ipsum, dolor sit amet  adipisicing elit. Natus, aspernatur.",
    },
  ];

  // create accordions
  accordionsData.forEach((accordion) => {
    const tab = document.createElement("div");
    tab.classList.add("tab");

    const tabHeader = document.createElement("div");
    tabHeader.classList.add("tab-header");
    tabHeader.innerHTML = `<span class="anim-text">${accordion.name} </span>`;

    const tabContent = document.createElement("div");
    tabContent.classList.add("tab-content");
    tabContent.textContent = accordion.details;

    const tabIcon = document.createElement("span");
    tabIcon.classList.add("tab-icon");

    const divider = document.createElement("div");
    divider.classList.add("tab-divider");

    const dividerOverlay = document.createElement("div");
    dividerOverlay.classList.add("tab-divider__overlay");

    divider.appendChild(dividerOverlay);
    tabHeader.appendChild(tabIcon);

    tab.appendChild(tabHeader);
    tab.appendChild(tabContent);
    tab.appendChild(divider);

    accordionsWrapper.appendChild(tab);
  });

  const accordionHeaders = document.querySelectorAll(".tab-header");
  const accordionContents = document.querySelectorAll(".tab-content");

  // console.log(accordionContents);

  let currentlyOpenIndex = null;

  accordionHeaders.forEach((accordionHeader, index) => {
    accordionHeader.addEventListener("click", () => {
      if (index === currentlyOpenIndex) {
        // Clicking on the already open accordion, so close it
        closeAccordion(accordionContents[index]);
        currentlyOpenIndex = null;
      } else {
        if (currentlyOpenIndex !== null) {
          closeAccordion(accordionContents[currentlyOpenIndex]);
        }
        openAccordion(accordionContents[index]);
        currentlyOpenIndex = index;
      }
    });
  });

  function openAccordion(accordionContent) {
    const tabIcon = accordionContent.parentElement.querySelector(".tab-icon");
    tabIcon.classList.add("active");
    gsap.to(accordionContent, { height: "auto", duration: 0.25 });
  }

  function closeAccordion(accordionContent) {
    const tabIcon = accordionContent.parentElement.querySelector(".tab-icon");
    tabIcon.classList.remove("active");
    gsap.to(accordionContent, { height: 0, duration: 0.25 });
  }

  function cloneElement() {
    const targetELements = document.querySelectorAll(".anim-text");

    targetELements.forEach((target) => {
      const cloneNode = target.cloneNode(true);
      cloneNode.classList.add("cloned-text");
      target.parentElement.appendChild(cloneNode);
    });
  }
  cloneElement();

  function animText(target) {
    let direction = 1;

    const mainTextTarget = target.querySelector(".anim-text");
    const clonedTextTarget = target.querySelector(".cloned-text");
    const mainText = new SplitType(mainTextTarget, { types: "words" });
    const clonedText = new SplitType(clonedTextTarget, { types: "words" });

    mainText.words.forEach((element) => {
      direction *= -1;
      gsap.to(element, {
        yPercent: 100 * direction,
      });
    });

    direction == 1 ? (direction = -1) : (direction = 1);
    clonedText.words.forEach((element) => {
      direction *= -1;
      gsap.fromTo(
        element,
        {
          yPercent: 100 * direction,
        },
        {
          yPercent: 0,
        }
      );
    });
  }

  const accordionElements = document.querySelectorAll(".tab");

  accordionElements.forEach((tab) => {
    tab.addEventListener("mouseenter", (e) => {
      const skills = document.querySelector(".header_projects-list-link");
      const tabDividerOverlay = e.target.querySelector(".tab-divider__overlay");
      gsap.to(tabDividerOverlay, { width: "100%" });
      gsap.to(skills, { width: "100%" });

      animText(e.target);
    });

    tab.addEventListener("mouseleave", (e) => {
      const tabDividerOverlay = e.target.querySelector(".tab-divider__overlay");
      gsap.to(tabDividerOverlay, { width: 0 });
    });
  });
});

let timeSpan = document.querySelector("#timeSpan");

setInterval(() => {
  timeSpan.innerText = new Date().toLocaleTimeString();
}, 1000);

const video = document.getElementById("videoPlayer");
const videoTime = document.getElementById("videoTime");

video.addEventListener("timeupdate", () => {
  const currentTime = video.currentTime;
  const duration = video.duration;
  const timeLeft = duration - currentTime;

  const minutes = Math.floor(timeLeft / 60);
  const seconds = Math.floor(timeLeft % 60);

  videoTime.textContent = `-${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
});

video.addEventListener("loadedmetadata", () => {
  video.dispatchEvent(new Event("timeupdate"));
});

const servicesObserver = document.querySelector(".intersection-observer");
const backToTopButton = document.querySelector(".back-to-top");

window.addEventListener("scroll", () => {
  if (scrollY > 500) {
    backToTopButton.classList.add("top");
  } else {
    backToTopButton.classList.remove("top");
  }
});

backToTopButton.addEventListener("click", (event) => {
  event.preventDefault();
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});
