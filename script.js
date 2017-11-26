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


function addClass(element, name){
    var i, arr1, arr2;
    arr1 = element.className.split(" ");
    arr2 = name.split(" ");
    
    for (let i = 0; i < arr2.length; i++) {
        if(arr1.indexOf(name) == -1) 
           element.className += " " + name;
    }
}

function removeClass(element, name){
    var i, arr1, arr2;
    arr1 = element.className.split(" ");
    while (arr1.indexOf(name) > -1) {
        arr1.splice(arr1.indexOf(name), 1); 
    }
    element.className = arr1.join(" ");
}

var item = document.querySelectorAll('.porto img');

function filterSelection(cat){
    var i;
    
    if(cat == "all") cat = "";
    
    for (i = 0; i < item.length; i++) {
        if (item[i].className.indexOf(cat) > -1){
            removeClass(item[i], "hide");
            addClass(item[i], "show");
        }else{
            removeClass(item[i], "show");
            addClass(item[i], "hide");
        }
    }
}

var porAnchor = document.querySelectorAll('#navigation li');

porAnchor[0].addEventListener('click', function(event){
    event.preventDefault();
    filterSelection('all');
});

porAnchor[1].addEventListener('click', function(event){
    event.preventDefault();
    filterSelection('web-d');
});

porAnchor[2].addEventListener('click', function(event){
    event.preventDefault();
    filterSelection('web-a');
});

porAnchor[3].addEventListener('click', function(event){
    event.preventDefault();
    filterSelection('mob-a');
});

window.addEventListener('load', function(event){
    event.preventDefault();
    filterSelection('all');
});