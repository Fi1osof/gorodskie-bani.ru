
import moment from 'moment';

import {browserHistory} from 'react-router';

// moment.locale('ru');

import {
  GraphQLInt,
  GraphQLString,
  GraphQLList,
  GraphQLObjectType,
  GraphQLInputObjectType,
  GraphQLEnumType,
  GraphQLFloat,
  GraphQLBoolean,
} from 'graphql';

import GraphQLJSON from 'graphql-type-json';

// import {
//   // SchemaObject,
//   // order,
//   // ModelObject,
// } from '../';


import EditVersionType from '../EditVersion';

import ModelObject from '../object';

import {
  CommentType,
} from '../Comment';

import {
  RatingType,
} from '../Rating';


import {
  ResourceType,
} from '../Resource';

import {
  imageType,
  coordsType,
  SortField,
  TVsField,
  GalleryField,
} from '../fields';


// 
// 

// import {getQuery as getServiceQuery} from '../Service';

// import {db as db_config} from '../../../../../config/config';


// let {
//   connection: {
//     prefix,
//   },
// } = db_config;
 

// export const CompanySortBy = new GraphQLInputObjectType({
//   name: "CompanySortBy",
//   fields: {
//     by: {
//       type: new GraphQLEnumType({
//         name: 'CompanySortBy',
//         values: {
//           id: {
//             value: 'contacts.id',
//             description: 'По ID',
//           },
//           name: {
//             value: 'contacts.name',
//             description: 'По названию',
//           },
//           // active: {
//           //   value: 'contacts.active',
//           //   description: 'По активности',
//           // },
//           // parent_name: {
//           //   value: 'Parent.name',
//           //   description: 'По названию родителя',
//           // },
//           rand: {
//             value: 'rand()',
//             description: 'В случайном порядке',
//           },
//         },
//       }),
//       description: 'Способ сортировки',
//     },
//     dir: order,
//   },
// });

// export const CompanySort = {
//   type: new GraphQLList(CompanySortBy),
// };


// export const getMany = function (source, args, context, info){
//   // 

//   const {
//     CompaniesStore,
//   } = context;

//   const {
//     id,
//   } = args;

//   let state = CompaniesStore.getState();

//   if(id){
//     state = state.filter(n => n.id === id);
//   }

//   return new Promise((resolve, reject) => {
//     resolve(state);
//   });
// }

// export const getOne = function (source, args, context, info){
//   return new Promise((resolve, reject) => {
//     getMany(source, args, context, info)
//       .then(result => {
        
//         resolve(result && result.get(0) || null);
//       })
//   });
// }



// export const updateQuery = function(knex, args, context){

//   

//   const {
//     db,
//   } = context || {};

//   if(db){
//     return db.updateContact(args, context);
//   }

//   let {
//     id,
//     name,
//     parent,
//   } = args || {};

//   const q = knex(`${prefix}modxsite_contacts as contacts`)
//     .where('contacts.id', id);

//   if(name !== undefined){
//     q.update({
//       name,
//     });    
//   }
  
//   if(parent !== undefined){
//     q.update({
//       parent,
//     });    
//   }

//   

//   return q;
// }

// export class SchemaType extends GraphQLObjectType{

//   constructor(props){

    

//     props = Object.assign({

//       fields: () => {

//         return {
//           id: {
//             type: GraphQLInt
//           },
//           name: {
//             type: GraphQLString
//           },
//         };

//       },
//     }, props);

//     super(props);
//   }
// }



