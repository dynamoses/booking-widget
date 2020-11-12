export const stickyOnScroll = function() {
    const widgetContainer = document.querySelector(".widget-container");
    const relativeKeysContainerEl = document.querySelector(".sticky-scroll");
    const fixedKeys = document.querySelector(".keys-fixed");
    widgetContainer.addEventListener("scroll", function() {
        if (widgetContainer.scrollTop > relativeKeysContainerEl.offsetTop) {
            fixedKeys.classList.add("active");
        } else {
            fixedKeys.classList.remove("active");
        }
    });
}