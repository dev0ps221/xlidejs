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
                        slideimg.src = img
                        item.appendChild(slideimg)
                    }
                    if((typeof img) === 'object'){
                        if(this.matchHtmlElem(img)){
                            item.appendChild(img)
                        }else{
                            if(img.hasOwnProperty['img']){
                                const slideimg = document.createElement('img')
                                slideimg.src = img['img']
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
    xlide(){
        this.slider.innerHTML = ''
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

    init_xlide_controls(){
        this.slider.querySelectorAll(
            '.before'
        ).forEach(
            before=>{
                before.addEventListener('click',e=>this.prevSlide())
            }
        )
        this.slider.querySelectorAll(
            '.after'
        ).forEach(
            after=>{
                after.addEventListener('click',e=>this.nextSlide())
            }
        )
        this.slider.querySelectorAll(
            '.legend'
        ).forEach(
            (elem,idx)=>{
                elem.addEventListener(
                    'click',e=>{
                        this.slideTo(idx,0)
                    }
                )
                if(idx==0){
                    elem.click()
                }
            }
        )
        this.slider.addEventListener(
            'animationend',e=>{
                this.justSlide(this.slider)
            }
        )
        this.disableLegends()
        this.enableLegend(0)
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
    constructor(target,options){
        this.target = this.slider = target
        this.options = options
        this.wrapper = document.createElement('div')
        this.target.classList.add('xlide')
        this.wrapper.classList.add('wrapper')
        this.xlide()
        this.init_xlide_controls()
    }
}

function xlide(target,options){
    const slider = new xLide(target,options)
    return slider
}