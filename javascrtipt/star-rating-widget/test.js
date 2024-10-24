const starRatingWidgets = document.querySelectorAll("star-rating-widget");

starRatingWidgets.forEach((widget, idx) => {
  const generateStars = (starNum) => {
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < starNum; i++) {
      const star = document.createElement("span");
      star.textContent = "★";
      star.classList.add("star");
      star.dataset.value = i;

      star.addEventListener("click", handleStarClick);
      star.addEventListener("mouseenter", handleStarHover);
      star.addEventListener("mouseout", handleMouseout);

      fragment.append(star);
    }
    return fragment;
  };
  const stars = generateStars(5);
  const input = document.createElement("input");
  input.type = "hidden";
  input.name = `user_rating_${idx}`;
  widget.append(stars);
  widget.append(input);

  handleStarClick = (e) => {
    const value = Number(e.target.dataset.value);
    const stars = widget.querySelectorAll(".star");
    input.value = value + 1;
    stars.forEach((star, i) => {
      if (value <= i) {
        star.classList.add("selected");
      } else {
        star.classList.remove("selected");
      }
    });
  };
  handleStarHover = (e) => {
    const value = Number(e.target.dataset.value);
    const stars = widget.querySelectorAll(".star");
    stars.forEach((star, i) => {
      if (value <= i) {
        star.classList.add("hover");
      } else {
        star.classList.remove("hover");
      }
    });
  };
  handleMouseout = () => {
    const stars = widget.querySelectorAll(".star");
    stars.forEach((star) => star.classList.remove("hover"));
  };
});
