const node_server = require('node-media-server')
const config = require('./utils/config')
const express = require('express')
const app = express()
app.get('/',(req, res)=>{
	return(res.json({ message: 'ey' }))
})


const nms = new node_server(config.rtmp_server)
nms.run()
