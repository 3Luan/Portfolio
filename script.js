const hamburger = document.querySelector(".nav__hamburger");
const linksContainer = document.querySelector(".nav__menu");
const links = document.querySelectorAll(".nav__menu__link");

hamburger.addEventListener("click", () => {
  linksContainer.classList.toggle("active");
  hamburger.classList.toggle("active");
});

window.addEventListener("resize", () => {
  if (window.matchMedia("(max-width: 800px)").matches) {
    closeMenu();
  }
});

if (window.matchMedia("(max-witdh: 800px").matches) {
  closeMenu();
}

function closeMenu() {
  links.forEach((link) => {
    link.addEventListener("click", () => {
      linksContainer.classList.remove("active");
      hamburger.classList.remove("active");
    });
  });
}

function progressBar() {
  let progress = document.getElementById("scrollPath");
  let totalHeight = document.body.scrollHeight - window.innerHeight;
  window.onscroll = function () {
    let progressHeight = (window.scrollY / totalHeight) * 100;
    progress.style.width = progressHeight + "%";
  };
}

///////////////////////// slide Project /////////////////////////

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

// Hiển thị slide đầu tiên khi tải trang
showSlide(currentSlide);

///////////////////////// change language /////////////////////////

const languageToggle = document.getElementById("language-toggle");
const langImage = document.querySelectorAll(".language-img");

const text_about = document.querySelectorAll(".text_about");
const text_activities = document.querySelectorAll(".text_activities");
const text_technical_skills = document.querySelectorAll(
  ".text_technical_skills"
);
const text_projects = document.querySelectorAll(".text_projects");
const text_about_content = document.getElementById("text_about_content");
const text_name = document.getElementById("text_name");
let currentLang = localStorage.getItem("lang") || "en";

// Tải dữ liệu ngôn ngữ từ file JSON
async function loadLanguage(lang) {
  const response = await fetch(`lang/${lang}.json`);
  const data = await response.json();
  console.log("currentLang", currentLang);

  // Đổi hình ảnh
  langImage.forEach((element) => {
    element.src =
      currentLang === "en" ? "/assets/vietnam.png" : "/assets/english.png";
  });

  // Cập nhật nội dung trên trang
  text_about.forEach((element) => {
    element.textContent = data.about;
  });

  text_activities.forEach((element) => {
    element.textContent = data.activities;
  });

  text_technical_skills.forEach((element) => {
    element.textContent = data.technical_skills;
  });

  text_projects.forEach((element) => {
    element.textContent = data.projects;
  });

  text_about_content.textContent = data.about_content;
  text_name.textContent = data.name;
  content_activity1.textContent = data.content_activity1;
  content_activity2.textContent = data.content_activity2;
  content_activity3.textContent = data.content_activity3;

  // Lưu ngôn ngữ vào localStorage
  localStorage.setItem("lang", lang);
}

document.addEventListener("DOMContentLoaded", () => {
  // Gọi hàm loadLanguage với ngôn ngữ đã lưu
  loadLanguage(currentLang);
});

// Sự kiện chuyển đổi ngôn ngữ
function toggleLanguage() {
  currentLang = currentLang === "vi" ? "en" : "vi";
  loadLanguage(currentLang);
}

///////////////////////// change theme /////////////////////////
const themeImg = document.querySelectorAll(".theme-img");

let currentTheme = localStorage.getItem("theme") || "light";

// Hàm để chuyển đổi giữa chế độ sáng và tối
function toggleTheme() {
  const body = document.body;

  // Đổi hình ảnh
  themeImg.src =
    currentTheme === "dark" ? "/assets/dark.png" : "/assets/light.png";

  themeImg.forEach((element) => {
    element.src =
      currentTheme === "dark" ? "/assets/dark.png" : "/assets/light.png";
  });

  // Kiểm tra và chuyển đổi giữa các chế độ
  if (body.classList.contains("dark-mode")) {
    body.classList.remove("dark-mode");
    body.classList.add("light-mode");
  } else {
    body.classList.remove("light-mode");
    body.classList.add("dark-mode");
  }

  // Lưu chế độ vào localStorage để nhớ trạng thái khi tải lại trang
  currentTheme = body.classList.contains("dark-mode") ? "dark" : "light";
  localStorage.setItem("theme", currentTheme);
}

document.addEventListener("DOMContentLoaded", () => {
  if (currentTheme === "dark") {
    document.body.classList.add("dark-mode");
  } else {
    document.body.classList.add("light-mode");
  }
});
