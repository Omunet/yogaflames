(function () {
  var header = document.querySelector(".site-header");
  var toggle = document.querySelector(".nav-toggle");
  var menu = document.getElementById("site-menu");
  if (!header || !toggle || !menu) return;

  var mobileQuery = window.matchMedia("(max-width: 1180px)");

  function placeMenu() {
    var bottom = header.getBoundingClientRect().bottom;
    document.documentElement.style.setProperty("--header-block", Math.max(bottom, 0) + "px");
  }

  function setInert() {
    var mobile = mobileQuery.matches;
    var open = header.classList.contains("is-open");
    menu.inert = mobile && !open;
  }

  function closeMenu() {
    header.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
    document.body.classList.remove("nav-lock");
    setInert();
  }

  toggle.addEventListener("click", function () {
    var open = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", open ? "false" : "true");
    header.classList.toggle("is-open", !open);
    document.body.classList.toggle("nav-lock", !open);
    setInert();
  });

  menu.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
      if (mobileQuery.matches) closeMenu();
    });
  });

  menu.querySelectorAll(".has-sub > button").forEach(function (button) {
    button.addEventListener("click", function () {
      var item = button.parentElement;
      var open = button.getAttribute("aria-expanded") === "true";
      menu.querySelectorAll(".has-sub.is-open").forEach(function (other) {
        if (other !== item) {
          other.classList.remove("is-open");
          var otherButton = other.querySelector("button");
          if (otherButton) otherButton.setAttribute("aria-expanded", "false");
        }
      });
      button.setAttribute("aria-expanded", open ? "false" : "true");
      item.classList.toggle("is-open", !open);
    });
  });

  document.addEventListener("keydown", function (event) {
    if (event.key !== "Escape") return;
    closeMenu();
    menu.querySelectorAll(".has-sub.is-open").forEach(function (item) {
      item.classList.remove("is-open");
      var button = item.querySelector("button");
      if (button) button.setAttribute("aria-expanded", "false");
    });
  });

  mobileQuery.addEventListener("change", function () {
    if (!mobileQuery.matches) closeMenu();
    else setInert();
    placeMenu();
  });

  window.addEventListener("resize", placeMenu);
  window.addEventListener("scroll", placeMenu, { passive: true });
  toggle.addEventListener("click", placeMenu);
  placeMenu();
  setInert();

  document.querySelectorAll("[data-placeholder-form]").forEach(function (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      var note = form.querySelector(".form-note");
      if (!note) return;
      note.hidden = false;
      note.focus();
    });
  });
})();
