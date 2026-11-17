(function () {
  "use strict";

  // Opening hours, by day of week (0 = Sunday). Minutes since midnight.
  var HOURS = {
    0: null,
    1: [480, 1020], 2: [480, 1020], 3: [480, 1020], 4: [480, 1020], 5: [480, 1020],
    6: [480, 780]
  };
  var DAY_NAMES = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  // Current time at the clinic (South Africa, UTC+2, no daylight saving),
  // regardless of the visitor's own time zone.
  function clinicNow() {
    var now = new Date();
    var sa = new Date(now.getTime() + now.getTimezoneOffset() * 60000 + 2 * 3600000);
    return { day: sa.getDay(), minutes: sa.getHours() * 60 + sa.getMinutes() };
  }

  function fmt(mins) {
    var h = Math.floor(mins / 60), m = mins % 60;
    return (h < 10 ? "0" : "") + h + ":" + (m < 10 ? "0" : "") + m;
  }

  function nextOpening(day, minutes) {
    for (var i = 0; i < 8; i++) {
      var d = (day + i) % 7;
      var h = HOURS[d];
      if (h && (i > 0 || minutes < h[0])) {
        var when = i === 0 ? "today" : i === 1 ? "tomorrow" : DAY_NAMES[d];
        return "Opens " + when + " at " + fmt(h[0]);
      }
    }
    return "";
  }

  var t = clinicNow();
  var today = HOURS[t.day];

  // Status in the utility bar
  var status = document.querySelector("[data-status]");
  var statusText = document.querySelector("[data-status-text]");
  if (status && statusText) {
    if (today && t.minutes >= today[0] && t.minutes < today[1]) {
      status.classList.add("is-open");
      statusText.textContent = "Open now · until " + fmt(today[1]) + " today";
    } else {
      status.classList.add("is-closed");
      statusText.textContent = "Closed now · " + nextOpening(t.day, t.minutes);
    }
  }

  // Highlight today in the hours table
  var row = document.querySelector('[data-hours] tr[data-day="' + t.day + '"]');
  if (row) row.classList.add("is-today");

  // Year in footer
  var year = document.querySelector("[data-year]");
  if (year) year.textContent = new Date().getFullYear();

  // Mobile navigation
  var toggle = document.querySelector("[data-nav-toggle]");
  var list = document.querySelector("[data-nav-list]");
  if (toggle && list) {
    toggle.addEventListener("click", function () {
      var open = list.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    list.addEventListener("click", function (e) {
      if (e.target.closest("a")) {
        list.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  // Header shadow once the page scrolls
  var header = document.querySelector("[data-header]");
  if (header) {
    var onScroll = function () { header.classList.toggle("is-scrolled", window.scrollY > 8); };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }
})();
