import {loadData} from "./getData.js"

////Permet de faire apparaitre puis disparaitre le menu categorie

const btCategorie = document.getElementById('bt-categories')
btCategorie.style.display = "none"
const categories = document.getElementById('menu-categories')

btCategorie.addEventListener('click', () => {
    if (!categories.classList.contains('animslideOn')) {
        categories.classList.add('animslideOn')
        categories.classList.remove('animslideOff')
        const body = document.body.classList.add('stop-scrolling')
    } else {
        categories.classList.remove('animslideOn')
        categories.classList.add('animslideOff')
        const body = document.body.classList.remove('stop-scrolling')
    }
})

////Recupere les donnees de l'api et cree les noms des categorie avec des sous-menu
window.addEventListener('load', () => {
    btCategorie.style.display = "block"
    loadData()
    const datas = JSON.parse(sessionStorage.getItem('datas'))

    const displayData = () => {
        const categorieNav = document.createElement('nav')
        categories.prepend(categorieNav)
        const categorieUl = document.createElement('ul')
        categorieNav.prepend(categorieUl)

        ////Creation du bon nombre de sous-menu en fonction de chaque categorie
        let menuSuivant = 1
        for (const object of datas.category) {
            const categorieLi = `<li>
                                <a href= "#" class="bt-menu-slide">${object.name}</a>
                                <ul>
                                </ul>
                            </li>`
            categorieUl.insertAdjacentHTML('beforeend', categorieLi)

            const subUl = document.querySelector(`#menu-categories nav ul li:nth-child(${menuSuivant}) ul`)

            for (let i = 0; i < object.subCategory.length; i++) {
                const subLi = `<li><a class="bt-menu-slide" href="produits-categorie.html?cat=${object.slug}e&amp;subcat=${object.subCategory[i].slug}">${object.subCategory[i].name}</a></li>`
                subUl.insertAdjacentHTML('beforeend', subLi)
            }
            menuSuivant++
        }


        ////Permet d'afficher un produit aleatoire a chaque ouverture du menu

        btCategorie.addEventListener('click', () => {
            const nbrAleatoire = Math.floor(Math.random() * (datas.products.length - 0))
            const { id, name, category, subCategory, image, price } = datas.products[nbrAleatoire]

            if (categories.classList.contains('animslideOn')) {
                let divImage = `<div>
                            <p>Nouveauté</p><a href="produit-simple.html?id=${id}"><img
                            src="img/products/${category}/${subCategory}/${image}"></a>
                            <span>${name}</span>
                            <span>${price} €</span>
                        </div> `
                categories.insertAdjacentHTML('beforeend', divImage)
            } else if (categories.classList.contains('animslideOff')) {
                const div = document.querySelector('#menu-categories div')
                setTimeout(function () {
                    div.remove();
                }, 300);
            }
        })
    }
    displayData()
})