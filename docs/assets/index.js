const imgs = [
    'slidepics/slide1.avif',
    'slidepics/slide2.avif',
    'slidepics/slide3.avif'
]

const liste_exemples = document.querySelector('#exemples .liste_exemples')
if(liste_exemples){
    const optionsExemple1 = {
        images:imgs,
        interval:2,
        autoplay:1
    }
    let slide_exemple1 = xlide(liste_exemples.querySelector('.exemple1'),optionsExemple1)


}