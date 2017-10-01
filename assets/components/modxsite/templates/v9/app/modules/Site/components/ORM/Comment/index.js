// CommentType = new GraphQLObjectType({
//       name: 'CommentType',
//       description: 'Комментарии',
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
//           createdon: {
//             type: GraphQLString,
//             // description: 'Время создания комментария в миллисекундах',
//             resolve: (comment, args) => {
//               return comment.createdon ? moment(comment.createdon).format('MMMM DD, YYYY | HH:mm:ss') : null;
//             },
//           },
//           // ratings: {
//           //   type: new GraphQLList(RatingsType),
//           //   resolve: (rating_type) => {

//           //     const {
//           //       id: type,
//           //     } = rating_type;

//           //     let args = {
//           //       type,
//           //       groupBy: 'rating_type',
//           //       limit: 0,
//           //     };

//           //     console.log('RatingsResolver args', args, rating_type);

//           //     return this.RatingsResolver(null, args);
//           //   },
//           // },
//         };
//       },
//     });


import {
  GraphQLInt,
  GraphQLString,
  GraphQLList,
  GraphQLObjectType,
  GraphQLInputObjectType,
  GraphQLEnumType,
} from 'graphql';

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
      text: {
        type: GraphQLString
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
              console.log('Ratings Companies args', args, r);

              const {
                company,
              } = r.data;

              result = company;

            }); 
          }
          
          return result;
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


export const getList = async (source, args, context, info) => {

  const {
    CommentsStore,
  } = context.state;

  return CommentsStore.getState();

};