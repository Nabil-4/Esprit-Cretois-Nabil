////Permet d'afficher le nombre de produit et le prix total sur toutes les pages

const nbrProduitAct = () => {
    const nbrProduit = document.querySelector('.nbre-produits')
    let totalP = 0

    if (localStorage.getItem('panier')) {
        for (let i = 0; i < JSON.parse(localStorage.getItem('panier')).length; i++) {
            let total = (JSON.parse(localStorage.getItem('panier'))[i].price * JSON.parse(localStorage.getItem('panier'))[i].quantity)
            totalP += total
        }
        nbrProduit.innerHTML = `${JSON.parse(localStorage.getItem('panier')).length} article(s) ${totalP.toFixed(2)}€`
    } else {
        totalP = 0
        nbrProduit.innerHTML = `0 article 0.00€`
        
    }
    return totalP
}

const totalP = nbrProduitAct()

export {totalP, nbrProduitAct}




