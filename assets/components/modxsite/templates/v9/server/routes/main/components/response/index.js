
var debug = require('debug')("server:response");

import moment from 'moment';
  
const querystring = require('querystring');

const httpServ = require('http');

import fetch from 'node-fetch';

var FormData = require('form-data');

import {
  db as db_config,
  host,
} from '../../../../config/config'; 

debug('config host', host);

let {
  connection: {
    prefix,
  },
} = db_config;

import {
  buildSchema,
  introspectionQuery,
  graphql,
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLInt,
  GraphQLFloat,
  GraphQLString,
  GraphQLBoolean,
  GraphQLList,
  GraphQLNonNull,
  GraphQLID,
  GraphQLEnumType,
} from 'graphql';

var knex;

var knexdb = require('knex');

export default class Response{

  constructor (req, res, params) {
 

    knex = knexdb(db_config);

    this.req = req;
    this.res = res;
    this.params = params;
    
    this.prepareSchema();
  }

  prepareSchema(){

    this.RatingGroupbyEnumList = {
      name : 'RatingGroupbyEnum',
      description : 'Способ группировки рейтингов',
      values : {
        company: {
          value: 'company',
          description : 'Сгруппировать по компаниям (общий рейтинг)'
        },
        rating_type: {
          value: 'rating_type',
          description : 'Сгруппировать по типам рейтингов (по каким рейтингам сколько голосов всего и по количеству компаний)'
        },
        company_and_rating_type: {
          value: 'company_and_rating_type',
          description : 'Сгруппировать по компаниям и типам рейтингов (средний балл на каждую компанию по типу рейтинга)'
        },
        // rating_type_and_company: {
        //   value: 'rating_type_and_company',
        //   description : 'Сгруппировать по компаниям и типам рейтингов в них'
        // },
      }
    };


    return;
  }

