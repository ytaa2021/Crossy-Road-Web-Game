// script.js
document.addEventListener('DOMContentLoaded', function () {
    let slides = document.querySelectorAll('.slide');
    let index = 0;

    function changeSlide() {
      slides.forEach((slide) => {
        slide.classList.remove('active');
      });
      slides[index].classList.add('active');
      index = (index + 1) % slides.length; // Loop back to the first image
    }

    // Change slide every 3 seconds
    setInterval(changeSlide, 3000);
});

