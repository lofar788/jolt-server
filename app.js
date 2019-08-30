const node_server = require('node-media-server')
const config = require('./utils/config')

require('@google-cloud/debug-agent').start();

const nms = new node_server(config)
nms.run()