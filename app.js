const node_server = require('node-media-server')
const config = require('./utils/config')
<<<<<<< HEAD
const express = require('express')
const app = express()
app.get('/',(req, res)=>{
	return(res.json({ message: 'ey' }))
})
=======
>>>>>>> 92904bb663afa007f88aea24dedcacc5af73d9f6


const nms = new node_server(config.rtmp_server)
nms.run()
