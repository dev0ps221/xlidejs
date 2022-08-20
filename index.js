let slidelist = []
let imgs = ['1.png','2.png','3.png','6.png','4.png','5.png']

const examplegalery = xg('examplegalery','une galerie simple avec xlide ',['1.png','2.png','3.png','5.png','4.png','2.png','5.png'],{autoplay:1,captions:1,classList:['bgpurp-a'],interval:4000,controls:1})
examplegalery.appendTo('#examplegalery')


const slideone = xl('slide-one','slidey')
slideone.addClass('bgpurp-a')   
slideone.addImages(imgs)
slideone.addOptions(['interval',4000],'autoplay')
slideone.appendTo('#slide-one')

const car1 = xl('carousel-1','carousel1')
car1.addClass('bgblue')   
car1.addImages(imgs)
car1.addOptions(['interval',2000],'autoplay','horizontal')
car1.appendTo('.car1')


const car2 = xl('carousel-2','carousel2')
car2.addClass('bgpurp-a')   
car2.addImages(imgs)
car2.addOptions(['interval',4000],'autoplay','vertical')
car2.appendTo('.car2')


const car3 = xl('carousel-3','carousel3')
car3.addClass('bgblue')   
car3.addImages(imgs)
car3.addOptions(['interval',2000],'autoplay','horizontal')
car3.appendTo('.car3')

