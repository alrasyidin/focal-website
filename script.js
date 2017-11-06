var nav = document.querySelector('nav'),
    slider = document.querySelector('.header__slider');


function stikcyNav(){
    if(window.pageYOffset >= nav.offsetTop) {
        nav.classList.add("fixed");
    }
    
    if (window.pageYOffset <= slider.offsetHeight) {
        nav.classList.remove("fixed");
    }
}

window.addEventListener('scroll', stikcyNav, false);