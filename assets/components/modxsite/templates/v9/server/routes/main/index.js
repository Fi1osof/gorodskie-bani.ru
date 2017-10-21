'use strict';


import React    from 'react';
import ReactDom from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import { Provider } from "react-redux";

const fs = require('fs');

import configureStore from '../../../app/store';
import routes from "../../../app/routes";

import {MainApp} from "modules/Site/components/App/";

var Model = require('objection').Model;
 
import Response from './components/response';

var debug = require('debug')("server:router/main");

import md5 from 'md5';

import fetch from 'node-fetch';

const FormData = require('form-data');

import config, {
  db as db_config,
  host,
  site_url,
} from '../../config/config'; 


let {
  connection: {
    prefix,
  },
} = db_config;

const knex = require('knex')(db_config);
 
let styles = {};

 

let apiData;
let mapData;
let citiesData;


/*
  OLD Router
*/

export default class Router {

  clients = [];   // WS-соединения

  users = [];     // Активные пользователи

  constructor(options){

    // const SendMODXRequest = (action, params) => {
    //   return this.SendMODXRequest(action, params, req);
    // }

    this.response = new Response(null, null, null, knex, config, this.clients, this.SendMessage, ::this.SendMODXRequest);


    this.response.localQuery({
      operationName: "Redirects",
      variables: {
        redirectsLimit: 0,
      },
    })
    .then(r => {

      // console.log('Redirects result', r);

      const {
        redirects,
      } = r.data;

      this.redirects = redirects;

    })
    .catch(e => {
      console.error(e);
    });

    this.response.localQuery({
      operationName: "Resources",
      variables: {
        resourceExcludeTemplates: 0,
      },
      req: {},
    })
    .then(r => {

      // console.log('resources result', r);

      const {
        resources,
      } = r.data;

      this.resources = resources;

    })
    .catch(e => {
      console.error(e);
    });


    this.router = this.createRouter(options);

    this.loadApiData();

    this.loadMapData();

    this.loadCitiesData();

  }
  

  loadApiData(){

    this.response.localQuery({
      operationName: "apiData",
      variables: {
        resourceExcludeTemplates: 0,
        getCompanyGallery: true,
        getImageFormats: true,
      },
      req: {},
    })
    .then(r => {

      // console.log('apiData result', r);

      apiData = r.data;

    })
    .catch(e => {
      console.error(e);
    });

  }


  loadMapData(){

    this.response.localQuery({
      operationName: "MapCompanies",
      variables: {
        limit: 0,
        getCompanyGallery: false,
        // getImageFormats: true,
        getTVs: false,
      },
      req: {},
    })
    .then(r => {

      // console.log('mapData result', r);

      mapData = r.data;

    })
    .catch(e => {
      console.error(e);
    });

  }


  loadCitiesData(){

    this.response.localQuery({
      operationName: "Cities",
      variables: {
        limit: 0,
        getCompanyGallery: false,
        // getImageFormats: true,
        getTVs: false,
      },
      req: {},
    })
    .then(r => {

      // console.log('mapData result', r);

      citiesData = r.data;

    })
    .catch(e => {
      console.error(e);
    });

  }


  createRouter = (options) => {

    const {
    } = options || {};

    var express = require('express');
    let router = express.Router();


    debug("Server started");

    var httpServ = require('http');

    require('express-ws')(options.app);



    /*
      WS
    */
   


    const SendMessageToAll = function(ws, message, original_message, exclude_current){

      let clients = this.clients;

      delete message.cookie;
      delete message.password;

      if(original_message){
        delete original_message.cookie;
        delete original_message.password;
      }

      for(var i in clients){

        var client = clients[i];

        if(exclude_current && client == ws){
          continue;
        }

        this.SendMessage(client, message, original_message);
      }
    }


    
    // setInterval(() => {

    //   let res = {};
    //   let req = {};
    //   let request = {};

    //   let response = new Response(req, res, request, knex, clients, SendMessage, config);

    //   // return response.process();

    //   response.notifyUsersUnreadMessages({
    //     headers: {},
    //   }, {}, response, {});

    // }, 1000 * 60 * 5);

    
    /*
      Cлужба рассылки уведомлений о новых письмах
    */
    // setInterval(() => {

    //   let res = {};
    //   let req = {};
    //   let request = {};

    //   let response = new Response(req, res, request, knex, clients, SendMessage, config);

    //   // return response.process();

    //   response.notifyUsersUnreadMessages({
    //     headers: {},
    //   }, {}, response, {});

    // }, 1000 * 60 * 5);



    const success = function(req, res, response, knex){
      

      res.writeHead(200, {'Content-Type': 'application/json'});
      res.end(JSON.stringify(response));
    }

    const failure = function(req, res, response){


      res.writeHead(200, {'Content-Type': 'application/json'});
      res.end(JSON.stringify(response));
    }


    const processResponse = function(req, res, response){
      if(response.success){
        return success(req, res, response);
      }
      else{
        return failure(req, res, response);
      }
    }
   
   

    /*
     * Static
     * */


    /*
     * Надстройка WebSocket для роутера
     * */
    // var expressWs = require('express-ws')(options.app);


    /*
     * API
     * */
    //



    const SendUsersActivity = function(){

      let clients =this.clients;

      var users_list = [];
      var ids = {};

      var total_active_clients = 0;

      for(var i in clients){
        var client = clients[i];

        if(
          client.readyState == client.OPEN
        ){

          total_active_clients++;

          if(
            client.user
            && client.user.id
            && !ids[client.user.id]
          ){
            ids[client.user.id] = true;
            users_list.push(client.user);
          }
        }
      }


      users_list.reverse();

      // for(var i in clients){
      //   SendMessage(clients[i], {
      //     type: "active_users_list",
      //     users: users_list,
      //   });
      // }

      /*
       * Если список пользователей изменился, отправляем статистику
       * */
      if(md5(users_list) != md5(users)){
        users = users_list;

        SendMessageToAll({
          type: "active_users_list",
          users: users,
        });
      }


      debug('SendUsersActivity');
      debug('total_active_clients', total_active_clients);
      debug('users', users);
      return;
    }
   

    function SendMessageToUsers(message, users_ids){

      let clients = this.clients;

      // console.log("SendMessageToUsers", message, users_ids);
      // console.log("SendMessageToUsers", users_ids);

      if(!users_ids || users_ids == ""){
        return;
      }

      users_ids = users_ids.split(",");

      for(var i in users_ids){
        users_ids[i] = Number(users_ids[i]);
      }

      clients.map(function(client){

        // var client = clients[i];

        // if(exclude_current && client == ws){
        //   continue;
        // }

        // console.log("Проверяем клиента", users_ids);
        // break;

        // console.log(typeof client);

        if(users_ids.indexOf(client.user_id) != -1){
          // console.log('users_ids: ', client.user_id);

          this.SendMessage(client, message);
        }

        // SendMessage(client, message);
      });
    }
      


    // const SendMODXRequest = (action, params) => {

    //   const req = this.req;

    //   const method = 'POST';

    //   let url = `/assets/components/modxsite/connectors/connector.php?pub_action=${action}`;

    //   let options = {
    //     // host: host,
    //     // port: 80,
    //     // path: url,
    //     method,
    //     headers: {
    //       // 'Content-Type': 'application/x-www-form-urlencoded',
    //       // 'Content-Length': Buffer.byteLength(postData)
    //     },
    //     // json: {
    //     //   users: users
    //     // }
    //   };

    //   let form;

    //   let {
    //     sort,
    //     ...other
    //   } = params;

    //   params = {...other};

    //   if(sort){

    //     if(Array.isArray(sort)){

    //       sort = sort[0];

    //       if(sort){

    //         params.sort = sort.by;
    //         params.dir = sort.dir || undefined;

    //       }

    //     }

    //   }

    //   if(method == 'POST' && params){
    //     // var postData = querystring.stringify(params);


    //     form = new FormData()

    //     for(var i in params){
          
    //       var value = params[i];

    //       value = (typeof value !== "undefined") && value.toString && value.toString() || undefined;

    //       if(value !== undefined){
    //         form.append(i, value);
    //       }
    //     }

    //     // form.append('limit', 3);
    //     // form.append('with_coors_only', 'true');

    //     options.body = form;

    //     // Object.assign(options.headers, form.getHeaders());

        
    //   }



    //   /*
    //   * Собираем кукисы из оригинального запроса и если передаются куки в параметрах запроса,
    //   * то объединяем их
    //   * */
    //   var cookies = [];

    //   let cookies_obj;

    //   if(req.headers && req.headers.cookie){
    //     let cooks = req.headers.cookie.split(";");

    //     cookies_obj = {};

    //     cooks.map(function(item){
    //       var match = item.match(/ *(.+?)=(.+)/);
    //       if(match){
    //         cookies_obj[match[1]] = match[2];
    //       }
    //     });
    //   }

    //   if(cookies_obj){

    //     for(var i in cookies_obj){
    //       cookies.push(i + '=' + cookies_obj[i]);
    //     }
    //   }

    //   if(cookies){
    //     options.headers.Cookie = cookies;

    //     debug("options.headers", options.headers);
    //   }

    //   debug("options.headers", options.headers);
    //   debug("options", options);


    //   return fetch(site_url + url, options)
    //     .then(function(res) {
    //       return res.json();
    //     });
    // };



    function SendMessageToUsers(message, users_ids){

      // console.log("SendMessageToUsers", message, users_ids);
      // console.log("SendMessageToUsers", users_ids);

      let clients = this.clients;

      if(!users_ids || users_ids == ""){
        return;
      }

      users_ids = users_ids.split(",");

      for(var i in users_ids){
        users_ids[i] = Number(users_ids[i]);
      }

      clients.map(function(client){

        // var client = clients[i];

        // if(exclude_current && client == ws){
        //   continue;
        // }

        // console.log("Проверяем клиента", users_ids);
        // break;

        // console.log(typeof client);

        if(users_ids.indexOf(client.user_id) != -1){
          // console.log('users_ids: ', client.user_id);

          this.SendMessage(client, message);
        }

        // SendMessage(client, message);
      });
    }

    router.ws('/api/', (ws, req) => {

      try{
        this.processWsRequest(ws, req);
      }
      catch(e){
        console.error(e);
      }

    });



    /*
    * API
    * */

    //   /*
    //   * Собираем кукисы из оригинального запроса и если передаются куки в параметрах запроса,
    //   * то объединяем их
    //   * */
    

    router.post('/api/', this.processPostRequest);


    router.use('/', this.processMainRequest);


    return router;

  };