export const CompanyType = new GraphQLObjectType({
  name: 'Company',
  fields: () => {

    return {
      id: {
        type: GraphQLInt
      },
      name: {
        type: GraphQLString
      },
      pagetitle: {
        type: GraphQLString
      },
      longtitle: {
        type: GraphQLString
      },
      description: {
        type: GraphQLString
      },
      content: {
        type: GraphQLString
      },
      alias: {
        type: GraphQLString
      },
      template: {
        type: GraphQLInt
      },
      parent: {
        type: GraphQLInt
      },
      createdby: {
        type: GraphQLInt,
        description: "ID автора и владельца компании",
      },
      createdon: {
        type: GraphQLInt,
        description: "Дата создания в секундах",
      },
      editedby: {
        type: GraphQLInt,
        description: "Кем отредактировано",
      },
      editedon: {
        type: GraphQLInt,
        description: "Дата редактирования в секундах",
      },
      publishedon: {
        type: GraphQLInt,
        description: "Дата публикации в секундах",
      },
      pubdate: {
        type: GraphQLString,
        description: 'Дата публикации',
        resolve: (source, args) => {

          let time = source && (source.publishedon || source.createdon);

          if(!time){
            return null;
          }

          return moment(time * 1000).format('YYYY-MM-DD') || null;
        },
      },
      published: {
        type: GraphQLBoolean,
        description: "Флаг, что компания опубликована",
        resolve: (source) => {
          return parseInt(source.published) === 1 ? true : false;
        },
      },
      uri: {
        type: GraphQLString,
      },
      mapIcon: {
        type: GraphQLString,
        description: "Иконка для карты",
        resolve: source => {
          let result;

          // console.log("mapIcon source", source);

          const {
            id,
          } = source || {};

          switch(parseInt(id)){

            // Рублевские бани
            case 1609:

              // console.log("mapIcon id", id);
              result = 'data:image/png;base64,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';
              break;

            default: result = null;
          }

          return result;
        },
      },
      image: {
        type: GraphQLString,
        description: "Картинка",
      },
      imageFormats: imageType,
      city_id: {
        type: GraphQLInt
      },
      city: {
        type: GraphQLString
      },
      city_uri: {
        type: GraphQLString
      },
      tvs: TVsField,
      gallery: GalleryField,
      // tvs: {
      //   type: new GraphQLObjectType({
      //     name: 'TSvType',
      //     fields: {
      //       address: {
      //         type: GraphQLString,
      //         description: 'Адрес',
      //       },
      //       site: {
      //         type: GraphQLString,
      //         description: 'Веб-сайт',
      //       },
      //       facility_type: {
      //         type: GraphQLString,
      //         description: 'Тип заведения',
      //       },
      //       phones: {
      //         type: GraphQLString,
      //         description: 'Телефон',
      //       },
      //       work_time: {
      //         type: GraphQLString,
      //         description: 'Рабочее время',
      //       },
      //       prices: {
      //         type: GraphQLString,
      //         description: 'Цены',
      //       },
      //       metro: {
      //         type: GraphQLString,
      //         description: 'Метро',
      //       },
      //     },
      //   }),
      //   resolve: (object) => {
      //     let tvs = {};

      //     if(object.tvs){

      //       // if(object.tvs.address !== undefined){
      //       //   tvs = object.tvs;
      //       // }
      //       // else{

      //         // console.log('tvs', object.tvs);

      //         for(var name in object.tvs){

      //           var tv = object.tvs[name];

      //           if(tv){

      //             let v;

      //             if(tv.tv_id === undefined){
      //               tvs[name] = tv;
      //             }
      //             else{

      //               let {
      //                 tv_id: id,
      //                 caption,
      //                 value,
      //               } = tv;
                    
      //               tvs[name] = value;

      //             }

      //           }
      //         }

      //       // }

      //     }

      //     return tvs;
      //   },
      // },
      // gallery: {
      //   type: new GraphQLList(
      //     new GraphQLObjectType({
      //       name: 'galleryType',
      //       fields: {
      //         image: {
      //           type: GraphQLString,
      //         },
      //         imageFormats: imageType,
      //         // image: imageType,
      //       },
      //     })
      //   ),
      //   resolve: (object) => {
      //     return object.gallery || [];
      //   },
      // },
      coords: {
        type: coordsType,
        // resolve: (source) => {

        //   let {
        //     coords,
        //   } = source;

        //   if(coords && coords.lat === undefined){

        //     const {
        //       0: lng,
        //       1: lat,
        //     } = coords;

        //     coords = {
        //       lat,
        //       lng,
        //     };

        //   }

        //   return coords;
        // },
      },
      // ratings: {
      //   description: 'Рейтинги компании',
      //   type: new GraphQLList(RatingsType),
      //   args: {
      //     type: {
      //       type: GraphQLID
      //       // type: new GraphQLNonNull(GraphQLID)
      //     },
      //     limit: {
      //       type : GraphQLInt,
      //     },
      //     groupBy: {
      //       type : RatingGroupbyEnum,
      //     },
      //   },
      //   resolve: (company, args) => {

      //     // 

      //     const {
      //       id: company_id,
      //     } = company;

      //     Object.assign(args, {
      //       company: company_id,
      //     });

      //     return this.RatingsResolver(company, args);
      //   },
      // },
      // ratingAvg: {
      //   description: 'Суммарный рейтинг',
      //   type: RatingsType,
      //   args: {
      //     groupBy: {
      //       type : RatingGroupbyEnum,
      //     },
      //   },
      //   resolve: (company, args) => {

      //     // 

      //     const {
      //       id: company_id,
      //     } = company;

      //     Object.assign(args, {
      //       company: company_id,
      //       groupBy: 'company',
      //       limit: 1,
      //     });

      //     return this.ObjectResolver(this.RatingsResolver, company, args);
      //   },
      // },
      votes: {
        description: 'Все голоса по компании',
        type: new GraphQLList(RatingType),
        resolve: async (company, args, context, info) => {

          // const {
          //   localQuery,
          // } = context;

          const {
            id: company_id,
          } = company;

          Object.assign(args, {
            // ratingCompanyId: company_id,
            resource_id: company_id,
          });


          const {
            rootResolver,
          } = context;

          return rootResolver(null, args, context, info);

          // let result;

          // await localQuery({
          //   operationName: "CompanyRatings",
          //   variables: args,
          // })
          //   .then(r => {

          //     const {
          //       ratings,
          //     } = r.data;

          //     // console.log("CompanyRatings", args, r);

          //     result = ratings;

          //   });

          // return result;

          // return this.RatingsResolver(company, args);
        },
      },
      ratingsByType: {
        description: 'Рейтинг по типам',
        type: new GraphQLList(RatingType),
        resolve: async (company, args, context, info) => {

          // 

          const {
            localQuery,
          } = context;

          const {
            id: company_id,
          } = company;


          Object.assign(args, {
            // ratingCompanyId: company_id,
            resource_id: company_id,
            groupBy: "company_and_rating_type",
          });


          const {
            rootResolver,
          } = context;

          return rootResolver(null, args, context, info);

          // let result;

          // await localQuery({
          //   operationName: "CompanyRatings",
          //   variables: args,
          // })
          //   .then(r => {

          //     const {
          //       ratingsByType,
          //     } = r.data;

          //     // console.log("CompanyRatings", args, r);

          //     result = ratingsByType;

          //   });

          // return result;

          // return this.RatingsResolver(company, args);
        },
      },
      // votes: {
      //   description: 'Все голоса за компанию',
      //   type: new GraphQLList(RatingsType),
      //   args: {
      //     groupBy: {
      //       type : RatingGroupbyEnum,
      //     },
      //   },
      //   resolve: (company, args) => {

      //     // 

      //     const {
      //       id: company_id,
      //     } = company;

      //     Object.assign(args, {
      //       company: company_id,
      //     });

      //     return this.RatingsResolver(company, args);
      //   },
      // },
      comments: {
        type: new GraphQLList(CommentType),
        description: CommentType.description,
        args: {
          // order: {
          //   type: SortType,
          //   description: SortType.description,
          // },
          sort: SortField,
        },
        // resolve: (company, args) => {


        //   const {
        //     id: company_id,
        //   } = company;

        //   args = Object.assign({
        //     order: 'asc',
        //   }, args, {
        //     thread: company_id,
        //     // thread: parseInt(company_id),
        //   });

        //   

        //   // return this.ObjectsResolver(this.commentsListResolver, company, args);

        //   return this.commentsListResolver(company, args);
        // },
        resolve: async (source, args, context, info) => {
 
          // let result;

          const {
            localQuery,
          } = context;

          const {
            id: commentsCompanyId,
          } = source;

          if(!commentsCompanyId){
            return null;
          }

          const {
            sort: commentsSort,
          } = args;

          Object.assign(args, {
            resource_id: commentsCompanyId,
            sort: commentsSort,
          });


          const {
            rootResolver,
          } = context;

          return rootResolver(null, args, context, info);

          // console.log('CompanyComments', args);

          // await localQuery({
          //   // query: q,
          //   operationName: "CompanyComments",
          //   variables: args,
          // })
          //   .then(r => {

          //     const {
          //       comments,
          //     } = r.data;

          //     result = comments;

          //   });

          // return result;
        },
      },
      ratings: {
        type: new GraphQLList(RatingType),
        description: RatingType.description,
        resolve: (source, args, context, info) => {

          // 

          // let result;

          const {
            id: ratingCompanyId,
          } = source;

          Object.assign(args, {
            resource_id: ratingCompanyId,
          });

          const {
            rootResolver,
          } = context;

          return rootResolver(null, args, context, info);


          // await localQuery({
          //   operationName: "CompanyAvgRatings",
          //   variables: args,
          // })
          //   .then(r => {

          //     const {
          //       ratings,
          //     } = r.data;

          //     result = ratings && ratings[0];

          //     return result;

          //   }).catch(e => {
          //     console.error(e);
          //   });

          // return result;
        },
      },
      ratingAvg: {
        description: 'Суммарный рейтинг',
        type: RatingType,
        resolve: (source, args, context, info) => {

          // console.log("Company ratingAvg resolver", source);

          let result;

          const {
            rootResolver,
          } = context;

          const {
            id: ratingCompanyId,
          } = source;

          Object.assign(args, {
            resource_id: ratingCompanyId,
            groupBy: "company",
          });

          // console.log("Company args", args);

          return rootResolver(null, args, context, info);

          // 

          // let result;

          // const {
          //   localQuery,
          // } = context;

          // const {
          //   id: ratingCompanyId,
          // } = source;

          // Object.assign(args, {
          //   ratingCompanyId,
          // });

          // return localQuery({
          //   operationName: "CompanyAvgRatings",
          //   variables: args,
          // })
          //   .then(r => {

          //     const {
          //       ratings,
          //     } = r.data;

          //     result = ratings && ratings[0];

          //     return result;

          //   }).catch(e => {
          //     console.error(e);
          //   });

          // return result;

          // await localQuery({
          //   operationName: "CompanyAvgRatings",
          //   variables: args,
          // })
          //   .then(r => {

          //     const {
          //       ratings,
          //     } = r.data;

          //     result = ratings && ratings[0];

          //     return result;

          //   }).catch(e => {
          //     console.error(e);
          //   });

          // return result;
        },
      },
      topics: {
        description: 'Топики компании',
        type: new GraphQLList(ResourceType),
        resolve: async (source, args, context, info) => {

          // 


          // let result;

          const {
            localQuery,
          } = context;

          const {
            id: resourceParent,
          } = source;

          Object.assign(args, {
            resourceType: "topic",
            parent: resourceParent,
          });


          const {
            rootResolver,
          } = context;

          return rootResolver(null, args, context, info);

          // await localQuery({
          //   operationName: "CompanyTopics",
          //   variables: args,
          // })
          //   .then(r => {
          
          //     // console.log('ResourceType topics', args, r);


          //     const {
          //       topics,
          //     } = r.data;

          //     result = topics;

          //     return result;

          //   }).catch(e => {
          //     console.error(e);
          //   });

          // return result;
        },
      },
      editVersions: {
        description: 'Версии изменения',
        type: new GraphQLList(EditVersionType),
        resolve: async (source, args, context, info) => {

          const {
            rootResolver,
          } = context;

          const {
            id: companyId,
          } = source;

          if(!companyId){
            return null;
          }
          

          Object.assign(args, {
            companyId,
            limit: 0,
          });

          return rootResolver(null, args, context, info);

        },
      },
      errors: {
        type: GraphQLJSON,
        description: "Ошибки после попытки сохранения",
      },
      _isDirty: {
        type: GraphQLJSON,
        description: "Измененные данные",
      },
    }
  }
});


