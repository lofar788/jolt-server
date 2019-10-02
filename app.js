const node_server = require('node-media-server')
const config = require('./utils/config')
const express = require('express')
const app = express()
const axios = require('axios')
const { db } = require('./utils/firebase-config')

app.get('/', (req, res) => {
	return (res.json({ message: 'ey' }))
})

var minutes = 5, the_interval = minutes * 60 * 10;
setInterval(function () {
	// do your stuff here
	db.collection('users').where('isLive', '==', true).get().then(querySnapshot => {
		querySnapshot.forEach(doc => {
			let data = doc.data()
			let streamKey = data['streamKey']
			// axios.get('http://localhost:8000/api/streams/live/' + streamKey)
			// axios.get('http://localhost:8000/api/streams/live/' + streamKey, {}, {
				
			axios.get('http://34.68.42.134:8000/api/streams/live/' + streamKey, {}, {
				username: 'admin',
				password: 'nms2018'
			}).then( (response) =>{
				db.collection('users').doc(doc.id).update({viewers:response.data.viewers})
				// doc.data().update({viewers:response.data.viewers})
			}).catch(err => {
				console.log(err)
			})
			// doc.data().update({viewers})
		})
	}).catch(err => {
		console.log(err)
	})
}, the_interval);

const nms = new node_server(config.rtmp_server)

nms.on('prePublish', async (id, StreamPath, args) => {
	let stream_key = getStreamKeyFromStreamPath(StreamPath);
	db.collection('users').where('streamKey', '==', stream_key).limit(1).get().then((querySnapshot) => {

		if (querySnapshot.empty) {
			let session = nms.getSession(id);
			session.reject();
		} else {
			querySnapshot.forEach(doc => {
				db.collection('users').doc(doc.id).update({ isLive: true })
			})
		}
	}).catch(err => {
		console.log(err)
	})
	// console.log('[NodeEvent on prePublish]', `id=${id} StreamPath=${stream_key} args=${JSON.stringify(args)}`);
});

nms.on('donePublish', (id, StreamPath, args) => {
	console.log('[NodeEvent on donePublish]', `id=${id} StreamPath=${StreamPath} args=${JSON.stringify(args)}`);
	let stream_key = getStreamKeyFromStreamPath(StreamPath);
	db.collection('users').where('streamKey', '==', stream_key).limit(1).get().then((querySnapshot) => {
		querySnapshot.forEach(doc => {
			db.collection('users').doc(doc.id).update({ isLive: false })
		})
	}).catch(err => {
		console.log(err)
	})
});

const getStreamKeyFromStreamPath = (path) => {
	let parts = path.split('/');
	return parts[parts.length - 1];
};

nms.run()
