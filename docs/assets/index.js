let slidelist = []
let images = ['slidepics/1.png','slidepics/2.png','slidepics/3.png','slidepics/6.png','slidepics/4.png','slidepics/5.png']




const slide1 = xlide()
slide1.addImages(images)
slide1.addOption('autoplay')
slide1.addOption('previews')
slide1.addOption('interval',2)
slide1.appendTo(document.querySelector('#first_sliders .slide1'))

const slide2 = xlide()
slide2.addImages(images)
slide2.addOption('autoplay')
slide2.addOption('controls')
slide2.addOption('interval',4)
slide2.appendTo(document.querySelector('#first_sliders .slide2'))

const slide3 = xlide()
slide3.addImages(images)
slide3.addOption('autoplay')
slide3.addOption('previews')
slide3.addOption('controls')
slide3.addOption('interval',5)
slide3.appendTo(document.querySelector('#first_sliders .slide3'))