export default class Company extends ModelObject{

  constructor(props, app){

    super(props, app);

    this.getRatings = ::this.getRatings;
    this.getRatingsAvr = ::this.getRatingsAvr;

  }

  
  update(data, silent){

    const {
      // ContactsStore,
      updateContactItem,
    } = this.getApp();

    return updateContactItem(this, data, silent);
  }

  // fieldResolver(source, args, context, info){
  //   // 
  //   // 

  //   const {
  //     localQuery,
  //     remoteQuery,
  //   } = context;
    
  //   const {
  //     id,
  //   } = source;

  //   const {
  //     fieldName,
  //   } = info;

  //   switch(fieldName){

  //     case 'comments': 

  //       if(!id){
  //         return null;
  //       }

  //       Object.assign(args, {
  //         thread: id,
  //       });

  //       return new Promise((resolve, reject) => {
  //         // resolve([{
  //         //   id: 345,
  //         //   text: "DSFdsf",
  //         // }]);

  //         remoteQuery(`query comments(
  //           $thread: Int!
  //         ){
  //           comments(
  //             limit: 0
  //             thread: $thread
  //             sort:{by:id, dir: desc}
  //           ) {
  //             count
  //             total
  //             limit
  //             page
  //             object {
  //               id
  //               text
  //               parent
  //               author_username
  //               author_fullname
  //               author_avatar
  //               createdon
  //               published
  //               deleted
  //             }
  //           }
  //         }`, args)
  //           .then(result => {

