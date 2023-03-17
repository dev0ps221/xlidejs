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
const pics = [
    'slidepics/slide3.avif',
    'slidepics/slide4.avif',
    'slidepics/slide5.avif',
    'slidepics/slide6.avif',
    'slidepics/slide7.avif',
    'slidepics/slide8.avif'
]

const liste_exemples = document.querySelector('#exemples .liste_exemples')
if(liste_exemples){
    const optionsExemple1 = {
        images:imgs,
        interval:2,
        autoplay:1
    }
    let slide_exemple1 = xlide('.exemple1',optionsExemple1)


    const optionsExemple2 = {
        images:imgs,
        interval:4,
        autoplay:1,
        vertical:1
    }
    let slide_exemple2 = xlide('.exemple2',optionsExemple2)

    const optionsExemple3 = {
        images,
        interval:6,
        autoplay:1,
        vertical:1,
        previews:1
    }
    let slide_exemple3 = xlide('.exemple3',optionsExemple3)

    const optionsExemple4 = {
        interval:2,
        autoplay:1,
        rhorizontal:1,
        previews:1
    }
    let slide_exemple4 = xlide().addOptions(optionsExemple4).addImages(images).appendTo('.exemple4')

    const optionsExemple5 = {
        images:pics,
        interval:6,
        controls:1
    }
    let slide_exemple5 = xlide('.exemple5',optionsExemple5)

    const optionsExemple6 = {
        images:pics,
        interval:4,
        autoplay:1,
        controls:1
    }
    let slide_exemple6 = xlide('.exemple6',optionsExemple6)

    const optionsExemple7 = {
        images:pics,
        interval:2,
        autoplay:1,
        controls:1,
        previews:1
    }
    let slide_exemple7 = xlide('.exemple7',optionsExemple7)


}