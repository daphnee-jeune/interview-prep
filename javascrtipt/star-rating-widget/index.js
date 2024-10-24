const starRating = document.querySelectorAll(".star-rating-widget"); // access star container el

starRating.forEach((widget, idx) => {
  // for each star container el
  const generateStars = (num) => {
    // generate the stars
    const fragment = document.createDocumentFragment(); // holds the stars before appending them to the DOM
    for (let i = 0; i < num; i++) {
      // for each widget container
      const span = document.createElement("span"); // create the individual star
      span.textContent = "★";
      span.classList.add("star");
      span.dataset.value = i;

      span.addEventListener("click", handleStarClick);
      span.addEventListener("mouseenter", handleHover);
      span.addEventListener("mouseout", handleMouseOut);

      fragment.append(span);
    }
    // After all stars have been created, the fragment is returned, ready to be appended to the widget
    return fragment;
  };

  const stars = generateStars(5);
  const input = document.createElement("input"); // store the user's rating for that specific widget
  input.type = "hidden";
  input.name = `user_rating_${idx}`;
  widget.append(stars);
  widget.append(input);

  function handleStarClick(e) {
    const value = Number(e.target.dataset.value);
    const stars = widget.querySelectorAll(".star");
    input.value = value + 1;
    stars.forEach((star, i) => {
      if (i <= value) {
        star.classList.add("selected");
      } else {
        star.classList.remove("selected");
      }
    });
  }

  function handleHover(e) {
    const value = Number(e.target.dataset.value);
    const stars = widget.querySelectorAll(".star");
    stars.forEach((star, i) => {
      if (i <= value) {
        star.classList.add("hover");
      } else {
        star.classList.remove("hover");
      }
    });
  }

  function handleMouseOut() {
    const stars = widget.querySelectorAll(".star");
    stars.forEach((star) => star.classList.remove("hover"));
  }
});
