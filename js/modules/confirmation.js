////Permet d'afficher un numero de commande aleatoire et supprime la commande

if (sessionStorage.getItem('commande')) {
    const confirmation = document.getElementById('confirmation-commande')
    confirmation.innerHTML = `Votre commande n°${Math.floor(Math.random() * (1000 - 0))} a bien été pris en compte`
    confirmation.style.textAlign = "center"
    sessionStorage.removeItem('commande')
}
