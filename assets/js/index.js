const ids = ["scrollContainer", "scrollContainer2"];
ids.forEach((id) => {
  const scrollContainer = document.getElementById(id);

  let isDown = false;
  let startX;
  let scrollLeft;

  scrollContainer.addEventListener("mousedown", (e) => {
    isDown = true;
    startX = e.pageX - scrollContainer.offsetLeft;
    scrollLeft = scrollContainer.scrollLeft;
    scrollContainer.style.scrollBehavior = "auto"; // отключаем плавный скролл при перетаскивании
  });

  scrollContainer.addEventListener("mouseleave", () => {
    isDown = false;
  });

  scrollContainer.addEventListener("mouseup", () => {
    isDown = false;
    scrollContainer.style.scrollBehavior = "smooth"; // возвращаем плавный скролл
  });

  scrollContainer.addEventListener("mousemove", (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - scrollContainer.offsetLeft;
    const walk = (x - startX) * 2; // множитель 2 для более быстрого скролла
    scrollContainer.scrollLeft = scrollLeft - walk;
  });

  // Добавляем поддержку touch-устройств
  scrollContainer.addEventListener("touchstart", (e) => {
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