  processPostRequest = (req, res, next) => {


    const request = Object.assign(req.query, req.body);

    // let response = new Response(req, res, request, knex, config, this.clients, this.SendMessage);

    return this.response.process(req, res, request);

  };


  processWsRequest = (ws, req) => {

    let clients = this.clients;

    debug("Server. WS Requested");

    ws.id = md5(new Date().getTime());
    // ws.id = new Date().getTime();

    // debug("Server. WS Requested ID", ws.id);

    // debug("Server. WS Requested ID 2",  md5(new Date().getTime()));
    // debug("Server. WS Requested ID 3",  md5('new Date().getTime()'));

    clients.push(ws);


    ws.on('message', async (message) => {

      debug('Я получил от вас сообщение: ' + message);

      try{
        message = JSON.parse(message);
        // let response = message;

        debug("Server. Received message", message);

        const {
          type,
        } = message;

        // debug("Server. Received type", type);

        // debug("Server. Received lat, lng", lat, lng);

        var result = {};


        // const raw_text = response.text || ''
        //   ,text = php.strip_tags(raw_text)
        //   .replace(/\[/g, '&#91;')
        //   .replace(/\]/g, '&#93;');

        const raw_text = message.text;
        const text = raw_text;

        // var id = message.id;
        // var name = message.name;


        switch(type){

          case 'message':

            var client_id = message.client_id;


            if(!client_id){
              result = {
                type: "error"
                ,text: "Не был указан ID клиента"
              };
            }
            else if(!text){
              result = {
                type: "error"
                ,text: "Текст не может быть пустым"
              };
            }


            else{
              result = {
                type: "message"
                ,sender: {
                  id: client_id
                  ,guest: ws.client_data.guest
                  ,name: ws.client_data.name
                  ,photo: ws.client_data.photo
                }
                ,text: text
              };
            }

            // debug('ws.client_data');
            // debug(ws.client_data);

            if(result.type == "error"){
              ws.send(JSON.stringify(result));
            }
            else{
              for(var i in clients){
                if(clients[i].readyState == WebSocket.OPEN){
                  clients[i].send(JSON.stringify(result));


                  // debug("ws: ");
                  // debug(ws);

                  // write message into DB

                }
              }

              var d = new Date();
              var n = d.getTime();

              Message.query().insert({
                text: text
                ,raw_text: raw_text
                ,ts: String(n).substr(0,10) + '.' + String(n).substr(10)
                ,user_id: ws.user_id
                ,channel_id: ws.channel_id
              }).then(function (record) {
                // console.log(record);
              });
            }
            break;



          case 'joined':

            // var users = [];
            //
            // for(var i in clients){
            //   var client = clients[i];
            //
            //   if(client.readyState == WebSocket.OPEN){
            //     users.push({
            //       name: client.client_data.name
            //       ,photo: client.client_data.photo
            //       ,guest: client.client_data.guest
            //     });
            //   }
            // }
            //
            // debug("User joined: ");
            // debug(response);
            //
            // for(var i in clients){
            //   if(clients[i].readyState == WebSocket.OPEN){
            //     clients[i].send(JSON.stringify({
            //       type: "joined"
            //       ,text: ws.client_data.name
            //       ,users: users
            //     }));
            //   }
            // }
            //
            //
            // var postData = querystring.stringify({users: JSON.stringify(users)});
            //
            // var options = {
            //   host: host,
            //   path: '/assets/components/modxsite/connectors/connector.php?pub_action=node/log_active_users',
            //   'method': 'POST',
            //   'headers': {
            //     'Content-Type': 'application/x-www-form-urlencoded',
            //     'Content-Length': Buffer.byteLength(postData)
            //   },
            //   json: {
            //     users: users
            //   }
            // };
            //
            //
            // var request = httpServ.request(options);
            // request.write(postData);
            // request.end();

            ws.user_id = response.id;

            break;

          case 'coords':

            const {
              coords,
            } = message;

            // console.log("Coords", coords);

            ws.coords = coords;

            break;

          default:
            // console.error("WS.", "Неизвестный тип сообщения");
            // ws.send(JSON.stringify({
            //   type: "error"
            //   ,text: "Неизвестный тип сообщения"
            // }));

            // console.log(ws);

            this.SendMessage(ws, {
              type: "error"
              ,text: "Неизвестный тип сообщения"
            }, response);
        }


      }
      catch(e){
        console.error(e);
      }

      // clients.forEach(function each(client) {
      //     client.send("Новое сообщение: " + message);
      // });
    });

    // ws.send(JSON.stringify({
    //   type: "hello"
    // }));

    ws.on('close', function(){

      debug("Соединение закрыто");

      for(var i in clients){
        if(clients[i] === ws){
          clients.splice(i, 1);
          debug("Удален клиент из общего списка");
          break;
        }
      }

      // SendUsersActivity();
    });




    this.SendMessage(ws, {
      type: "hello"
    }, {});

  };


