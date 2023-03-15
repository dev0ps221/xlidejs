class xLide{
    checkOptionsList(name){
        return this.options[]
    }
    constructor(target,options){
        this.target = this.slider = target
        this.options = options
        this.wrapper = document.createElement('div')
        this.target.classList.add('xlide')
        this.wrapper.classList.add('wrapper')
    }
}
function xlide(target,options){
    const slider = target
    const wrapper = document.createElement('div')
    wrapper.classList.add('wrapper')
    let items = slider.querySelectorAll('.xlide-item')
    slider.innerHTML = ''
    if(items.length == 0){
        items = []
        if(options.hasOwnProperty('images') && options['images'].length){
            options['images'].forEach(
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
                    items.push(item)
                }
            )
        }
    }
    items.forEach(
        item=>{
            wrapper.appendChild(item)
        }
    )
    slider.appendChild(wrapper)
    if(options.hasOwnProperty('controls') || options.hasOwnProperty('legends')){
        let legends = leftCtrl = rightCtrl = null
        const controls = document.createElement('div')
        controls.classList.add('controlbar')
        if(options.hasOwnProperty('legends')){
            legends = document.createElement('div')
            legends.classList.add('legends')
            items.forEach(
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
        if(options.hasOwnProperty('controls') && options['controls']){
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
        if(options.hasOwnProperty('vertical') && options['vertical']){
            slider.classList.add('vslider')
        }
        slider.appendChild(controls)
    }
}

function init_xlide_controls(slider){
    slider.querySelectorAll(
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
    slider.querySelectorAll(
        '.after'
    ).forEach(
        after=>{
            after.addEventListener('click',e=>{
                const slidenumber = parseInt(getComputedStyle(slider).getPropertyValue('--slide-position'))
                if(slidenumber+1 < slider.querySelectorAll('.xlide-item').length){
                    setSlideVar(slider,'--slide-position',slidenumber+1)
                    disableLegends(slider)
                    enableLegend(slider,slidenumber+1)
                    slideOut(slider,slidenumber)
                    slideIn(slider,slidenumber+1)
                }
            })
        }
    )
    slider.querySelectorAll(
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
    slider.addEventListener(
        'animationend',e=>{
            justSlide(slider)
        }
    )
    disableLegends(slider)
    enableLegend(slider,0)
}
function disableLegends(slider){
    slider.querySelectorAll(
        '.legend'
    ).forEach(
        (elem,idx)=>{
            elem.classList.remove('active')
        }
    )
}
function slidesOut(slider){
    slider.querySelectorAll('.xlide-item').forEach(
        slide=>{
            slide.classList.remove('in')
            slide.classList.add('out')
        }
    )
}
function slidesIn(slider){
    slider.querySelectorAll('.xlide-item').forEach(
        slide=>{
            slide.classList.remove('out')
            slide.classList.add('in')
        }
    )
}
function slideIn(slider,idx){
    slider.querySelectorAll('.xlide-item').forEach(
        (slide,i)=>{
            if(i == idx){
                slide.classList.remove('out')
                slide.classList.add('in')
            }
        }
    )
}
function slideOut(slider,idx){
    slider.querySelectorAll('.xlide-item').forEach(
        (slide,i)=>{
            if(i == idx){
                slide.classList.remove('in')
                slide.classList.add('out')
            }
        }
    )
}
function justSlide(slider){
    slider.querySelectorAll('.xlide-item').forEach(
        (slide,i)=>{
            slide.classList.remove('in')
            slide.classList.remove('out')
        
        }   
    )
}
function setSlideVar(slide,key,value){
    slider.style.setProperty(key,value)
}
function enableLegend(slider,idx){
    slider.querySelectorAll(
        '.legend'
    ).forEach(
        (elem,x)=>{
            if(x == idx){
                elem.classList.add('active')
            }
        }
    )
}