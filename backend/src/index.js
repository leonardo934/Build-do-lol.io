const jwt = require('jsonwebtoken');
const db = require('./config/data')
const cors = require('cors')
const express = require("express")
const app = express()

app.use(express.json())
app.use(cors())

app.post("/user", (req, res) => {
    const name = req.body.name
    const email = req.body.email
    const password = req.body.password

    if (!!name && !!email && !!password) {
        db.query("SELECT * FROM users WHERE email = $<email>", { email: email }).then((data) => {
            if (!!data.length) {

                res.json({ error: "Usuário existente" })
            } else {
                db.query("INSERT INTO users (name, password, email) VALUES($<name>, $<password>, $<email>)", {
                    name: name,
                    password: password,
                    email: email

                }).then((data) => {

                    res.json({ mensagem: "Cadastrado(a) com sucesso" })

                })
            }
        })
    } else {
        res.json({ error: "Campos invalidos" })
    }



})

app.post("/login", (req, res) => {
    const email = req.body.email
    const password = req.body.password

    if (!!email && !!password) {

        db.query("SELECT id, name FROM users WHERE email = $<email> AND password = $<password>", { email: email, password: password }).then((data) => {

            if (!!data.length) {
                const token = jwt.sign(data[0].id, process.env.SECRET_KEY);
                db.query("UPDATE users SET token = $<token> WHERE id = $<id> RETURNING id, token", {
                    token: token,
                    id: data[0].id
                }).then((data) => {

                    res.json({ mensagem: "Usuário logado com sucesso", user: data[0].id, token: token })

                })




            } else {
                res.json({ error: "Usuário não existente, ou não cadastrado" })
            }

        })

    } else {
        res.json({ error: "Campos invalidos" })
    }


})


app.post("/logoff", (req, res) => {
    const token = req.body.token.replace('"', '').replace('"', '')
    if (!!token) {
        jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
            if (err) {
                res.json({ error: 'Erro ao verificar token:', err })
            } else {
                db.query("UPDATE users SET token = $<token> WHERE id = $<id> ", {
                    token: null,
                    id: decoded
                }).then((data) => {
                    res.json({ mensagem: "Usuário deslogado com sucesso" })
                })
            }
        });
    } else {
        res.json({ error: "Usuário invalido" })
    }
})
/*rota para criar, listar, editar e deletar builds*/

app.post("/build", (req, res) => {

})




app.listen(8080, () => {
    console.log("servidor ligado")
})