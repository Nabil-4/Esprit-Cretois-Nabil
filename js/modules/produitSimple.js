import {nbrProduitAct} from "./panierGlobal.js"
import {addItemToPanier} from "./addItemToPanier.js"
import {loadData} from "./getData.js"


////Affiche le bon produit selectionner grace a l'id recuperer dans l'url

loadData()
const datas = JSON.parse(sessionStorage.getItem('datas'))

const produitSimple = document.getElementById('produit-simple')

const displayData = () => {
    const url = new URL(window.location.href)
    const urlId = url.searchParams.get('id')

    const {id, name, category, subCategory, image, description, price} = datas.products[urlId-1]
    let produit = `<article>
                            <h3>${name}</h3>
                            <div>
                                <figure><img src="img/products/${category}/${subCategory}/${image}"></figure>
                                <div>
                                    <p></p>
                                    <p>${description}</p>
                                    <p></p>
                                    <footer>
                                        <form id="panier">
                                            <input type="hidden" id="id" value="1">
                                            <input type="number" min="1" step="1" value="1" id="price">
                                            <span id="calcul-price">${price}€</span>
                                            <button type="submit" class="bt-panier" id="bt-panier" href="panier.html?id=1">Ajouter au panier</button>
                                        </form>
                                    </footer>
                                </div>
                            </div>
                        </article>`
    produitSimple.insertAdjacentHTML('beforeend', produit)


    ////Permet d'ajouter un produit et de modifier sa quantite

    let panier = JSON.parse(localStorage.getItem("panier"))
    const updateQuantity = (productId, quantity) => {
        for (let product of panier) {
            if (product.id == productId) {
                product.quantity = quantity
            }
        }
        localStorage.setItem("panier", JSON.stringify(panier))
    }


    const affichageprix = document.querySelector('#panier span')
    const quantiteProduit = document.querySelector('input[type=number]')
    quantiteProduit.addEventListener('input', () => {
        affichageprix.innerHTML = `${(quantiteProduit.value * price).toFixed(2)}€` 
        datas.products[urlId-1].quantity = Number(quantiteProduit.value)  
    }) 


    sessionStorage.setItem("products", JSON.stringify(datas.products))
    if(!localStorage.getItem("panier")) {
        localStorage.setItem("panier", "[]")
    }


    const ajoutPanier = document.getElementById('panier')
    ajoutPanier.addEventListener('submit', (e) => {
        e.preventDefault()
        updateQuantity(urlId, Number(quantiteProduit.value)) 
        addItemToPanier(urlId)
        nbrProduitAct()
    })   
}
displayData()











