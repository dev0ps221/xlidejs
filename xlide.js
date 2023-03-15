class xLide{
    checkOptionsList(name){
        return this.checkOption(name) && Array.isArray(this.this.options[name]) && this.this.options[name].length
    }
    checkOption(name){
        return this.options.hasOwnProperty(name)
    }
    checkBooleanOption(){
        return this.checkOption() && this.this.options[this.option]
    }
    xlide(){
        this.items = this.slider.querySelectorAll('.xlide-item')
        this.slider.innerHTML = ''
        if(this.items.length == 0){
            this.items = []
            if(this.options.hasOwnProperty('images') && this.options['images'].length){
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
                            if(img instanceof HTMLElement){
                                item.appendChild(img)
                            }else{
                                if(img.hasOwnProperty['img']){
                                    const slideimg = document.createElement('img')
                                    slideimg.src = img['img']
                                    item.appendChild(slideimg)
                                }
                                if(img.hasOwnProperty('data')){
                                    const data = img['data']
                                    if((data instanceof HTMLElement)){
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
        this.items.forEach(
            item=>{
                wrapper.appendChild(item)
            }
        )
        this.slider.appendChild(wrapper)
        if(this.options.hasOwnProperty('controls') || this.options.hasOwnProperty('legends')){
            let legends = leftCtrl = rightCtrl = null
            const controls = document.createElement('div')
            controls.classList.add('controlbar')
            if(this.options.hasOwnProperty('legends')){
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
            if(this.options.hasOwnProperty('controls') && this.options['controls']){
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
            if(this.options.hasOwnProperty('vertical') && this.options['vertical']){
                this.slider.classList.add('vslider')
            }
            this.slider.appendChild(controls)
        }
    }
    
    init_xlide_controls(slider){
        this.slider.querySelectorAll(
            '.before'
        ).forEach(
            before=>{
                before.addEventListener('click',e=>{
                    const slidenumber = parseInt(getComputedStyle(slider).getPropertyValue('--slide-position'))
                    if(slidenumber > 0){
                        setSlideVar(slider,'--slide-position',slidenumber-1)
                        disableLegends(slider)
                        enableLegend(slider,slidenumber-1)
                        slideOut(slider,slidenumber)
                        slideIn(slider,slidenumber-1)
                    }
                })
            }
        )
        this.slider.querySelectorAll(
            '.after'
        ).forEach(
            after=>{
                after.addEventListener('click',e=>{
                    const slidenumber = parseInt(getComputedStyle(slider).getPropertyValue('--slide-position'))
                    if(slidenumber+1 < this.slider.querySelectorAll('.xlide-item').length){
                        setSlideVar(slider,'--slide-position',slidenumber+1)
                        disableLegends(slider)
                        enableLegend(slider,slidenumber+1)
                        slideOut(slider,slidenumber)
                        slideIn(slider,slidenumber+1)
                    }
                })
            }
        )
        this.slider.querySelectorAll(
            '.legend'
        ).forEach(
            (elem,idx)=>{
                elem.addEventListener(
                    'click',e=>{
                        setSlideVar(slider,'--slide-position',idx)
                        disableLegends(slider)
                        enableLegend(slider,idx)
                        slideOut(slider,idx)
                        slideIn(slider,idx)
                    }
                )
                if(idx==0){
                    elem.click()
                }
            }
        )
        this.slider.addEventListener(
            'animationend',e=>{
                justSlide(slider)
            }
        )
        disableLegends(slider)
        enableLegend(slider,0)
    }
    disableLegends(slider){
        this.slider.querySelectorAll(
            '.legend'
        ).forEach(
            (elem,idx)=>{
                elem.classList.remove('active')
            }
        )
    }
    slidesOut(slider){
        this.slider.querySelectorAll('.xlide-item').forEach(
            slide=>{
                slide.classList.remove('in')
                slide.classList.add('out')
            }
        )
    }
    slidesIn(slider){
        this.slider.querySelectorAll('.xlide-item').forEach(
            slide=>{
                slide.classList.remove('out')
                slide.classList.add('in')
            }
        )
    }
    slideIn(slider,idx){
        this.slider.querySelectorAll('.xlide-item').forEach(
            (slide,i)=>{
                if(i == idx){
                    slide.classList.remove('out')
                    slide.classList.add('in')
                }
            }
        )
    }
    slideOut(slider,idx){
        this.slider.querySelectorAll('.xlide-item').forEach(
            (slide,i)=>{
                if(i == idx){
                    slide.classList.remove('in')
                    slide.classList.add('out')
                }
            }
        )
    }
    justSlide(slider){
        this.slider.querySelectorAll('.xlide-item').forEach(
            (slide,i)=>{
                slide.classList.remove('in')
                slide.classList.remove('out')
            
            }   
        )
    }
    setSlideVar(slide,key,value){
        this.slider.style.setProperty(key,value)
    }
    enableLegend(slider,idx){
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
    constructor(this.target,options){
        this.target = this.slider = this.target
        this.options = options
        this.wrapper = document.createElement('div')
        this.target.classList.add('xlide')
        this.wrapper.classList.add('wrapper')
        this.xlide()
    }
}

function xlide(this.target,options){
    const slider = new xLide(this.target,options)
    return slider
}