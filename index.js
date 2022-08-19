let slidelist = []
let imgs = ['1.png','2.png','3.png','4.png','5.png']
slidelist.push(['#slide-one','slidey',imgs,{previews:1,interval:8000,autoplay:true}])
slidelist.push(['.car1','car1',imgs,{previews:1,interval:8000,autoplay:true}])
slidelist.push(['.car2','car2',imgs,{controls:1,classList:['vertical'],interval:4000,autoplay:true}])
slidelist.push(['.car3','car3',imgs,{previews:1,interval:8000,autoplay:true}])
xLides.slideList(slidelist)
