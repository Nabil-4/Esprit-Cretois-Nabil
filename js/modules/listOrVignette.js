import {nbrProduitAct} from "./panierGlobal.js"
import {addItemToPanier} from "./addItemToPanier.js"
import {loadData} from "./getData.js"

////Permet de changer l'agencement des produit en liste ou en vignette
////Et de sauvegarder dans le localStorage l'agencement choisi

const displayProduit = () => {
    const list = document.querySelector('#bt-display-products i:nth-child(1)')
    const vignette = document.querySelector('#bt-display-products i:nth-child(2)')

    list.addEventListener('click', () => {
        localStorage.setItem('list', true)
        window.location.reload()
    })

    vignette.addEventListener('click', () => {
        localStorage.setItem('list', false)
        window.location.reload()
    })

    ////Si la valuer de "list" est true l'affichage des produits se fait en liste

    if (JSON.parse(localStorage.getItem('list')) == true) {
        loadData()
        const datas = JSON.parse(sessionStorage.getItem('datas'))

        const produitSimple = document.getElementById('produits')
        produitSimple.firstChild.remove()

        const displayData = () => {
            sessionStorage.setItem("products", JSON.stringify(datas.products))
            if(!localStorage.getItem("panier")) {
                localStorage.setItem("panier", "[]")
            }
        
            for (let i = 0; i < datas.products.length; i++) {
                const { id, name, category, subCategory, image, description, price } = datas.products[i]
                let produit = `<article style= "margin-bottom: 50px">
                                <div style = "display: flex">
                                    <figure><a href="produit-simple.html?id=${id}"><img src="img/products/${category}/${subCategory}/${image}" style = "width: 350px; max-width: none"></a></figure>
                                    <div style = "margin: 15px">
                                    <h3>${name}</h3>
                                        <p></p>
                                        <p>${description}</p>
                                        <p></p>
                                        <footer style = "background: none">
                                            <form id="panier">
                                                <input type="number" min="1" step="1" value="1" id="price" style = "display: none">
                                                <button type="submit" class="bt-panier" id="bt-panier" href="panier.html?id=1">Ajouter au panier</button>
                                                <span id="calcul-price" style = "margin-left: 20px; font-size: 22px">${price}€</span>
                                            </form>
                                        </footer>
                                    </div>
                                </div>
                            </article>`
                produitSimple.insertAdjacentHTML('beforeend', produit)

                ////Permet d'ajouter un produit directement dans le panier quand les produit sont afficher en liste

                const form = document.querySelector(`#produits article:nth-child(${i+1}) form`)
                form.addEventListener('submit', (e) => {
                    e.preventDefault()
                    addItemToPanier(id)
                    nbrProduitAct()
                })
            }
        }   
        displayData()
    }
}

export {displayProduit}

