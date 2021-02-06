'use strict';


// import React    from 'react';
// import ReactDom from 'react-dom/server';
// import { match, RouterContext } from 'react-router';
// import { Provider } from "react-redux";

// const fs = require('fs');

import configureStore from '../../../app/store';
import routes from "../../../app/routes";

import {
  MainApp,
} from "modules/Site/components/App/";

// var Model = require('objection').Model;

import Response from './components/response';

var debug = require('debug')("server:router/main");

// import md5 from 'md5';

// import fetch from 'node-fetch';

// const geoip = require('geoip-lite');

// const FormData = require('form-data');


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

// const knex = require('knex')(db_config);

// let styles = {};



// let apiData;
// let mapData;
// let citiesData;


/*
  OLD Router
*/

import ReactCmsRouter from 'react-cms/src/server/components/Router';

export default class Router extends ReactCmsRouter {


  constructor(options = {}) {

    Object.assign(options, {
      config,
      db_config,
      site_url,
      configureStore,
      routes,
      MainApp,
      Response,
    });

    super(options);

    // this.router = this.createRouter(options);

    // console.log("this.router", this.router);
  }

  processMainRequest(req, res) {

    // const url = req.url;

    let rewrite_rule;

    const decodedURI = decodeURI(req.url).replace(/\@[0-9\.\,]+/, '');


    // console.log("processMainRequest");

    // Яндекс наиндексировал херни
    let redirectMatch;

    // console.log("decodedURI", decodedURI);


    // rewrite_rule = /(\/tag\/.+?\/)(.+)$/;

    // console.log("decodedURI match", decodedURI.match(rewrite_rule));

    // if(rewrite_rule.test(decodedURI)){
    //     return res.redirect(301, decodedURI.replace(rewrite_rule, "$1"));
    // }


    if (decodedURI) {

      if (/.+\/bani-otzivy\/$/.test(decodedURI)) {
        return res.redirect(301, '/bani-otzivy/');
      }

      redirectMatch = decodedURI.match(/.+(\/(topics|city|ratings|bani|cherepovecz)\/.*)/);

      if (redirectMatch && redirectMatch[1]) {
        return res.redirect(301, redirectMatch[1]);
      }


      if (/.+\/contacts.html$/.test(decodedURI)) {
        return res.redirect(301, '/contacts.html');
      }

      rewrite_rule = /(\/.+?\/.+?)(\/.*\@.*)$/;

      if (rewrite_rule.test(decodedURI)) {
        return res.redirect(301, decodedURI.replace(rewrite_rule, "$2"));
      }

      rewrite_rule = /(\/tag\/.+?\/)(.+)$/;

      if (rewrite_rule.test(decodedURI)) {
        return res.redirect(301, decodedURI.replace(rewrite_rule, "$1"));
      }


    }

    return super.processMainRequest(req, res);

  };

}
