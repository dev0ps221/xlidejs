class xLide{


    options = {}
    images = []
    titre = null
    target = null
    idx = null
    list = null
    elems = null

    setVal(key,val){
        if(val)  this[key] = val
    }
    getVal(key,ref=null){
        return (ref ? ref : this).hasOwnProperty(key) ? (ref ? ref : this)[key] : null
    }
    setTarget(target){
        this.setVal('target',target)
    }
    getTarget(){
        this.getVal('target')
    }
    setName(name){
        this.setVal('name',name)
    }
    setImages(images){
        this.setVal('images',images)
    }
    setOptions(options){
        this.setVal('options',options)
    }
    getOptions(){
        return this.getVal('options')
    }
    getOption(option){
        this.getVal(option,this.getOptions())
    }
    setOption(option,value){
        if(option){
            let options = this.getOptions()
            options[option] = value
        }
    }
    setOptions(options){
        options.forEach(
            ([option,value])=>{
                this.setOption(option,value)
            }
        )
    }
    hasOption(option){
        return this.getOption(option)!=null
    }
    selectTarget(){
        this.setTarget(this.getVal('selector'))
    }
    createSlide(){
        const name = this.getVal('name')
        const xlide = this.getTarget()
        if(xlide){
            xlide.classList.add('x-lide')
            const xlidelist = document.createElement('div')
            if(options.hasOwnProperty('classList')){
                options.classList.forEach(
                    className => xlide.classList.add(className)
                )
            }
            if(this.hasOption('ctrls')){
                xlide.classList.add('hasCtrl')
            }
            if(this.hasOption('previews')){
                xlide.classList.add('hasPreviews')
            }
            xlidelist.classList.add('x-lide-list')
            xlide.appendChild(xlidelist)
            this.getVal('images').forEach(
                pic=>{
                    const picture_container = document.createElement('div')
                    const picture = document.createElement('img')
                    picture.src = pic
                    picture_container.appendChild(picture)
                    xlidelist.appendChild(picture_container)
                }
            )
        }
        xlide.classList.add('cf')
        return name
    
    }
    getSlide(){
        return this.getTarget()
    }
    


    constructor(selector,name,images,options){
        this.setVal('selector',selector)
        this.setName(name)
        this.setImages(images)
        this.setOptions(options)
        this.selectTarget()
        this.createSlide()
    }


}




const _x_lides = []


function createSlide(xlide,name='',pics=[],options={}){
    xlide = document.querySelector(xlide)
    name = name?name:'slide'+_x_lides.length
    if(xlide){
        xlide.classList.add('x-lide')
        const xlidelist = document.createElement('div')
        if(options.hasOwnProperty('classList')){
            options.classList.forEach(
                className => xlide.classList.add(className)
            )
        }
        if(options.hasOwnProperty('ctrls')){
            xlide.classList.add('hasCtrl')
        }
        if(options.hasOwnProperty('previews')){
            xlide.classList.add('hasPreviews')
        }
        xlidelist.classList.add('x-lide-list')
        xlide.appendChild(xlidelist)
        pics.forEach(
            pic=>{
                const picture_container = document.createElement('div')
                const picture = document.createElement('img')
                picture.src = pic
                picture_container.appendChild(picture)
                xlidelist.appendChild(picture_container)
            }
        )
        _x_lides.push([xlide,name])
    }
    return name

}
function createSlides(slides){
    slides.forEach(
        slide=>createSlide(...slide)
    )
}

function registerSlide(selector,name){
    if(document.querySelector(selector))_x_lides.push([document.querySelector(selector),name])
}

function getSlide(name){
    const ret = null
    _x_lides.forEach(
        slide=>{
            if(slide[1]==name){
                ret = slide[0]
            }
        }
    )
    return ret
}

function getSlides(){
    return Array.from(
        _x_lides.map(slide=>slide[0])
    )
}

function showSlide(slide,interv=3000){
    const list = slide.querySelector('.x-lide-list')
    const elems = Array.from(list.children)
    let idx = 0
    
    let actualTimeOut = null; 
    if(slide.classList.contains('hasCtrl')){
        const ctrls = document.createElement('div')
        ctrls.classList.add('ctrls')
        elems.forEach(
            (elem,idx)=>{
                const elemctrl = document.createElement('span')
                elemctrl.classList.add('ctrl')
                elemctrl.innerHTML = idx+1
                elemctrl.addEventListener('click',e=>{
                    clearTimeout(actualTimeOut)
                    showElem(elems,idx)
                })
                ctrls.appendChild(elemctrl)
            }
        )
        slide.appendChild(ctrls)
    }
    if(slide.classList.contains('hasPreviews')){
        const previews = document.createElement('div')
        previews.classList.add('previews')
        elems.forEach(
            (elem,idx)=>{
                const elempreview = document.createElement('span')
                elempreview.classList.add('preview')
                const elempreviewimg = document.createElement('img')
                elempreview.classList.add('preview-img')
                elempreviewimg.src = Array.from(Array.from(slide.querySelector('.x-lide-list').children).map(e=>{return e.querySelector('img')?e.querySelector('img').src:''}))[idx]
                elempreview.addEventListener('click',e=>{
                    clearTimeout(actualTimeOut)
                    showElem(elems,idx)
                })
                elempreview.appendChild(elempreviewimg)
                previews.appendChild(elempreview)
            }
        )
        slide.appendChild(previews)
    }
    function showElem(elems,idx){
        const lastelem = idx != 0 ? elems[idx-1] : idx != elems.length-1 ? elems[elems.length-1] : elems[elems.length-2]
        if(lastelem.querySelector('img')){
            list.style.background = `url(${lastelem.querySelector('img').src})`
            list.style.backgroundSize = '100% 100%'
        }
        elems.forEach(
            (lm,i)=>{
                if(i!=idx && i!=idx-1)lm.classList.remove('visible')
                else{
                    lm.classList.add('visible')
                }
            }
        )
        lastelem.classList.remove('visible')
        idx++
        if(idx >= elems.length) idx = 0
        actualTimeOut = setTimeout(xslide,interv,elems,idx) 
    }
    function xslide(elems,idx){
        showElem(elems,idx)
    }
    showElem(elems,idx)
    
}    

function showSlides(interv=3000){
    getSlides().forEach(
        slide=>showSlide(slide,interv)
    )
}