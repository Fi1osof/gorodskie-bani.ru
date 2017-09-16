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


            // Object.assign(args, {
            //   ids,
            // });

            // console.log('this.companiesResolver args', args, ids);

            // return this.companiesResolver(null, args);



            const q = `query{
              companies(
                limit: 0
                ids: [ ${ids} ]
              ) {
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

            console.log('query', q);

            query({
              query: q,
            })
              .then(result => {

                const {
                  companies,
                } = result.data || {};

                console.log('companiesResolver', q, result);
                resolve(companies && companies.object || null);
              })
              .catch(e => reject(e));
          });

        },
      },
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
