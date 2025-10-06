import { fetchQuote } from './fetchQuote.js';
import {fonts} from './fonts.js';
let placeQuote=document.querySelector("#quote");
let category=document.querySelector("#category");
let button=document.querySelector("button");
let body=document.querySelector("body");
let main=document.querySelector("main");
let sectionQuote=document.querySelector("#quoteSection");
let favori=document.querySelector("img");
let getFavorite=document.getElementById("getFavorite");
let sectionFavorite=document.querySelector("#favoriteSection");
function getRandomColor(){
    let red = Math.floor(Math.random() * 256);
    let green = Math.floor(Math.random() * 256);
    let blue = Math.floor(Math.random() * 256);
    return {red,green,blue};
}

function addToFavorite(quote,category){
    let favorite={quote,category};
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    favorites.push(favorite);
    localStorage.setItem("favorites",JSON.stringify(favorites));
}

function changeStyle(){
    let {red,green,blue}=getRandomColor();
    body.style.backgroundColor=`rgba(${red},${green},${blue},0.5)`
    button.style.backgroundImage=`linear-gradient(to right, rgba(${red},${green},${blue},0.8) 0%, rgba(${red},${green},${blue},0.6) 50%, rgba(${red},${green},${blue},0.2) 100%)`;
    button.style.border=`border: 1px solid rgb(red, green, blue)` ; 
    let myfont=fonts[Math.floor(Math.random() * fonts.length)];
    main.style.fontFamily=myfont;
    button.style.fontFamily=myfont;
}

async function showQuote(){
    try{
        let data= await fetchQuote();
        placeQuote.innerText=data[0].quote;
        if( placeQuote.textContent.length>250){
            showQuote();
            return;
        }
        category.innerText=`Category : ${data[0].category}.`;
        changeStyle();
        sectionFavorite.style.display="none";
    }
    catch(err){
        console.log(err.message);
    }
    
}

document.addEventListener("DOMContentLoaded",showQuote);

button.addEventListener("click",()=>{
    placeQuote.textContent="Loading...";
    category.textContent="";
    favori.src="image.png"
    sectionFavorite.style.display="none";
    sectionQuote.style.display="grid";
    showQuote();
});

placeQuote.addEventListener("click",()=>{
    navigator.clipboard.writeText(placeQuote.textContent);
    let copied = document.createElement("p");
    copied.textContent = "Copied!";
    copied.style.color = "green";
    copied.style.fontSize = "16px";
    copied.style.marginTop = "10px";

    sectionQuote.appendChild(copied);

    setTimeout(() => {
        sectionQuote.removeChild(copied);
    }, 1000);
})

favori.addEventListener("click",()=>{
    favori.src="image copy.png"

    let copied = document.createElement("p");
    copied.textContent = "Added to favorite!";
    copied.style.color = "green";
    copied.style.fontSize = "16px";
    copied.style.marginTop = "10px";
    sectionQuote.appendChild(copied);
    setTimeout(() => {
        sectionQuote.removeChild(copied);
    }, 1000);
    addToFavorite(placeQuote.textContent,category.textContent);

})
getFavorite.addEventListener("click",()=>{
    let favorites=JSON.parse(localStorage.getItem("favorites")) || [];
    sectionFavorite.innerHTML = "";
    favorites.forEach(element => {
        let thisquote=document.createElement("li");  
        let span=document.createElement("span");  
        let deleteBtn=document.createElement("button");  
        deleteBtn.textContent="Delete";
        span.textContent=element.quote;
        deleteBtn.addEventListener("click",()=>{
            sectionFavorite.removeChild(thisquote);
            let thisElement=element;
            favorites=favorites.filter(quote=>quote!==thisElement);
            localStorage.setItem("favorites",JSON.stringify(favorites));
            
        })
        thisquote.appendChild(span);
        thisquote.appendChild(deleteBtn);
        sectionFavorite.appendChild(thisquote);
    });
    if (favorites.length === 0) {
    sectionFavorite.innerHTML = "<span>No favorites yet!</span>";
}
    sectionQuote.style.display = "none";
    sectionFavorite.style.display="grid";

})


