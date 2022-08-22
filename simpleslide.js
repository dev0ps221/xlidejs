//on utilise la fonction xl pour créer notre slide
const slide = xl()

//on ajoute nos images à notre slide
slide.addImages(['tutos/simpleslide/img1.jpg','tutos/simpleslide/img2.jpg','tutos/simpleslide/img3.jpg','tutos/simpleslide/img4.jpg','tutos/simpleslide/img5.jpg'])
slide.addOptions('autoplay')
//on ajoute les controls pour changer d'image
// slide.addOption('controls')

//on affiche le slide sur le div appartenant à la classe .slide
slide.appendTo('.simpleslide')


