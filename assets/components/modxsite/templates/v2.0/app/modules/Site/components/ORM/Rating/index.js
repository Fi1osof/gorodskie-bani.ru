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
} from '../Company';

import {
  UserType,
} from '../User';

import {
  ResourceType,
} from '../Resource';

import {
  sortBy,
} from '../resolver';

// 

// import {
//   CommentType,
// } from '../Comment';

// export const RatingArgs = {
//   type: {
//     type: GraphQLID,
//   },
//   groupBy: {
//     type : RatingGroupbyEnum,
//   },
// };

export const RatingType = new GraphQLObjectType({
  name: 'RatingType',
  description: 'Рейтинги бань (с возможностью группировки по типам рейтингов и компаний)',
  fields: () => {

    return {
      id: {
        type: GraphQLInt,
      },
      rating: {
        type: GraphQLFloat,
      },
      max_vote: {
        type: GraphQLFloat,
      },
      min_vote: {
        type: GraphQLFloat,
      },
      type: {
        type: GraphQLInt,
      },
      // company_id: {
      //   type: GraphQLInt,
      // },
      target_id: {
        type: GraphQLInt,
        description: "ID цели",
      },
      target_class: {
        type: GraphQLString,
        description: "Класс целевого объекта",
      },
      quantity: {
        type: GraphQLInt,
      },
      quantity_voters: {
        type: GraphQLInt,
        description: 'Количество проголосовавши людей',
      },
      voted_companies: {
        type: GraphQLString,
      },
      voted_users: {
        type: GraphQLString,
      },
      voter: {
        type: GraphQLInt,
        description: 'Проголосовавший пользователь',
      },
      // voters: {
      //   type: GraphQLString
      // },
      voters: {
        type: new GraphQLList(UserType),
        resolve: (rating, args, context, info) => {

          return new Promise((resolve, reject) => {


            const {
              localQuery,
            } = context;

            const {
              voter,
              voted_users,
            } = rating;

            if(!voted_users && !voter){
              return null;
            }

            let ids;

            if(voted_users){
              ids = voted_users;
            }
            else{
              ids = voter;
            }

            if(ids && typeof ids === 'string'){
              ids = ids.split(",");
            }

            Object.assign(args, {
              userIds: ids,
              limit: 0,
            });

            localQuery({
              // query: q,
              operationName: "Users",
              variables: args,
            })
              .then(result => {

                // 



                const {
                  users: voters,
                } = result.data || {};

                resolve(voters);
              })
              .catch(e => reject(e));
          });

        },
      },
      Company: {
        type: CompanyType,
        description: "Компания, за которую проголосовали",
        resolve: (source, args, context, info) => {

          const {
            fieldName,
          } = info;

          const {
            rootResolver,
          } = context;

          const {
            target_id: company_id,
            target_class,
          } = source;

          if(!company_id || target_class !== "modResource"){
            return null;
          }

          Object.assign(args, {
            id: company_id,
          });

          return rootResolver(null, args, context, info);

          // const {
          //   localQuery,
          // } = context;

          // let result = source && source[fieldName];

          // if(!result){

          //   const {
          //     localQuery,
          //   } = context;

          //   const {
          //     target_id: company_id,
          //   } = source;

          //   if(!company_id){
          //     return null;
          //   }

          //   Object.assign(args, {
          //     id: company_id,
          //   });
   
 
          //   await localQuery({
          //     operationName: "Company",
          //     variables: args,
          //   })
          //   .then(r => {


          //     const {
          //       company,
          //     } = r.data;

          //     result = company;

          //   }); 
          // }
          
          // return result;
        },
      },
      companies: {
        type: new GraphQLList(CompanyType),
        resolve: async (source, args, context, info) => {

          const {
            fieldName,
          } = info;

          const {
            localQuery,
          } = context;

          let result = source && source[fieldName];

          if(!result){

            const {
              localQuery,
            } = context;

            const {
              target_id:company_id,
              voted_companies,
            } = source;

            if(!voted_companies && !company_id){
              return null;
            }

            let ids;

            if(voted_companies){
              ids = voted_companies;
            }
            else{
              ids = [company_id];
            }

            Object.assign(args, {
              companyIds: ids,
              limit: 10,
            });
   


            if(ids && ids.length){
              await localQuery({
                operationName: "Companies",
                variables: args,
              })
              .then(r => {

                // 



                const {
                  companies,
                } = r.data || {};

                result = companies;

                let data ={};

                data[fieldName] = companies;

                // Object.assign(source, {
                //   companies,
                // });

              });
            }
          }

          return result;
        },
      },
      Type: {
        type: ResourceType,
        description: "Тип рейтинга",
        resolve: (source, args, context, info) => {

          const {
            fieldName,
          } = info;

          const {
            rootResolver,
          } = context;

          const {
            type,
          } = source;

          if(!type){
            return null;
          }

          Object.assign(args, {
            parent: 1349,
            id: type,
          });

          return rootResolver(null, args, context, info);
        },
      },
    };
  },
});


