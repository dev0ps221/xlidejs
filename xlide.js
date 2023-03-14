function xlide(target,options){
    const slider = target
    const wrapper = document.createElement('div')
    let items = slider.querySelectorAll('.xlide-item').length
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
                                }
                                if((typeof data === 'string')){
                                    const dataelem = document.createElement('div')
                                    dataelem.classList.add('data')
                                    dataelem.innerHTML=data
                                    item.appendChild(dataelem)
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
    slider.innerHTML = ''
    

}