  processMainRequest = (req, res) => {
    
    const url = req.url;

    const decodedURI = decodeURI(req.url).replace(/\@[0-9\.\,]+/, '');


    match({ 
      routes, 
      location: url,
    }, async (error, redirectLocation, renderProps) => {

      // console.log('match request', url, decodedURI);
      // console.log('match renderProps', renderProps);

      const {
        redirects,
      } = this;

      // console.log('match this redirects', redirects);

      const redurectUri = decodedURI.replace(/^\/+/, '');

      const resource = this.resources && this.resources.find(n => n.uri === redurectUri);

      if(redurectUri && !resource){

        const redirect = redirects && redirects.find(n => n.uri === redurectUri || `${n.uri}/` === redurectUri);

        if (redirect) { // Если необходимо сделать redirect

          // console.log('redirect', redurectUri, redirect);

          const link = '/' + redirect.redirect_uri;

          if(decodedURI !== link){

            return res.redirect(301, link);
            
          }

        }
        
      }

      if (redirectLocation) { // Если необходимо сделать redirect
        return res.redirect(301, redirectLocation.pathname + redirectLocation.search);
      }

      if (error) { // Произошла ошибка любого рода
        return res.status(500).send(error.message);
      }

      if (!renderProps) { // мы не определили путь, который бы подошел для URL

        // let prevent;

        // await this.checkRedirect(req, res)
        //   .then(r => {
        //     prevent = r;
        //   })
        //   .catch(e => {
        //     console.error(e);
        //   });

        /*
          Некоторые правила редиректа
        */

        if(decodedURI){

          let match;

          if(/.+\/bani-otzivy\/$/.test(decodedURI)){
            return res.redirect(301, '/bani-otzivy/');
          }

          // else if(/.+\/topics\/$/.test(decodedURI)){
          //   return res.redirect(301, '/topics/');
          // }
          
          
          match = decodedURI.match(/.+(\/(topics|city|ratings)\/.*)/);

          if(match && match[1]){
            return res.redirect(301, match[1]);
          }


          if(/.+\/contacts.html$/.test(decodedURI)){
            return res.redirect(301, '/contacts.html');
          }

        }



        // if(!prevent){

          // debug("knex resreq.headers", req);

          var q = knex(`${prefix}monitor_requests`)
            .insert({
              site_url: req.hostname,
              url: req.url,
              http_status: 404,
              context_key: "web",
              parent: 0,
              path: '/www/gorodskie-bani.ru/',
              uuid: '',
              ip: '',
              time: 0,
              php_error_info: '',
              referer: '',
              user_agent: req.headers['user-agent'],
            })
            ;

            q.then((result) => { 

              // debug("knex SQL", q.toString());
              // debug("knex result", result);

            }).catch(e => {

              console.error(e);
            });

          return res.status(404).send('Not found');
        // }

      }


      let html;

      try{

        // Запрашиваем данные для пользователя

    
        let store = configureStore();

        let state = store.getState();

        Object.assign(state.document, {
          apiData,
          mapData,
          citiesData,
        });

        store = configureStore(state);

        // exports={exports}
        // userAgent={global.navigator.userAgent}
              
        // const componentHTML = ReactDom.renderToString(
        //   <MainApp 
        //     {...renderProps} 
        //     store={store}
        //   />
        // );

        // const componentHTML = ReactDom.renderToString(
        //   <Provider store={store}>
        //     <RouterContext 
        //       {...renderProps} 
        //     />
        //   </Provider>
        // );

        let appExports = {};

        // console.log('{...renderProps} ', {...renderProps} );

        const componentHTML = ReactDom.renderToString(
          <MainApp
            appExports={appExports}
          >
            <Provider store={store}>
              <RouterContext 
                {...renderProps} 
              />
            </Provider>
          </MainApp>
        );

        const stylesGenerated = appExports.theme && appExports.theme.sheetsToString();

        // console.log('stylesGenerated', stylesGenerated);


        let style = '<style>';
        style += stylesGenerated;
        style += '</style>';

        // const stylesGenerated = exports.theme.sheetsToString();


        html = this.renderHTML(componentHTML, state, resource, style);
      }
      catch(e){
        console.error(e);
        return res.status(500).send(e.message);
      };

      return res.end(html);
    });

    return;
  };

  
  // checkRedirect = (req, res) => {

  //   return new Promise((resolve, reject) => {

  //     const requestedUri = decodeURI(req.url.replace(/^\/+/, ''));

  //     var q = knex(`${prefix}redirects as redirects`)
  //       .innerJoin(`${prefix}site_content as content`, 'redirects.resource_id', 'content.id')
  //       // .select('profile.*')
  //       .select('content.uri')
  //       // .limit('3')
  //       ;

  //       q.where({
  //         "redirects.uri": requestedUri,
  //       });
  //       q.whereNot('content.uri', requestedUri);


  //       q.limit(1); 
  //       // 
          
  //       // console.log("knex SQL", q.toString());

  //       q.then((result) => { 

  //         // debug("knex result", result);

  //         const {
  //           uri,
  //         } = result && result[0] || {};

  //         if(uri && uri !== requestedUri){

  //           return res.redirect(301, `/${uri}`);
  //         }

  //         return result;
  //         return resolve(false);

  //       }).catch(e => {

  //         reject(e);
  //       });


  //     var cookies = [];

  //     let cookies_obj;


  //     let options = {
  //       // method,
        
  //       url: "http://gorodskie-bani.local:9000/" + req.url,

  //       // location: req.url,
  //       headers: {
  //       },
  //     };

  //     if(req.headers && req.headers.cookie){
  //       let cooks = req.headers.cookie.split(";");

  //       cookies_obj = {};

  //       cooks.map(function(item){
  //         var match = item.match(/ *(.+?)=(.+)/);
  //         if(match){
  //           cookies_obj[match[1]] = match[2];
  //         }
  //       });
  //     }

  //     if(cookies_obj){

  //       for(var i in cookies_obj){
  //         cookies.push(i + '=' + cookies_obj[i]);
  //       }
  //     }

  //     if(cookies){
  //       options.headers.Cookie = cookies;
  //     }


  //     const {
  //       host,
  //     } = req.headers;


  //     let req2 = httpServ.request(options, (request, a, b) => {
  //       //

  //       request.on('data', function (chunk) {
  //         // str += chunk;
  //       });
  //       //
  //       // //the whole response has been recieved, so we just print it out here
  //       request.on('end', function () {

  //         var response_headers = request.headers;
   
  //         if(response_headers['location'] && response_headers['location'] != ''){

  //           // res.redirect(301, 'http://yourotherdomain.com' + req.path)
  //           res.redirect(301, response_headers['location'])
            
