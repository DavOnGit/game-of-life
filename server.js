var path = require('path');
var webpack = require('webpack');
var express = require('express');
var config = require('./webpack.config');
var compression = require('compression')

var app = express();
var ENV = process.env.NODE_ENV || 'production'
var PORT = process.env.PORT || 3000
console.log('Server NODE_ENV: ' + ENV);

if (ENV !== 'production') {
  var compiler = webpack(config);
  app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath,
    stats: {
      colors: true
    },
    historyApiFallback: true,
  }));
  app.use(require('webpack-hot-middleware')(compiler));
  
  app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
  });
} else {
  app.use(compression())
  app.use(express.static(path.join(__dirname, 'public')))
}

app.listen(PORT, function (err) {
  if (err) {
    return console.error(err);
  }
  console.log('Listening at http://localhost: ' + PORT);
});
