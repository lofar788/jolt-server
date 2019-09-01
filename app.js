const node_server = require('node-media-server')
const config = require('./utils/config').rtmp_server

require('@google-cloud/debug-agent').start();

const nms = new node_server(config)
nms.run()