  //           return resolve(true);
  //         }

  //         return resolve(false); 

  //       });


  //     });

  //     req2.end();

  //   });

  // };

  renderHTML(componentHTML, initialState, resource, style) {

    let assetsUrl;

    let js_src;
    let css_src;

    let inline_styles;

    let basePath = process.cwd() + "/";

    let buildPath = basePath + "build/";

    if(process.env.NODE_ENV === 'production'){
      assetsUrl = "/assets/components/modxsite/templates/v9/build/";

      var htmlFileName = "index.html";
      // var html = fs.readFileSync(Path.join(assetsUrl, htmlFileName), "utf8");
      var html = fs.readFileSync( `${buildPath}${htmlFileName}`, "utf8");

      let match = html.match(/<script .*?src="(.*?)"/);

      if(match){
        js_src = match[1];
      }

      let css_match = html.match(/<link [^>]*?href="([^\"]*?\.css)" rel="stylesheet"/);

      if(css_match){
        css_src = css_match[1];

        // console.log('css_src', css_src);

        const css_array = css_src.split("/");

        css_src = "";

        var filename = `${buildPath}css/${css_array[css_array.length - 1]}`;
   
        // var filename = template_path + css_file;

        inline_styles = fs.readFileSync(filename, "utf-8");
   
        // console.log("inline_styles", inline_styles, filename);

        // style = '<style>';
        // style += styles.css_file;
        // style += '</style>';

        inline_styles = `<style>${inline_styles}</style>`;
      }


    }
    else{
      assetsUrl = "/build/";

      js_src = `${assetsUrl}main.js`;
      css_src = `${assetsUrl}css/main.css`;
    }

    // console.log('process.env.NODE_ENV CWD', process.cwd());
    // console.log('process.env.NODE_ENV', process);
    // console.log('process.env.NODE_ENV webpack', webpack);

    let jState = "";

    Object.assign(initialState.document, {
      apiData: null,
      // mapData,
      // citiesData,
    });

    jState = JSON.stringify(initialState);

    jState = jState.replace(/<script.*?>.*?<\/script>/g, '');

    const {
      name,
      longtitle,
      description,
      searchable,
    } = resource || {};

    let title = longtitle || name || "";

    title = title && `${title} | ` || "";

    title += 'Городские и общественные бани';

    return `
      <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>${title}</title>
          <meta name="description" content="${description}"> 
          <meta name="robots" content="${searchable === false ? "noindex, nofollow" : "index, follow"}" />
          <link rel="shortcut icon" href="/favicon.ico"/>
          <link rel="alternate" hreflang="ru" href="http://gorodskie-bani.ru/" />
          <base href="/" />

          <script>
            (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
            (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
            m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
            })(window,document,'script','//www.google-analytics.com/analytics.js','ga');
            ga('create', 'UA-39491207-3', 'auto');
            ga('send', 'pageview');
          </script>
          

          <!-- Yandex.Metrika counter -->
          <script type="text/javascript" >
              (function (d, w, c) {
                  (w[c] = w[c] || []).push(function() {
                      try {
                          w.yaCounter26848689 = new Ya.Metrika({
                              id:26848689,
                              clickmap:true,
                              trackLinks:true,
                              accurateTrackBounce:true,
                              webvisor:true,
                              trackHash:true
                          });
                      } catch(e) { }
                  });

                  var n = d.getElementsByTagName("script")[0],
                      s = d.createElement("script"),
                      f = function () { n.parentNode.insertBefore(s, n); };
                  s.type = "text/javascript";
                  s.async = true;
                  s.src = "https://mc.yandex.ru/metrika/watch.js";

                  if (w.opera == "[object Opera]") {
                      d.addEventListener("DOMContentLoaded", f, false);
                  } else { f(); }
              })(document, window, "yandex_metrika_callbacks");
          </script>
          <noscript><div><img src="https://mc.yandex.ru/watch/26848689" style="position:absolute; left:-9999px;" alt="" /></div></noscript>
          <!-- /Yandex.Metrika counter -->
        
          ${style || ""}
          
          ${css_src ? `<link rel="stylesheet" href="${css_src}">` : ""}

          ${inline_styles || ""}

        </head>
        <body>
          <div id="root">${componentHTML}</div>
        </body>

        <script type="application/javascript">
          window.REDUX_INITIAL_STATE = ${jState};
        </script>
          
        <script type="application/javascript" src="${js_src}" async></script>

      </html>
    `;
  };

   
  SendMessage = (client, message, original_message) => {

    if(client && client.readyState === client.OPEN){

      // console.log(client);
      // console.log('SendMessage', message);

      if(typeof message !== "object"){
        message = {
          text: "message"
        };
      }

      if(!message.ts){
        message.ts = new Date().getTime();
      }

      delete message.cookie;
      delete message.password;

      if(original_message){

        delete original_message.cookie;
        delete original_message.password;

        message.original_message = original_message;
      }

      // client.send(JSON.stringify(message));
      client && typeof client.send === "function" && client.send(JSON.stringify(message));
    }

  }

  async SendMODXRequest(action, params, req){

    // console.log('SendMODXRequest', req, params);
    // console.log('SendMODXRequest', params);

    // return {};

    // const req = this.req;

    const method = 'POST';

    let url = `/assets/components/modxsite/connectors/connector.php?pub_action=${action}`;

    let options = {
      // host: host,
      // port: 80,
      // path: url,
      method,
      headers: {
        // 'Content-Type': 'application/x-www-form-urlencoded',
        // 'Content-Length': Buffer.byteLength(postData)
      },
      // json: {
      //   users: users
      // }
    };

    let form;

    let {
      sort,
      ...other
    } = params;

    params = {...other};

    if(sort){

      if(Array.isArray(sort)){

        sort = sort[0];

        if(sort){

          params.sort = sort.by;
          params.dir = sort.dir || undefined;

        }

      }

    }

    if(method == 'POST' && params){
      // var postData = querystring.stringify(params);


      form = new FormData()

      for(var i in params){
        
        var value = params[i];

        value = (typeof value !== "undefined") && value.toString && value.toString() || undefined;

        if(value !== undefined){
          form.append(i, value);
        }
      }

      // form.append('limit', 3);
      // form.append('with_coors_only', 'true');

      options.body = form;

      // Object.assign(options.headers, form.getHeaders());

      
    }



    /*
    * Собираем кукисы из оригинального запроса и если передаются куки в параметрах запроса,
    * то объединяем их
    * */
    var cookies = [];

    let cookies_obj;

    // if(req.upgradeReq && req.upgradeReq.headers && req.upgradeReq.headers.cookie){
    //   var cooks = req.upgradeReq.headers.cookie.split(";");

    //   cooks.map(function(item){
    //     var match = item.match(/ *(.+?)=(.+)/);
    //     if(match){
    //       cookies_obj[match[1]] = match[2];
    //     }
    //   });
    // }

    if(req.headers && req.headers.cookie){
      let cooks = req.headers.cookie.split(";");

      cookies_obj = {};

      cooks.map(function(item){
        var match = item.match(/ *(.+?)=(.+)/);
        if(match){
          cookies_obj[match[1]] = match[2];
        }
      });
    }

    if(cookies_obj){

      for(var i in cookies_obj){
        cookies.push(i + '=' + cookies_obj[i]);
      }
    }

    if(cookies){
      options.headers.Cookie = cookies;

      debug("options.headers", options.headers);
    }

    debug("options.headers", options.headers);
    debug("options", options);


    return fetch(site_url + url, options)
      .then(function(res) {
        return res.json();
      })
      .catch(e => {
        console.error(e);
      });
  };

}



