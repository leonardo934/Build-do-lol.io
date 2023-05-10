const urlParams = new URLSearchParams(window.location.search);
const user = urlParams.get('user');
const id = urlParams.get('id');
console.log(user)
console.log(id)




function nextpage(voltar) {
    window.location.href = voltar
}

function proximapagina(sair) {
    window.location.href = sair
}
const buttonSair = document.querySelector(".buttonsair")

buttonSair.addEventListener("click", function () {
    nextpage("../inicio/index.html")
    fetch("http://localhost:8080/logoff", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },




    })

})