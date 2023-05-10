function nextpage(page) {
    window.location.href = page
}

const buttonCriar = document.querySelector(".buttonum")




buttonCriar.addEventListener("click", function () {

    var nomeInput = document.getElementById("nome")
    var emailInput = document.getElementById("email")
    var passwordInput = document.getElementById("password")
    var confirmarPasswordInput = document.getElementById("confirmarPassword")


    if (nomeInput.value !== "") {

        if (emailInput.value !== "") {


            if (passwordInput.value !== "") {


                if (confirmarPasswordInput.value !== "") {


                    if (confirmarPasswordInput.value === passwordInput.value) {
                        const salvar = {
                            name: nomeInput.value,
                            email: emailInput.value,
                            password: passwordInput.value
                        }


                        fetch("http://localhost:8080/user", {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(salvar)
                        }).then((response => response.json())).then(data => {
                            if (!!data && !!data.mensagem) {
                                alert(data.mensagem)
                                nextpage("../tela de login/index.html")
                            }else if(!!data && !!data.error){
                               alert(data.error) 
                            }
                        }).catch(error => {
                            console.error(error);
                        });

             


                    } else { alert("Senhas diferente") }
                } else { alert("Senha invalida") }
            } else { alert("Senha invalida") }
        } else { alert("Email invalido") }
    } else {
        alert("Nome invalido")

    }




})






function proximapagina(voltar) {
    window.location.href = voltar
}
const buttonVoltar = document.querySelector(".buttondois")

buttonVoltar.addEventListener("click", function () {
    nextpage("../tela de login/index.html")
})