// const oldRouter = function (options) {

//   const {
//   } = options || {};

//   var express = require('express');
//   var router = express.Router();


//   debug("Server started");

//   var httpServ = require('http');

//   require('express-ws')(options.app);

 
//   /*
//     WS
//   */

//   // let clients = [];
//   // let users = [];
 
//   // const SendMessage = function(client, message, original_message){
//   //   if(client && client.readyState === client.OPEN){

//   //     // console.log(client);
//   //     // console.log('SendMessage', message);

//   //     if(typeof message !== "object"){
//   //       message = {
//   //         text: "message"
//   //       };
//   //     }

//   //     if(!message.ts){
//   //       message.ts = new Date().getTime();
//   //     }

//   //     delete message.cookie;
//   //     delete message.password;

//   //     if(original_message){

//   //       delete original_message.cookie;
//   //       delete original_message.password;

//   //       message.original_message = original_message;
//   //     }

//   //     // client.send(JSON.stringify(message));
//   //     client && typeof client.send === "function" && client.send(JSON.stringify(message));
//   //   }

//   // }
 


//   // const SendMessageToAll = function(ws, message, original_message, exclude_current){

//   //   delete message.cookie;
//   //   delete message.password;

//   //   if(original_message){
//   //     delete original_message.cookie;
//   //     delete original_message.password;
//   //   }

//   //   for(var i in clients){

//   //     var client = clients[i];

//   //     if(exclude_current && client == ws){
//   //       continue;
//   //     }

//   //     SendMessage(client, message, original_message);
//   //   }
//   // }



  
//   /*
//     Cлужба рассылки уведомлений о новых письмах
//   */
//   // setInterval(() => {

//   //   let res = {};
//   //   let req = {};
//   //   let request = {};

//   //   let response = new Response(req, res, request, knex, clients, SendMessage, config);

//   //   // return response.process();

//   //   response.notifyUsersUnreadMessages({
//   //     headers: {},
//   //   }, {}, response, {});

//   // }, 1000 * 60 * 5);



//   // const success = function(req, res, response, knex){
    

//   //   res.writeHead(200, {'Content-Type': 'application/json'});
//   //   res.end(JSON.stringify(response));
//   // }

//   // const failure = function(req, res, response){


//   //   res.writeHead(200, {'Content-Type': 'application/json'});
//   //   res.end(JSON.stringify(response));
//   // }


//   // const processResponse = function(req, res, response){
//   //   if(response.success){
//   //     return success(req, res, response);
//   //   }
//   //   else{
//   //     return failure(req, res, response);
//   //   }
//   // }
 
 

//   /*
//    * Static
//    * */


//   /*
//    * Надстройка WebSocket для роутера
//    * */
//   // var expressWs = require('express-ws')(options.app);


//   /*
//    * API
//    * */
//   //



//   // const SendUsersActivity = function(){

//   //   var users_list = [];
//   //   var ids = {};

//   //   var total_active_clients = 0;

//   //   for(var i in clients){
//   //     var client = clients[i];

//   //     if(
//   //       client.readyState == client.OPEN
//   //     ){

//   //       total_active_clients++;

//   //       if(
//   //         client.user
//   //         && client.user.id
//   //         && !ids[client.user.id]
//   //       ){
//   //         ids[client.user.id] = true;
//   //         users_list.push(client.user);
//   //       }
//   //     }
//   //   }


//   //   users_list.reverse();

//   //   // for(var i in clients){
//   //   //   SendMessage(clients[i], {
//   //   //     type: "active_users_list",
//   //   //     users: users_list,
//   //   //   });
//   //   // }

//   //   /*
//   //    * Если список пользователей изменился, отправляем статистику
//   //    * */
//   //   if(md5(users_list) != md5(users)){
//   //     users = users_list;

//   //     SendMessageToAll({
//   //       type: "active_users_list",
//   //       users: users,
//   //     });
//   //   }


//   //   debug('SendUsersActivity');
//   //   debug('total_active_clients', total_active_clients);
//   //   debug('users', users);
//   //   return;
//   // }
 

//   // function SendMessageToUsers(message, users_ids){

//   //   // console.log("SendMessageToUsers", message, users_ids);
//   //   // console.log("SendMessageToUsers", users_ids);

//   //   if(!users_ids || users_ids == ""){
//   //     return;
//   //   }

//   //   users_ids = users_ids.split(",");

//   //   for(var i in users_ids){
//   //     users_ids[i] = Number(users_ids[i]);
//   //   }

//   //   clients.map(function(client){

//   //     // var client = clients[i];

//   //     // if(exclude_current && client == ws){
//   //     //   continue;
//   //     // }

//   //     // console.log("Проверяем клиента", users_ids);
//   //     // break;

//   //     // console.log(typeof client);

//   //     if(users_ids.indexOf(client.user_id) != -1){
//   //       // console.log('users_ids: ', client.user_id);

//   //       SendMessage(client, message);
//   //     }

//   //     // SendMessage(client, message);
//   //   });
//   // }
    


//   // const SendMODXRequest = (action, params) => {

//   //   const req = this.req;

//   //   const method = 'POST';

//   //   let url = `/assets/components/modxsite/connectors/connector.php?pub_action=${action}`;

//   //   let options = {
//   //     // host: host,
//   //     // port: 80,
//   //     // path: url,
//   //     method,
//   //     headers: {
//   //       // 'Content-Type': 'application/x-www-form-urlencoded',
//   //       // 'Content-Length': Buffer.byteLength(postData)
//   //     },
//   //     // json: {
//   //     //   users: users
//   //     // }
//   //   };

//   //   let form;

//   //   let {
//   //     sort,
//   //     ...other
//   //   } = params;

//   //   params = {...other};

//   //   if(sort){

//   //     if(Array.isArray(sort)){

//   //       sort = sort[0];

//   //       if(sort){

//   //         params.sort = sort.by;
//   //         params.dir = sort.dir || undefined;

//   //       }

//   //     }

//   //   }

//   //   if(method == 'POST' && params){
//   //     // var postData = querystring.stringify(params);


//   //     form = new FormData()

//   //     for(var i in params){
        
//   //       var value = params[i];

//   //       value = (typeof value !== "undefined") && value.toString && value.toString() || undefined;

//   //       if(value !== undefined){
//   //         form.append(i, value);
//   //       }
//   //     }

//   //     // form.append('limit', 3);
//   //     // form.append('with_coors_only', 'true');

//   //     options.body = form;

//   //     // Object.assign(options.headers, form.getHeaders());

      
//   //   }



//   //   /*
//   //   * Собираем кукисы из оригинального запроса и если передаются куки в параметрах запроса,
//   //   * то объединяем их
//   //   * */
//   //   var cookies = [];

//   //   let cookies_obj;

//   //   if(req.headers && req.headers.cookie){
//   //     let cooks = req.headers.cookie.split(";");

//   //     cookies_obj = {};

//   //     cooks.map(function(item){
//   //       var match = item.match(/ *(.+?)=(.+)/);
//   //       if(match){
//   //         cookies_obj[match[1]] = match[2];
//   //       }
//   //     });
//   //   }

