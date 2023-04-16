import {nbrProduitAct} from "./panierGlobal.js"
import {addItemToPanier} from "./addItemToPanier.js"
import {loadData} from "./getData.js"


////Permet d'afficher le bon produit selectioner dans le menu categorie a partir 
////de sa sous-categorie present dans l'url


const produitSimple = document.getElementById('produits-categorie')
const url = new URL(window.location.href)
const urlSubCat = url.searchParams.get('subcat')

loadData()
const datas = JSON.parse(sessionStorage.getItem('datas'))


const displayData = () => {
    sessionStorage.setItem("products", JSON.stringify(datas.products))
    if (!localStorage.getItem("panier")) {
        localStorage.setItem("panier", "[]")
    }

    for (let i = 0; i < datas.products.length; i++) {
        if (datas.products[i].subCategory === urlSubCat) {
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
                                            <input type="number" min="1" step="1" value="1" id="price">
                                            <button type="submit" class="bt-panier" id="bt-panier" href="panier.html?id=1">Ajouter au panier</button>
                                            <span id="calcul-price" style = "margin-left: 20px; font-size: 22px">${price}€</span>
                                        </form>
                                    </footer>
                                </div>
                            </div>
                        </article>`
            produitSimple.insertAdjacentHTML('beforeend', produit)



            ////Permet de modifeir la quantite d'un produit et de l'ajouter au panier
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
                affichageprix.innerHTML = `${quantiteProduit.value * price}€`
                datas.products[i].quantity = Number(quantiteProduit.value)
            })

            const ajoutPanier = document.querySelector('#panier')
            ajoutPanier.addEventListener('submit', (e) => {
                e.preventDefault()
                updateQuantity(id, Number(quantiteProduit.value)) 
                addItemToPanier(id)
                nbrProduitAct()
            })
        }
    }
}
displayData()


