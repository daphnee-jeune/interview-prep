document.querySelectorAll(".star-widget").forEach((widget) => {
  const stars = widget.querySelectorAll(".star");
  const hiddenInput = widget.querySelector('input[type="hidden"]');
  const widgetName = widget.getAttribute("data-name");

  stars.forEach((star) => {
    star.addEventListener("click", function () {
      const ratingValue = this.getAttribute("data-value");
      hiddenInput.value = ratingValue;

      // Remove the selected class from all stars and add to the clicked one
      stars.forEach((s) => s.classList.remove("selected"));
      this.classList.add("selected");

      // Highlight all stars up to the selected one
      for (let i = 0; i < stars.length; i++) {
        if (i < stars.length - ratingValue) {
          stars[i].classList.remove("selected");
        } else {
          stars[i].classList.add("selected");
        }
      }
    });
  });
});
