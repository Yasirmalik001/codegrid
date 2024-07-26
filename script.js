document.addEventListener("DOMContentLoaded", () => {
  let e = document.querySelectorAll(".menu-item");
  e.forEach((e) => {
    let t = e.children[0].innerText.trim().split(/\s+/),
      n = "";
    t.forEach((e) => {
      let t = "";
      e.split("").forEach((e, n) => {
        t += `<span style="--index: ${n};">${e}</span>`;
      }),
        (n += `${t}&nbsp;`);
    }),
      (e.children[0].innerHTML = n);
    let r = e.children[0].cloneNode(!0);
    (r.style.position = "absolute"),
      (r.style.left = "0"),
      (r.style.top = "0"),
      e.appendChild(r);
  });
  let t = document.querySelector(".menu-btn-open");
  window.addEventListener("scroll", (e) => {
    e.preventDefault(),
      scrollY > 150 ? t.classList.add("show") : t.classList.remove("show");
  });
  let n = document.querySelector(".btn-hamburger"),
    r = document.querySelector(".button"),
    l = document.querySelector(".menu-overlay");
  r.addEventListener("click", (e) => {
    r.classList.toggle("-menu-open"),
      (n.style.display = "none"),
      l.classList.toggle("showing");
  });
  let o = gsap.timeline({ paused: !0 });
  function i() {
    (document.querySelector(".menu-overlay").style.pointerEvents = "all"),
      o.play();
  }
  function a() {
    (document.querySelector(".menu-overlay").style.pointerEvents = "none"),
      setTimeout(() => {
        n.style.display = "block";
      }, 2e3),
      o.reverse();
  }
  o.to(".menu-overlay", {
    duration: 1,
    clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
    ease: "power2.out",
  }),
    o.from(
      ".menu-link, .btn",
      {
        opacity: 0,
        y: 60,
        stagger: 0.05,
        duration: 0.35,
        ease: "power1.inout",
      },
      "<"
    ),
    o.to(
      ".video-preview",
      { duration: 0.35, height: "200px", ease: "power2.out" },
      "<"
    ),
    o.to(
      ".menu-divider",
      { duration: 2, width: "100%", ease: "power4.out" },
      "<"
    ),
    i(),
    a(),
    document.querySelector(".menu-btn-open").addEventListener("click", i),
    document.querySelector(".menu-close-open").addEventListener("click", a),
    o.reverse();
  let d = document.querySelector(".anim-project__img-wrapper"),
    s = document.querySelectorAll(".anim-project__img"),
    c = document.querySelectorAll(".project"),
    u = document.querySelector(".project-gallery__wrapper");
  gsap.matchMedia().add("(min-width: 768px)", () => {
    function e() {
      gsap.to(d, { scale: 1 });
    }
    function t() {
      gsap.to(d, { scale: 0 });
    }
    u.addEventListener("mouseenter", e),
      u.addEventListener("mouseleave", t),
      c.forEach((e) => {
        e.addEventListener("mouseenter", () => {
          let t = e.getAttribute("data-scroll"),
            n,
            r =
              -1 *
                document.querySelector(".anim-project__img").clientHeight *
                t -
              32 * t;
          gsap.to(s, { y: r, ease: "sine.in" });
        });
      });
    let n,
      r,
      l = d.clientWidth / 2,
      o = d.clientHeight / 2,
      i = 0.3;
    function a(e) {
      (n = e.clientX - l),
        (r = e.clientY - o),
        gsap.to(d, { top: r, left: n, ease: "none", duration: i });
    }
    function p() {
      gsap.to([s, d], { clearProps: "all" });
    }
    return (
      u.addEventListener("mousemove", a),
      u.addEventListener("mouseleave", p),
      () => {
        u.removeEventListener("mouseenter", e),
          u.removeEventListener("mousemove", a);
      }
    );
  }),
    window.addEventListener("resize", gsap.matchMediaRefresh());

  let g = document.querySelector("#timeSpan");
  setInterval(() => {
    g.innerText = new Date().toLocaleTimeString();
  }, 1e3);
  let q = document.getElementById("videoPlayer"),
    b = document.getElementById("videoTime");
  q.addEventListener("timeupdate", () => {
    let e = q.currentTime,
      t = q.duration,
      n = t - e,
      r = Math.floor(n / 60),
      l = Math.floor(n % 60);
    b.textContent = `-${r}:${l < 10 ? "0" : ""}${l}`;
  }),
    q.addEventListener("loadedmetadata", () => {
      q.dispatchEvent(new Event("timeupdate"));
    });
  let w = document.querySelector(".back-to-top");
  window.addEventListener("scroll", () => {
    scrollY > 500 ? w.classList.add("top") : w.classList.remove("top");
  }),
    w.addEventListener("click", (e) => {
      e.preventDefault(), window.scrollTo({ top: 0, behavior: "smooth" });
    });

  const swiper = new Swiper(".swiper", {
    loop: !0,
    slidesPerView: 3,
    spaceBetween: 5,
    grabCursor: !0,
    freeMode: !0,
    speed: 1e4,
    autoplay: { delay: 0, disableOnInteraction: !1 },
    breakpoints: {
      350: { slidesPerView: 1, spaceBetween: 20 },
      480: { slidesPerView: 1, spaceBetween: 20 },
      1040: { slidesPerView: 2, spaceBetween: 20 },
      1240: { slidesPerView: 3, spaceBetween: 20 },
    },
  });

  const swiperLtr = new Swiper(".swiper-ltr", {
    loop: !0,
    slidesPerView: 3,
    spaceBetween: 5,
    grabCursor: !0,
    freeMode: !0,
    speed: 1e4,
    autoplay: { delay: 0, disableOnInteraction: !1, reverseDirection: !0 },
    breakpoints: {
      350: { slidesPerView: 1, spaceBetween: 20 },
      480: { slidesPerView: 1, spaceBetween: 20 },
      1040: { slidesPerView: 2, spaceBetween: 20 },
      1240: { slidesPerView: 3, spaceBetween: 20 },
    },
  });
});