  //             // 

  //             const {
  //               comments,
  //             } = result.object;

  //             return resolve(comments && comments.object || null);
  //           })
  //           .catch(e => reject(e));

  //       });

  //       break;

  //     case 'ratings': 

  //       // return this.getRatings(source, args, context, info);
  //       return this.getRatings(args);

  //     case 'ratingAvg': 

  //       // return this.getRatings(source, args, context, info);
  //       return this.getRatingsAvr(args);

  //       break;

  //     // case 'image': 
          
  //     //   

  //     //   return source.image && source.image.original || null;

  //     //   break;
  //   }

  //   return super.fieldResolver(source, args, context, info);
  // }



  // Рейтинги компании
  getRatings(args = {}){

    const {
      localQuery,
      remoteQuery,
    } = this._app.getChildContext();
    
    const {
      id,
    } = this;

    if(!id){
      return null;
    }

    Object.assign(args, {
      thread: id,
    });

    return new Promise((resolve, reject) => {
      // resolve([{
      //   id: 345,
      //   text: "DSFdsf",
      // }]);

      // const {
      //   remoteQuery,
      // } = context;

      localQuery({
        // query: `query ratings(
        //   $thread:Int!
        //   $groupBy:RatingGroupbyEnum
        // ){
        //   ratings(
        //     limit:0
        //     thread:$thread
        //     groupBy:$groupBy
        //   ) {
        //     count
        //     total
        //     limit
        //     page
        //     object {
        //       rating
        //       max_vote
        //       min_vote
        //       type
        //       company_id
        //       quantity
        //       quantity_voters
        //       voted_companies
        //       voted_users
        //       voter
        //     }
        //   }
        // }`,
        operationName: "CompanyRatings",
        variables: args,
      })
        .then(result => {

          // 

          // 

          const {
            ratings,
          } = result.data;

          return resolve(ratings && ratings.object || null);
          // return resolve(ratings && ratings.object || null);
        })
        .catch(e => reject(e));

    });
  }

