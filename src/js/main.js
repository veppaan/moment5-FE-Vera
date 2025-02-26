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
        sortPrograms(data);
        sortCourses(data);
    }catch(error){
        console.error(error);
        document.querySelector("#error").innerHTML = "<p>Ett fel uppstod - prova igen senare!</p>"
    }
}

function sortPrograms(data){
    const programs = data.filter(a => a.type === "Program");
    programs.sort((a, b) => b.applicantsTotal - a.applicantsTotal);
    for(let i = 0; i < 6; i++){
        topApplications.push(programs[i]);
    }
    printFirstChart(topApplications);
}

function printFirstChart(data){
    const firstChart = document.getElementById("firstChart");
    new Chart(firstChart, {
        type: "bar",
        data: {
            labels: [data[0].name, data[1].name, data[2].name, data[3].name, data[4].name, data[5].name],
            datasets: [{
                label: "Antal ansökningar",
                data: [data[0].applicantsTotal, data[1].applicantsTotal, data[2].applicantsTotal, data[3].applicantsTotal, data[4].applicantsTotal, data[5].applicantsTotal],
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

function sortCourses(data){
    let fiveCourses = [];
    const courses = data.filter(a => a.type === "Kurs");
    courses.sort((a, b) => b.applicantsTotal - a.applicantsTotal);
    for(let i = 0; i < 5; i++){
        fiveCourses.push(courses[i]);
    }
    printSecondChart(courses);
}
    function printSecondChart(data){
        const secondChart = document.getElementById("secondChart");
        new Chart(secondChart, {
            type: "pie",
            data: {
                labels: [data[0].name, data[1].name, data[2].name, data[3].name, data[4].name],
                datasets: [{
                    label: "Antal ansökningar",
                    data: [data[0].applicantsTotal, data[1].applicantsTotal, data[2].applicantsTotal, data[3].applicantsTotal, data[4].applicantsTotal],
                    borderWidth: 1
                }],
            },
                options: {
                    responsive: false,
                    maintainAspectRatio: false,
                    plugins: {
                        title: {
                            display: true,
                            text: "Mest sökta kurser HT23 på Mittuniversitetet"
                        }
                    }
            }
        });
    }
