const imgs = [
    'slidepics/slide1.png',
    'slidepics/slide2.png',
    'slidepics/slide3.png',
    'slidepics/slide4.png',
    'slidepics/slide5.png',
    'slidepics/slide6.png',
    'slidepics/slide7.png'
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