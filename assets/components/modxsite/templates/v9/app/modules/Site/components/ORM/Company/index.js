import {
  GraphQLInt,
  GraphQLString,
  GraphQLList,
  GraphQLObjectType,
  GraphQLInputObjectType,
  GraphQLEnumType,
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


// console.log('Comment', Comment);
// console.log('SchemaObject', SchemaObject);

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


export const getMany = function (source, args, context, info){
  console.log('Company field resolve', source, args, context, info);

  const {
    CompaniesStore,
  } = context;

  const {
    id,
  } = args;

  let state = CompaniesStore.getState();

  if(id){
    state = state.filter(n => n.id === id);
  }

  return new Promise((resolve, reject) => {
    resolve(state);
  });
}

export const getOne = function (source, args, context, info){
  return new Promise((resolve, reject) => {
    getMany(source, args, context, info)
      .then(result => {
        console.log('result 444', result, result.get(0));
        resolve(result && result.get(0) || null);
      })
  });
}



// export const updateQuery = function(knex, args, context){

//   console.log('updateQuery(knex, args, context)', knex, args, context);

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

//   console.log('updateQuery toSQL', q.toString());

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
      // image: imageType,
      city_id: {
        type: GraphQLInt
      },
      city: {
        type: GraphQLString
      },
      city_uri: {
        type: GraphQLString
      },
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

      //       for(var name in object.tvs){

      //         var tv = object.tvs[name];

      //         if(tv){

      //           var {
      //             tv_id: id,
      //             caption,
      //             value,
      //           } = tv;

      //           tvs[name] = value;

      //         }
      //       }
            
      //     }

      //     return tvs;
      //   },
      // },
      // gallery: {
      //   type: new GraphQLList(
      //     new GraphQLObjectType({
      //       name: 'galleryType',
      //       fields: {
      //         image: imageType,
      //       },
      //     })
      //   ),
      //   resolve: (object) => {
      //     return object.gallery || [];
      //   },
      // },
      // coords: {
      //   type: new GraphQLObjectType({
      //     // new GraphQLObjectType({
      //       name: 'coordsType',
      //       fields: {
      //         lat: {
      //           type: GraphQLFloat,
      //         },
      //         lng: {
      //           type: GraphQLFloat,
      //         },
      //       },
      //     // })
      //   }),
      //   resolve: (object) => {

      //     return object.coords && {
      //       lat: object.coords[1],
      //       lng: object.coords[0],
      //     } || null;
      //   },
      // },
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

      //     // console.log('CompanyType ratings resolver', company, args);

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

      //     // console.log('CompanyType ratings resolver', company, args);

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
      // ratingsByType: {
      //   description: 'Рейтинг по типам',
      //   type: new GraphQLList(RatingsType),
      //   args: {
      //     groupBy: {
      //       type : RatingGroupbyEnum,
      //     },
      //   },
      //   resolve: (company, args) => {

      //     // console.log('CompanyType ratings resolver', company, args);

      //     const {
      //       id: company_id,
      //     } = company;

      //     Object.assign(args, {
      //       company: company_id,
      //       groupBy: 'rating_type',
      //     });

      //     return this.RatingsResolver(company, args);
      //   },
      // },
      // votes: {
      //   description: 'Все голоса за компанию',
      //   type: new GraphQLList(RatingsType),
      //   args: {
      //     groupBy: {
      //       type : RatingGroupbyEnum,
      //     },
      //   },
      //   resolve: (company, args) => {

      //     // console.log('CompanyType ratings resolver', company, args);

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
        // args: {
        //   order: {
        //     type: SortType,
        //     description: SortType.description,
        //   },
        // },
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

        //   console.log('CompanyType commentsListResolver', args);

        //   // return this.ObjectsResolver(this.commentsListResolver, company, args);

        //   return this.commentsListResolver(company, args);
        // },
      },
    }
  }
});


export default class Company extends ModelObject{

  fieldResolver(source, args, context, info){
    console.log('Company fieldResolver', source, args, info);
    console.log('Company fieldResolver context', context);
    
    const {
      id,
    } = source;

    const {
      fieldName,
    } = info;

    switch(fieldName){

      case 'comments': 

        if(!id){
          return null;
        }

        return new Promise((resolve, reject) => {
          // resolve([{
          //   id: 345,
          //   text: "DSFdsf",
          // }]);

          const {
            remoteQuery,
          } = context;

          remoteQuery(`query{
            comments(
              limit: 0
              thread: ${id}
              sort:{by:id, dir: desc}
            ) {
              count
              total
              limit
              page
              object {
                id
                text
                parent
                author_username
                author_fullname
                author_avatar
                createdon
                published
                deleted
              }
            }
          }`)
            .then(result => {

              // console.log('result.object', result);

              const {
                comments,
              } = result.object;

              return resolve(comments && comments.object || null);
            })
            .catch(e => reject(e));

        });

        break;

    }

    return super.fieldResolver(source, args, context, info);
  }

}