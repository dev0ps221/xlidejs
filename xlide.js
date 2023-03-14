function xlide(target,options){
    const slider = target
    const wrapper = document.createElement('div')
    wrapper.classList.add('wrapper')
    let items = slider.querySelectorAll('.xlide-item')
    slider.innerHTML = ''
    if(items.length == 0){
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
            console.log(item.childNodes)
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
                        legend.appendChild(img)
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
            controls.appendChild(leftCtrl)
            if(legends){
                controls.appendChild(legends)
            }
            rightCtrl = document.createElement('div')
            rightCtrl.classList.add('before')
            controls.appendChild(rightCtrl)
        }else{
            if(legends){
                controls.appendChild(legends)
            }
        }
        if(options.hasOwnProperty('vertical') && options['vertical']){
            slider.classList.add('vslide')
        }
        slider.appendChild(controls)
    }
}