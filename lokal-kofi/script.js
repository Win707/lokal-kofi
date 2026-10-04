const filterButtons = document.querySelectorAll(".filter-button");
const menuGroups = document.querySelectorAll("[data-menu-category]");
const menuGrid = document.querySelector(".menu-grid");
const menuNote = document.querySelector(".menu-note");
const sizeButtons = document.querySelectorAll("[data-size]");
const navToggle = document.querySelector(".nav-toggle");
const mainNav = document.querySelector(".main-nav");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const selectedFilter = button.dataset.filter;

    filterButtons.forEach((filterButton) => {
      const isSelected = filterButton === button;
      filterButton.classList.toggle("is-active", isSelected);
      filterButton.setAttribute("aria-pressed", String(isSelected));
    });

    menuGroups.forEach((group) => {
      group.hidden = selectedFilter !== "all" && group.dataset.menuCategory !== selectedFilter;
    });
    menuGrid.classList.toggle("is-filtered", selectedFilter !== "all");
    menuNote.hidden = selectedFilter === "hot" || selectedFilter === "iced";
  });
});

sizeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const selectedSize = button.dataset.size;

    sizeButtons.forEach((sizeButton) => {
      sizeButton.setAttribute("aria-pressed", String(sizeButton === button));
    });

    document.querySelectorAll(".menu-item[data-price-12]").forEach((item) => {
      const price = item.dataset[`price-${selectedSize}`];
      item.querySelector(".menu-price").textContent = `₱${price}`;
    });
  });
});

navToggle.addEventListener("click", () => {
  const isOpen = navToggle.getAttribute("aria-expanded") === "true";
  navToggle.setAttribute("aria-expanded", String(!isOpen));
  navToggle.setAttribute("aria-label", isOpen ? "Open navigation" : "Close navigation");
  mainNav.classList.toggle("is-open", !isOpen);
});

mainNav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    mainNav.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
    navToggle.setAttribute("aria-label", "Open navigation");
  });
});
