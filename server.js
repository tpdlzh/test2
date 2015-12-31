 require('babel-core/register');
 var swig = require('swig'),
 React = require('react'),
 ReactDOM = require('react-dom/server'),
 Router = require('react-router'),
 routes = require('./Client/routes'),
 mongoose = require('./config/mongoose'),
 express = require('./config/express'),
 config = require('./config');

 var db = mongoose();
 var app = express();

  // server side rendering . has got auth problem now. 

// app.use(function(req, res) {
//   Router.match({ routes: routes.default, location: req.url }, function(err, redirectLocation, renderProps) {
 
//     if(config.blockURL.indexOf(req.url)!=-1)
//     {
//        res.status(302).redirect("/");
//        return;
//     }

//     if (err) {
//       res.status(500).send(err.message)
//     } else if (redirectLocation) {
//       res.status(302).redirect(redirectLocation.pathname + redirectLocation.search)
//     } else if (renderProps) {
//       var html = ReactDOM.renderToString(React.createElement(Router.RoutingContext, renderProps));
//       var page = swig.renderFile('views/index.html', { html: html });
//       res.status(200).send(page);
//     } else {
//       res.status(404).send('Page Not Found')
//     }
//   });
// });

  app.listen(3000,function(){

  console.log('server running...');

  });  