let slidelist = []
let imgs = ['1.png','2.png','3.png','4.png','5.png']
slidelist.push(['#slide-one','slidey',imgs,{classList:['bgpurp'],interval:4000,autoplay:true}])
slidelist.push(['.car1','car1',imgs,{horizontal:1,interval:2000,autoplay:true}])
slidelist.push(['.car2','car2',imgs,{vertical:1,interval:4000,autoplay:true}])
slidelist.push(['.car3','car3',imgs,{rhorizontal:1,interval:2000,autoplay:true}])
xLides.slideList(slidelist)
