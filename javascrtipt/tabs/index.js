document.addEventListener("DOMContentLoaded", () => {
  const tabs = document.querySelectorAll(".tab"); // Select all tab buttons
  const contents = document.querySelectorAll(".tab-content"); // Select all tab contents

  // Function to handle tab switching
  function switchTab(event) {
    const selectedTab = event.currentTarget;
    const selectedContentId = `content-${selectedTab.getAttribute("data-tab")}`;

    // Deactivate all tabs and hide all content
    tabs.forEach((tab) => tab.classList.remove("active"));
    contents.forEach((content) => content.classList.remove("show"));

    // Activate the selected tab and show the corresponding content
    selectedTab.classList.add("active");
    document.getElementById(selectedContentId).classList.add("show");
  }

  // Attach click event listeners to each tab
  tabs.forEach((tab) => tab.addEventListener("click", switchTab));

  // Set the first tab as active by default
  tabs[0].classList.add("active");
  contents[0].classList.add("show");
});
