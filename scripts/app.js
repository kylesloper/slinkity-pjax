import Swup from "swup";
import SwupA11yPlugin from "@swup/a11y-plugin";
import SwupHeadPlugin from "@swup/head-plugin";
import SwupScrollPlugin from "@swup/scroll-plugin";

const options = {
  animationSelector: '[class*="transition-fade"]',
  containers: ["#main-content"],
  animateHistoryBrowsing: true,
  plugins: [
    new SwupScrollPlugin({
      animateScroll: false,
    }),
  ],
};

const swup = new Swup(options, {
  plugins: [new SwupA11yPlugin(), new SwupHeadPlugin()],
});

let scrollValues = {};

swup.on("clickLink", () => {
  scrollValues[window.location.href] = window.scrollY;
});
swup.on("clickLink", () => {
  document.documentElement.classList.remove("is-leaving");
  document.documentElement.classList.remove("is-animating");
});

swup.on("popState", () => {
  setTimeout(function () {
    window.scrollTo(0, scrollValues[window.location.href]);
  }, 100);
});