  // Средний рейтинг
  getRatingsAvr(args = {}){

    Object.assign(args, {
      groupBy: "company",
    });



    return new Promise((resolve, reject) => {
      // resolve([{
      //   id: 345,
      //   text: "DSFdsf",
      // }]);

      // const {
      //   remoteQuery,
      // } = context;

      this.getRatings(args)
        .then(result => {

          // 

          // 

          // const {
          //   ratings,
          // } = result.data;

          return resolve(result && result[0] || null);
          // return resolve(ratings && ratings.object || null);
        })
        .catch(e => reject(e));

    });

  }

}


// Добавляем новую компанию
export const add = (source, args, context, info) => {

  console.log("Company add");

  let {
    CompaniesStore,
    coords,
  } = context.state;

  if(!coords || !coords.lat || !coords.lng){

    coords = {
      lat: 55.753767,
      lng: 37.631778,
    };

  }

  const id = Math.round(Math.random() * 10000000) * -1;

  const uri = `bani/${id}/`;

  let data = {
  };

  let company = new Company({
    id,
    name: "",
    coords,
    uri,
  }, context);

  CompaniesStore.getDispatcher().dispatch(CompaniesStore.actions.CREATE, company);

  company.update(data);

  browserHistory.push(uri);

  return company;

};


// Добавляем картинку в галерею
export const addGalleryImage = async (source, args, context, info) => {

  console.log("Company addGalleryImage args", args);

  let {
    id,
    image,
  } = args;

  let {
    CompaniesStore,
  } = context.state;


  let data = {
    image,
  };

  console.log("Company addGalleryImage CompaniesStore.getState()", CompaniesStore.getState());

  // CompaniesStore.getDispatcher().dispatch(CompaniesStore.actions.CREATE, company);

  const company = CompaniesStore.getState().find(n => n.id === id);
  // const company = CompaniesStore.getState().find(n => n.id === 1275);

  console.log("Company addGalleryImage company", company);

  if(!company){
    
    throw(new Error("Не была получена компания"));

    return null;
  }

  let {
    gallery,
  } = company;

  gallery = gallery || [];

  gallery.push(data);

  company.gallery = gallery;

  company.update({gallery});

  // browserHistory.push(uri);

  return company;

};



