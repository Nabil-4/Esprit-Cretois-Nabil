////Permet d'ajouter un produit ainsi que sa quantite dans le panier

const addItemToPanier = (productId) => {
    let products = JSON.parse(sessionStorage.getItem("products"))
    let panier = JSON.parse(localStorage.getItem("panier"))

    const quantiteProduit = document.querySelector('input[type=number]')

    let product = products.find(function(product) {
        return product.id == productId
    }) ;

    if(panier.length == 0) {
        product.quantity = Number(quantiteProduit.value)
        panier.push(product);
    } else {
        let res = panier.find(element => element.id == productId);
        if (res === undefined) {
            product.quantity = Number(quantiteProduit.value)
            panier.push(product)
        }
    }
    localStorage.setItem('panier', JSON.stringify(panier))
    const ajoutToPanier = document.querySelector('#primary-nav li:last-child')
    ajoutToPanier.classList.add('animPanier')
    setTimeout(function () {
        ajoutToPanier.classList.remove('animPanier')
    }, 450);
}

export {addItemToPanier}