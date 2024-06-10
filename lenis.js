document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);
  const lenis = new Lenis();

  lenis.on("scroll", ScrollTrigger.update);

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });

  gsap.ticker.lagSmoothing(0);

  const services = gsap.utils.toArray(".service");

  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.1,
  };

  const observeCallBack = (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const service = entry.target;
        const imageContainer = service.querySelector(".img");

        ScrollTrigger.create({
          trigger: service,
          start: "bottom bottom",
          end: "top top",
          scrub: true,
          onUpdate: (self) => {
            let progress = self.progress;
            let newWidth = progress * 100;
            gsap.set(imageContainer, {
              width: newWidth + "%",
            });
          },
        });

        ScrollTrigger.create({
          trigger: service,
          start: "top bottom",
          end: "top top",
          scrub: true,
          onUpdate: (self) => {
            let progress = self.progress;
            let newHeight = 300 + 30 * progress;
            gsap.set(service, {
              height: newHeight + "px",
            });
          },
        });

        observer.unobserve(service);
      }
    });
  };

  const observer = new IntersectionObserver(observeCallBack, observerOptions);

  services.forEach((service) => {
    observer.observe(service);
  });
});
