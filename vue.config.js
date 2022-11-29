const fs = require('fs')


module.exports = {
    devServer: {
      // host: 'umfrage.daten-oase.org',
      // host: 'localhost',
      host: "umfrage.daten-oase.org",

      port: 8080, // CHANGE YOUR PORT HERE!
      
      proxy: {
        '^/': {
          target: 'https://umfrage.daten-oase.org:1337',
          changeOrigin: true
        },
      },
         
      https: {
        key: fs.readFileSync('./hidden/certificates/key.pem'),
        cert: fs.readFileSync('./hidden/certificates/certificate.pem'),
      },        
    },
  }