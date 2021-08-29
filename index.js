const express = require("express");
const cors = require('cors');
const mysql = require('mysql');
const app = express()
const db = mysql.createPool({
    user: "root",
    host: "localhost",
    password: "kartikdb@309",
    database: "siteusers",
})

app.use(express.json())
app.use(cors())
app.listen(3001, () => {
    console.log("server running successfully ")
})
app.post('/api/insert', (req, res) => {
    let UserName = req.body.Username
    let UserEmail = req.body.Useremail
    let UserNumber = req.body.Usernumber
    db.query(`insert into siteusers.contactdetails (name,email,number) values (?,?,?)`, [UserName, UserEmail, UserNumber], (error, result) => {
        if (error) {
            console.log(error)
        } else {
            res.send("Create function is partially completed")
        }
    })
})
app.get('/api/select', (req, res) => {
    db.query(`SELECT * FROM siteusers.contactdetails`, (error, result) => {
        if (error) {
            console.log(error)
        } else {
            res.send(result)
        }
    })
})
app.delete(`/api/delete/:index`, (req, res) => {
    let id = req.params.index
    db.query(`DELETE from siteusers.contactdetails where id=?`, [id], (error, result) => {
        if (error) {
            console.log(error)
        } else {
            res.send(result)
        }
    })
})
app.post('/api/update', (req, res) => {
    let UserName = req.body.NewUsername
    let UserEmail = req.body.NewUseremail
    let UserNumber = req.body.Newphoneno
    let UserId = req.body.Userid
    db.query(`UPDATE siteusers.contactdetails SET name=?,email =?,number=? WHERE id=?`, [UserName, UserEmail, UserNumber, UserId], (error, result) => {
        if (error) {
            console.log(error)
        } else {
            res.send("updated successfully")
        }
    })
})
app.get('/api/sort', (req, res) => {
    db.query(`SELECT * FROM siteusers.contactdetails ORDER BY name ASC`, (error, result) => {
        if (error) {
            console.log(error)
        } else {
            res.send(result)
        }
    })
})
app.get('/', (req, res) => {
    res.send("good morning server running successfully")
})