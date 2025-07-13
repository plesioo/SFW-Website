const viewer = document.getElementById("image-viewer");
const trigger = document.getElementById("image-viewer-trigger");
const overlay = document.getElementById("image-viewer-overlay");
const closeBtn = document.getElementById("image-viewer-close");
const img = document.getElementById("image-viewer-img");
const minDesktopWidth = 1024;

let scale = 1;
let origin = { x: 0, y: 0 };
let isZoomed = false;
let isDragging = false;
let last = { x: 0, y: 0 };
let pan = { x: 0, y: 0 };

function openViewer() {
  viewer.style.display = "flex";

  scale = 1;
  pan = { x: 0, y: 0 };

  img.style.transform = "";
  img.style.cursor = "zoom-in";
  isZoomed = false;

  img.setAttribute("tabindex", "0");
  img.focus();
}

function closeViewer() {
  viewer.style.display = "none";
  document.body.style.overflow = "";
  trigger.focus();
}

function onImgClick(e) {
  if (!isZoomed && !isMobileView()) {
    const rect = img.getBoundingClientRect();

    scale = 2.2;

    origin.x = ((e.clientX - rect.left) / rect.width) * 100;
    origin.y = ((e.clientY - rect.top) / rect.height) * 100;

    pan = { x: 0, y: 0 };

    updateTransform();

    img.style.cursor = "zoom-out";
    isZoomed = true;
  } else {
    scale = 1;
    pan = { x: 0, y: 0 };

    img.style.transform = "";
    img.style.cursor = "zoom-in";
    isZoomed = false;
  }
}

function isMobileView() {
  return window.innerWidth < minDesktopWidth;
}

function updateTransform() {
  img.style.transformOrigin = `${origin.x}% ${origin.y}%`;
  img.style.transform = `scale(${scale}) translate(${pan.x}px, ${pan.y}px)`;
}

function onImgMouseLeave() {
  if (!isZoomed) return;
  isDragging = false;
  img.style.cursor = "grab";
  console.log("Mouse leave");
}

function onOverlayClick(e) {
  if (e.target === overlay) {
    closeViewer();
  }
}

function onKeyDown(e) {
  if (e.key === "Escape") {
    closeViewer();
  }
}

trigger.addEventListener("click", openViewer);
trigger.addEventListener("keydown", function (e) {
  if (e.key === "Enter" || e.key === " ") openViewer();
});

closeBtn.addEventListener("click", closeViewer);
overlay.addEventListener("click", onOverlayClick);

img.addEventListener("click", onImgClick);
img.addEventListener("mouseleave", onImgMouseLeave);

viewer.addEventListener("keydown", onKeyDown);
