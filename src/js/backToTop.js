export const backToTop = function() {
    const widgetContainer = document.querySelector(".widget-container");
    const widgetHeight = widgetContainer.clientHeight;
    const backToTopButton = document.querySelector('.back-to-top');
    const activeClass = "active";
    widgetContainer.addEventListener("scroll", function() {
        if (widgetContainer.scrollTop > widgetHeight) {
            backToTopButton.classList.add(activeClass);
            backToTopButton.addEventListener('click', function() {
                console.log('click')    
                widgetContainer.scrollTo(0,0);
                backToTopButton.classList.remove(activeClass);
            });
        } else {
            backToTopButton.classList.remove(activeClass);
        }
    });
}