class Scroll{
    constructor(name){
        this.elements = document.querySelectorAll(name);
        if(this.elements) this.init();   
    } 

    init(){
        this.verElementos();
        this.elements.forEach((element)=>{
            this.observer.observe(element)
        })
    }

    verElementos(){
        this.options = {
            threshold: '',
            rootMargin: '',
        };
        this.observer = new IntersectionObserver((entries, observer)=>{
            entries.forEach((entry)=>{
                console.log(entry);
            })
        },this.options)
    }
}

class ScrollIn extends Scroll {

    super(name){
    }

    verElementos(){
        this.options = {
            threshold: .9,
            rootMargin: '0% 100%',
        };
        this.observer = new IntersectionObserver((entries, observer)=>{
            entries.forEach((entry)=>{
                this.mostrarElemento(entry);
            })
        },this.options)
    }

    mostrarElemento(entry){
        if(entry.isIntersecting){
            entry.target.classList.add('scrolled');
            this.observer.unobserve(entry.target);
        }
    }
}

class RotateBall extends Scroll{

    super(name){
    }

    verElementos(){
        this.ball = this.elements[0];
        this.options = {
            threshold: .6,
        };
        this.observer = new IntersectionObserver((entries, observer)=>{
            entries.forEach((entry)=>{
                this.rodarBola(entry);
            })
        },this.options)
    }

    rodarBola(entry){
        if(entry.isIntersecting){
            window.addEventListener('scroll',(e) => this.rotateBall.call(this,e))
        }else{
            window.removeEventListener('scroll',this.rotateBall);
        }
    }

    rotateBall(e) {
        this.ball.classList.add('rotate-ball');
        let ballTop = (this.ball.getBoundingClientRect().top * 1.5);
        if(ballTop > 0){
            document.documentElement.style.setProperty('--degree',`${ballTop}deg`);
        }
        
    }

}

new ScrollIn('.scroll-in');
new RotateBall('#balls');

window.addEventListener('load', (e) => {
    window.scrollTo(0,0);;
  });
