function nextpage(voltar) {
  window.location.href = voltar
}

function proximapagina(sair) {
  window.location.href = sair
}
const buttonSair = document.querySelector(".buttonsair")

buttonSair.addEventListener("click", function () {
  fetch("http://localhost:8080/logoff", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },

    body: JSON.stringify({ token: window.localStorage.getItem("token") }),
   

  }).then((response => response.json())).then(data => {

    if (!!data && !!data.mensagem) {
      alert(data.mensagem)
      window.localStorage.removeItem("token")
      nextpage("../tela de login/index.html")
    } else if (!!data && !!data.error) {
      alert(data.error)
    }

  }).catch(error => {
    console.error(error);
  });


})




const cards_main = document.querySelector("#cards-main")
const a = [
  {
    id: 1,
    user_id:1,
    titulo: "Build leonardo",
    avatar: "../img/pykeimg.png",
    descricao: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem voluptatumat quealiquid?",
    itens: [{ avatar: "../img/pykeimg.png" }, { avatar: "../img/pykeimg.png" }, { avatar: "../img/pykeimg.png" }],
    runa: [{ avatar: "../img/pykeimg.png" }, { avatar: "../img/pykeimg.png" }]
  },

  {
    id: 2,
    user_id:1,
    titulo: "Build leandro",
    avatar: "../img/download.png",
    descricao: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem voluptatumat quealiquid?",
    itens: [{ avatar: "../img/download.png" }, { avatar: "../img/download.png" }, { avatar: "../img/download.png" }],
    runa: [{ avatar: "../img/download.png" }, { avatar: "../img/download.png" }]
  },

]

// a.map((card, index) => {
//   let new_card = `

//     <a class="link-card" type="button" data-bs-toggle="modal" data-bs-target="#${index}-modal">
//     <div class="col ">
//       <div class="card h-100 primary-color rounded">
//         <div class="d-flex align-items-center">
//           <img src="${card.avatar}" class="card-img-top  rounded-circle" alt="pykeimg">
//           <h5 class="card-use color-text">${card.titulo}</h5>
//         </div>
//         <div class="card-body">
//           <p class="card-text color-text">${card.descricao}</p>
//           <div class="d-flex justify-content-between">
//             <div>
//               ${card.itens.map((item) => {
//     return ` <img src="${item.avatar}" alt="" class="biuld-itens  rounded-circle">`
//   })}

//             </div>
//             <div>

//               ${card.runa.map((rune) => {
//     return ` <img src="${rune.avatar}" alt="" class="biuld-runas  rounded-circle">`
//   })}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//     </a>


//     <div class="modal fade" id="${index}-modal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
//       <div class="modal-dialog">
//         <div class="modal-content">
//           <div class="modal-header">
//             <h1 class="modal-title fs-5" id="staticBackdropLabel">Editar biuld</h1>
//             <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Sair"></button>
//           </div>
//           <div class="modal-body">
//             ...
//           </div>
//           <div class="modal-footer">
//             <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
//             <button type="button" class="btn btn-primary">Salvar</button>
//           </div>
//         </div>
//       </div>
//     </div>
//     `
//   cards_main.innerHTML += new_card;
// })


a.map((card, index) => {
  let new_card = `

      <a href="../build/index.html?user=${card.user_id}&id=${card.id}" class="link-card" type="button" >
      <div class="col ">
        <div class="card h-100 primary-color rounded">
          <div class="d-flex align-items-center">
            <img src="${card.avatar}" class="card-img-top  rounded-circle" alt="pykeimg">
            <h5 class="card-use color-text">${card.titulo}</h5>
          </div>
          <div class="card-body">
            <p class="card-text color-text">${card.descricao}</p>
            <div class="d-flex justify-content-between">
              <div>
                ${card.itens.map((item) => {
      return ` <img src="${item.avatar}" alt="" class="biuld-itens  rounded-circle">`
    })}
                
              </div>
              <div>
              
                ${card.runa.map((rune) => {
      return ` <img src="${rune.avatar}" alt="" class="biuld-runas  rounded-circle">`
    })}
              </div>
            </div>
          </div>
        </div>
      </div>
      </a>
    

    `
  cards_main.innerHTML += new_card;
})
