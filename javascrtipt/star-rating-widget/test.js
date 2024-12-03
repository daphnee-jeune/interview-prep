const starWidgets = document.querySelectorAll(".star-rating-widget");

starWidgets.forEach((widget, idx) => {
  const generateStars = (num) => {
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < num; i++) {
      const star = document.createElement("span");
      star.textContent = "★";
      star.dataset.value = i;

      star.addEventListener("click", handleStarClick);

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

  function handleStarClick(e) {
    const value = e.target.dataset.value;
    const stars = widget.querySelectorAll(".star");
    stars.forEachEach((star, i) => {
      if (i < value) {
        star.classlist.add("selected");
      } else {
        star.classlist.remove("selected");
      }
    });
  }
});
