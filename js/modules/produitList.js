import {displayProduit} from "./listOrVignette.js"
import {loadData} from "./getData.js"


////Affiche les differents produits a partir de l'api


const produits = document.getElementById('produits')

loadData()
const datas = JSON.parse(sessionStorage.getItem('datas'))

const displayData = () => {
    const ul = document.createElement('ul')
    produits.append(ul)
    for (const data of datas.products) {
        let produit = `<li>
                        <a href="produit-simple.html?id=${data.id}">
                            <img src="img/products/${data.category}/${data.subCategory}/${data.image}"></a><a
                            href="produit-simple.html?id=${data.id}">
                            <h3>${data.name}</h3><span>${data.price}€</span>
                        </a>
                    </li>`
    ul.insertAdjacentHTML("beforeend", produit)
    } 
   displayProduit(datas) 
}
displayData()

