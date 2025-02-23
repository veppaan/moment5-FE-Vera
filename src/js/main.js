"use strict";

//Hamburgermeny

let openBtn = document.getElementById("open-menu");
let closeBtn = document.getElementById("close-menu")

//Händelselyssnare
openBtn.addEventListener("click", toggleMenu);
closeBtn.addEventListener("click", toggleMenu);

function toggleMenu(){
    console.log("toggle");
    let navMenuEl = document.getElementById("nav-menu");

    let style = window.getComputedStyle(navMenuEl);
    
    if(style.display ==="none"){
        navMenuEl.style.display = "block";
    }else{
        navMenuEl.style.display = "none";
    }
}

let animationBtn = document.getElementById("animation-three");

animationBtn.addEventListener("click", startAnimation);

function startAnimation(){
    animationBtn.style.animation ="partyText 2s alternate ease-in-out"

    setTimeout(() =>{
        animationBtn.style.animation="";
    }, 2000);
}