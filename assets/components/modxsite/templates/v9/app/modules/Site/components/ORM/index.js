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
  order,
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

import {
  ResourceType,
} from './Resource';

import WsConnectionType, {
} from './WsConnection';


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
  createdby: {
    type: GraphQLInt,
    description: 'ID автора комментария',
  },
}, listArgs);


const resourcesArgs = Object.assign({
  template: {
    type: GraphQLInt,
    description: 'ID Шаблона',
  },
  parent: {
    type: GraphQLInt,
    description: 'ID родителя',
  },
  excludeTemplates: {
    type: new GraphQLList(GraphQLInt),
    description: 'С какими шаблонами надо исключить документы',
  },
  tag: {
    type: GraphQLString,
    description: 'Фильтр по тегу',
  },
  uri: {
    type: GraphQLString,
    description: 'Поиск по URI документа',
  },
  resourceType: {
    type: new GraphQLEnumType({
      name: "ResourceTypeEnum",
      values: {
        topic: {
          value: "topic",
          description: "Топик",
        },
        obzor: {
          value: "obzor",
          description: "Обзор заведения",
        },
        company: {
          value: "company",
          description: "Компания",
        },
      },
    }),
    description: 'Тип ресурса',
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
      args: resourcesArgs,
    }),
    companies: {
      type: new GraphQLList(CompanyType),
      name: "Companies",
      description: "Список компаний",
      args: resourcesArgs,
    },
    company: {
      type: CompanyType,
      description: "Компания",
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLInt),
        },
      },
    },
    resourcesList: new listField({
      type: ResourceType,
      name: "resourcesList",
      description: "Список документов с постраничностью",
      args: resourcesArgs,
    }),
    resources: {
      type: new GraphQLList(ResourceType),
      name: "Resources",
      description: "Список документов",
      args: resourcesArgs,
    },
    resource: {
      type: ResourceType,
      description: "Документ",
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
      }, listArgs, {
        sort: {
          type: new GraphQLList(new GraphQLInputObjectType({
            name: "RatingsSortBy",
            fields: {
              by: {
                type: new GraphQLEnumType({
                  name: 'RatingsSortByValues',
                  values: {
                    id: {
                      value: 'id',
                      description: 'По ID',
                    },
                    rating: {
                      value: 'rating',
                      description: 'По рейтингу',
                    },
                    type: {
                      value: 'type',
                      description: 'По типу рейтинга',
                    },
                    company: {
                      value: 'company',
                      description: 'По компании',
                    },
                    rand: {
                      value: 'rand()',
                      description: 'В случайном порядке',
                    },
                  },
                }),
                description: 'Способ сортировки',
              },
              dir: order,
            },
          })),
        },
      }),
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
    usersList: new listField({
      type: UserType,
      name: "usersList",
      description: "Список пользователей с постраничностью",
      args: Object.assign({
        delegatesOnly: {
          type: GraphQLBoolean,
          description: "Только представители",
        },
      }, listArgs),
    }),
    users: {
      type: new GraphQLList(UserType),
      name: "Users",
      description: "Список пользователей",
      args: Object.assign({
        delegatesOnly: {
          type: GraphQLBoolean,
          description: "Только представители",
        },
      }, listArgs),
    },
    user: {
      type: UserType,
      name: "User",
      description: UserType.description,
      args: {
        id: {
          type: GraphQLInt,
        },
        username: {
          type: GraphQLString,
          description: "Поиск по юзернейму",
        },
        ownProfile: {
          type: GraphQLBoolean,
          description: "Получить текущего пользователя",
        },
      },
    },
    ws_connections: {
      type: new GraphQLList(WsConnectionType),
      description: 'WebSocket-соединения',
      args: {
        user: {
          type: GraphQLInt,
          description: "ID пользователя",
        }
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


const mutationFields = {
  addCompany: {
    type: CompanyType,
    description: "Добавление нового заведения",
  },
}


export const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: () => (mutationFields),
});
