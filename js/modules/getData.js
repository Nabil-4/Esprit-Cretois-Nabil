const urlApi = "http://127.0.0.1:5500/json/products.json"

const loadData = async () => {
    fetch(urlApi)
    .then(response => {
        return response.json()
    })
    .then(datas => {
        if (!sessionStorage.getItem("datas")) {
            sessionStorage.setItem("datas", JSON.stringify(datas))
        }
    })   
}
loadData()

export {loadData}


