function openViewer(img) {
  document.getElementById("viewer").style.display = "flex";
  document.getElementById("viewer-img").src = img.src;
}

function closeViewer() {
  document.getElementById("viewer").style.display = "none";
}

// Scroll animation
window.addEventListener("scroll", () => {
  document.querySelectorAll(".card").forEach(el => {
    if (el.getBoundingClientRect().top < window.innerHeight - 50) {
      el.classList.add("show");
    }
  });
});
