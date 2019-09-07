const config = {
  server: {
    secret: 'kjVkuti2xAyF3JGCzSZTk0YWM5JhI9mgQW4rytXc'
  },
  logType: 0,
  
  rtmp_server: {
<<<<<<< HEAD
auth:{
api:true,
api_user:'admin',
api_pass:'nms2018
}
=======
    auth: {
      api : true,
      api_user: 'admin',
      api_pass: 'nms2018',
    },
>>>>>>> 92904bb663afa007f88aea24dedcacc5af73d9f6
    rtmp: {
      port: 1935,
      chunk_size: 60000,
      gop_cache: true,
      ping: 60,
      ping_timeout: 30
    },
    http: {
      port: 8000,
      mediaroot: './media',
      allow_origin: '*'
    },
    trans: {
      // ffmpeg: '/usr/bin/ffmpeg',
      ffmpeg:'ffmpeg-4.1.3-win64-static\\bin\\ffmpeg.exe',
      tasks: [
        {
          app: 'live',
          hls: true,
          hlsFlags: '[hls_time=2:hls_list_size=3:hls_flags=delete_segments]',
          dash: true,
          dashFlags: '[f=dash:window_size=3:extra_window_size=5]'
        }
      ]
    }
  }
};

module.exports = config;