  SendMODXRequest (action, params) {

    const req = this.req;

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

    if(method == 'POST' && params){
      // var postData = querystring.stringify(params);


      form = new FormData()

      for(var i in params){
        var value = params[i] && params[i].toString() || undefined;

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


    return fetch('http://gorodskie-bani.local' + url, options);
  }

  contactsResolver = (object, args) => {

    return new Promise((resolve, reject) => {
      // Эта функция будет вызвана автоматически

      // В ней можно делать любые асинхронные операции,
      // А когда они завершатся — нужно вызвать одно из:
      // resolve(результат) при успешном выполнении
      // reject(ошибка) при ошибке

      let {
        id,
        limit,
        start,
        // service_id,   // Поиск по услуге
        // place_id,     // Поиск по геообъекту
      } = args || {};

      limit = limit || 0;

      let action = 'companies/getdata';

      let params = {
        with_coors_only: true,       // Только с координатами
        limit,
      };

      let request = this.SendMODXRequest(action, params); 


      request.then(function(res) {
        return res.json();
      })
      .then((data) => {

        if(!data.success){

          return reject(data.message || "Ошибка выполнения запроса");
        }

        // console.log('Response data', data);

        return resolve(data.object || []);
      })
      .catch((e) => {
        return reject(e);
      })
      ;


      // let request = this.SendMODXRequest(action, params); 

      // request.on('response', (response) => {
      //   // console.log('response', response.read());
      //   var str = '';
      //   //
      //   // //another chunk of data has been recieved, so append it to `str`
      //   response.on('data', function (chunk) {
      //     str += chunk;
      //   });

      //   response.on('end', function () {
      //     // console.log('response on end ', str);

      //     let data = [];

      //     try{
      //       data = JSON.parse(str);
      //     }
      //     catch(e){
      //       reject(e);
      //       return;
      //     }

      //     if(!data.success){

      //       return reject(data.message || "Ошибка выполнения запроса");
      //     }

      //     // console.log('Response data', data);

      //     resolve(data.object || []);
      //   });

      // });

      // request.end();
    });
  }

  RatingTypesResolver = (contact, args) => {

    let {
      id,
      limit,
      start,
      sort,
    } = args || {};

    var q = knex(`${prefix}site_content as rating_types`)
      // .innerJoin(`${prefix}user_attributes as profile`, 'users.id', 'profile.internalKey')
      // .select('profile.*')
      .select('rating_types.*')
      .select('rating_types.pagetitle as name')
      // .limit('3')
      ;

      q.where({
        deleted: 0,
        published: 1,
        hidemenu: 0,
        parent: 1349,
      });

      // if(contact_id){

      //   q.innerJoin(`${prefix}modxsite_contacts_places as places_contacts`, 'places_contacts.place_id', 'places.id');
      //   q.where('places_contacts.contact_id', contact_id);

      // }

      if(id){
        q.where('id', id);
      }

      if(limit > 0){
        q.limit(limit);
      }

      // console.log('.toSQL()', q.toSQL());

      q.then((result) => { 
        return result;
      });

    return q; 
  }

  RatingsResolver = (contact, args) => {

    const {
      RatingGroupbyEnumList,
    } = this;

    let {
      id,
      limit,
      start,
      sort,
      groupBy,
    } = args || {};

    var q = knex(`${prefix}society_votes as votes`)
      // .innerJoin(`${prefix}user_attributes as profile`, 'users.id', 'profile.internalKey')
      // .select('profile.*')
      // .select('round(sum(votes.vote_value) / count(*), 2) as rating')
      
      .select('votes.type')
      .select('votes.thread_id')
      .select('votes.target_id')
      .select('votes.vote_value as rating')
      // .limit('3')
      ;

      // q.where({
      // });

      q.where('type', '!=', 0);

      // if(contact_id){

      //   q.innerJoin(`${prefix}modxsite_contacts_places as places_contacts`, 'places_contacts.place_id', 'places.id');
      //   q.where('places_contacts.contact_id', contact_id);

      // }

      if(id){
        q.where('id', id);
      }

      if(limit > 0){
        q.limit(limit);
      }


    // this.RatingGroupbyEnumList = {
    //   name : 'RatingGroupbyEnum',
    //   description : 'Способ группировки рейтингов',
    //   values : {
    //     company: {
    //       value: 'company',
    //       description : 'Сгруппировать по компаниям (общий рейтинг)'
    //     },
    //     rating_type: {
    //       value: 'rating_type',
    //       description : 'Сгруппировать по типам рейтингов (по каким рейтингам сколько голосов всего и по количеству компаний)'
    //     },
    //     company_and_rating_type: {
    //       value: 'company_and_rating_type',
    //       description : 'Сгруппировать по компаниям и типам рейтингов (средний балл на каждую компанию по типу рейтинга)'
    //     },
    //     rating_type_and_company: {
    //       value: 'rating_type_and_company',
    //       description : 'Сгруппировать по компаниям и типам рейтингов в них'
    //     },
    //   }
    // };

      if(groupBy){
        
        q.count('* as quantity');
        q.select(knex.raw('round(sum(votes.vote_value) / count(*), 2) as rating'));
        q.select(knex.raw('max(votes.vote_value) as max_vote'));
        q.select(knex.raw('min(votes.vote_value) as min_vote'));

        switch(groupBy){
          // q.select(knex.raw('round(sum(votes.vote_value) / count(*), 2) as rating'))

          // q.groupBy('type');
          // q.groupBy('target_id');
          // q.groupBy('thread_id');

          // Сгруппировать по компаниям (общий рейтинг)
          case 'company':

            q.groupBy('thread_id');
            break;

          case 'rating_type':

            q.groupBy('type');
            break;

          // Сколько всего 
          case 'company_and_rating_type':
      
            // q.countDistinct('round(sum(votes.vote_value) / count(*), 2) as rating');

            q.groupBy('thread_id');
            q.groupBy('type');
            break;

          // case 'rating_type_and_company':

          //   q.groupBy('type');
          //   q.groupBy('thread_id');
          //   break;

          default:;
        }

      }
      else{
        // q.select('1 as quantity');
      }

      console.log('ratings .toSQL()', q.toSQL());

      q.then((result) => { 
        return result;
      });

    return q; 
  }

  placesResolver = (contact, args) => {

    let {
      id,
      limit,
      start,
      contact_id,
      withGeoOnly,
    } = args || {};

    if(contact){
      let {
        id: cont_id,
      } = contact;

      contact_id = cont_id;
    }

    var q = knex(`${prefix}gmapsdb_places as places`)
      // .innerJoin(`${prefix}user_attributes as profile`, 'users.id', 'profile.internalKey')
      // .select('profile.*')
      .select('places.*') 
      // .limit('3')
      ; 

      if(withGeoOnly){
        q.where('lat', '>', 0);
        q.where('lng', '>', 0);
      }

      if(contact_id){

        q.innerJoin(`${prefix}modxsite_contacts_places as places_contacts`, 'places_contacts.place_id', 'places.id');
        q.where('places_contacts.contact_id', contact_id);

      }

      if(id){
        q.where('id', id);
      }

      if(limit > 0){
        q.limit(limit);
      }

      // console.log('.toSQL()', q.toSQL());

      q.then((result) => { 
        return result;
      });

    return q; 
  }

  servicesResolver = (object, args) => {

    let {
      id,
      place_id,
      contact_id,
      limit,
      start,
    } = args || {};

    var q = knex(`${prefix}modxsite_services as services`)
      // .innerJoin(`${prefix}user_attributes as profile`, 'users.id', 'profile.internalKey')
      // .select('profile.*')
      .select('services.*') 
      // .limit('3')
      ; 

      if(place_id || contact_id){
        
        q.innerJoin(`${prefix}modxsite_place_services as place_services`, 'place_services.service_id', 'services.id');

        if(place_id){
          q.where('place_services.place_id', place_id);
        }

        if(contact_id){
          q.where('place_services.contact_id', contact_id);
        }

      }

      if(limit > 0){
        q.limit(limit);
      }

      if(id > 0){
        q.where('id', id);
      }

      console.log('services .toSQL()', q.toSQL());

      q.then((result) => { 
        return result;
      });

    return q; 
  }


  usersResolver = (project) => {

    var q = knex(`${prefix}users as users`)
      .innerJoin(`${prefix}user_attributes as profile`, 'users.id', 'profile.internalKey')
      .select('profile.*')
      .select('users.*') 
      .limit('3')
      ; 
      // console.log('.toSQL()', q.toSQL());

      q.then((result) => { 
        return result;
      });

    return q; 
  }

  resourcesResolver = (author) => {  

    let {
      id: author_id,
    } = author || {};

    var q = knex(`${prefix}site_content as resources`)
      .select('resources.*')
      .limit('3')
      ; 
      
      q.where("deleted", 0);
      q.where("published", 1);
      q.where("hidemenu", 0);
      q.where("context_key", "web");

      if(author_id){
        q.where("createdby", author_id);
      }
      

      // console.log('.toSQL()', q.toSQL());

      q.then((result) => { 
        return result;
      });

    return q; 
  }
 

  getSchema(){

    let RatingTypeType;
    let RatingsType;
    let RatingGroupbyEnum;

    let PlaceType;
    let ContactType;
    let ServiceType;

    const {
      RatingGroupbyEnumList,
    } = this;
    

    RatingGroupbyEnum = new GraphQLEnumType(RatingGroupbyEnumList);

    RatingTypeType = new GraphQLObjectType({
      name: 'RatingTypeType',
      fields: () => {

        return {
          id: {
            type: GraphQLInt
          },
          name: {
            type: GraphQLString
          },
        };
      },
    });


    RatingsType = new GraphQLObjectType({
      name: 'RatingsType',
      fields: () => {

        return {
          rating: {
            type: GraphQLFloat
          },
          max_vote: {
            type: GraphQLFloat
          },
          min_vote: {
            type: GraphQLFloat
          },
          type: {
            type: GraphQLInt
          },
          thread_id: {
            type: GraphQLInt
          },
          target_id: {
            type: GraphQLInt
          },
          quantity: {
            type: GraphQLInt
          },
        };
      },
    }); 

    PlaceType = new GraphQLObjectType({
      name: 'PlaceType',
      fields: () => {

        return {
          id: {
            type: GraphQLInt
          },
          name: {
            type: GraphQLString
          },
          contacts: {
            type: new GraphQLList(ContactType),
            resolve: (place) => {

              const {
                id: place_id,
              } = place;

              return this.contactsResolver(null, {
                place_id,
              });
            },
          },
          services: {
            type: new GraphQLList(ServiceType),
            args: {
              // place_id: {
              //   type: GraphQLID
              //   // type: new GraphQLNonNull(GraphQLID)
              // },
              // limit: {
              //   type: new GraphQLNonNull(GraphQLInt),
              // },
              // contact_id: {
              //   type: GraphQLInt
              // },
              // withGeoOnly: {
              //   type: GraphQLBoolean
              // },
            },
            resolve: (place, args) => {

              const {
                id: place_id,
              } = place;

              return this.servicesResolver(null, {
                place_id,
                limit: 0,
              });
            },
          },
        };
      },
    }); 

    ContactType = new GraphQLObjectType({
      name: 'ContactType',
      fields: () => {

        return {
          id: {
            type: GraphQLInt
          },
          name: {
            type: GraphQLString
          },
          places: {
            type: new GraphQLList(PlaceType),
            resolve: (contact) => {

              const {
                id: contact_id,
              } = contact;

              return this.placesResolver(null, {
                contact_id,
              });
            },
          },
          services: {
            type: new GraphQLList(ServiceType),
            resolve: (contact, args) => {

              const {
                id: contact_id,
              } = contact;

              return this.servicesResolver(null, {
                contact_id,
                limit: 0,
              });
            },
          },
        }
      }
    });

    ServiceType = new GraphQLObjectType({
      name: 'ServiceType',
      fields: () => {
        return {
          id: {
            type: GraphQLInt,
          },
          name: {
            type: GraphQLString
          },
          parent: {
            type: GraphQLInt
          },
          places: {
            type: new GraphQLList(PlaceType),
            resolve: (service, args) => {

              // console.log('this.ServiceType placesResolver', service, args);

              const {
                id: service_id,
              } = service;

              Object.assign(args, {
                service_id,
              });

              // console.log('this.ServiceType placesResolver 2', {}, args);

              return this.placesResolver(service, args);
            },
          },
          contacts: {
            type: new GraphQLList(ContactType),
            // args: {
            //   id: {
            //     type: GraphQLID
            //     // type: new GraphQLNonNull(GraphQLID)
            //   },
            //   limit: {
            //     type: GraphQLInt
            //   },
            // },
            resolve: (service, args) => {

              // console.log('this.ServiceType contactsResolver', service, args);

              const {
                id: service_id,
              } = service;

              Object.assign(args, {
                service_id,
              });

              // console.log('this.ServiceType contactsResolver 2', {}, args);


              return this.contactsResolver({}, args);
            },
          },
        }
      }
    });

    const DocumentType = new GraphQLObjectType({
      name: 'DocumentType',
      fields: {
        id: {
          type: GraphQLInt
        },
        pagetitle: {
          type: GraphQLString
        },
        longtitle: {
          type: GraphQLString
        },
        uri: {
          type: GraphQLString
        },
      }
    });

    const UserType = new GraphQLObjectType({
      name: 'UserType',
      fields: {
        id: {
          type: GraphQLInt
        },
        username: {
          type: GraphQLString
        },
        fullname: {
          type: GraphQLString
        },
        resources: {
          type: new GraphQLList(DocumentType),
          resolve: (author) => {
            return this.resourcesResolver(author);
          },
        }
      }
    });


    const RootType = new GraphQLObjectType({
      name: 'RootType',
      fields: {
        rating_types: {
          type: new GraphQLList(RatingTypeType),
          args: {
            id: {
              type: GraphQLID
              // type: new GraphQLNonNull(GraphQLID)
            },
            limit: {
              type: new GraphQLNonNull(GraphQLInt)
              // type: GraphQLInt
            },
          },
          resolve: (object, args) => {

            // console.log('this.contactsResolver', object, args);

            return this.RatingTypesResolver(object, args);
          },
        },
        ratings: {
          type: new GraphQLList(RatingsType),
          args: {
            id: {
              type: GraphQLID
              // type: new GraphQLNonNull(GraphQLID)
            },
            limit: {
              type: new GraphQLNonNull(GraphQLInt)
              // type: GraphQLInt
            },
            groupBy: {
              type : RatingGroupbyEnum,
            },
          },
          resolve: (object, args) => {

            // console.log('this.contactsResolver', object, args);

            return this.RatingsResolver(object, args);
          },
        },
        contacts: {
          type: new GraphQLList(ContactType),
          args: {
            id: {
              type: GraphQLID
              // type: new GraphQLNonNull(GraphQLID)
            },
            limit: {
              type: new GraphQLNonNull(GraphQLInt)
              // type: GraphQLInt
            },
            service_id: {
              type: GraphQLInt
            },
            place_id: {
              type: GraphQLInt
            },
          },
          resolve: (object, args) => {

            // console.log('this.contactsResolver', object, args);

            return this.contactsResolver(object, args);
          },
        },
        places: {
          type: new GraphQLList(PlaceType),
          args: {
            id: {
              type: GraphQLID
              // type: new GraphQLNonNull(GraphQLID)
            },
            limit: {
              // type: GraphQLInt
              type: new GraphQLNonNull(GraphQLInt)
            },
            contact_id: {
              type: GraphQLInt
            },
            service_id: {
              type: GraphQLInt
            },
            withGeoOnly: {
              type: GraphQLBoolean
            },
          },
          resolve: (object, args) => {

            // console.log('this.contactsResolver', object, args);

            return this.placesResolver(object, args);
          },
        },
        services: {
          type: new GraphQLList(ServiceType),
          args: {
            id: {
              type: GraphQLID
              // type: new GraphQLNonNull(GraphQLID)
            },
            limit: {
              type: new GraphQLNonNull(GraphQLInt),
            },
            contact_id: {
              type: GraphQLInt
            },
            place_id: {
              type: GraphQLInt
            },
            // withGeoOnly: {
            //   type: GraphQLBoolean
            // },
          },
          resolve: (object, args) => {
            return this.servicesResolver(object, args);
          },
        },
        users: {
          type: new GraphQLList(UserType),
          resolve: () => {
            return this.usersResolver();
          },
        },
        resources: {
          type: new GraphQLList(DocumentType),
          resolve: () => {
            return this.resourcesResolver();
          },
        },
      }
    });



    var schema = new GraphQLSchema({
      query: RootType
    });

    return schema;
  }

  process(){  

    let {
      pub_action,
      ...params 
    } = this.getRequestParams();

    let {
      query,
    } = params;

    try{
      query = JSON.parse(query);
    }
    catch(e){

      console.error("Error parse query", e);

      query = {};
    }

    // console.log('Query params', params); 

    try{
      switch(pub_action){

        case 'schema':

          // console.log('graphql params', query);


          var schema = this.getSchema();


          // graphql(schema, query).then((response) => {

          //   this.success("", response);
          // });

          graphql(schema, introspectionQuery).then(result => {

            return this.success("", result);
          });

          return ;
          break;

        case 'graphql':

          // console.log('graphql params', query);


          var schema = this.getSchema();


          graphql(schema, query).then((response) => {

            this.success("", response);
          });

          return ;
          break;
        

        default:;
      }
    }
    catch(e){

      return this.failure(e.message, e.stack);
    }

    return this.failure("Неизвестное действие");
  }

  getRequestParams(){
    let params = this.params || {};
    let query = this.req.query || {};

    return Object.assign(query, params);
  }

  success(message, object){

    return this.outputResponse(true, message, object)
  }

  failure(message, object){

    return this.outputResponse(false, message, object)
  }

  outputResponse(success, message, object){

    // let output = object || {};

    let output = {
      success,
      message,
      object,
    };

    this.res.writeHead(200, {'Content-Type': 'application/json'});
    this.res.end(JSON.stringify(output));
  } 

}