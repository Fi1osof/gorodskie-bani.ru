import {
  GraphQLInputObjectType,
  GraphQLObjectType,
  GraphQLList,
  GraphQLNonNull,
  GraphQLEnumType,
  GraphQLInt,
  GraphQLString,
  GraphQLBoolean,
} from 'graphql';


import { List } from 'immutable';

import {
  listField,
  // ObjectsListType,
} from './fields';

// import type from 'graphql';

// import {
//   GraphQLField,
// } from 'graphql/type/';

// console.log('GraphQLField', GraphQLField);
// console.log('GraphQLField type', type);

// export class ModelObject{

//   constructor(props){

//     Object.assign(this, props);

//   }

//   fieldResolver(source, args, context, info) {
    
//     const {
//       fieldName,
//     } = info;
          
//     return source && source[fieldName] || undefined;

//   }

// }

import {
  CompanyType,
  getMany as getCompanies,
  getOne as getCompany,
} from './Company';

import {
  RatingType,
  RatingArgs,
  RatingsListField,
  getMany as getRatings,
  getOne as getRating,
} from './Rating';

import {
  CommentType,
} from './Comment';




// export class SchemaObject extends GraphQLObjectType{

//   constructor(props){

//     props = Object.assign({
//     }, props);

//     super(Props);
//   }
// }







// const CompanyType = new GraphQLObjectType({
//   name: 'Company',
//   fields: {
//     id: {
//       type: GraphQLInt,
//     },
//     name: {
//       type: GraphQLString,
//     },
//   },
// });

// const CommentType = new GraphQLObjectType({
//   name: 'Comment',
//   fields: {
//     id: {
//       type: GraphQLInt,
//     },
//     name: {
//       type: GraphQLString,
//     },
//   },
// });


const RatingsList = new RatingsListField({
  type: RatingType,
  name: "Ratings",
  description: RatingType.description,
  args: RatingArgs,
});

// console.log('RatingsList', RatingsList);

const RootType = new GraphQLObjectType({
  name: 'RootType',
  description: 'Корневой раздел',
  fields: {
    companies: new listField({
      type: CompanyType,
      name: "Companies",
      description: "Список компаний",
    }),
    company: {
      type: CompanyType,
      description: "Компания",
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLInt),
        },
      },
      resolve: getCompany,
    },
    ratings: RatingsList,
    vote: {
      type: RatingType,
      description: "Рейтинг",
      resolve: getRating,
    },
    comments: new listField({
      type: CommentType,
      name: "Comments",
      description: "Список комментариев",
      args: {
        thread: {
          type: GraphQLInt,
          description: 'ID диалоговой ветки',
        },
      },
    }),
    // // ratings: {
    // //   type: new GraphQLList(RatingType),
    // //   name: "RatingsList",
    // //   description: RatingType.description,
    // //   args: listArgs,
    // //   // resolve: getRatings,
    // // },
  },
});

export default RootType;
