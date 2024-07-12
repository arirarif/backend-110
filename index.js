require('dotenv').config()
const express = require('express')
const swaggerUI = require('swagger-ui-express')
const YAML = require('yamljs')
const swaggerDoc = YAML.load('./swagger.yaml.yaml')

const connection = require('./db')

// express app

const app = express()
app.use(express.json())
app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerDoc))


// server ready

app.get('./health', (_req, res) =>{
    res.status(200).json({
        health: 'OK'
    })
})

app.get('/api/v1/articles', (req, res) =>{
    // 1. find queries/ extract query parmas
    const page = +req.query.page || 1
    const limit = +req.query.limit || 10
    const sortType = req.query.sortType || 'asc'
    const sortBy = req.query.sortBy || 'updatedAt'
    const searchTerm = req.query.searchTerm || ''

    // console.log('Query params', req.query);
    // console.log('Default parmas', {page, limit, sortType, sortBy, searchTerm});


    // 2. call articles service to fatch all articles 

    

    // 3. generate neccessary response
    // 4. 
    res.status(200).json({path: '/articles', method: 'get'})
})

app.post('/api/v1/articles', (req, res) =>{
    res.status(200).json({path: '/articles', method: 'post'})
})

app.get('/api/v1/articles/:id', (req, res) =>{
    res.status(200).json({path: `/articles/${req.params.id}`, method: 'get'})
})

app.put('/api/v1/articles/:id', (req, res) =>{
    res.status(200).json({path: `/articles/${req.params.id}`, method: 'put'})
})

app.patch('/api/v1/articles/:id', (req, res) =>{
    res.status(200).json({path: `/articles/${req.params.id}`, method: 'patch'})
})

app.delete('/api/v1/articles/:id', (req, res) =>{
    res.status(200).json({path: `/articles/${req.params.id}`, method: 'delete'})
})

app.post('/api/v1/auth/signup', (req, res) =>{ 
    res.status(200).json({path: '/auth/signup', method: 'post'})
})

app.post('/api/v1/auth/signin', (req, res) =>{ 
    res.status(200).json({path: '/auth/signin', method: 'post'})
})


app.listen(4000, ()=>{
    console.log('server is listening in PORT 4000');
})