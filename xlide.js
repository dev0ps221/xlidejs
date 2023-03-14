function xlide(target,options){
    const slider = target
    const wrapper = document.createElement('div')
    let items = slider.querySelectorAll('.xlide-item').length
    if(items.length){

    }else{
        if(options.hasOwnProperty('images') && options['images'].length){
            options['images'].forEach(
                img=>{
                    const item = document.createElement('div')
                    item.classList.add('div')
                    if((typeof img) === 'string'){

                    }
                }
            )
        }
    }

}