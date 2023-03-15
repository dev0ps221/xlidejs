const imgs = [
    'slidepics/slide1.png',
    'slidepics/slide2.png',
    'slidepics/slide3.png',
    'slidepics/slide4.png',
    'slidepics/slide5.png',
    'slidepics/slide6.png',
    'slidepics/slide7.png'
]
const images = [
    'slidepics/slide1.avif',
    'slidepics/slide2.avif',
    'slidepics/slide3.avif',
    'slidepics/slide4.avif',
    'slidepics/slide5.avif'
]

const liste_exemples = document.querySelector('#exemples .liste_exemples')
if(liste_exemples){
    const optionsExemple1 = {
        images:imgs,
        interval:2,
        autoplay:1
    }
    let slide_exemple1 = xlide(liste_exemples.querySelector('.exemple1'),optionsExemple1)


    const optionsExemple2 = {
        images:imgs,
        interval:4,
        autoplay:1,
        vertical:1
    }
    let slide_exemple2 = xlide(liste_exemples.querySelector('.exemple2'),optionsExemple2)

    const optionsExemple3 = {
        images,
        interval:6,
        autoplay:1,
        vertical:1,
        previews:1
    }
    let slide_exemple3 = xlide(liste_exemples.querySelector('.exemple3'),optionsExemple3)

    const optionsExemple4 = {
        images,
        interval:6,
        autoplay:1,
        rhorizontal:1,
        previews:1
    }
    let slide_exemple4 = xlide(liste_exemples.querySelector('.exemple4'),optionsExemple4)


}