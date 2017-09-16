import {
  GraphQLInt,
  GraphQLString,
  GraphQLList,
  GraphQLObjectType,
  GraphQLInputObjectType,
  GraphQLEnumType,
  GraphQLFloat,
} from 'graphql';

import ModelObject from '../object';

import { List } from 'immutable';

// console.log('List', List);

// import {
//   CommentType,
// } from '../Comment';


export const getMany = function (source, args, context, info){
  console.log('Ratings getMany', source, args, info);
  console.log('Ratings getMany context', context);
  
  const {
    id,
  } = source;

  const {
    fieldName,
  } = info;

  return new Promise((resolve, reject) => {
    // resolve([{
    //   id: 345,
    //   text: "DSFdsf",
    // }]);

    const {
      remoteQuery,
    } = context;

    remoteQuery(`query{
        ratings(limit: 3) {
          rating
          max_vote
          min_vote
          type
          company_id
          quantity
          quantity_voters
          voted_companies
          voters
        }
      }`)
      .then(result => {

        // console.log('result.object', result);

        const {
          ratings,
        } = result.object;

        return resolve(List(ratings));
      })
      .catch(e => reject(e));

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


export const RatingType = new GraphQLObjectType({
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
      quantity_voters: {
        type: GraphQLInt,
        description: 'Количество проголосовавши людей',
      },
      voted_companies: {
        type: GraphQLString
      },
      voters: {
        type: GraphQLString,
        description: 'Проголосовавшие люди',
      },
      // companies: {
      //   type: new GraphQLList(CompanyType),
      //   resolve: (rating) => {

      //     const {
      //       company_id,
      //       voted_companies,
      //     } = rating;

      //     if(!voted_companies && !company_id){
      //       return [];
      //     }

      //     let args = {};

      //     if(voted_companies){
      //       Object.assign(args, {
      //         voted_companies,
      //       });
      //     }
      //     else{
      //       Object.assign(args, {
      //         id: company_id,
      //       });
      //     }

      //     console.log('this.companiesResolver args', args, rating);

      //     return this.companiesResolver(null, args);
      //   },
      // },
      // rating_type: {
      //   type: new GraphQLList(RatingTypesType),
      //   resolve: (rating) => {

      //     const {
      //       type,
      //     } = rating;

      //     let args = {
      //       id: type,
      //       limit: 0,
      //     };

      //     return this.RatingTypesResolver(null, args);
      //   },
      // },
    };
  },
});


export default class Rating extends ModelObject{

  fieldResolver(source, args, context, info){
    console.log('Rating fieldResolver', source, args, info);
    console.log('Rating fieldResolver context', context);
    
    const {
      id,
    } = source;

    const {
      fieldName,
    } = info;

    // switch(fieldName){

    //   case 'comments': 

    //     if(!id){
    //       return null;
    //     }

    //     return new Promise((resolve, reject) => {
    //       // resolve([{
    //       //   id: 345,
    //       //   text: "DSFdsf",
    //       // }]);

    //       const {
    //         remoteQuery,
    //       } = context;

    //       remoteQuery(`query{
    //         comments(
    //           limit: 0
    //           thread: ${id}
    //           sort:{by:id, dir: desc}
    //         ) {
    //           count
    //           total
    //           limit
    //           page
    //           object {
    //             id
    //             text
    //             parent
    //             author_username
    //             author_fullname
    //             author_avatar
    //             createdon
    //             published
    //             deleted
    //           }
    //         }
    //       }`)
    //         .then(result => {

    //           // console.log('result.object', result);

    //           const {
    //             comments,
    //           } = result.object;

    //           return resolve(comments && comments.object || null);
    //         })
    //         .catch(e => reject(e));

    //     });

    //     break;

    // }

    return super.fieldResolver(source, args, context, info);
  }

}
