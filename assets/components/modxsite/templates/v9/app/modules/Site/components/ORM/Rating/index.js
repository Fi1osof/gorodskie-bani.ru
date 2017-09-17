import {
  GraphQLID,
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

import {
  listField,
  // ObjectsListType,
} from '../fields';

import {
  CompanyType,
  getMany as getCompanies,
} from '../Company';


// console.log('List', List);

// import {
//   CommentType,
// } from '../Comment';

const RatingGroupbyEnumList = {
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

const RatingGroupbyEnum = new GraphQLEnumType(RatingGroupbyEnumList);

export const RatingArgs = {
  type: {
    type: GraphQLID,
  },
  groupBy: {
    type : RatingGroupbyEnum,
  },
};

export const getMany = function (source, args, context, info){
  // console.log('Ratings getMany', source, args, info);
  // console.log('Ratings getMany context', context);
  
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
        ratings(limit: 0) {
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
      companies: {
        type: new GraphQLList(CompanyType),
        resolve: (rating, args, context, info) => {

          return new Promise((resolve, reject) => {


            const {
              query,
            } = context;

            const {
              company_id,
              voted_companies,
            } = rating;

            if(!voted_companies && !company_id){
              return null;
            }

            let ids;

            if(voted_companies){
              ids = voted_companies;
            }
            else{
              ids = company_id;
            }

            Object.assign(args, {
              ids,
              limit: 0,
            });

            const q = `query companies(
              $limit: Int!
              $ids:[Int]!
            ) {
              
              companies(
                limit:$limit
                ids:$ids
              ){
                count
                total
                limit
                page
                object {
                  id
                  name
                  longtitle
                  description
                  content
                  alias
                  uri
                  city_id
                  city
                  city_uri
                }
              }
            }`;


            // console.log('ratings comp q', {
            //   query: q,
            //   variables: args,
            // });

            query({
              query: q,
              variables: args,
            })
              .then(result => {

                // console.log('ratings comp result', result);

                const {
                  companies,
                } = result.data || {};

                resolve(companies && companies.object || null);
              })
              .catch(e => reject(e));
          });

        },
      },
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





export class RatingsListField extends listField{


  groupByCompany(result){
    var result2 = List();

    const result_grouped = result.groupBy(x => x.company_id);

    result_grouped.map(n => {
      const first = n.get(0);

      const quantity = n.size;

      let ratings = [];

      n.map(i => {
        ratings.push(i.rating);
      });

      let max_vote;
      let min_vote;

      let rating = ratings.reduce((prev, next) => prev+next) / quantity;

      // console.log('result grouped rating', rating, ratings, ratings.reduce((prev, next) => prev+next), ratings.reduce((prev, next) => prev+next) / quantity);

      result2 = result2.push(Object.assign(first, {
        quantity,
        max_vote: Math.max.apply(null, ratings),
        min_vote: Math.min.apply(null, ratings),
        rating: parseFloat(rating.toFixed(2)),
      }));
    });

    // result.groupBy(x => x.company_id).map(n => {
    //   n.map(i => {
    //     i.quantity = n.size;
    //     result2 = result2.push(i);
    //   });

    //   console.log('result grouped n', n);

    // });

    return result2;
  }

  groupByRatingType(result){
    var result2 = List();

    const result_grouped = result.groupBy(x => x.type);

    result_grouped.map(n => {
      const first = n.get(0);

      const quantity = n.size;

      let ratings = [];

      let voted_companies = [];
      // let voters = [];

      n.map(i => {
        const {
          rating,
          company_id,
        } = i;

        ratings.push(rating);

        if(voted_companies.indexOf(company_id) === -1){
          voted_companies.push(company_id);
        }

        // voters.push(i.company_id);
      });

      let max_vote;
      let min_vote;

      let rating = ratings.reduce((prev, next) => prev+next) / quantity;

      // console.log('result grouped rating', rating, ratings, ratings.reduce((prev, next) => prev+next), ratings.reduce((prev, next) => prev+next) / quantity);

      result2 = result2.push(Object.assign({}, first, {
        quantity,
        voted_companies,
        max_vote: Math.max.apply(null, ratings),
        min_vote: Math.min.apply(null, ratings),
        rating: parseFloat(rating.toFixed(2)),
      }));
    });

    // result.groupBy(x => x.company_id).map(n => {
    //   n.map(i => {
    //     i.quantity = n.size;
    //     result2 = result2.push(i);
    //   });

    //   console.log('result grouped n', n);

    // });

    return result2;
  }

  groupByCompanyAndRatingType(result){
    var result2 = List();

    const result_grouped = result.groupBy(x => `${x.type}_${x.company_id}`);

    result_grouped.map(n => {
      const first = n.get(0);

      const quantity = n.size;

      let ratings = [];

      let voted_companies = [];
      // let voters = [];

      n.map(i => {
        const {
          rating,
          company_id,
        } = i;

        ratings.push(rating);

        if(voted_companies.indexOf(company_id) === -1){
          voted_companies.push(company_id);
        }

        // voters.push(i.company_id);
      });

      let max_vote;
      let min_vote;

      let rating = ratings.reduce((prev, next) => prev+next) / quantity;

      // console.log('result grouped rating', rating, ratings, ratings.reduce((prev, next) => prev+next), ratings.reduce((prev, next) => prev+next) / quantity);

      result2 = result2.push(Object.assign({}, first, {
        quantity,
        voted_companies,
        max_vote: Math.max.apply(null, ratings),
        min_vote: Math.min.apply(null, ratings),
        rating: parseFloat(rating.toFixed(2)),
      }));
    });

    // result.groupBy(x => x.company_id).map(n => {
    //   n.map(i => {
    //     i.quantity = n.size;
    //     result2 = result2.push(i);
    //   });

    //   console.log('result grouped n', n);

    // });

    return result2;
  }

  beforeCount(source, args, context, info){

    let {
      thread: company_id,
    } = args;

    console.log('beforeCount', args);

    if(company_id){
      
      console.log('beforeCount', args);

      source = source.filter(n => n.company_id === company_id);
    }

    
    console.log('result grouped this', this);

    const {
      fieldName,
    } = info;
          
    // let result = source && source[fieldName] || undefined;

    if(source){
      // console.log('ObjectsListType fieldResolver result', result);

      let {
        groupBy,
      } = args;

      console.log('groupBy', groupBy);

      // Способ группировки
      switch(groupBy){

        case 'company':

          source = this.groupByCompany(source);

          break;

        case 'rating_type':

          source = this.groupByRatingType(source);

          break;

        case 'company_and_rating_type':

          source = this.groupByCompanyAndRatingType(source);

          break;

      }

      // source.ratings = result;
    }

    return super.beforeCount(source, args, context, info);
  }

  // resolve(source, args, context, info){
    
  //   // console.log('ObjectsListType fieldResolver', source, args, context, info);

  //   console.log('result grouped this', this);

  //   const {
  //     fieldName,
  //   } = info;
          
  //   let result = source && source[fieldName] || undefined;

  //   if(result){
  //     // console.log('ObjectsListType fieldResolver result', result);

  //     let {
  //       groupBy,
  //     } = args;

  //     console.log('groupBy', groupBy);

  //     // Способ группировки
  //     switch(groupBy){

  //       case 'company':

  //         result = this.groupByCompany(result);

  //         break;

  //       case 'rating_type':

  //         result = this.groupByRatingType(result);

  //         break;

  //       case 'company_and_rating_type':

  //         result = this.groupByCompanyAndRatingType(result);

  //         break;

  //     }

  //     source.ratings = result;
  //   }


  //   return super.resolve(source, args, context, info);
  // }

}