

import {
  GraphQLInt,
  GraphQLString,
  GraphQLList,
  GraphQLObjectType,
  GraphQLInputObjectType,
  GraphQLEnumType,
} from 'graphql';

import GraphQLJSON from 'graphql-type-json';

import moment from 'moment';

// import {
//   SchemaObject,
//   order,
//   ModelObject,
// } from '../';
 

import ModelObject from '../object';

import {
  CompanyType,
} from '../Company';

import {
  UserType,
} from '../User';

// console.log('CompanyType', CompanyType);
 

// export class SchemaType extends SchemaObject{

//   constructor(props){

    

//     props = Object.assign({

//       fields: () => {

//         return {
//           id: {
//             type: GraphQLInt
//           },
//           thread_id: {
//             type: GraphQLString
//           },
//           text: {
//             type: GraphQLString
//           },
//           author_username: {
//             type: GraphQLString
//           },
//           author_fullname: {
//             type: GraphQLString
//           },
//           author_avatar: {
//             type: GraphQLString
//           },
//           parent: {
//             type: GraphQLInt
//           },
//           // createdon: {
//           //   type: GraphQLString,
//           //   // description: 'Время создания комментария в миллисекундах',
//           //   resolve: (comment, args) => {
//           //     return comment.createdon ? moment(comment.createdon).format('MMMM DD, YYYY | HH:mm:ss') : null;
//           //   },
//           // },
//         };

//       },
//     }, props);

//     super(props);
//   }
// }


export const CommentType = new GraphQLObjectType({
  name: 'CommentType',
  description: 'Комментарии',
  fields: () => {

    return {
      id: {
        type: GraphQLInt
      },
      thread_id: {
        type: GraphQLString
      },
      target_id: {
        type: GraphQLInt,
        description: "ID цели",
      },
      target_class: {
        type: GraphQLString,
        description: "Класс целевого объекта",
      },
      text: {
        type: GraphQLJSON,
        description: "Текст комментария",
      },
      author_username: {
        type: GraphQLString
      },
      author_fullname: {
        type: GraphQLString
      },
      author_avatar: {
        type: GraphQLString
      },
      parent: {
        type: GraphQLInt
      },
      published: {
        type: GraphQLInt
      },
      deleted: {
        type: GraphQLInt
      },
      createdby: {
        type: GraphQLInt,
        description: "ID автора комментария",
      },
      resource_id: {
        type: GraphQLInt,
        description: "ID ресурса",
        resolve: (source) => {

          const {
            target_id,
            target_class,
          } = source;

          return target_class === "modResource" && target_id;
        },
      },
      createdon: {
        type: GraphQLString,
        description: 'Время создания комментария в секундах',
      },
      createdonFormatted: {
        type: GraphQLString,
        // description: 'Время создания комментария в миллисекундах',
        resolve: (comment, args) => {
          return comment.createdon ? moment(comment.createdon).format('MMMM DD, YYYY | HH:mm:ss') : null;
        },
      },
      Author: {
        type: UserType,
        description: UserType.description,
        resolve: async (source, args, context, info) => {

          const {
            fieldName,
          } = info;

          const {
            rootResolver,
          } = context;

          const {
            createdby: userId,
          } = source;

          if(!userId){
            return null;
          }

          Object.assign(args, {
            id: userId,
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
          //     createdby: userId,
          //   } = source;

          //   if(!userId){
          //     return null;
          //   }

          //   Object.assign(args, {
          //     userId,
          //   });
   
 
          //   await localQuery({
          //     operationName: "User",
          //     variables: args,
          //   })
          //   .then(r => {
          //     // console.log('Comments Author', args, r);

          //     const {
          //       user,
          //     } = r.data;

          //     result = user;

          //   }); 
          // }
          
          // return result;
        },
      },
      Company: {
        type: CompanyType,
        description: CompanyType.description,
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
              resource_id: company_id,
            } = source;

            if(!company_id){
              return null;
            }

            Object.assign(args, {
              company_id,
            });
   
 
            await localQuery({
              operationName: "Company",
              variables: args,
            })
            .then(r => {
              // console.log('Ratings Companies args', args, r);

              const {
                company,
              } = r.data;

              result = company;

            }); 
          }
          
          return result;
        },
      },
      _errors: {
        type: GraphQLJSON,
        description: "Ошибки после попытки сохранения",
      },
      _Dirty: {
        type: GraphQLJSON,
        description: "Массив измененных данных",
        resolve: source => {

          return source && source._isDirty || null;
          // return source && source._isDirty ? true : false;

        },
      },
      // ratings: {
      //   type: new GraphQLList(RatingsType),
      //   resolve: (rating_type) => {

      //     const {
      //       id: type,
      //     } = rating_type;

      //     let args = {
      //       type,
      //       groupBy: 'rating_type',
      //       limit: 0,
      //     };

      //     console.log('RatingsResolver args', args, rating_type);

      //     return this.RatingsResolver(null, args);
      //   },
      // },
    };
  },
});

export default class Comment extends ModelObject{

  fieldResolver(source, args, context, info){
    console.log('Comment fieldResolver', source, args, context, info);
    

    const {
      fieldName,
    } = info;

    // switch(fieldName){

    //   case 'comments': 

    //     return new Promise((resolve, reject) => {
    //       resolve([{
    //         id: 345,
    //         text: "DSFdsf",
    //       }]);
    //     });

    //     break;

    // }

    return super.fieldResolver(source, args, context, info);
  }

}


// Добавляем новый топик
export const add = (source, args, context, info) => {

  // console.log("Comment add args", args);

  let {
    CommentsStore,
  } = context.state;

  const {
    user: {
      user: currentUser,
    },
  } = context.props;

  const id = Math.round(Math.random() * 10000000) * -1;

  const {
    target_id,
  } = args;

  let data = {
  };

  const createdon = new Date().getTime();

  let item = Object.assign(args || {}, {
    id,
    resource_id: target_id,
    createdby: currentUser && currentUser.id || undefined,
    // createdon: Math.round(new Date().getTime() / 1000),
    createdon: moment(createdon).format('YYYY-MM-DD'),
    // published: 1,
    deleted: 0,
    _isDirty: {
      target_id,
    },
  });

  CommentsStore.getDispatcher().dispatch(CommentsStore.actions.CREATE, item);

  // item.update(data);

  // browserHistory.push(uri);

  return item;

};


export const getList = (source, args, context, info) => {

  // console.log('Comments args', args);

  const {
    CommentsStore,
  } = context.state;

  const {
    resource_id,
    parent,
    createdby,
  } = args;

  let state = CommentsStore.getState();


  // Фильтруем неактивные
  state = state.filter(n => n.published === 1 && n.deleted === 0);

  // Фильтр по документу
  if(resource_id){

    state = state.filter(n => n.resource_id === resource_id);

  }

  // Фильтр по родителю
  if(parent){

    state = state.filter(n => n.parent === parent);

  }

  // Фильтр по автору
  if(createdby){

    state = state.filter(n => n.createdby === createdby);

  }

  return state;

};