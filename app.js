const express = require('express')
const path = require('path')

const app = express()
const port = process.env.PORT || 5000



app.use('/', require(path.join(__dirname, 'routes/routers.js')))



app.listen(port,()=>{
    console.log(`App is listening at http://localhost:${port}`)
})