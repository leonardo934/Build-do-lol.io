function nextpage(page) {
    window.location.href = page
}

const buttonlogar = document.querySelector(".buttonum")



buttonlogar.addEventListener("click", function () {


    const emailInput = document.getElementById("email")
    const passwordInput = document.getElementById("password")


    if (emailInput.value !== "") {
        if (passwordInput.value !== "") {



            const guardar = {
                email: emailInput.value,
                password: passwordInput.value
            }


            fetch("http://localhost:8080/login", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },

                body: JSON.stringify(guardar)

            }).then((response => response.json())).then(data => {

                if (!!data && !!data.mensagem) {
                    alert(data.mensagem)
                    window.localStorage.setItem("token", JSON.stringify(data.token))
                    nextpage("../inicio/index.html")

                } else if (!!data && !!data.error) {
                    alert(data.error)
                }

            }).catch(error => {
                console.error(error);
            });


        } else { alert("Email ou Senha invalida") }
    } else {

        alert("Email ou Senha invalida")
    }



})
















function proximapagina(criar) {
    window.location.href = criar
}
const buttonCriar = document.querySelector(".buttondois")

buttonCriar.addEventListener("click", function () {
    nextpage("../cadastrar/index.html")
})





















