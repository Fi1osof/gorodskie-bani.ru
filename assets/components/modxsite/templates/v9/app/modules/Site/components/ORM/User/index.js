import {
  GraphQLID,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
  GraphQLObjectType,
  GraphQLInputObjectType,
  GraphQLEnumType,
  GraphQLFloat,
  GraphQLBoolean,
} from 'graphql';

import ModelObject from '../object';

import { List } from 'immutable';

import {
  listField,
  // ObjectsListType,
} from '../fields';


import {
  imageType,
} from '../fields';


// import {
//   CompanyType,
//   getMany as getCompanies,
// } from '../Company';



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


export const UserType = new GraphQLObjectType({
  name: 'UserType',
  description: 'Пользователь',
  fields: () => {

    return { 
      id: {
        type: GraphQLInt
      },
      username: {
        type: GraphQLString
      },
      fullname: {
        type: GraphQLString
      },
      email: {
        type: GraphQLString
      },
      // image: imageType,
      // photo: {
      //   type: new GraphQLObjectType({
      //     name: "SDfsdf",
      //     fields: {
      //       image: imageType,
      //     },
      //   }),
      //       resolve: (data) => {
      //         console.log('UserType photo', data);
      //         return "DSfds";
      //       },
      // },
      active: {
        type: GraphQLBoolean,
      },
      sudo: {
        type: GraphQLBoolean,
      },
      blocked: {
        type: GraphQLBoolean,
      },
    };
  },
});


export default class User extends ModelObject{

}

