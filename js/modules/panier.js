import {totalP, nbrProduitAct} from "./panierGlobal.js"
import {addItem} from "./envoieMethodPOST.js"

////On affiche toute les infos necessaire pour chaque produit ajouter au panier
const dataPanier = JSON.parse(localStorage.getItem('panier'))
const panier = document.querySelector('#panier table')
if (localStorage.getItem('panier')) { 
    for (const object of dataPanier) {
        const { id, category, subCategory, image, name, price, quantity } = object
        let produitInPanier = `<tbody id = ${id}>
                        <tr>
                            <td><img src="img/products/${category}/${subCategory}/${image}"
                                    alt="${name}"></td>
                            <td>${name}</td>
                            <td>${price}€</td>
                            <td><input type="number" id="${id}" min="1" max="50" value="${quantity}"></td>
                            <td id=total>${(price * quantity).toFixed(2)}€</td>
                            <td id="suppr"><a href = "#" >X</a></td>
                        </tr>
                    </tbody>`
        panier.insertAdjacentHTML('beforeend', produitInPanier)
    }
}




////Permet de mettre a jour la quantité
const updateQuantity = (productId, quantity) => {
    for (let product of dataPanier) {
        if (product.id == productId) {
            product.quantity = quantity
        }
    }
    localStorage.setItem("panier", JSON.stringify(dataPanier))
}

const quantiteProduit = document.querySelectorAll('input[type=number]')
const quantiteProduitArray = Array.from(quantiteProduit)
quantiteProduitArray.forEach(input => {
    input.addEventListener('input', () => {
        updateQuantity(input.id, Number(input.value)) 
    }) 
});

     


////Fonction permettant de supprimer un produit du panier et de recalculer le prix total
let panierLocal = JSON.parse(localStorage.getItem("panier"))
const removeItemFromPanier = (productId) => {
    let temp = panierLocal.filter(item => item.id != productId)
    localStorage.setItem("panier", JSON.stringify(temp))
    window.location.reload()
}

const suppr = document.querySelectorAll('#suppr')
const supprArray = Array.from(suppr)
supprArray.forEach(td  => {
    td.addEventListener('click', () => {
        const idProduit = td.parentElement.parentElement.id
        td.parentElement.parentElement.remove()
        removeItemFromPanier(idProduit)
        nbrProduitAct()
    })
});



////Affiche le prix total et recharge la page quand on click sur "Recalculer le panier"
if (localStorage.getItem('panier')) {
    let totalPanier = `<button id="recalcul-panier">Recalculer le panier</button>
                <div id="totalPrice">Total: ${totalP.toFixed(2)} €</div>`
    panier.insertAdjacentHTML('afterend', totalPanier)
    const recalculPanier = document.getElementById('recalcul-panier')
    recalculPanier.addEventListener('click', () => {
        window.location.reload()
    })
}



////Le formulaire ne s'affiche que si il y a au moins un produit
const form = document.getElementById('form-commande')
if (totalP > 0) {   
    form.style.display = "initial"
} else {
    const panierVide = document.querySelector('#commande h3')
    panierVide.innerHTML = 'Le panier est vide'
}
////On recupere le nom et valeur des entrees
////Pour les mettre dans un object avec le reste des produit
////Avant de renvoyer vers la page de confirmation
form.addEventListener('submit', (e) => {
    e.preventDefault()

    const formTab = []
    for (const entry of form) {
        if (entry.type === "submit") {
            continue
        }
        const entryObject = {
            name: entry.name,
            value: entry.value  
        } 
        formTab.push(entryObject)
    }
    const commande = {
        panier: dataPanier,
        shipping: formTab
    }
    sessionStorage.setItem('commande', JSON.stringify(commande))
    addItem()
    window.location.replace('confirmation-commande.html')
})



