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

if(animationBtn){
    animationBtn.addEventListener("click", startAnimation);
}
function startAnimation(){
    animationBtn.style.animation ="partyText 2s alternate ease-in-out"

    setTimeout(() =>{
        animationBtn.style.animation="";
    }, 2000);
}

window.onload = () =>{
    loadData();
}

//Ladda in data från URL
let courses = [];
let topApplications = [];
async function loadData(){
    try{
        const response = await fetch("https://studenter.miun.se/~mallar/dt211g/");
        if(!response.ok){
            throw new Error("Fel vid laddnig av datan...");
        }
        courses = await response.json();
        sortData(courses);
    }catch(error){
        console.error(error);
        document.querySelector("#error").innerHTML = "<p>Ett fel uppstod - prova igen senare!</p>"
    }
}

function sortData(data){
    data.sort((a, b) => b.applicantsTotal - a.applicantsTotal);
    for(let i = 0; i < 6; i++){
        topApplications.push(data[i]);
    }
    console.log(topApplications);
}

