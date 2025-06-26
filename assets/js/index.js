document.addEventListener("DOMContentLoaded", function () {
  const track = document.querySelector(".slider-track");
  const slides = document.querySelectorAll(".slide");

  let currentSlide = 0;
  const slideCount = slides.length;

  function updateSlider() {
    const slideWidth = slides[0].clientWidth;
    track.style.transform = `translateX(-${currentSlide * slideWidth}px)`;
  }

  // Обработчики для всех левых стрелок
  document.querySelectorAll(".left-arrow").forEach((arrow) => {
    arrow.addEventListener("click", function () {
      currentSlide = currentSlide > 0 ? currentSlide - 1 : slideCount - 1;
      updateSlider();
    });
  });

  // Обработчики для всех правых стрелок
  document.querySelectorAll(".right-arrow").forEach((arrow) => {
    arrow.addEventListener("click", function () {
      currentSlide = currentSlide < slideCount - 1 ? currentSlide + 1 : 0;
      updateSlider();
    });
  });

  // Инициализация
  updateSlider();
});

const ids = ["scrollContainer", "scrollContainer2"];
ids.forEach((id) => {
  const scrollContainer = document.getElementById(id);

  let isDown = false;
  let startX;
  let scrollLeft;

  scrollContainer.addEventListener("mousedown", (e) => {
    if (e.target.closest("a.game")) return;

    isDown = true;
    startX = e.pageX - scrollContainer.offsetLeft;
    scrollLeft = scrollContainer.scrollLeft;
    scrollContainer.style.scrollBehavior = "auto";
    scrollContainer.style.cursor = "grabbing";
  });

  scrollContainer.addEventListener("mouseleave", () => {
    isDown = false;
    scrollContainer.style.cursor = "grab";
  });

  scrollContainer.addEventListener("mouseup", () => {
    isDown = false;
    scrollContainer.style.scrollBehavior = "smooth";
    scrollContainer.style.cursor = "grab";
  });

  scrollContainer.addEventListener("mousemove", (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - scrollContainer.offsetLeft;
    const walk = (x - startX) * 2;
    scrollContainer.scrollLeft = scrollLeft - walk;
  });

  scrollContainer.addEventListener("touchstart", (e) => {
    if (e.target.closest("a.game")) return;

    isDown = true;
    startX = e.touches[0].pageX - scrollContainer.offsetLeft;
    scrollLeft = scrollContainer.scrollLeft;
    scrollContainer.style.scrollBehavior = "auto";
  });

  scrollContainer.addEventListener("touchend", () => {
    isDown = false;
    scrollContainer.style.scrollBehavior = "smooth";
  });

  scrollContainer.addEventListener("touchmove", (e) => {
    if (!isDown) return;
    const x = e.touches[0].pageX - scrollContainer.offsetLeft;
    const walk = (x - startX) * 2;
    scrollContainer.scrollLeft = scrollLeft - walk;
  });
});
