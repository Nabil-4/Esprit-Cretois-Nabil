////Affiche une popup apres 1.5s qui n'apparait qu'une seule fois sur le site 
////peut importe la page sur laquelle on n'arrive

setTimeout(function () {
    const body = document.body;

    if (!sessionStorage.getItem('popup')) {
        const div = document.createElement('div')
        body.append(div)
        div.style.width = "500px"
        div.style.height = "300px"
        div.style.background = "lightgrey"
        div.style.display = "flex"
        div.style.justifyContent = "center"
        div.style.alignItems = "center"
        div.style.position = "absolute"
        div.style.top = "30%"
        div.style.left = "35%"

        const p = document.createElement('p')
        div.append(p)
        p.innerHTML = "POP-UP"
        p.style.textAlign = "center"
        p.style.top = "40%"
        p.style.background = "#12247a"
        p.style.color = "white"
        p.style.padding = "10px"

        const span = document.createElement('span')
        div.append(span)
        span.style.width = "20px"
        span.style.height = "20px"
        span.style.cursor = "pointer"
        span.style.background = "red"
        span.style.position = "absolute"
        span.style.top = "5px"
        span.style.right = "5px"

        span.addEventListener('click', () => {
            div.remove()
            sessionStorage.setItem('popup', 'false')
        })
    }
}, 1500);

