////Permet d'envoyer la commande dans une api

const urlApi = "http://127.0.0.1:5500/undefined"
    const addItem = (commande, urlApi) => {
        fetch(urlApi, {
            method: 'POST',
            body: JSON.stringify(commande),
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            }
        })
    localStorage.setItem("panier", "[]") 
}

export {addItem}