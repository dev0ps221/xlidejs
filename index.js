let slidelist = []
let imgs = ['1.png','2.png','3.png','6.png','4.png','5.png']
// slidelist.push(['#slide-one','slidey',imgs,{classList:['bgpurp-a'],interval:4000,autoplay:true}])
// slidelist.push(['.car1','car1',imgs,{horizontal:1,classList:['bgblue'],interval:2000,autoplay:true}])
slidelist.push(['.car2','car2',imgs,{vertical:1,classList:['bgpurp-a'],interval:4000,autoplay:true}])
slidelist.push(['.car3','car3',imgs,{rhorizontal:1,classList:['bgblue'],interval:2000,autoplay:true}])
xLides.galery('#examplegalery','une galerie simple avec xlide ',['1.png','2.png','3.png','5.png','4.png','2.png','5.png'],{autoplay:1,captions:1,classList:['bgpurp-a'],interval:4000,controls:1})
xLides.slideList(slidelist)



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
car2.addClass('bgblue')   
car2.addImages(imgs)
car2.addOptions(['interval',2000],'autoplay','horizontal')
car2.appendTo('.car2')





const slide = xl()
slide.addImages([['1.png','img1'],'2.png','3.png','5.png','4.png','2.png','5.png'])
slide.start()