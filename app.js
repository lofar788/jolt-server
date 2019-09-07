const node_server = require('node-media-server')
const config = require('./utils/config')


const nms = new node_server(config)
nms.run()