export default class Rating extends ModelObject{

  fieldResolver(source, args, context, info){
    // 
    // 
    
    const {
      id,
    } = source;

    const {
      fieldName,
    } = info;

    return super.fieldResolver(source, args, context, info);
  }

}



const groupByCompany = function(result){
  var result2 = List();

  const result_grouped = result.groupBy(x => x.target_id);

  result_grouped.map(n => {
    const first = n.get(0);

    const quantity = n.size;

    let ratings = [];

    let voted_users = [];

    n.map(i => {

      const {
        rating,
        target_id,
        voter,
      } = i;

      ratings.push(rating);

      if(voter && voted_users.indexOf(voter) === -1){
        voted_users.push(voter);
      }

    });

    let max_vote;
    let min_vote;

    let rating = ratings.reduce((prev, next) => prev+next) / quantity;

    // 

    result2 = result2.push(Object.assign({}, first, {
      quantity,
      voted_users,
      quantity_voters: voted_users && voted_users.length || 0,
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

  //   

  // });

  return result2;
}

const groupByRatingType = function(result){
  var result2 = List();

  const result_grouped = result.groupBy(x => x.type);

  result_grouped.map(n => {
    const first = n.get(0);

    const quantity = n.size;

    let ratings = [];

    let voted_companies = [];
    let voted_users = [];

    n.map(i => {
      const {
        rating,
        target_id,
        voter,
      } = i;

      ratings.push(rating);

      if(target_id && voted_companies.indexOf(target_id) === -1){
        voted_companies.push(target_id);
      }

      if(voter && voted_users.indexOf(voter) === -1){
        voted_users.push(voter);
      }

      // voters.push(i.company_id);
    });

    let max_vote;
    let min_vote;

    let rating = ratings.reduce((prev, next) => prev+next) / quantity;

    // 

    result2 = result2.push(Object.assign({}, first, {
      quantity,
      voted_companies,
      voted_users,
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

  //   

  // });

  return result2;
}

const groupByCompanyAndRatingType = function(result){
  var result2 = List();

  const result_grouped = result.groupBy(x => `${x.type}_${x.target_id}`);

  result_grouped.map(n => {
    const first = n.get(0);

    const quantity = n.size;

    let ratings = [];

    let voted_companies = [];
    // let voters = [];

    n.map(i => {
      const {
        rating,
        target_id,
      } = i;

      ratings.push(rating);

      if(voted_companies.indexOf(target_id) === -1){
        voted_companies.push(target_id);
      }

      // voters.push(i.company_id);
    });

    let max_vote;
    let min_vote;

    let rating = ratings.reduce((prev, next) => prev+next) / quantity;

    // 

    result2 = result2.push(Object.assign({}, first, {
      quantity,
      voted_companies,
      max_vote: Math.max.apply(null, ratings),
      min_vote: Math.min.apply(null, ratings),
      rating: parseFloat(rating.toFixed(2)),
    }));
  });


  return result2;
}


export class RatingsListField extends listField{
 

}



export const getList = (source, args, context, info) => {

  const {
    RatingsStore,
  } = context.state;



  const {
    fieldNodes: {
      0: {
        selectionSet,
      },
    },
  } = info;

  const {
    sort,
    groupBy,
    resource_id,
  } = args;

  let state = RatingsStore.getState();


  // Сортируем по целевому объекту
  if(resource_id){

    state = state.filter(n => n.target_class === "modResource" && n.target_id === resource_id);

  }

  // Способ группировки
  switch(groupBy){

    case 'company':

      state = groupByCompany(state);

      break;

    case 'rating_type':

      state = groupByRatingType(state);

      break;

    case 'company_and_rating_type':

      state = groupByCompanyAndRatingType(state);

      break;

    default:;
  }


  if(sort){

    sort.map(rule => {

      const {
        by,
        dir,
      } = rule;

      if(!by){
        return;
      }

      let sortByRules;

      switch(by){

        case 'rating':

          sortByRules = n => n.rating;

          break;

        case 'type':

          sortByRules = n => n.type;

          break;

        case 'company':

          sortByRules = n => n.target_id;

          break;
      }

      if(sortByRules){

        state = sortBy(state, sortByRules, dir);

      };

    });

  }

  return state;
};
