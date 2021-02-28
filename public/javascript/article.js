// var slide_index = 1;

// window.onload = function(){
//     displaySlides(slide_index);
//     addEvent();
// }

// function nextSlide(n) {
//     displaySlides(slide_index += n);
// }
// function currentSlide(n) {
//     displaySlides(slide_index = n);
// }
// function displaySlides(n) {
//     var i;
//     var slides = document.getElementsByClassName("slider");
//     if (n > slides.length) { slide_index = 1 }
//     if (n < 1) { slide_index = slides.length }
//     for (i = 0; i < slides.length; i++) {
//         slides[i].style.display = "none";
//     }
    
//     slides[slide_index - 1].style.display = "block";
// }

// function addEvent(){
//     let nav_arrows = document.querySelectorAll('.sliderContainer a');
    
//     for(let i=0; i<nav_arrows.length; i++)
//         nav_arrows[i].className === 'left' ? 
//             (nav_arrows[i].onclick = function(){nextSlide(-1);}) : 
//             (nav_arrows[i].onclick = function(){nextSlide(1);});
// }