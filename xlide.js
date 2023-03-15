class xLide{
    checkOptionsList(name){
        return this.checkOption(name) && Array.isArray(this.options[name]) && this.options[name].length
    }
    checkOption(name){
        return this.options.hasOwnProperty(name)
    }
    checkBooleanOption(){
        return this.checkOption() && this.options[this.option]
    }
    matchHtmlElem(elem){
        return elem instanceof HTMLElement
    }
    processItems(){

        this.items = this.slider.querySelectorAll('.xlide-item')
        this.items = []
        if(this.checkOptionsList('images')){
            this.options['images'].forEach(
                img=>{
                    const item = document.createElement('div')
                    item.classList.add('xlide-item')
                    if((typeof img) === 'string'){
                        const slideimg = document.createElement('img')
                        slideimg.src = img+"?t="+new Date().getTime()
                        item.appendChild(slideimg)
                    }
                    if((typeof img) === 'object'){
                        if(this.matchHtmlElem(img)){
                            item.appendChild(img)
                        }else{
                            if(img.hasOwnProperty['img']){
                                const slideimg = document.createElement('img')
                                slideimg.src = img['img']+"?t="+new Date().getTime()
                                item.appendChild(slideimg)
                            }
                            if(img.hasOwnProperty('data')){
                                const data = img['data']
                                if((this.matchHtmlElem(data))){
                                    data.classList.add('data')
                                    item.appendChild(data)
                                }else{
                                    const dataelem = document.createElement('div')
                                    dataelem.classList.add('data')
                                    if((typeof data === 'string')){
                                        dataelem.innerHTML=data
                                        item.appendChild(dataelem)
                                    }
                                    if((typeof data) === 'object'){
                                        if(data.hasOwnProperty('title')){
                                            
                                        }
                                    }
                                }
                            }
                        }
                    }
                    this.items.push(item)
                }
            )
        }
    }
    hasCtrlBar(){
        return this.checkOption('controls') || this.checkOption('legends')
    }
    processCtrlBar(){
        //check if a controlbar is needed and build it if necessary
        if(this.hasCtrlBar()){
            let legends = null,
                leftCtrl = null,
                rightCtrl = null
            const controls = document.createElement('div')
            controls.classList.add('controlbar')
            if(this.checkOption('legends')){
                legends = document.createElement('div')
                legends.classList.add('legends')
                this.items.forEach(
                    (item,idx)=>{
                        const img = item.querySelector('img')
                        const legend = document.createElement('div')
                        legend.classList.add('legend')
                        if(img){
                            legend.appendChild(img.cloneNode())
                        }else{
                            const label = document.createElement('h4')
                            label.innerHTML = "slide "+(idx+1)
                            legend.appendChild(label)
                        }
                        legends.appendChild(legend)
                    }
                )
            }
            if(this.checkOption('controls') && this.options['controls']){
                leftCtrl = document.createElement('div')
                leftCtrl.classList.add('before')
                leftCtrl.innerHTML = "<"
                controls.appendChild(leftCtrl)
                if(legends){
                    controls.appendChild(legends)
                }
                rightCtrl = document.createElement('div')
                rightCtrl.classList.add('after')
                rightCtrl.innerHTML = ">"
                controls.appendChild(rightCtrl)
            }else{
                if(legends){
                    controls.appendChild(legends)
                }
            }
            if(this.checkOption('vertical') && this.options['vertical']){
                this.slider.classList.add('vslider')
            }
            return controls
        }
    }
    delImage(image,refresh=1){
        if(this.checkOption('images')){
            let images = []
            this.options.images.forEach(
                (img,idx)=>{
                    console.log(image)
                    if(idx != image){
                        console.log(idx)
                        images.push(img)
                    }
                }
            )
            this.options['images'] = images
            if(refresh){
                this.xlide()
            }
        }
    }
    delImages(images){
        images.forEach(
            (image,idx)=>{
                this.delImage(idx,0)
                this.xlide()
            }
        )
    }
    addImage(image,refresh=1){
        if(!this.checkOption('images')) this.options['images'] = []
        this.options.images.push(image)
        if(refresh){
            this.xlide()
        }
    }
    addImages(images){
        images.forEach(
            image => {
                this.addImage(image,0)
            }
        )
        if(images.length){
            this .xlide()
        }
    }
    addOption(option,value=null){
        this.options[option] = value
        if(refresh){
            this.xlide()
        }
    }
    addOptions(options){
        options.forEach(
            ({option,value})=>{
                if(option){
                    this.addOption(option)
                }
            }
        )
    }
    xlide(){
        this.slider.innerHTML = ''
        this.wrapper.innerHTML = ''
        this.processItems()
        this.items.forEach(
            item=>{
                this.wrapper.appendChild(item)
            }
        )
        this.slider.appendChild(this.wrapper)

        //build and append a .controlbar element if necessary
        if(this.hasCtrlBar()){
            this.controlbar = this.processCtrlBar()
            this.slider.appendChild(this.controlbar)
            this.init_xlide_controls()
        }

        if(this.checkOption('autoplay')){
            this.play()
        }

    }
    
    slideTo(position,outnumber=1){
        //moves to the specified slide
        this.setSlideVar('--slide-position',position+outnumber)
        this.disableLegends()
        this.enableLegend(position+outnumber)
        this.slideOut(position)
        this.slideIn(position+outnumber)

    }

    prevSlide(){
        //moves to the previous slide
        const slidenumber = parseInt(getComputedStyle(this.slider).getPropertyValue('--slide-position'))
        if(slidenumber > 0){
            this.slideTo(slidenumber,-1)
        }else{
            this.slideTo(this.items.length-1,0)
        }
    }

    nextSlide(){
        //moves to the next slide
        const slidenumber = parseInt(getComputedStyle(this.slider).getPropertyValue('--slide-position'))
        if(slidenumber+1 < this.slider.querySelectorAll('.xlide-item').length){
            this.slideTo(slidenumber)
        }else{
            this.slideTo(0,0)
        }
    }

    reset_left_arrow_event(){
        this.slider.querySelectorAll(
            '.before'
        ).forEach(
            before=>{
                before.addEventListener('click',e=>this.prevSlide())
            }
        )
    }

    reset_right_arrow_event(){
        this.slider.querySelectorAll(
            '.after'
        ).forEach(
            before=>{
                before.addEventListener('click',e=>this.nextSlide())
            }
        )
    }

    reset_arrows_events(){
        this.reset_left_arrow_event()
        this.reset_right_arrow_event()
    }

    reset_legend_events(legend,idx){
        legend.removeEventListener(
            'click',e=>{
                this.slideTo(idx,0)
            }
        )
        legend.addEventListener(
            'click',e=>{
                this.slideTo(idx,0)
            }
        )
        if(idx==0){
            legend.click()
        }
    }

    reset_legends_events(){

        this.slider.querySelectorAll(
            '.legend'
        ).forEach(
            (elem,idx)=>{
                this.reset_legend_events(elem,idx)
            }
        )
        this.disableLegends()
        this.enableLegend(0)
    }

    init_xlide_controls(){
        this.reset_arrows_events()
        this.reset_legends_events()
    }



    //slide animations related actions

    //assign defined moving out animation on all items
    slidesOut(){
        this.slider.querySelectorAll('.xlide-item').forEach(
            slide=>{
                slide.classList.remove('in')
                slide.classList.add('out')
            }
        )
    }

    //assign defined moving in animation on  all items
    slidesIn(){
        this.slider.querySelectorAll('.xlide-item').forEach(
            slide=>{
                slide.classList.remove('out')
                slide.classList.add('in')
            }
        )
    }

    //assign defined moving in animation on one item
    slideIn(idx){
        this.slider.querySelectorAll('.xlide-item').forEach(
            (slide,i)=>{
                if(i == idx){
                    slide.classList.remove('out')
                    slide.classList.add('in')
                }
            }
        )
    }

    //assign defined moving out animation on  one item
    slideOut(idx){
        this.slider.querySelectorAll('.xlide-item').forEach(
            (slide,i)=>{
                if(i == idx){
                    slide.classList.remove('in')
                    slide.classList.add('out')
                }
            }
        )
    }

    //just remove all animations (just sslide just moves in a linear way without animation special animation)
    justSlide(){
        this.slider.querySelectorAll('.xlide-item').forEach(
            (slide,i)=>{
                slide.classList.remove('in')
                slide.classList.remove('out')
            
            }   
        )
    }
    //assigns some css value to the slider elem (mainly for css vars)
    setSlideVar(key,value){
        this.setElemVar(this.slider,key,value)
    }
    //assigns some css value to the specified elem
    setElemVar(elem,key,value){
        if(elem instanceof HTMLElement){
            elem.style.setProperty(key,value)
        }
    }
    //resets legends highlights
    disableLegends(){
        this.slider.querySelectorAll(
            '.legend'
        ).forEach(
            (elem,idx)=>{
                elem.classList.remove('active')
            }
        )
    }
    //highlight the specified legend item of the slider
    enableLegend(idx){
        this.slider.querySelectorAll(
            '.legend'
        ).forEach(
            (elem,x)=>{
                if(x == idx){
                    elem.classList.add('active')
                }
            }
        )
    }
    //autoplay feature
    play(){
        if(this.is_playing){
            setTimeout(
                ()=>{   
                    this.nextSlide()
                    if(this.is_playing()){
                        this.play()
                    }
                },(this.play_interval * 1000)
            )
        }
    }

    constructor(target,options={}){
        this.is_playing = false
        this.play_interval = 3 //seconds
        this.target = this.slider = target
        this.options = options
        this.wrapper = document.createElement('div')
        this.target.classList.add('xlide')
        this.wrapper.classList.add('wrapper')
        this.xlide()
    }
}

function xlide(target,options){
    const slider = new xLide(target,options)
    return slider
}