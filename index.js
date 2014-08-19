'use strict';


var kraken = require('kraken-js'),
    app = require('express')(),
    options = {
        onconfig: function (config, next) {
            //any config setup/overrides here
            next(null, config);
        }
    },
    port = process.env.PORT || 8000;

app.use(kraken(options));


app.listen(port, function (err) {
	var splash = function () {/*
  /$$$$$$  /$$ /$$                                    
 /$$__  $$|__/| $$                                    
| $$  \__/ /$$| $$$$$$$   /$$$$$$$  /$$$$$$  /$$$$$$$ 
| $$ /$$$$| $$| $$__  $$ /$$_____/ /$$__  $$| $$__  $$
| $$|_  $$| $$| $$  \ $$|  $$$$$$ | $$  \ $$| $$  \ $$
| $$  \ $$| $$| $$  | $$ \____  $$| $$  | $$| $$  | $$
|  $$$$$$/| $$| $$$$$$$/ /$$$$$$$/|  $$$$$$/| $$  | $$
 \______/ |__/|_______/ |_______/  \______/ |__/  |__/                         
         */};
	console.log(splash.toString().match(/\/\*([\s\S]*)\*\//m)[1]);
    console.log('[%s] Listening on http://localhost:%d', app.settings.env, port);
});