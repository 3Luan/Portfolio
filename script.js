function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  menu.classList.toggle("open");
  icon.classList.toggle("open");
}

function progressBar() {
  let progress = document.getElementById("scrollPath");
  let totalHeight = document.body.scrollHeight - window.innerHeight;
  window.onscroll = function () {
    let progressHeight = (window.scrollY / totalHeight) * 100;
    progress.style.width = progressHeight + "%";
  };
}

let currentSlide = 0;
let isDragging = false;
let startX = 0;
let currentTranslate = 0;
let prevTranslate = 0;

const slides = document.querySelectorAll(".project-slide");
const sliderContainer = document.querySelector(".slider-container");

// Lấy tất cả các slide và các nút điều khiển
const prevButton = document.querySelector(".prev-btn");
const nextButton = document.querySelector(".next-btn");

// Hàm hiển thị slide
function showSlide(index) {
  const totalSlides = slides.length;

  // Reset index nếu vượt quá số lượng slide
  if (index >= totalSlides) {
    currentSlide = 0;
  } else if (index < 0) {
    currentSlide = totalSlides - 1;
  } else {
    currentSlide = index;
  }

  // Cập nhật vị trí các slide
  const offset = -currentSlide * 100; // Mỗi slide chiếm 100% chiều ngang
  slides.forEach((slide) => {
    slide.style.transform = `translateX(${offset}%)`;
  });
}

// Gắn sự kiện click cho các nút
prevButton.addEventListener("click", () => {
  showSlide(currentSlide - 1);
});

nextButton.addEventListener("click", () => {
  showSlide(currentSlide + 1);
});

// Hiển thị slide đầu tiên khi tải trang
showSlide(currentSlide);

// Bắt đầu lướt
sliderContainer.addEventListener("mousedown", (e) => {
  isDragging = true;
  startX = e.clientX;
  sliderContainer.classList.add("dragging");
});

sliderContainer.addEventListener("mouseup", (e) => {
  isDragging = false;
  const moveDistance = e.clientX - startX;
  if (moveDistance > 50) {
    prevSlide();
  } else if (moveDistance < -50) {
    nextSlide();
  }
  sliderContainer.classList.remove("dragging");
});

sliderContainer.addEventListener("mousemove", (e) => {
  if (!isDragging) return;
  const moveDistance = e.clientX - startX;
  currentTranslate = prevTranslate + moveDistance;
  slides.forEach((slide) => {
    slide.style.transform = `translateX(${currentTranslate}px)`;
  });
});

// Kích hoạt vuốt trên thiết bị di động
sliderContainer.addEventListener("touchstart", (e) => {
  isDragging = true;
  startX = e.touches[0].clientX;
});

sliderContainer.addEventListener("touchend", (e) => {
  isDragging = false;
  const moveDistance = e.changedTouches[0].clientX - startX;
  if (moveDistance > 50) {
    prevSlide();
  } else if (moveDistance < -50) {
    nextSlide();
  }
});

sliderContainer.addEventListener("touchmove", (e) => {
  if (!isDragging) return;
  const moveDistance = e.touches[0].clientX - startX;
  currentTranslate = prevTranslate + moveDistance;
  slides.forEach((slide) => {
    slide.style.transform = `translateX(${currentTranslate}px)`;
  });
});

// Hiển thị slide đầu tiên khi tải trang
showSlide(currentSlide);
