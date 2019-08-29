var http = require("http");
const node_media_server = require('node-media-server');
const config = require('./utils/node-config') 

const nms = new node_media_server(config)
nms.run()