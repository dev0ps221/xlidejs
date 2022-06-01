const root = document.documentElement
function getSlideOrientation(slideElem){
    const defaultOrientation = 'toLeft'
    const isToLeft = slideElem.classList.contains('toLeft')
    const isToRight = slideElem.classList.contains('toRight')
    const isToTop = slideElem.classList.contains('toTop')
    const isToBottom = slideElem.classList.contains('toBottom')
    return [isToLeft||isToRight||isToBottom||isToTop||null,isToLeft ? defaultOrientation : isToRight ? 'toRight' : isToTop ? 'toTop' : isToBottom ? 'toBottom' : defaultOrientation,isToLeft ? 'left' : isToRight ? 'right' : isToTop ? 'top' : isToBottom ? 'bottom' : 'left']
}
function initSlide(slideElem){
    const hasClassSlide = slideElem.classList.contains('slide')
    const [slideHasOrientation,slideAnimation,slideOrientation] = getSlideOrientation(slideElem)
    if(!slideHasOrientation){
        slideElem.classList.add(slideAnimation)
    }
    slideElem.addEventListener(
        'animationend',e=>{
            console.log('pouss negn')
            console.log(slideOrientation)
            const initial = parseInt(getComputedStyle(root).getPropertyValue(`--slided-${slideOrientation}`).replace('%',''))
            const movedTo = parseInt(getComputedStyle(root).getPropertyValue(`--toslide-${slideOrientation}`).replace('%',''))
            const moveLat = 100
            const new_initial = movedTo
            const new_movedTo = slideOrientation=='right'||slideOrientation=='bottom' ? (movedTo+100) : (movedTo-100) 
            root.style.setProperty(`--slided-${slideOrientation}`,`${new_initial}%`)
            root.style.setProperty(`--toslide-${slideOrientation}`,`${new_movedTo}%`)
            slideElem.animate(slideAnimation)
            slideElem.classList.remove(slideAnimation)
            slideElem.classList.add(`waiting-${slideOrientation}anim`)
            setTimeout(
                ()=>{
                    slideElem.classList.add(slideAnimation)
                    slideElem.classList.remove(`waiting-${slideOrientation}anim`)
                },500
            )
            // slideElem
        }
    )
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