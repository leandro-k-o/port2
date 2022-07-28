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
            this.ball.style.setProperty('--degree',`${ballTop}deg`);
        }
        
    }

}

class Projetos extends Scroll{

    init(){
            this.h2 = document.querySelector('#projetos h2');
            this.h2_before = window.getComputedStyle(this.h2,'::before');

            this.projetos_container_wrapper = document.querySelector('.projetos-container-wraper');
            this.projetos_container_wrapper.classList.add('scroll-in');

            this.projetos_container = this.elements[0];

            this.li = document.querySelectorAll('ul.projetos-menu-lista li');

            this.verElementos();

            this.elements.forEach((element)=>{
                this.observer.observe(element)
            })
    }

    verElementos(){
        this.options = {
            threshold: .6,
            rootMargin: '',
        };
        this.observer = new IntersectionObserver((entries, observer)=>{
            entries.forEach((entry)=>{
                this.criarLinhas(entry);
            })
        },this.options)
    }

    criarLinhas(entry){
        if(entry.isIntersecting){
            this.h2.style.setProperty('--widthH2B','0px');
            this.projetos_container.style.setProperty('--heightPCB','0%');

            this.li.forEach((el)=>{
                el.style.setProperty('--widthLi','0px');
                el.style.setProperty('opacity','0');
            })

            this.desenharLinhas();

            this.projetos_container_wrapper.classList.add('scrolled');
            
            this.observer.unobserve(entry.target);

        }else{
            this.h2.style.setProperty('--widthH2B','0px');
            this.projetos_container.style.setProperty('--heightPCB','0%');
            this.projetos_container.style.setProperty('--heightPCB','0%');
            this.li.forEach((el)=>{
                el.style.setProperty('--widthLi','0px');
                el.style.setProperty('opacity','0');
            })
        }
    }

    desenharLinhas(){
        this.h2.style.setProperty('--widthH2B','200px');
        this.projPromisse = new Promise((resolve)=>
            window.setTimeout(()=> {
                this.projetos_container.style.setProperty('--heightPCB','100%')
                resolve()
            },500)
        )
        .then(()=>this.li.forEach((el)=>{
            el.style.setProperty('--widthLi','28px');
            el.style.setProperty('opacity','1');
        }))     
    }  
        
}

class ProjetosSlider {

    constructor(){
        this.setAllItems();
        this.init();
    }
    
    init(){
        this.projetoItem.forEach((item,i)=>{
            this.itemMedidas.push({
                'item': item, 
                'offsetleft': item.offsetLeft,
                'medida': this.calcularMedida(item)
            });

            this.projetosMenu[i].addEventListener('mouseover',(e) => {
                this.selecionarItem(this.itemMedidas[i]);
            })

            this.projetosMenu[i].addEventListener('mouseout',(e) => {   
                this.selecionarMenu(e, i);    
                //this.slider.classList.remove('projetos-slider-active');
            })

            this.projetosMenu[i].addEventListener('click',(e) => {
                e.preventDefault();
                this.selecionarItem(this.itemMedidas[i]);
                this.selecionarMenu(e, i);
            })
        })
        if(this.lastActive === null)
            this.selecionarItem(this.itemMedidas[0]);
    }

    setAllItems(){
        this.slider = document.querySelector('.projetos-slider');
        this.projetoItem = document.querySelectorAll('.projeto-item');
        this.wraper = document.querySelector('.projetos-container-wraper');
        this.projetosMenu = document.querySelectorAll('.projetos-menu-lista li a');
        this.itemMedidas = [];
        this.lastActive = null;
    }

    refresh(){
        this.setAllItems()
        this.init();
    }

    calcularMedida(item){
        const margin = (this.wraper.offsetWidth - item.offsetWidth) / 2;
        return -(item.offsetLeft - margin)
    }

    selecionarItem({medida}){
        this.slider.style.setProperty('--item',`${medida}px`);
        this.slider.classList.add('projetos-slider-active');
    }

    selecionarMenu(event, i){
        event.currentTarget.children[0].classList.add('produto-active');               
        if(this.lastActive!==null && this.lastActive !== i) 
            this.projetosMenu[this.lastActive].children[0].classList.remove('produto-active');
        this.lastActive = i;
    }
}


function copyToClipboard(){
    const btn = document.querySelector('.copy-button');
    const email = document.querySelector('.mail');
    const contatoEmail = document.querySelector('.contato-email');
    console.log(contatoEmail)
    btn.addEventListener('click',()=> {
        window.navigator.clipboard.writeText(email.innerText);
        contatoEmail.style.setProperty('--opacityCopy','1');
        setTimeout(()=>contatoEmail.style.setProperty('--opacityCopy','0'),3000);
    });
}
let projetoLoad;
let projeto;
window.addEventListener("load",() => {
    new ScrollIn('.scroll-in');
    new RotateBall('#balls');
    if(window.innerWidth > 1050){
        projeto = new Projetos('.projetos-container');
        copyToClipboard();
    }
    projetoLoad = new ProjetosSlider(); 
    console.log(navigator)
    window.scrollTo(0,0);
});

window.onresize = () => 
{
    projetoLoad.refresh();
}


