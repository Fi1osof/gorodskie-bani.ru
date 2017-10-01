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
  listArgs,
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
  // getMany as getCompanies,
  // getOne as getCompany,
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

import {
  UserType,
} from './User';


// console.log('UserType', UserType, CompanyType);


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
  name: "RatingsList",
  description: RatingType.description,
  args: RatingArgs,
});


const commentsArgs = Object.assign({
  resource_id: {
    type: GraphQLInt,
    description: 'ID ресурса',
  },
  parent: {
    type: GraphQLInt,
    description: 'ID родительского комментария',
  },
}, listArgs);

// console.log('RatingsList', RatingsList);

const RootType = new GraphQLObjectType({
  name: 'RootType',
  description: 'Корневой раздел',
  fields: {
    companiesList: new listField({
      type: CompanyType,
      name: "companiesList",
      description: "Список компаний с постраничностью",
    }),
    companies: {
      type: new GraphQLList(CompanyType),
      name: "Companies",
      description: "Список компаний",
      args: listArgs,
    },
    company: {
      type: CompanyType,
      description: "Компания",
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLInt),
        },
      },
      // resolve: getCompany,
    },
    ratingsList: RatingsList,
    ratings: {
      type: new GraphQLList(RatingType),
      description: "Список комментариев",
      args: Object.assign({
        resource_id: {
          type: GraphQLInt,
          description: "ID ресурса, к которому комментарий оставлен",
        },
      }, listArgs),
    },
    vote: {
      type: RatingType,
      description: "Рейтинг (отдельный голос)",
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLInt),
        },
      },
      // resolve: getRating,
    },
    commentsList: new listField({
      type: CommentType,
      name: "commentsList",
      description: "Список комментариев с постраничностью",
      args: commentsArgs,
    }),
    comments: {
      type: new GraphQLList(CommentType),
      name: "Comments",
      description: "Список комментариев",
      args: commentsArgs,
    },
    users: {
      type: new GraphQLList(UserType),
      name: "Users",
      description: "Список пользователей",
      args: listArgs,
    },
    user: {
      type: UserType,
      name: "User",
      description: UserType.description,
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLInt),
        },
      },
    },
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
