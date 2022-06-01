function initSlide(slideElem){
    const hasClassSlide = slideElem.classList.contains('slide')
    console.log(slideElem,' it s a slide')
}
function initSlides(){
    const slides = document.querySelectorAll('.slide')
    Array.from(slides).map(
        slideElem=>{
            initSlide(slideElem)
        }
    )
}
initSlides()