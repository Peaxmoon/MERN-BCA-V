
require('dotenv').config()
// const dotenv = require('dotenv')
const express = require('express')
// const express from 'express'
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/hello', (req, res) => {
  res.send('Hello sujjal!')
})

app.get('/hello/:name', (req, res) => {
  const name = req.params.name
  res.send(`Hello ${name}!`)
})

app.get('/login', (req, res) => {
    res.send("Login From or page")
})

app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${port}`)
})
