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

function smootScroll(event, dest) {
    var y = event.pageY;
    // console.log(event);
    var interval = setInterval(function () {
        
        if (y >= dest.offsetTop) {
            clearInterval(interval);
            y = event.pageY;
        }else{
            y = y + 6;
            window.scroll(0, y);
        }
    }, 5);
}


var anchor = document.querySelector(".header__nav ul");
var about = document.getElementsByClassName("about")[0];

anchor.addEventListener('click', function(event){
    event.preventDefault();

    let dest = document.querySelector("div."+event.target.id);
    smootScroll(event, dest);
});

// about.addEventListener('click',function(event) {
//    console.log(event);
// });

var totop = document.getElementsByClassName('top')[0];

window.onscroll = function(){
    if(window.pageYOffset >= 1000){
        totop.style.display = "block";
    }else{
        totop.style.display = "none";
    }
    
};

totop.onclick = function(){
    let y = window.pageYOffset;
    let interval = setInterval(function () {
        window.scroll(0, y);
        y = y - 10;
        
        if(y <= 0){
            clearInterval(interval);
        }
        
        if (y < 10) {
            y = 0;
        }
        console.log(y);
    }, 6);
};