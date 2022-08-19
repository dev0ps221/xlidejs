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
                if(option=='controls') this.setOption('ctrls',options[option])
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
            const previews = document.createElement('div')
            const ctrls = document.createElement('div')
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

            let images = Array.from(this.getVal('images').map(
                (img)=>{
                    return img.match(":") ? img.split(':')[0] : img
                }
            ))
            images.forEach(
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
            
            if(this.getOption('captions')){
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
                this.setVal('caption',caption)
                this.setVal('captions',captions)
            }

            if(this.getOption('vertical')){
                xlide.classList.add('vertical')
            }
            if(this.getOption('horizontal')){
                xlide.classList.add('horizontal')
            }
            if(this.getOption('horizontal-reverse')){
                xlide.classList.add('horizontal')
            }
            if(this.getOption('rotate')){
                xlide.classList.add('rotate')
            }
            if(this.getOption('fade')){
                xlide.classList.add('fade')
            }
            if(this.getOption('previews')){
                xlide.classList.add('hasPreviews')

                previews.classList.add('previews')
                this.getVal('elems').forEach(
                    (elem,idx)=>{
                        const elempreview = document.createElement('span')
                        elempreview.classList.add('preview')
                        const elempreviewimg = document.createElement('img')
                        elempreview.classList.add('preview-img')
                        elempreviewimg.src = images[idx]
                        elempreview.addEventListener('click',e=>{
                            clearTimeout(this.actualTimeOut)
                            this.setVal('idx',idx)
                            this.showCurrentElem()
                        })
                        elempreview.appendChild(elempreviewimg)
                        previews.appendChild(elempreview)
                    }
                )
            }
            if(this.getOption('ctrls')){
                xlide.classList.add('hasCtrl')
                if(this.getOption('ctrls')=='captions') xlide.classList.add('hasCaptionCtrl')
                ctrls.classList.add('ctrls')
                this.getVal('elems').forEach(
                    (elem,idx)=>{
                        const elemctrl = document.createElement('span')
                        elemctrl.classList.add('ctrl')
                        elemctrl.innerHTML = (this.getOption('ctrls')=='captions' && this.getOption('captions')) ? this.getVal('captions')[idx] : idx+1
                        elemctrl.addEventListener('click',e=>{
                            clearTimeout(this.actualTimeOut)
                            this.setVal('idx',idx)
                            this.showCurrentElem()
                        })
                        ctrls.appendChild(elemctrl)
                    }
                )
            }
            if(this.hasOption('captions')){
                xlide.appendChild(caption)
            }
            xlide.appendChild(xlidelist)

            if(this.hasOption('previews')){
                previews?xlide.appendChild(previews):null
            }

            if(this.hasOption('ctrls')){
                console.log('hey')
                xlide.appendChild(ctrls)
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
                if(i!=idx)lm.classList.remove('visible')
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

        this.setOptions(options)
        images = images.map(
            img=>(Array.isArray(img))?
                    img.length ? 
                            img.length > 1 ? `${img[0]}:${img[1]}` : img[0] 
                    : ''
                :    img 
        )
    
        this.setImages(images)
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
    slide(...data){
        const slide = new xLide(...data)
        this.appendSlide(slide)
        return slide
    }
    slideList(data){
        return Array.from(data.map(
            (slide)=>{return this.slide(...slide)}            
        ))
    }
}
const xLides = new xLideManager()