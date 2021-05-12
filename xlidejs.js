let generated = 0
class Xlide{
	rootStyle 	=	{
		actual:{},
		initial:{}
	}
	switchIn = null
	simpleSlide = (duration=5000)=>{
		duration = duration + 2000
		let actual = this.root.querySelector('.actual') ? this.root.querySelector('.actual') : this.root.firstElementChild;
		if (actual && !actual.className.match('actual')) actual.className += " actual";
		let slide  = (duration)=>{         
			actual = this.root.querySelector('.actual') ? this.root.querySelector('.actual') : this.root.firstElementChild;
			if (actual && !actual.className.match('actual')) actual.className += " actual";
			(actual.nextElementSibling ? actual.nextElementSibling : actual.parentNode.firstElementChild).className = actual.className
			actual.className = actual.className.replace('actual','lastone')             
			if(this.getOption('allsides')){
				if (!this.switchIn){
					this.setOption('vertical',!this.getOption('vertical')) 
					this.switchIn = 1
				}else{
					this.switchIn--
				}
			}
			if (this.getOption('arrows')) {
				this.root.className+=" witharrow"
			}
			if (this.getOption('vertical')) {
				this.root.className+=" vertical"
			}else{
				this.root.className = this.root.className.replace('vertical','') 
			}
			setTimeout(()=>{
				this.root.querySelector('.lastone').className = this.root.querySelector('.lastone').className.replace(' lastone','')
			},2000)
			setTimeout(
				slide
				,duration
				,duration
			)
		}
		setTimeout(
			slide
			,duration
			,duration
		)
	}
	getOption	=	(_option)	=>	{
		return this.options[_option]
	}
	setOption	=	(_option,value)	=>	{
		this.options[_option] = value
	}
	addStyleVal	=	(prop,val)	=>	{
		this.rootStyle.actual.setProperty(prop,val)
		console.log(this.rootStyle.actual)
		// this.rootStyle.actual[prop] = val
	}
	addRootProp		=	(prop,val)	=>	{
		this.root[prop] = val
	}
	addElemProp		=	(elem,prop,val)	=>	{
		elem[prop] = val
	}
	applyRootStyle  = ()		=>{
		this.root.style = this.rootStyle.actual
	}
	conditionRoot	= ()		=>	{
		this.rootStyle.initial	= this.root.style
		this.rootStyle.actual	= this.rootStyle.initial
		this.addRootProp("className",'xlide')
		if (this.getOption('width')){
			this.addStyleVal("width",this.getOption("width"))
		}
		this.root.childNodes.forEach(
			elem=>this.addElemProp(elem,"className",'xlide-lm')
		)
		this.applyRootStyle()
	}
	cleanroot		= ()		=>	{
		this.rootStyle.actual  = this.rootStyle.initial
		this.applyRootStyle()
	}
	constructor(_id,root,options){
		this._id	= _id
		this.root	= root
		this.options	= options
		this.conditionRoot()
	}
}
class XlideManager{
	xlides = []
	xSlide = (root,options={})=>{
		const newS = new Xlide(this.generated,root,options)
		this.xlides.push(
			newS
		)
		this.incGen()
		return newS
	}
	decGen = ()=>{
		this.generated--
	}
	incGen = ()=>{
		this.generated++
	}
	constructor(){
		this.generated = generated
	}
}
const xlider = new XlideManager()
