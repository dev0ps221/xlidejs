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
        return this.checkOption('controls') || this.checkOption('previews')
    }
    processCtrlBar(){
        //check if a controlbar is needed and build it if necessary
        if(this.hasCtrlBar()){
            let previews = null,
                leftCtrl = null,
                rightCtrl = null
            const controls = document.createElement('div')
            controls.classList.add('controlbar')
            if(this.checkOption('previews') && this.options['previews']){
                previews = document.createElement('div')
                previews.classList.add('previews')
                this.items.forEach(
                    (item,idx)=>{
                        const img = item.querySelector('img')
                        const preview = document.createElement('div')
                        preview.classList.add('preview')
                        if(img){
                            preview.appendChild(img.cloneNode())
                        }else{
                            const label = document.createElement('h4')
                            label.innerHTML = "slide "+(idx+1)
                            preview.appendChild(label)
                        }
                        previews.appendChild(preview)
                    }
                )
            }
            if(this.checkOption('controls') && this.options['controls']){
                leftCtrl = document.createElement('div')
                leftCtrl.classList.add('before')
                leftCtrl.innerHTML = "<"
                controls.appendChild(leftCtrl)
                if(previews){
                    controls.appendChild(previews)
                }
                rightCtrl = document.createElement('div')
                rightCtrl.classList.add('after')
                rightCtrl.innerHTML = ">"
                controls.appendChild(rightCtrl)
            }else{
                if(previews){
                    controls.appendChild(previews)
                }
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
    processOption(option){
        if(this.checkOption(option)){
            let value = this.options[option]
            if(option == 'autoplay' && value){
                this.is_playing = true
            }
            if(option == 'rotate'){
                this.setOption('vertical',false)
                this.slider.classList[value ? 'add' : 'remove' ]('rotate')
            }
            if(['rvertical','rhorizontal'].includes(option)){
                if(option == 'rvertical'){
                    this.setOption('vertical',1)
                }
                if(option == 'rhorizontal'){
                    this.setOption('horizontal',1)
                }
                if(value){
                    this.reverse_playing = true
                }
            }
            if(option == 'vertical' && value){
                this.setOption('horizontal',0)
                this.slider.classList[value ? 'add' : 'remove' ]('vertical')
                this.reverse_playing = false
            }
            if(option == 'horizontal' && value){
                this.setOption('vertical',false)
                this.slider.classList.remove('vertical')
                this.reverse_playing = false
            }
            if(option == 'interval'){
                this.play_interval = value
            }
            this.xlide()
        }
    }
    setOption(option,value){
        this.addOption(option,value)
    }
    setOptions(options){
        this.setOptions(options)
    }
    addOption(option,value=true){
        this.options[option] = value
        this.processOption(option)
    }
    addOptions(options={}){
        Object.keys(options).forEach(
            option=>{
                const value = options[option]
                this.addOption(option,value)

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


        if(this.checkOption('vertical') && this.options['vertical']){
            this.slider.classList.add('vslider')
        }

        if(this.checkOption('rotate') && this.options['rotate']){
            this.slider.classList.add('rotate')
        }

        this.target.removeEventListener(
            'mouseenter',e=>{
                this.is_playing = false
            }
        )

        this.target.removeEventListener(
            'mouseleave',e=>{
                this.is_playing = true
                this.move()
            }
        )

        this.target.addEventListener(
            'mouseenter',e=>{
                this.is_playing = false
            }
        )

        this.target.addEventListener(
            'mouseleave',e=>{
                this.is_playing = true
                this.move()
            }
        )

        if(this.checkOption('autoplay')){
            this.play()
        }

    }
    
    slideTo(position){
        //moves to the specified slide
        this.setSlideVar('--slide-position',position)
        this.disablepreviews()
        this.enablepreview(position)
        this.justSlide()
        this.slidesOut()
        this.slideIn(position)
        

    }

    prevSlide(){
        //moves to the previous slide
        const slidenumber = parseInt(getComputedStyle(this.slider).getPropertyValue('--slide-position'))
        if(slidenumber > 0){
            this.slideTo(slidenumber-1)
        }else{
            this.slideTo(this.items.length-1)
        }
    }

    nextSlide(){
        //moves to the next slide
        const slidenumber = parseInt(getComputedStyle(this.slider).getPropertyValue('--slide-position'))
        if(slidenumber+1 < this.items.length){
            this.slideTo(slidenumber+1)
        }else{
            this.slideTo(0)
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

    reset_preview_events(preview,idx){
        preview.removeEventListener(
            'click',e=>{
                this.slideTo(idx)
            }
        )
        preview.addEventListener(
            'click',e=>{
                this.slideTo(idx)
            }
        )
    }

    reset_previews_events(){

        this.slider.querySelectorAll(
            '.preview'
        ).forEach(
            (elem,idx)=>{
                this.reset_preview_events(elem,idx)
            }
        )
        this.disablepreviews()
        this.enablepreview(this.reverse_playing ? this.items.length-1 : 0)
    }

    init_xlide_controls(){
        this.reset_arrows_events()
        this.reset_previews_events()
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
    //resets previews highlights
    disablepreviews(){
        this.slider.querySelectorAll(
            '.preview'
        ).forEach(
            (elem,idx)=>{
                elem.classList.remove('active')
            }
        )
    }
    //highlight the specified preview item of the slider
    enablepreview(idx){
        this.slider.querySelectorAll(
            '.preview'
        ).forEach(
            (elem,x)=>{
                if(x == idx){
                    elem.classList.add('active')
                }
            }
        )
    }

    //move the slide
    move(){
        setTimeout(()=>{
                if(this.is_playing){
                    this[this.reverse_playing ? "prevSlide" : 'nextSlide']()
                    this.move()
                }
            },this.play_interval * 1000)
        }

    //pause
    pause(){
        this.play_state = 'paused'
    }

    //autoplay feature
    play(){
        if(this.play_state == 'paused'){
            this.play_state='playing'
            this.move()
        }
    }
                
    appendTo(target){
        try{
            target.appendChild(this.target)
        }catch(e){
            console.log(`'failed appending slider to target: { ${e} }'`)
        }
    }

    constructor(target=document.createElement('section'),options={}){
        this.play_state = 'paused'
        this.is_playing = false
        this.reverse_playing = false
        this.play_interval = 3 //seconds
        this.target = this.slider = target
        this.options = options
        this.wrapper = document.createElement('div')
        this.target.classList.add('xlide')
        this.wrapper.classList.add('wrapper')
        this.xlide()
    }
}

function xlide(target=document.createElement('section'),options){
    const slider = new xLide(target,options)
    return slider
}