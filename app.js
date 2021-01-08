const { query } = require('express')
const express = require('express')
const app = express()
const request = require("request")
const env = require('dotenv').config()


app.set("view engine", "ejs")


app.get("/", (req,res) =>{
    res.render("search")
})

app.get("/result", (req,res) =>{
    const searchRes =  req.query.search
    const url = `http://www.omdbapi.com/?apikey=${process.env.key}&s=` + searchRes;
    request(url, (error, response, body) =>{
        if(!error && response.statusCode === 200){
            const result =JSON.parse(body)
            res.render("results", {result: result})
        }
    })
})

app.get("*", (req,res) =>{
    res.render("error")
})

app.listen(process.env.PORT||3200, ()=>{
    console.log("Movie app started");
})