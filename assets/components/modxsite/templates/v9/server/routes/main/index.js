'use strict';

// import React    from 'react';
// import ReactDOMServer from 'react-dom/server';

import React    from 'react';
import ReactDom from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import { Provider } from "react-redux";

import configureStore from '../../../app/store';
import routes from "../../../app/routes";

var Model = require('objection').Model;
 
import Response from './components/response';

var debug = require('debug')("server:router/main");


import config, {
  db as db_config,
  host,
  site_url,
} from '../../config/config'; 


// let {
//   connection: {
//     prefix,
//   },
// } = db_config;

const knex = require('knex')(db_config);


// import {db as db_config} from '../../config/config';
 
let styles = {};

module.exports = function (options) {



  // var options = options || {};

  var express = require('express');
  var router = express.Router();

  // var querystring = require('querystring');

  // var mime = require('mime-types');
  // var path = require('path');

  // var http = require('http');

  // var fs = require('fs');

  /*
  * Надстройка WebSocket для роутера
  * */
  // var expressWs = require('express-ws')(options.app);
  // require('express-ws')(options.app);

  // var host = options.host;
  // let raw_host_port = options.raw_host_port;
  // ;


  debug("Server started");


  // var cfg = {
  //   hot_reload_debug: options.hot_reload_debug,
  //   hot_reload_port: options.hot_reload_port,
  //   ssl: false,
  // };

  // // var host = options.host;

  // var httpServ = (cfg.ssl) ? require('https') : require('http');

  /*
  * API
  * */
  //


  // function SendMessage(client, message, original_message){
  //   if(client && client.readyState == client.OPEN){

  //     // console.log(client);

  //     if(typeof message !== "object"){
  //       message = {
  //         text: "message"
  //       };
  //     }

  //     if(!message.ts){
  //       message.ts = new Date().getTime();
  //     }

  //     delete message.cookie;
  //     delete message.password;

  //     if(original_message){

  //       delete original_message.cookie;
  //       delete original_message.password;

  //       message.original_message = original_message;
  //     }

  //     client.send(JSON.stringify(message));
  //   }

  // }
 


  // function SendMessageToAll(ws, message, original_message, exclude_current){

  //   delete message.cookie;
  //   delete message.password;

  //   if(original_message){
  //     delete original_message.cookie;
  //     delete original_message.password;
  //   }

  //   for(var i in clients){

  //     var client = clients[i];

  //     if(exclude_current && client == ws){
  //       continue;
  //     }

  //     SendMessage(client, message, original_message);
  //   }
  // }


  // function success(req, res, response, knex){
    

  //   res.writeHead(200, {'Content-Type': 'application/json'});
  //   res.end(JSON.stringify(response));
  // }

  // function failure(req, res, response){


  //   res.writeHead(200, {'Content-Type': 'application/json'});
  //   res.end(JSON.stringify(response));
  // }


  // function processResponse(req, res, response){
  //   if(response.success){
  //     return success(req, res, response);
  //   }
  //   else{
  //     return failure(req, res, response);
  //   }
  // }
 
  // function renderHTML(componentHTML, initialState) {
  //   return `
  //     <!DOCTYPE html>
  //       <html>
  //       <head>
  //           <meta charset="utf-8">
  //           <meta name="viewport" content="width=device-width, initial-scale=1.0">
  //           <title>Hello React</title>
  //           <link rel="stylesheet" href="${assetUrl}/public/assets/styles.css">
  //           <script type="application/javascript">
  //             window.REDUX_INITIAL_STATE = ${JSON.stringify(initialState)};
  //           </script>
  //       </head>
  //       <body>
  //         <div id="react-view">${componentHTML}</div>
  //   <div id="dev-tools"></div>
  //         <script type="application/javascript" src="${assetUrl}/public/assets/bundle.js"></script>
  //       </body>
  //     </html>
  //   `;
  // }


  // router.post('/api/', function(req, res) {

  //   // debug("Server. Request Requested");
  //   // console.log("Server. Request Requested", req.query);
  //   // console.log("Server. Request body", req.body);

  //   var body = "";

  //   let request = {};

  //   req.on('data', chunk => {
  //     // console.log('got data chunk', chunk);
  //     body += chunk;
  //   });

  //   req.on('end', () => {
    
  //     // var preg = 'Content-Disposition: form-data; name="(.+?)"(.*?)------WebKitFormBoundary';
  //     // var preg = 'Content-Disposition: form-data; name="(.+?)"([\s\S]+?)-------';
  //     var preg = 'name="(.+?)"([\s\S]+?)------';

  //     // var match = body.match(new RegExp(preg, 'mgu'));
  //     // var match = new RegExp(preg, 'gu').exec(body);
  //     var match = body.match(/Content-Disposition: form-data; name="(.+?)"([\s\S]+?)------/g)

  //     if(match && match.length){
  //       match.map(str => {
  //         // let result = str.match(new RegExp(preg, 'mu'));

  //         // let result = str.match(/Content-Disposition: form-data; name="(.+?)"((\s*)(\S*)(\s*)?)------/);
  //         let result = str.match(/Content-Disposition: form-data; name="(.+?)"[\s]*(.*)/);

  //         // console.log('result', result);

  //         if(result){
  //           let {
  //             1: name,
  //             2: value,
  //           } = result;

  //           // value = value.replace(//);

  //           request[name] = value;
  //         }
  //       });
  //     }
 

  //     let response = new Response(req, res, request, knex);

  //     return response.process();
  //   });

 
  // });

  router.post('/api/', function (req, res, next) {


    const request = Object.assign(req.query, req.body);

    debug("REQUEST /new_api/ 2", request);

    let response = new Response(req, res, request, knex, config);

    return response.process();

    // try {

    //   if(!req.body){
    //     res.send("Не было получено тело запроса");

    //     debug("Не было получено тело запроса");

    //     return;
    //   }

    //   debug("req.body", req.query.pub_action, req.request, req.get, typeof req.body, req.body, req.body.type);

    //   var data = req.body;

    //   switch(data.type){

    //     case 'chat_message':
    //       var message = data;
    //       debug("message", message);
    //       // SendMessageToAll(message);
    //       SendMessageToUsers(message, message.object.members)
    //       break;

    //     default: return res.send("Неизвестный тип запроса");
    //   }
    // }
    // catch(e){
    //   console.error("Request /new_api/ Error", e.message, e.stack);
    // }

    // res.send("success");
  });

  router.use('/', function(req, res) {

    // debug("Server. Request Requested");
    // console.log("Server. Request Requested", req.query);
    // console.log("Server. Request body", req.body);
    
    const store = configureStore();

    // console.log('store', store);

    // var body = "";

    // let request = {};

    // const componentHTML = ReactDom.renderToString(
    //   <Provider store={store}>
    //     <RouterContext {...renderProps} />
    //   </Provider>
    // );

    // res.writeHead(200, {'Content-Type': 'text/html'});
    // res.end(renderHTML(componentHTML));
    
    match({ 
      routes, 
      location: req.url 
    }, (error, redirectLocation, renderProps) => {

      console.log('renderProps', renderProps);

      if (redirectLocation) { // Если необходимо сделать redirect
        return res.redirect(301, redirectLocation.pathname + redirectLocation.search);
      }

      if (error) { // Произошла ошибка любого рода
        return res.status(500).send(error.message);
      }

      if (!renderProps) { // мы не определили путь, который бы подошел для URL
        return res.status(404).send('Not found');
      }


      const componentHTML = ReactDom.renderToString(
        <Provider store={store}>
          <RouterContext {...renderProps} />
        </Provider>
      );

      const state = store.getState();

      return res.end(renderHTML(componentHTML, state));
    });

    return;
  });
 
  function renderHTML(componentHTML, initialState) {

    let assetsUrl;

    if(process.env.NODE_ENV === 'production'){
      assetsUrl = "/assets/components/modxsite/templates/v9/build/";
    }
    else{
      assetsUrl = "/build/";
    }

    // console.log('process.env.NODE_ENV', process.env.NODE_ENV);

    return `
      <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Городские бани</title>
          <link rel="stylesheet" href="${assetsUrl}css/main.css">
          <base href="/" />
          <script type="application/javascript">
            window.REDUX_INITIAL_STATE = ${JSON.stringify(initialState)};
          </script>

          <script>
            (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
            (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
            m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
            })(window,document,'script','//www.google-analytics.com/analytics.js','ga');
            ga('create', 'UA-39491207-3', 'auto');
            ga('send', 'pageview');
          </script>
        
        </head>
        <body>
          <div id="root">${componentHTML}</div>
          <script type="application/javascript" src="${assetsUrl}main.js"></script>
        </body>
      </html>
    `;
  }
 
 

  /*
   * Static
   * */
   

  return router;
}
