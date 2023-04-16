////Se declenche au chargement du dom
document.addEventListener("DOMContentLoaded", ready);
function ready() {
   
    ////disparition du loader
    document.querySelector("#loader").classList.add("animLoader");


    ////Bouton pour revenir en haut de la page
    const btBackToTop = document.getElementById('back-to-top');
    btBackToTop.style.opacity = '0';
    window.addEventListener('scroll', () => {
        if (scrollY > 200) {
            btBackToTop.style.opacity = '1';
        } else {
            btBackToTop.style.opacity = '0';
        }
    })

    btBackToTop.addEventListener('click', () => {
        window.scrollTo({top: 0, behavior: 'smooth'});
    });

  
    ////Image aleatoire pour le header 
    const tabImgHeader = ["header-01.jpg", "header-02.jpg", "header-03.jpg"];
    const randomImgHeader = tabImgHeader[Math.floor(Math.random() * tabImgHeader.length)];
    if (document.getElementById('slider')) {
        const slider = document.getElementById('slider')
        slider.style.backgroundImage = `url(./img/header/${randomImgHeader})` 
        slider.style.backgroundSize = "cover"
    }
} 

