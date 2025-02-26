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
let data = [];
let topApplications = [];
async function loadData(){
    try{
        const response = await fetch("https://studenter.miun.se/~mallar/dt211g/");
        if(!response.ok){
            throw new Error("Fel vid laddnig av datan...");
        }
        data = await response.json();
        sortData(data);
    }catch(error){
        console.error(error);
        document.querySelector("#error").innerHTML = "<p>Ett fel uppstod - prova igen senare!</p>"
    }
}

function sortData(data){
    const programs = data.filter(a => a.type === "Program");
    programs.sort((a, b) => b.applicantsTotal - a.applicantsTotal);
    for(let i = 0; i < 6; i++){
        topApplications.push(programs[i]);
    }
    printFirstChart(topApplications);
}
function printFirstChart(data){
    const ctx = document.getElementById("firstChart");
    let newApplication = data;
    console.log(newApplication);
    new Chart(ctx, {
        type: "bar",
        data: {
            labels: [newApplication[0].name, newApplication[1].name, newApplication[2].name, newApplication[3].name, newApplication[4].name, newApplication[5].name],
            datasets: [{
                label: "Antal ansökningar",
                data: [newApplication[0].applicantsTotal, newApplication[1].applicantsTotal, newApplication[2].applicantsTotal, newApplication[3].applicantsTotal, newApplication[4].applicantsTotal, newApplication[5].applicantsTotal],
                borderWidth: 1
            }],
        },
            options: {
                plugins: {
                    title: {
                        display: true,
                        text: "Mest sökta program HT23 på Mittuniversitetet"
                    }
                }
        }
    });
}

