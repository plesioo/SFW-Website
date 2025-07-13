const hamburgerMenuBtn = document.getElementById("hamburger-menu-btn");
const hamburgerMenu = document.getElementById("hamburger-menu");
const input = hamburgerMenuBtn.querySelector("input");

const desktopWidth = 807;

hamburgerMenuBtn.addEventListener("click", () => {
  if (hamburgerMenu.style.display === "none") {
    openBurgerMenu();
  }
});

hamburgerMenu.querySelectorAll(".hamburger__links a").forEach((link) => {
  link.addEventListener("click", () => {
    if (window.innerWidth < desktopWidth && input.checked) {
      closeBurgerMenu();
    }
  });
});

window.addEventListener("resize", () => {
  if (window.innerWidth > desktopWidth) {
    openDesktopMenu();
  }
});

function openBurgerMenu() {
  hamburgerMenu.style.display = "block";
  input.checked = true;
}

function closeBurgerMenu() {
  hamburgerMenu.style.display = "none";
  input.checked = false;
}

function openDesktopMenu() {
  hamburgerMenu.style.display = "block";
  input.checked = false;
}