const inCoords = function(center, radius, item){

  const {
    lat,
    lng,
  } = center;

  let {
    lat: itemLat,
    lng: itemLng,
  } = item.coords || {};

  if(!lat || !lng || !itemLat || !itemLng){
   return false;
  }

  // let {
  //  minLat,
  //  maxLat,
  //  minLng,
  //  maxLng,
  // } = this.getScreenBounds() || {};

  radius = radius || 1;

  const minLat = lat - radius;
  const maxLat = lat + radius;
  const minLng = lng - radius;
  const maxLng = lng + radius;

  if(
    itemLat < maxLat && itemLat > minLat
    &&
    itemLng > minLng && itemLng < maxLng
  ){
    return true;
  }

  return false
}

export const getList = (source, args, context, info) => {

  console.log("Companies args", args);

  const {
    CompaniesStore,
  } = context.state;

  const {
    uri,
    search,
    coords,
  } = args;

  let state = CompaniesStore.getState();

  if(uri !== undefined){
    state = state.filter(n => n.uri === uri);
  }

  if(search){

    const searchRule = new RegExp(search, 'ui');

    state = state.filter(n => searchRule.test(n.name));
  }

  console.log('state', state);

  // Поиск по координатам (в заданном квадрате)
  if(coords){

    const {
      radius,
      center,
    } = coords;

    state = state.filter(n => inCoords(center, radius, n));

  }

  return state;

};
