function showContent() {
    var content = document.getElementById('descripcionn');
    var slider = document.getElementById('slider-container');
    if (content.style.display === 'none') {
        content.style.display = 'block';
        slider.style.display = 'flex';
    } else {
        content.style.display = 'none';
        slider.style.display = 'none';
    }
}