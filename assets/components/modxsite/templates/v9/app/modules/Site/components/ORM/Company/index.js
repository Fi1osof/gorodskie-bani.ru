import {
  GraphQLInt,
  GraphQLString,
  GraphQLList,
  GraphQLObjectType,
  GraphQLInputObjectType,
  GraphQLEnumType,
  GraphQLFloat,
} from 'graphql';

// import {
//   // SchemaObject,
//   // order,
//   // ModelObject,
// } from '../';

import ModelObject from '../object';

import {
  CommentType,
} from '../Comment';

import {
  RatingType,
} from '../Rating';

import {
  imageType,
  coordsType,
  SortField,
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
      uri: {
        type: GraphQLString
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

            // if(object.tvs.address !== undefined){
            //   tvs = object.tvs;
            // }
            // else{

              // console.log('tvs', object.tvs);

              for(var name in object.tvs){

                var tv = object.tvs[name];

                if(tv){

                  let v;

                  if(tv.tv_id === undefined){
                    tvs[name] = tv;
                  }
                  else{

                    let {
                      tv_id: id,
                      caption,
                      value,
                    } = tv;
                    
                    tvs[name] = value;

                  }

                }
              }

            // }

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
              imageFormats: imageType,
              // image: imageType,
            },
          })
        ),
        resolve: (object) => {
          return object.gallery || [];
        },
      },
      coords: {
        type: coordsType,
        resolve: (source) => {

          let {
            coords,
          } = source;

          if(coords && coords.lat === undefined){

            const {
              0: lng,
              1: lat,
            } = coords;

            coords = {
              lat,
              lng,
            };

          }

          return coords;
        },
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

          const {
            localQuery,
          } = context;

          const {
            id: company_id,
          } = company;

          Object.assign(args, {
            ratingCompanyId: company_id,
          });

          let result;

          await localQuery({
            operationName: "CompanyRatings",
            variables: args,
          })
            .then(r => {

              const {
                ratings,
              } = r.data;

              // console.log("CompanyRatings", args, r);

              result = ratings;

            });

          return result;

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
            ratingCompanyId: company_id,
            getByTypeRatings: true,
          });

          let result;

          await localQuery({
            operationName: "CompanyRatings",
            variables: args,
          })
            .then(r => {

              const {
                ratingsByType,
              } = r.data;

              // console.log("CompanyRatings", args, r);

              result = ratingsByType;

            });

          return result;

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
 
          let result;

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
            commentsCompanyId,
            commentsSort,
          });

          console.log('CompanyComments', args);

          await localQuery({
            // query: q,
            operationName: "CompanyComments",
            variables: args,
          })
            .then(r => {

              const {
                comments,
              } = r.data;

              result = comments;

            });

          return result;
        },
      },
      ratings: {
        type: new GraphQLList(RatingType),
        description: RatingType.description,
      },
      ratingAvg: {
        description: 'Суммарный рейтинг',
        type: RatingType,
        // args: {
        //   groupBy: {
        //     type : RatingGroupbyEnum,
        //   },
        // },
        resolve: async (source, args, context, info) => {

          // 

          let result;

          const {
            localQuery,
          } = context;

          const {
            id: ratingCompanyId,
          } = source;

          Object.assign(args, {
            ratingCompanyId,
          });

          await localQuery({
            operationName: "CompanyAvgRatings",
            variables: args,
          })
            .then(r => {

              const {
                ratings,
              } = r.data;

              // console.log('CompanyAvgRatings', r);

              // result = ratings && ratings[0];

              // console.log('CompanyAvgRatings', result = ratings && ratings[0]);

              result = ratings && ratings[0];

              return result;

            }).catch(e => {
              console.error(e);
            });

          return result;

          // const {
          //   id: company_id,
          // } = company;

          // Object.assign(args, {
          //   company: company_id,
          //   groupBy: 'company',
          //   limit: 1,
          // });

          // return this.ObjectResolver(this.RatingsResolver, company, args);
        },
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

export const getList = async (source, args, context, info) => {

  const {
    CompaniesStore,
  } = context.state;

  return CompaniesStore.getState();

};
