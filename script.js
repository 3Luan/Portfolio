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
