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

function toTop() {
    let y = window.pageYOffset,
        sisa = y % 10;

    let interval = setInterval(function () {
        
        if (y <= 0) {
            clearInterval(interval);
        }else{
            window.scroll(0, y - 20);
            
            y = y - 10;

            if(y == sisa){
                y = y - sisa;
            }
        }
    }, 6);
}

function smootScroll(event, dest) {
    var y = event.pageY;
    
    if(window.pageYOffset < dest.offsetTop){
        var interval = setInterval(function () {

            if (y >= dest.offsetTop - 50) {
                clearInterval(interval);
                y = event.pageY;
            } else {
                y = y + 6;
                window.scroll(0, y);
            }

        }, 5);
    }else{
         var interval = setInterval(function () {

             if (y <= dest.offsetTop - 50) {
                 clearInterval(interval);
                 y = event.pageY;
             } else {
                 y = y - 6;
                 window.scroll(0, y);
             }
         }, 5);
    }
}


var anchor = document.querySelector(".header__nav ul");
var about = document.getElementsByClassName("about")[0];

anchor.addEventListener('click', function(event){
    event.preventDefault();

    let dest = document.querySelector("div."+event.target.id);
    if(dest.textContent == "HOME") toTop();
    else smootScroll(event, dest);
});

var totop = document.getElementsByClassName('top')[0];

window.addEventListener("scroll", function(){
    if(window.pageYOffset >= 1000){
        totop.style.display = "block";
    }else{
        totop.style.display = "none";
    }
});

totop.addEventListener('click', function(event){
    toTop();
});

let link = document.querySelectorAll('.header__nav a');

function lostedAllCurrent(link) {
    for (var i = 0; i < link.length; i++) {
        link[i].classList.remove('current');
    }
}


for (var i = 0; i < link.length; i++) {
    link[i].addEventListener('click', function (event) {
        lostedAllCurrent(link);

        this.classList.add("current");
    });
}