class xLide{


    options = {}
    images = []
    name = null
    target = null
    idx = null
    list = null
    interval = null
    elems = null
    actualTimeOut = null
    running = false


    isRunning(){
        return this.getVal('running')
    }
    setVal(key,val){
        this[key] = val
    }
    getVal(key,ref=null){
        return (ref ? ref : this).hasOwnProperty(key) ? (ref ? ref : this)[key] : null
    }
    setTarget(target){
        this.setVal('target',target)
    }
    getTarget(){
        return this.getVal('target')
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
        return this.getVal(option,this.getOptions())
    }
    setOption(option,value){
        if(option){
            let options = this.getOptions()
            options[option] = value
        }
    }
    setOptions(options){
        Object.keys(options).forEach(
            (option)=>{
                if(option=='interval') this.setVal('interval',options[option])
                if(option=='autoplay') this.setVal('running',options[option])
                this.setOption(option,options[option])
            }
        )
    }
    hasOption(option){
        return this.getOption(option) !=null
    }
    selectTarget(){
        this.setTarget(document.querySelector(this.getVal('selector')))
    }
    createSlide(){
        const name = this.getVal('name')
        const xlide = this.getTarget()
        if(xlide){
            xlide.classList.add('x-lide')
            const xlidelist = document.createElement('div')
            if(this.hasOption('classList')){
                this.getOption('classList').forEach(
                    className => xlide.classList.add(className)
                )
            }
            xlidelist.classList.add('x-lide-list')
            this.setVal('list',xlidelist)
            let elems = []
            let captions = []
            let caption = null
            let images = null
            this.getVal('images').forEach(
                pic=>{
                    const picture_container = document.createElement('div')
                    const picture = document.createElement('img')
                    picture.src = pic
                    picture_container.appendChild(picture)
                    elems.push(picture_container)
                    xlidelist.appendChild(picture_container)
                }
            )
            this.setVal('elems',elems)
            
            if(this.hasOption('captions')){
                caption = document.createElement('div')
                captions = []
                xlide.classList.add('hasCaptions')
                caption.classList.add('caption')
                this.getVal('elems').forEach(
                    (elem,idx)=>{
                        const imgarr = this.getVal('images')[idx].split(':')
                        
                        captions.push(imgarr.length>1?imgarr[1]: `preview ${idx}`)
                        
                    }
                )
                images = Array.from(this.getVal('images').map(
                    (img)=>{
                        return img.split(':')[0]
                    }
                ))
                this.setVal('caption',caption)
                this.setVal('captions',captions)
            }
            if(this.hasOption('previews')){
                xlide.classList.add('hasPreviews')

                const previews = document.createElement('div')
                previews.classList.add('previews')
                this.getVal('elems').forEach(
                    (elem,idx)=>{
                        const elempreview = document.createElement('span')
                        elempreview.classList.add('preview')
                        const elempreviewimg = document.createElement('img')
                        elempreview.classList.add('preview-img')
                        elempreviewimg.src = (this.hasOption('captions') ? images : this.getVal('images'))[idx]
                        elempreview.addEventListener('click',e=>{
                            clearTimeout(this.actualTimeOut)
                            this.setVal('idx',idx)
                            this.showCurrentElem()
                        })
                        elempreview.appendChild(elempreviewimg)
                        previews.appendChild(elempreview)
                    }
                )
                if(this.hasOption('ctrls')){
                    xlide.classList.add('hasCtrl')
                    const ctrls = document.createElement('div')
                    ctrls.classList.add('ctrls')
                    this.getVal('elems').forEach(
                        (elem,idx)=>{
                            const elemctrl = document.createElement('span')
                            elemctrl.classList.add('ctrl')
                            elemctrl.innerHTML = idx+1
                            elemctrl.addEventListener('click',e=>{
                                clearTimeout(this.actualTimeOut)
                                this.setVal('idx',idx)
                                this.showCurrentElem()
                            })
                            ctrls.appendChild(elemctrl)
                        }
                    )
                    xlide.appendChild(caption)
                    xlide.appendChild(xlidelist)
                    xlide.appendChild(previews)
                    xlide.appendChild(ctrls)
                }
            }
        }
        xlide.classList.add('cf')
        this.showCurrentElem()
        this.setVal('idx',0)
        const action = ()=>{
            this.showCurrentElem()
        }
        this.setVal('actualTimeOut',setTimeout(action,this.getVal('interval'))) 
        return name
    
    }
    run(){
        this.setVal('running',true)
        if(!this.getVal('interval')){
            this.setVal('interval',3000)
        }
        this.showCurrentElem()

    }
    showCurrentElem(){
        let idx = this.getVal('idx')
        let elems = this.getVal('elems')
        let list = this.getVal('list')
        const lastelem = idx != 0 ? elems[idx-1] : idx != elems.length-1 ? elems[elems.length-1] : elems[elems.length-2]
        if(lastelem.querySelector('img')){
            list.style.background = `url(${lastelem.querySelector('img').src})`
            list.style.backgroundSize = '100% 100%'
        }
        if(this.hasOption('captions')){
            this.getVal('caption').innerHTML = this.getVal('captions')[idx]
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
        this.nextIndex()
        const action = ()=>{
            this.showCurrentElem()
        }
        if(this.isRunning()){
            this.setVal('actualTimeOut',setTimeout(action,this.getVal('interval'))) 
        }

    }
    nextIndex(){
        let idx = this.getVal('idx')
        idx++
        if(idx >= this.getVal('elems').length) idx = 0
        this.setVal('idx',idx)
    }
    prevIndex(){
        let idx = this.getVal('idx')
        idx--
        if(idx <= 0) idx = this.getVal('elems').length -1 
        this.setVal('idx',idx)
    }
    getSlide(){
        return this.getTarget()
    }
    isConfigured(){
        return this.getTarget().classList.contains('cf')
    }
    constructor(selector,name,images,options){
        this.setVal('selector',selector)
        this.setName(name)
        this.setImages(images)
        this.setOptions(options)
        this.selectTarget()
        this.setVal('idx',0)
        this.createSlide()
    }


}


class xLideManager{
    slides = []
    get(name){
        let match = null
        this.slides.forEach(
            slide=>{
                if(slide.getVal('name') && slide.getVal('name') == name){
                    match = slide
                }
            }
        )
        return match
    }
    appendSlide(slide){
        if(!this.get(slide.getVal('name'))){
            this.slides.push(slide)
        }
    }
    new(...data){
        const slide = new xLide(...data)
        this.appendSlide(slide)
        return slide
    }
}
const xLides = new xLideManager()