//   //   if(cookies_obj){

//   //     for(var i in cookies_obj){
//   //       cookies.push(i + '=' + cookies_obj[i]);
//   //     }
//   //   }

//   //   if(cookies){
//   //     options.headers.Cookie = cookies;

//   //     debug("options.headers", options.headers);
//   //   }

//   //   debug("options.headers", options.headers);
//   //   debug("options", options);


//   //   return fetch(site_url + url, options)
//   //     .then(function(res) {
//   //       return res.json();
//   //     });
//   // };



//   // function SendMessageToUsers(message, users_ids){

//   //   // console.log("SendMessageToUsers", message, users_ids);
//   //   // console.log("SendMessageToUsers", users_ids);

//   //   if(!users_ids || users_ids == ""){
//   //     return;
//   //   }

//   //   users_ids = users_ids.split(",");

//   //   for(var i in users_ids){
//   //     users_ids[i] = Number(users_ids[i]);
//   //   }

//   //   clients.map(function(client){

//   //     // var client = clients[i];

//   //     // if(exclude_current && client == ws){
//   //     //   continue;
//   //     // }

//   //     // console.log("Проверяем клиента", users_ids);
//   //     // break;

//   //     // console.log(typeof client);

//   //     if(users_ids.indexOf(client.user_id) != -1){
//   //       // console.log('users_ids: ', client.user_id);

//   //       SendMessage(client, message);
//   //     }

//   //     // SendMessage(client, message);
//   //   });
//   // }

//   // router.ws('/api/', function(ws, req) {


//   //   debug("Server. WS Requested");

//   //   clients.push(ws);

//   //   ws.on('message', function incoming(message) {

//   //     debug('Я получил от вас сообщение: ' + message);

//   //     try{
//   //       var response = JSON.parse(message);

//   //       // debug("Server. Received message", response);

//   //       var result = {};


//   //       var raw_text = php.trim(response.text) || ''
//   //         ,text = php.strip_tags(raw_text)
//   //         .replace(/\[/g, '&#91;')
//   //         .replace(/\]/g, '&#93;');

//   //       var id = response.id;
//   //       var name = response.name;


//   //       switch(response.type){


//   //         // case 'form':

//   //         //   var url = '/assets/components/modxsite/connectors/connector.php?pub_action=' + response.pub_action;
//   //         //   SendMODXRequest(ws, url, response);

//   //         //   break;



//   //         /*
//   //          * Поиск топиков
//   //          * */
//   //         // case 'search':

//   //         //   // var postData = querystring.stringify({users: JSON.stringify(users)});

//   //         //   var url = '/topics/?query=' + encodeURIComponent(response.query);
//   //         //   SendMODXRequest(ws, url, response);


//   //         //   break;


//   //         /*
//   //          * Поиск пользователя
//   //          * */
//   //         // case 'find_user':

//   //         //   // var postData = querystring.stringify({users: JSON.stringify(users)});

//   //         //   // debug("local document");

//   //         //   // debug("WS", ws.hostname);
//   //         //   // debug("WS", ws.headers);

//   //         //   var url = '/assets/components/modxsite/connectors/connector.php?pub_action=users/getdata&current=true&query=' + encodeURIComponent(response.query);
//   //         //   SendMODXRequest(ws, url, response);
 

//   //         //   break;

//   //         /*
//   //          * Получаем данные своего профиля (копия предыдущей функции)
//   //          * */
//   //         // case 'user/get_own_data':

//   //         //   var url = '/assets/components/modxsite/connectors/connector.php?pub_action=users/get_own_data&current=true';

//   //         //   SendMODXRequest(ws, url, response, function(message){

//   //         //     if(message.success && message.object && message.object.id){

//   //         //       var user;

//   //         //       var object = message.object;
//   //         //       var user_id = object.id;

//   //         //       for(var i in users){
//   //         //         if(users[i].id == user_id){
//   //         //           user = users[i];
//   //         //           break;
//   //         //         }
//   //         //       }

//   //         //       if(!user){
//   //         //         user = {
//   //         //           id: object.id,
//   //         //           username: object.username,
//   //         //           fullname: object.fullname,
//   //         //           photo:    object.photo,
//   //         //         };

//   //         //         // debug("Активные пользователи", users || "sdfsdfsd");
//   //         //         // debug("Пользователь", user || "sdfsd");

//   //         //         // users.push(user);
//   //         //       }

//   //         //       ws.user = user;

//   //         //       // SendUsersActivity();
//   //         //     }

//   //         //     return message;
//   //         //   }); 

//   //         //   break;


//   //         /*
//   //          * Регистрация
//   //          * */
//   //         // case 'signup':

//   //         //   var url = '/assets/components/modxsite/connectors/connector.php?pub_action=users/create&username='+ response.login + '&password=' + response.password;

//   //         //   // debug("Запрос на поиск пользователя", url);

//   //         //   var options = {
//   //         //     host: host,
//   //         //     port: raw_host_port,
//   //         //     path: url,
//   //         //     // 'method': 'GET',
//   //         //     'headers': {
//   //         //       // 'Content-Type': 'application/x-www-form-urlencoded',
//   //         //       // 'Content-Length': Buffer.byteLength(postData)
//   //         //     },
//   //         //     // json: {
//   //         //     //   users: users
//   //         //     // }
//   //         //   };

//   //         //   if (ws.upgradeReq.headers.cookie) {
//   //         //     options.headers.Cookie = ws.upgradeReq.headers.cookie;
//   //         //   }


//   //         //   var callback = function(request){

//   //         //     // debug("load_document loaded response");

//   //         //     var client = this;

//   //         //     var str = '';
//   //         //     //
//   //         //     // //another chunk of data has been recieved, so append it to `str`
//   //         //     request.on('data', function (chunk) {
//   //         //       str += chunk;
//   //         //     });
//   //         //     //
//   //         //     // //the whole response has been recieved, so we just print it out here
//   //         //     request.on('end', function () {

//   //         //       // var response_headers = request.headers;
//   //         //       // debug("Response from MODX", str);

//   //         //       var message;

//   //         //       try{
//   //         //         var result = JSON.parse(str);

//   //         //         if(result.success && result.object && result.object.id){


//   //         //         }

//   //         //         // debug("Активные пользователи", users);

//   //         //         message = result;
//   //         //       }
//   //         //       catch(e){
//   //         //         console.error(e.message, e.stack);
//   //         //         // console.log(str);

//   //         //         message = e.message + e.stack;
//   //         //       }

//   //         //       debug("Результат регистрации пользователя", result, message);

//   //         //       SendMessage(client, message, response);

//   //         //     });
//   //         //   }

//   //         //   var request = httpServ.request(options, callback.bind(ws));
//   //         //   // request.write(postData);
//   //         //   request.end();

//   //         //   break;

//   //         // /*
//   //         //  * Поиск пользователя
//   //         //  * */
//   //         // case 'signin':


//   //         //   var url = '/assets/components/modxsite/connectors/connector.php?pub_action=login&username=' + encodeURIComponent(response.login) + '&password=' + (response.password);

//   //         //   // (ws, url, original_message, process_message_callback)
//   //         //   SendMODXRequest(ws, url, response, function(message){

//   //         //     if(message.success && message.object){
//   //         //       SendUsersActivity();
//   //         //     }

//   //         //     return message;
//   //         //   });




//   //         //   break;


