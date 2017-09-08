
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


    return fetch('http://gorodskie-bani.local' + url, options);
  }


  companiesListResolver = (object, args) => {

    return new Promise((resolve, reject) => {
      // Эта функция будет вызвана автоматически

      // В ней можно делать любые асинхронные операции,
      // А когда они завершатся — нужно вызвать одно из:
      // resolve(результат) при успешном выполнении
      // reject(ошибка) при ошибке

      // console.log('companiesResolver args', args);

      let {
        id,
        limit,
        start,
        count,
        voted_companies,
      } = args || {};

      limit = limit || 0;

      let action = 'companies/getdata';

      let params = {
        with_coors_only: true,       // Только с координатами
        company_id: id,
        limit,
        start,
        count: count === undefined ? 1 : count,
        companies: voted_companies,
      };

      let request = this.SendMODXRequest(action, params); 


      request.then(function(res) {
        return res.json();
      })
      .then((data) => {

        if(!data.success){

          return reject(data.message || "Ошибка выполнения запроса");
        }

        // delete(data.object);

        // console.log('Response data', data);

        return resolve(data);
      })
      .catch((e) => {
        return reject(e);
      })
      ;
    });
  }

  companiesResolver = (object, args) => {

    return new Promise((resolve, reject) => {
      // Эта функция будет вызвана автоматически

      // В ней можно делать любые асинхронные операции,
      // А когда они завершатся — нужно вызвать одно из:
      // resolve(результат) при успешном выполнении
      // reject(ошибка) при ошибке

      // console.log('companiesResolver args', args);

      let {
        id,
        limit,
        start,
        voted_companies,
      } = args || {};

      limit = limit || 0;

      let action = 'companies/getdata';

      let params = {
        with_coors_only: true,       // Только с координатами
        company_id: id,
        limit,
        start,
        companies: voted_companies,
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
    });
  }

  RatingTypesResolver = (Company, args) => {

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

      // if(Company_id){

      //   q.innerJoin(`${prefix}modxsite_companies_places as places_companies`, 'places_companies.place_id', 'places.id');
      //   q.where('places_companies.Company_id', Company_id);

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

  RatingsResolver = (Company, args) => {

    // console.log('RatingsResolver args', args);

    const {
      RatingGroupbyEnumList,
    } = this;

    let {
      type,
      company,
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
      .select('votes.target_id as company_id')
      .select('votes.vote_value as rating')
      // .limit('3')
      ;

      // q.where({
      // });

      q.where('type', '!=', 0);

      // if(Company_id){

      //   q.innerJoin(`${prefix}modxsite_companies_places as places_companies`, 'places_companies.place_id', 'places.id');
      //   q.where('places_companies.Company_id', Company_id);

      // }

      if(type){
        q.where('type', type);
      }

      if(company){
        q.where('target_id', company);
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
        
        q.select(knex.raw('GROUP_CONCAT(DISTINCT votes.target_id) as voted_companies'));

        switch(groupBy){
          // q.select(knex.raw('round(sum(votes.vote_value) / count(*), 2) as rating'))

          // q.groupBy('type');
          // q.groupBy('target_id');

          // Сгруппировать по компаниям (общий рейтинг)
          case 'company':

            q.groupBy('target_id');
            break;

          case 'rating_type':

            q.groupBy('type');
            break;

          // Сколько всего 
          case 'company_and_rating_type':
      
            // q.countDistinct('round(sum(votes.vote_value) / count(*), 2) as rating');
        
            // q.select(knex.raw('GROUP_CONCAT(votes.target_id) as voted_companies'));

            q.groupBy('target_id');
            q.groupBy('type');
            break;

          // case 'rating_type_and_company':

          //   q.groupBy('type');
          //   break;

          default:;
        }

      }
      else{
        // q.select('1 as quantity');
      }

      // console.log('ratings .toSQL()', q.toSQL());

      q.then((result) => { 
        return result;
      });

    return q; 
  }

  citiesResolver = (parent, args) => {

    let {
      id,
      limit,
      start,
    } = args || {};

    var q = knex(`${prefix}site_content as cities`)
      // .innerJoin(`${prefix}user_attributes as profile`, 'users.id', 'profile.internalKey')
      // .select('profile.*')
      .select('cities.*') 
      .select('cities.pagetitle as name')
      .select('coords_tv.value as coords')
      // .limit('3')
      ;

      q.leftJoin(`${prefix}site_tmplvar_contentvalues as coords_tv`, function() {
        this.on('coords_tv.contentid', 'cities.id')
          .andOn('coords_tv.tmplvarid', 27)
          .andOn(knex.raw("coords_tv.value != ''"))
      });
 
      q.where({
        template: 26,
        published: 1,
        deleted: 0,
        hidemenu: 0,
      });

      if(id){
        q.where('id', id);
      }

      if(limit > 0){
        q.limit(limit);
      }

      // console.log('.toSQL()', q.toSQL());

      q.orderByRaw("FIELD(cities.id, 1201, 1199, 1197) DESC");
      q.orderBy('pagetitle', 'ASC');

      q.then((result) => { 
        return result;
      });

    return q; 
  }

  placesResolver = (Company, args) => {

    let {
      id,
      limit,
      start,
      Company_id,
      withGeoOnly,
    } = args || {};

    if(Company){
      let {
        id: cont_id,
      } = Company;

      Company_id = cont_id;
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

      if(Company_id){

        q.innerJoin(`${prefix}modxsite_companies_places as places_companies`, 'places_companies.place_id', 'places.id');
        q.where('places_companies.Company_id', Company_id);

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
      Company_id,
      limit,
      start,
    } = args || {};

    var q = knex(`${prefix}modxsite_services as services`)
      // .innerJoin(`${prefix}user_attributes as profile`, 'users.id', 'profile.internalKey')
      // .select('profile.*')
      .select('services.*') 
      // .limit('3')
      ; 

      if(place_id || Company_id){
        
        q.innerJoin(`${prefix}modxsite_place_services as place_services`, 'place_services.service_id', 'services.id');

        if(place_id){
          q.where('place_services.place_id', place_id);
        }

        if(Company_id){
          q.where('place_services.Company_id', Company_id);
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

    let RatingTypesType;
    let RatingsType;
    let RatingGroupbyEnum;

    let CityType;
    let PlaceType;
    let CompanyType;
    let ServiceType;

    const {
      RatingGroupbyEnumList,
    } = this;
    
    RatingGroupbyEnum = new GraphQLEnumType(RatingGroupbyEnumList);

    RatingTypesType = new GraphQLObjectType({
      name: 'RatingTypesType',
      description: 'Тип рейтинга (Парилка, Интерьер, Кухня и т.п.)',
      fields: () => {

        return {
          id: {
            type: GraphQLInt
          },
          name: {
            type: GraphQLString
          },
          ratings: {
            type: new GraphQLList(RatingsType),
            resolve: (rating_type) => {

              const {
                id: type,
              } = rating_type;

              let args = {
                type,
                groupBy: 'rating_type',
                limit: 0,
              };

              console.log('RatingsResolver args', args, rating_type);

              return this.RatingsResolver(null, args);
            },
          },
        };
      },
    });


    RatingsType = new GraphQLObjectType({
      name: 'RatingsType',
      description: 'Рейтинги бань (с возможностью группировки по типам рейтингов и компаний)',
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
          company_id: {
            type: GraphQLInt
          },
          quantity: {
            type: GraphQLInt
          },
          voted_companies: {
            type: GraphQLString
          },
          companies: {
            type: new GraphQLList(CompanyType),
            resolve: (rating) => {

              const {
                company_id,
                voted_companies,
              } = rating;

              if(!voted_companies && !company_id){
                return [];
              }

              let args = {};

              if(voted_companies){
                Object.assign(args, {
                  voted_companies,
                });
              }
              else{
                Object.assign(args, {
                  id: company_id,
                });
              }

              console.log('this.companiesResolver args', args, rating);

              return this.companiesResolver(null, args);
            },
          },
          rating_type: {
            type: new GraphQLList(RatingTypesType),
            resolve: (rating) => {

              const {
                type,
              } = rating;

              let args = {
                id: type,
                limit: 0,
              };

              return this.RatingTypesResolver(null, args);
            },
          },
        };
      },
    }); 

    CityType = new GraphQLObjectType({
      name: 'CityType',
      fields: () => {

        return {
          id: {
            type: GraphQLInt
          },
          name: {
            type: GraphQLString
          },
          defaultZoom: {
            type: GraphQLInt,
            resolve: (object) => {
              let zoom;
              
              switch(object.id){

                // Москва
                case 1197:
                // Спб
                case 1201:
                  zoom = 11;
                  break;

                // Кронштадт
                case 1394:
                  zoom = 12;
                  break;


                // Москва
                case 1199:
                  zoom = 9;
                  break;

                default: zoom = 12;
              }

              return zoom;
            },
          },
          coords: {
            type: new GraphQLObjectType({
              // new GraphQLObjectType({
                name: 'cityCoordsType',
                fields: {
                  lat: {
                    type: GraphQLFloat,
                  },
                  lng: {
                    type: GraphQLFloat,
                  },
                },
              // })
            }),
            resolve: (object) => {

              let {
                coords,
              } = object;

              if(coords){
                coords = coords.split(",").map(n => parseFloat(n));
              }

              return coords && {
                lat: coords[1],
                lng: coords[0],
              } || null;

            },
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
          companies: {
            type: new GraphQLList(CompanyType),
            resolve: (place) => {

              const {
                id: place_id,
              } = place;

              return this.companiesResolver(null, {
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
              // Company_id: {
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

    CompanyType = new GraphQLObjectType({
      name: 'CompanyType',
      fields: () => {

        return {
          id: {
            type: GraphQLInt
          },
          name: {
            type: GraphQLString
          },
          longtitle: {
            type: GraphQLString
          },
          description: {
            type: GraphQLString
          },
          alias: {
            type: GraphQLString
          },
          uri: {
            type: GraphQLString
          },
          image: {
            type: GraphQLString
          },
          city_id: {
            type: GraphQLInt
          },
          city: {
            type: GraphQLString
          },
          city_uri: {
            type: GraphQLString
          },
          tvs: {
            type: new GraphQLObjectType({
              name: 'TSvType',
              fields: {
                address: {
                  type: GraphQLString,
                  description: 'Адрес',
                },
                site: {
                  type: GraphQLString,
                  description: 'Веб-сайт',
                },
                facility_type: {
                  type: GraphQLString,
                  description: 'Тип заведения',
                },
                phones: {
                  type: GraphQLString,
                  description: 'Телефон',
                },
                work_time: {
                  type: GraphQLString,
                  description: 'Рабочее время',
                },
                prices: {
                  type: GraphQLString,
                  description: 'Цены',
                },
                metro: {
                  type: GraphQLString,
                  description: 'Метро',
                },
              },
            }),
            resolve: (object) => {
              let tvs = {};

              if(object.tvs){

                for(var name in object.tvs){

                  var tv = object.tvs[name];

                  if(tv){

                    var {
                      tv_id: id,
                      caption,
                      value,
                    } = tv;

                    tvs[name] = value;

                  }
                }
                
              }

              return tvs;
            },
          },
          gallery: {
            type: new GraphQLList(
              new GraphQLObjectType({
                name: 'galleryType',
                fields: {
                  image: {
                    type: GraphQLString,
                  },
                },
              })
            ),
            resolve: (object) => {
              return object.gallery || [];
            },
          },
          coords: {
            type: new GraphQLObjectType({
              // new GraphQLObjectType({
                name: 'coordsType',
                fields: {
                  lat: {
                    type: GraphQLFloat,
                  },
                  lng: {
                    type: GraphQLFloat,
                  },
                },
              // })
            }),
            resolve: (object) => {

              return object.coords && {
                lat: object.coords[1],
                lng: object.coords[0],
              } || null;
            },
          },
          ratings: {
            description: 'Рейтинги компании',
            type: new GraphQLList(RatingsType),
            args: {
              type: {
                type: GraphQLID
                // type: new GraphQLNonNull(GraphQLID)
              },
              limit: {
                type : GraphQLInt,
              },
              groupBy: {
                type : RatingGroupbyEnum,
              },
            },
            resolve: (company, args) => {

              // console.log('CompanyType ratings resolver', company, args);

              const {
                id: company_id,
              } = company;

              Object.assign(args, {
                company: company_id,
              });

              return this.RatingsResolver(company, args);
            },
          },
          ratingAvg: {
            description: 'Суммарный рейтинг',
            type: new GraphQLList(RatingsType),
            args: {
              groupBy: {
                type : RatingGroupbyEnum,
              },
            },
            resolve: (company, args) => {

              // console.log('CompanyType ratings resolver', company, args);

              const {
                id: company_id,
              } = company;

              Object.assign(args, {
                company: company_id,
                groupBy: 'company',
                limit: 1,
              });

              return this.RatingsResolver(company, args);
            },
          },
          ratingsByType: {
            description: 'Рейтинг по типам',
            type: new GraphQLList(RatingsType),
            args: {
              groupBy: {
                type : RatingGroupbyEnum,
              },
            },
            resolve: (company, args) => {

              // console.log('CompanyType ratings resolver', company, args);

              const {
                id: company_id,
              } = company;

              Object.assign(args, {
                company: company_id,
                groupBy: 'rating_type',
              });

              return this.RatingsResolver(company, args);
            },
          },
          votes: {
            description: 'Все голоса за компанию',
            type: new GraphQLList(RatingsType),
            args: {
              groupBy: {
                type : RatingGroupbyEnum,
              },
            },
            resolve: (company, args) => {

              // console.log('CompanyType ratings resolver', company, args);

              const {
                id: company_id,
              } = company;

              Object.assign(args, {
                company: company_id,
              });

              return this.RatingsResolver(company, args);
            },
          },
          // places: {
          //   type: new GraphQLList(PlaceType),
          //   resolve: (Company) => {

          //     const {
          //       id: Company_id,
          //     } = Company;

          //     return this.placesResolver(null, {
          //       Company_id,
          //     });
          //   },
          // },
          // services: {
          //   type: new GraphQLList(ServiceType),
          //   resolve: (Company, args) => {

          //     const {
          //       id: Company_id,
          //     } = Company;

          //     return this.servicesResolver(null, {
          //       Company_id,
          //       limit: 0,
          //     });
          //   },
          // },
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
          companies: {
            type: new GraphQLList(CompanyType),
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

              // console.log('this.ServiceType companiesResolver', service, args);

              const {
                id: service_id,
              } = service;

              Object.assign(args, {
                service_id,
              });

              // console.log('this.ServiceType companiesResolver 2', {}, args);


              return this.companiesResolver({}, args);
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
          type: new GraphQLList(RatingTypesType),
          description: RatingTypesType.description,
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

            // console.log('this.companiesResolver', object, args);

            return this.RatingTypesResolver(object, args);
          },
        },
        ratings: {
          type: new GraphQLList(RatingsType),
          description: RatingTypesType.description,
          args: {
            type: {
              type: GraphQLID
              // type: new GraphQLNonNull(GraphQLID)
            },
            limit: {
              type: new GraphQLNonNull(GraphQLInt)
              // type: GraphQLInt
            },
            company: {
              type: GraphQLInt,
              description: 'ID компании, по которой надо получить рейтинги',
              // type: GraphQLInt
            },
            groupBy: {
              type : RatingGroupbyEnum,
            },
          },
          resolve: (object, args) => {

            // console.log('this.companiesResolver', object, args);

            return this.RatingsResolver(object, args);
          },
        },
        // companies: {
        //   type: new GraphQLList(CompanyType),
        //   args: {
        //     id: {
        //       type: GraphQLID
        //       // type: new GraphQLNonNull(GraphQLID)
        //     },
        //     limit: {
        //       type: new GraphQLNonNull(GraphQLInt)
        //       // type: GraphQLInt
        //     },
        //     service_id: {
        //       type: GraphQLInt
        //     },
        //     place_id: {
        //       type: GraphQLInt
        //     },
        //   },
        //   resolve: (object, args) => {

        //     // console.log('this.companiesResolver', object, args);

        //     return this.companiesResolver(object, args);
        //   },
        // },
        companies: {
          type: new GraphQLObjectType({
            name: "CompaniesList",
            fields: {
              success: {
                type: GraphQLBoolean,
              },
              message: {
                type: GraphQLString,
              },
              total: {
                type: GraphQLInt,
              },
              limit: {
                type: GraphQLInt,
              },
              page: {
                type: GraphQLInt,
              },
              object: {
                type: new GraphQLList(CompanyType),
                resolve: (response, args) => {

                  // console.log('this.CompanyType Resolver', response, args);

                  return response && response.success && response.object || [];
                },
              },
            },
          }),
          args: {
            id: {
              type: GraphQLID
              // type: new GraphQLNonNull(GraphQLID)
            },
            limit: {
              type: new GraphQLNonNull(GraphQLInt)
              // type: GraphQLInt
            },
            // service_id: {
            //   type: GraphQLInt
            // },
            // place_id: {
            //   type: GraphQLInt
            // },
          },
          resolve: (object, args) => {
            // console.log('this.companiesResolver', object, args);

            return this.companiesListResolver(object, args);
          },
        },
        cities: {
          type: new GraphQLList(CityType),
          args: {
            id: {
              type: GraphQLID
              // type: new GraphQLNonNull(GraphQLID)
            },
            limit: {
              // type: GraphQLInt
              type: new GraphQLNonNull(GraphQLInt)
            },
            // Company_id: {
            //   type: GraphQLInt
            // },
            // service_id: {
            //   type: GraphQLInt
            // },
            // withGeoOnly: {
            //   type: GraphQLBoolean
            // },
          },
          resolve: (object, args) => {

            // console.log('this.companiesResolver', object, args);

            return this.citiesResolver(object, args);
          },
        },
        // places: {
        //   type: new GraphQLList(PlaceType),
        //   args: {
        //     id: {
        //       type: GraphQLID
        //       // type: new GraphQLNonNull(GraphQLID)
        //     },
        //     limit: {
        //       // type: GraphQLInt
        //       type: new GraphQLNonNull(GraphQLInt)
        //     },
        //     Company_id: {
        //       type: GraphQLInt
        //     },
        //     service_id: {
        //       type: GraphQLInt
        //     },
        //     withGeoOnly: {
        //       type: GraphQLBoolean
        //     },
        //   },
        //   resolve: (object, args) => {

        //     // console.log('this.companiesResolver', object, args);

        //     return this.placesResolver(object, args);
        //   },
        // },
        // services: {
        //   type: new GraphQLList(ServiceType),
        //   args: {
        //     id: {
        //       type: GraphQLID
        //       // type: new GraphQLNonNull(GraphQLID)
        //     },
        //     limit: {
        //       type: new GraphQLNonNull(GraphQLInt),
        //     },
        //     Company_id: {
        //       type: GraphQLInt
        //     },
        //     place_id: {
        //       type: GraphQLInt
        //     },
        //     // withGeoOnly: {
        //     //   type: GraphQLBoolean
        //     // },
        //   },
        //   resolve: (object, args) => {
        //     return this.servicesResolver(object, args);
        //   },
        // },
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

            let {
              errors,
            } = response;

            if(errors && errors.length){
              let {
                message,
                ...other
              } = errors[0];

              return this.failure(message, {...other});
            }

            // this.success("", response);

            // else
            return this.success("", response && response.data || null);
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