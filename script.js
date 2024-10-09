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
});