//   //         /*
//   //          * Выход пользователя
//   //          * */
//   //         // case 'signout':


//   //         //   // console.log(ws.user);
//   //         //   // return;

//   //         //   var url = '/assets/components/modxsite/connectors/connector.php?pub_action=logout';

//   //         //   SendMODXRequest(ws, url, response, function(message){

//   //         //     if(message.success && ws.user && ws.user.id){
//   //         //       var user_id = ws.user.id;
//   //         //       for(var i in clients){
//   //         //         var client = clients[i];
//   //         //         if(client.user && client.user.id == user_id){
//   //         //           // clients.slice(i,1);
//   //         //           delete client.user;
//   //         //         }
//   //         //       }

//   //         //       SendUsersActivity();
//   //         //     }

//   //         //     return message;
//   //         //   });
//   //         //   break;
 
 
//   //         case 'message':

//   //           var client_id = response.client_id;


//   //           if(!client_id){
//   //             result = {
//   //               type: "error"
//   //               ,text: "Не был указан ID клиента"
//   //             };
//   //           }
//   //           else if(!text){
//   //             result = {
//   //               type: "error"
//   //               ,text: "Текст не может быть пустым"
//   //             };
//   //           }


//   //           else{
//   //             result = {
//   //               type: "message"
//   //               ,sender: {
//   //                 id: client_id
//   //                 ,guest: ws.client_data.guest
//   //                 ,name: ws.client_data.name
//   //                 ,photo: ws.client_data.photo
//   //               }
//   //               ,text: text
//   //             };
//   //           }

//   //           // debug('ws.client_data');
//   //           // debug(ws.client_data);

//   //           if(result.type == "error"){
//   //             ws.send(JSON.stringify(result));
//   //           }
//   //           else{
//   //             for(var i in clients){
//   //               if(clients[i].readyState == WebSocket.OPEN){
//   //                 clients[i].send(JSON.stringify(result));


//   //                 // debug("ws: ");
//   //                 // debug(ws);

//   //                 // write message into DB

//   //               }
//   //             }

//   //             var d = new Date();
//   //             var n = d.getTime();

//   //             Message.query().insert({
//   //               text: text
//   //               ,raw_text: raw_text
//   //               ,ts: String(n).substr(0,10) + '.' + String(n).substr(10)
//   //               ,user_id: ws.user_id
//   //               ,channel_id: ws.channel_id
//   //             }).then(function (record) {
//   //               // console.log(record);
//   //             });
//   //           }
//   //           break;



//   //         case 'joined':

//   //           // var users = [];
//   //           //
//   //           // for(var i in clients){
//   //           //   var client = clients[i];
//   //           //
//   //           //   if(client.readyState == WebSocket.OPEN){
//   //           //     users.push({
//   //           //       name: client.client_data.name
//   //           //       ,photo: client.client_data.photo
//   //           //       ,guest: client.client_data.guest
//   //           //     });
//   //           //   }
//   //           // }
//   //           //
//   //           // debug("User joined: ");
//   //           // debug(response);
//   //           //
//   //           // for(var i in clients){
//   //           //   if(clients[i].readyState == WebSocket.OPEN){
//   //           //     clients[i].send(JSON.stringify({
//   //           //       type: "joined"
//   //           //       ,text: ws.client_data.name
//   //           //       ,users: users
//   //           //     }));
//   //           //   }
//   //           // }
//   //           //
//   //           //
//   //           // var postData = querystring.stringify({users: JSON.stringify(users)});
//   //           //
//   //           // var options = {
//   //           //   host: host,
//   //           //   path: '/assets/components/modxsite/connectors/connector.php?pub_action=node/log_active_users',
//   //           //   'method': 'POST',
//   //           //   'headers': {
//   //           //     'Content-Type': 'application/x-www-form-urlencoded',
//   //           //     'Content-Length': Buffer.byteLength(postData)
//   //           //   },
//   //           //   json: {
//   //           //     users: users
//   //           //   }
//   //           // };
//   //           //
//   //           //
//   //           // var request = httpServ.request(options);
//   //           // request.write(postData);
//   //           // request.end();

//   //           ws.user_id = response.id;

//   //           break;

//   //         default:
//   //           // console.error("WS.", "Неизвестный тип сообщения");
//   //           // ws.send(JSON.stringify({
//   //           //   type: "error"
//   //           //   ,text: "Неизвестный тип сообщения"
//   //           // }));

//   //           // console.log(ws);

//   //           SendMessage(ws, {
//   //             type: "error"
//   //             ,text: "Неизвестный тип сообщения"
//   //           }, response);
//   //       }


//   //     }
//   //     catch(e){
//   //       console.error(e);
//   //     }

//   //     // clients.forEach(function each(client) {
//   //     //     client.send("Новое сообщение: " + message);
//   //     // });
//   //   });

//   //   // ws.send(JSON.stringify({
//   //   //   type: "hello"
//   //   // }));

//   //   ws.on('close', function(){

//   //     debug("Соединение закрыто");

//   //     for(var i in clients){
//   //       if(clients[i] === ws){
//   //         clients.splice(i, 1);
//   //         debug("Удален клиент из общего списка");
//   //         break;
//   //       }
//   //     }

//   //     // SendUsersActivity();
//   //   });




//   //   SendMessage(ws, {
//   //     type: "hello"
//   //   }, response);

//   // });


//   /*
//     Eof WS
//   */



//   /*
//   * API
//   * */

//   //   /*
//   //   * Собираем кукисы из оригинального запроса и если передаются куки в параметрах запроса,
//   //   * то объединяем их
//   //   * */
    

//   // router.post('/api/', function (req, res, next) {


//   //   const request = Object.assign(req.query, req.body);

//   //   let response = new Response(req, res, request, knex, config, clients, SendMessage);

//   //   return response.process(req, res, request);

//   // });

//   // router.use('/', function(req, res) {
    
//   //   const store = configureStore();
    
//   //   match({ 
//   //     routes, 
//   //     location: req.url 
//   //   }, async (error, redirectLocation, renderProps) => {

//   //     if (redirectLocation) { // Если необходимо сделать redirect
//   //       return res.redirect(301, redirectLocation.pathname + redirectLocation.search);
//   //     }

//   //     if (error) { // Произошла ошибка любого рода
//   //       return res.status(500).send(error.message);
//   //     }

//   //     if (!renderProps) { // мы не определили путь, который бы подошел для URL

//   //       let prevent;

//   //       await checkRedirect(req, res)
//   //         .then(r => {
//   //           prevent = r;
//   //         })
//   //         .catch(e => {
//   //           console.error(e);
//   //         });

//   //       if(!prevent){

//   //         // debug("knex resreq.headers", req);

//   //         var q = knex(`${prefix}monitor_requests`)
//   //           .insert({
//   //             site_url: req.hostname,
//   //             url: req.url,
//   //             http_status: 404,
//   //             context_key: "web",
//   //             parent: 0,
//   //             path: '/www/gorodskie-bani.ru/',
//   //             uuid: '',
//   //             ip: '',
//   //             time: 0,
//   //             php_error_info: '',
//   //             referer: '',
//   //             user_agent: req.headers['user-agent'],
//   //           })
//   //           ;

//   //           q.then((result) => { 

//   //             // debug("knex SQL", q.toString());
//   //             // debug("knex result", result);

//   //           }).catch(e => {

//   //             console.error(e);
//   //           });

