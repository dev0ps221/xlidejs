//on utilise la fonction xl pour créer notre slide
const slide = xl()

//on ajoute nos images à notre slide
slide.addImages(['img1.jpg','img2.jpg','img3.jpg','img4.jpg','img5.jpg'])
slide.addOptions('autoplay')
//on ajoute les controls pour changer d'image
// slide.addOption('controls')

//on affiche le slide sur le div appartenant à la classe .slide
slide.appendTo('.slide')


