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
  CommentType,
} from '../Comment';

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



// export const getList = function (source, args, context, info){
//   // console.log('Ratings getMany', source, args, info);
//   // console.log('Ratings getMany context', context);
  
//   const {
//     id,
//   } = source;

//   const {
//     fieldName,
//   } = info;

//   return new Promise((resolve, reject) => {
//     // resolve([{
//     //   id: 345,
//     //   text: "DSFdsf",
//     // }]);

//     const {
//       remoteQuery,
//     } = context;

//     remoteQuery(`query{
//         ratings(limit: 0) {
//           rating
//           max_vote
//           min_vote
//           type
//           company_id
//           quantity
//           quantity_voters
//           voted_companies
//           voters
//         }
//       }`)
//       .then(result => {

//         // console.log('result.object', result);

//         const {
//           ratings,
//         } = result.object;

//         return resolve(List(ratings));
//       })
//       .catch(e => reject(e));

//   });
// }

// export const getOne = function (source, args, context, info){
//   return new Promise((resolve, reject) => {
//     getMany(source, args, context, info)
//       .then(result => {
//         console.log('result 444', result, result.get(0));
//         resolve(result && result.get(0) || null);
//       })
//   });
// }



export const getList = (source, args, context, info) => {

  const {
    UsersStore,
  } = context.state;

  const {
    user: {
      user:currentUser,
    },
  } = context.props;

  const {
    username,
    delegatesOnly,
    myOnly,
  } = args;

  // console.log('user getList', args, info);

  // const {
  //   fieldNodes: {
  //     0: {
  //       selectionSet,
  //     }
  //   },
  // } = info;

  let state = UsersStore.getState();

  if(myOnly){

    if(!currentUser){
      return null;
    }

    state = state.filter(n => n.createdby === currentUser.id);

  }

  if(username){
    state = state.filter(n => n.username === username);
  }

  if(delegatesOnly){
    state = state.filter(n => n.delegate === true);
  }

  return state;
};


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
        type: GraphQLString,
      },
      image: {
        type: GraphQLString,
      },
      imageFormats: imageType,
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
      blocked: {
        type: GraphQLBoolean,
      },
      sudo: {
        type: GraphQLBoolean,
      },
      delegate: {
        type: GraphQLBoolean,
        description: "Флаг того, что пользователь - представитель компании.",
      },
      createdon: {
        type: GraphQLInt,
        description: "Дата регистрации пользователя",
      },
      offer: {
        type: GraphQLString,
        description: "Коммерческое предложение",
      },
      offer_date: {
        type: GraphQLInt,
        description: "Дата отправки коммерческого предложения",
      },
      contract_date: {
        type: GraphQLInt,
        description: "Дата заключения сделки",
      },
      createdby: {
        type: GraphQLInt,
        description: "Кем создана учетка пользователя",
      },
      comments: {
        type: new GraphQLList(CommentType),
        description: CommentType.description,
        resolve: async (source, args, context, info) => {

          const {
            id,
          } = source;

          if(!id){
            return null;
          }

          Object.assign(args, {
            createdby: id,
          });


          const {
            rootResolver,
          } = context;

          return rootResolver(null, args, context, info);
        },
      },
      _Dirty: {
        type: GraphQLBoolean,
        description: "Флаг того, что объект изменен",
        resolve: source => {

          return source && source._isDirty ? true : false;

        },
      },
    };
  },
});


export default class User extends ModelObject{

}