//   //         return res.status(404).send('Not found');
//   //       }

//   //     }


//   //     let html;

//   //     try{
        
//   //       const componentHTML = ReactDom.renderToString(
//   //         <Provider store={store}>
//   //           <RouterContext {...renderProps} />
//   //         </Provider>
//   //       );

//   //       const state = store.getState();

//   //       html = renderHTML(componentHTML, state);
//   //     }
//   //     catch(e){
//   //       console.error(e);
//   //       return res.status(500).send(e.message);
//   //     };

//   //     return res.end(html);
//   //   });

//   //   return;
//   // });


//   // const checkRedirect = (req, res) => {

//   //   return new Promise((resolve, reject) => {

//   //     const requestedUri = decodeURI(req.url.replace(/^\/+/, ''));

//   //     var q = knex(`${prefix}redirects as redirects`)
//   //       .innerJoin(`${prefix}site_content as content`, 'redirects.resource_id', 'content.id')
//   //       // .select('profile.*')
//   //       .select('content.uri')
//   //       // .limit('3')
//   //       ;

//   //       q.where({
//   //         "redirects.uri": requestedUri,
//   //       });
//   //       q.whereNot('content.uri', requestedUri);


//   //       q.limit(1); 
//   //       // 
          
//   //       // console.log("knex SQL", q.toString());

//   //       q.then((result) => { 

//   //         // debug("knex result", result);

//   //         const {
//   //           uri,
//   //         } = result && result[0] || {};

//   //         if(uri && uri !== requestedUri){

//   //           return res.redirect(301, `/${uri}`);
//   //         }

//   //         return result;
//   //         return resolve(false);

//   //       }).catch(e => {

//   //         reject(e);
//   //       });


//   //     var cookies = [];

//   //     let cookies_obj;


//   //     let options = {
//   //       // method,
        
//   //       url: "http://gorodskie-bani.local:9000/" + req.url,

//   //       // location: req.url,
//   //       headers: {
//   //       },
//   //     };

//   //     if(req.headers && req.headers.cookie){
//   //       let cooks = req.headers.cookie.split(";");

//   //       cookies_obj = {};

//   //       cooks.map(function(item){
//   //         var match = item.match(/ *(.+?)=(.+)/);
//   //         if(match){
//   //           cookies_obj[match[1]] = match[2];
//   //         }
//   //       });
//   //     }

//   //     if(cookies_obj){

//   //       for(var i in cookies_obj){
//   //         cookies.push(i + '=' + cookies_obj[i]);
//   //       }
//   //     }

//   //     if(cookies){
//   //       options.headers.Cookie = cookies;
//   //     }


//   //     const {
//   //       host,
//   //     } = req.headers;


//   //     let req2 = httpServ.request(options, (request, a, b) => {
//   //       //

//   //       request.on('data', function (chunk) {
//   //         // str += chunk;
//   //       });
//   //       //
//   //       // //the whole response has been recieved, so we just print it out here
//   //       request.on('end', function () {

//   //         var response_headers = request.headers;
   
//   //         if(response_headers['location'] && response_headers['location'] != ''){

//   //           // res.redirect(301, 'http://yourotherdomain.com' + req.path)
//   //           res.redirect(301, response_headers['location'])
            
//   //           return resolve(true);
//   //         }

//   //         return resolve(false); 

//   //       });


//   //     });

//   //     req2.end();

//   //   });

//   // }
 
//   // function renderHTML(componentHTML, initialState) {

//   //   let assetsUrl;

//   //   let js_src;
//   //   let css_src;

//   //   let basePath;

//   //   if(process.env.NODE_ENV === 'production'){
//   //     assetsUrl = "/assets/components/modxsite/templates/v9/build/";

//   //     basePath = process.cwd() + "/build/";

//   //     var htmlFileName = "index.html";
//   //     // var html = fs.readFileSync(Path.join(assetsUrl, htmlFileName), "utf8");
//   //     var html = fs.readFileSync( `${basePath}${htmlFileName}`, "utf8");

//   //     let match = html.match(/<script .*?src="(.*?)"/);

//   //     if(match){
//   //       js_src = match[1];
//   //     }

//   //     let css_match = html.match(/<link [^>]*?href="([^\"]*?\.css)" rel="stylesheet"/);

//   //     if(css_match){
//   //       css_src = css_match[1];
//   //     }

//   //   }
//   //   else{
//   //     assetsUrl = "/build/";

//   //     js_src = `${assetsUrl}main.js`;
//   //     css_src = `${assetsUrl}css/main.css`;
//   //   }

//   //   // console.log('process.env.NODE_ENV CWD', process.cwd());
//   //   // console.log('process.env.NODE_ENV', process);
//   //   // console.log('process.env.NODE_ENV webpack', webpack);

//   //   return `
//   //     <!DOCTYPE html>
//   //       <html>
//   //       <head>
//   //         <meta charset="utf-8">
//   //         <meta name="viewport" content="width=device-width, initial-scale=1.0">
//   //         <title>Городские бани</title>
//   //         <meta name="robots" content="index, follow" />
//   //         <link rel="shortcut icon" href="/favicon.ico"/>
//   //         <link rel="alternate" hreflang="ru" href="http://gorodskie-bani.ru/" />
//   //         <link rel="stylesheet" href="${css_src}">
//   //         <base href="/" />
//   //         <script type="application/javascript">
//   //           window.REDUX_INITIAL_STATE = ${JSON.stringify(initialState)};
//   //         </script>

//   //         <script>
//   //           (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
//   //           (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
//   //           m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
//   //           })(window,document,'script','//www.google-analytics.com/analytics.js','ga');
//   //           ga('create', 'UA-39491207-3', 'auto');
//   //           ga('send', 'pageview');
//   //         </script>
          

//   //         <!-- Yandex.Metrika counter -->
//   //         <script type="text/javascript" >
//   //             (function (d, w, c) {
//   //                 (w[c] = w[c] || []).push(function() {
//   //                     try {
//   //                         w.yaCounter26848689 = new Ya.Metrika({
//   //                             id:26848689,
//   //                             clickmap:true,
//   //                             trackLinks:true,
//   //                             accurateTrackBounce:true,
//   //                             webvisor:true,
//   //                             trackHash:true
//   //                         });
//   //                     } catch(e) { }
//   //                 });

//   //                 var n = d.getElementsByTagName("script")[0],
//   //                     s = d.createElement("script"),
//   //                     f = function () { n.parentNode.insertBefore(s, n); };
//   //                 s.type = "text/javascript";
//   //                 s.async = true;
//   //                 s.src = "https://mc.yandex.ru/metrika/watch.js";

//   //                 if (w.opera == "[object Opera]") {
//   //                     d.addEventListener("DOMContentLoaded", f, false);
//   //                 } else { f(); }
//   //             })(document, window, "yandex_metrika_callbacks");
//   //         </script>
//   //         <noscript><div><img src="https://mc.yandex.ru/watch/26848689" style="position:absolute; left:-9999px;" alt="" /></div></noscript>
//   //         <!-- /Yandex.Metrika counter -->
        
//   //       </head>
//   //       <body>
//   //         <div id="root">${componentHTML}</div>
//   //       </body>
        
//   //       <script type="application/javascript" src="${js_src}"></script>

//   //     </html>
//   //   `;
//   // }
 
 

//   /*
//    * Static
//    * */
   

//   return router;
// }

// export default Router;