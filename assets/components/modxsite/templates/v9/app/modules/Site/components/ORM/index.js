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
  getMany as getRatings,
  getOne as getRating,
} from './Rating';

import {
  CommentType,
} from './Comment';

export const order = {
  type: new GraphQLEnumType({
    name: "SortType",
    values: {
      asc: {
        value: 'asc',
        description: 'В прямом порядке',
      },
      desc: {
        value: 'desc',
        description: 'В обратном порядке',
      },
    },
  }),
  description: 'Порядок сортировки',
};

export const SortBy = new GraphQLInputObjectType({
  name: "SortBy",
  fields: {
    by: {
      type: new GraphQLEnumType({
        name: 'SortByValues',
        values: {
          id: {
            value: 'id',
            description: 'По ID',
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
});

export const SortField = {
  type: new GraphQLList(SortBy),
};


// export class SchemaObject extends GraphQLObjectType{

//   constructor(props){

//     props = Object.assign({
//     }, props);

//     super(Props);
//   }
// }



export class ObjectsListType extends GraphQLObjectType{

  constructor(props){

    props = props || {};

    let {
      type,
      args,
      fields,
      ...other
    } = props;

    fields = Object.assign(fields || {}, {
      // success: {
      //   type: GraphQLBoolean,
      // },
      // message: {
      //   type: GraphQLString,
      // },
      count: {
        type: GraphQLInt,
      },
      total: {
        type: GraphQLInt,
      },
      limit: {
        type: GraphQLInt,
      },
      page: {
        type: GraphQLInt,
      },
      object: {
        type: new GraphQLList(type),
        // resolve: (response, args) => {

        //   // console.log('this.CompanyType Resolver', response, args);

        //   return response && response.success && response.object || [];
        // },
      },
    });

    Object.assign(props, {
      fields,
    });

    super(props);

  }



}

export const listArgs = {
  search: {
    type: GraphQLString,
    description: 'Поисковый запрос',
  },
  sort: SortField,
  limit: {
    type: new GraphQLNonNull(GraphQLInt),
    description: 'Лимит записей',
  },
  page: {
    type: GraphQLInt,
    description: 'Страница',
  },
  offset: {
    type: GraphQLInt,
    description: 'Сколько записей пропустить',
  },
};


const listField = function (props) {

  let {
    description,
    args,
    ...other
  } = props;

  args = Object.assign(listArgs, args || {});

  return {
    type: new ObjectsListType({
      ...other,
    }),
    description,
    args,
    resolve: (source, args, context, info) => {
      
      console.log('ObjectsListType fieldResolver', source, args, context, info);

      const {
        fieldName,
      } = info;
            
      let result = source && source[fieldName] || undefined;

      if(result){
        console.log('ObjectsListType fieldResolver result', result);

        let {
          offset,
          limit,
          page,
        } = args;

        page = page || 1;

        const total = result.size;

        if(offset){
          result = result.skip(offset);
        }

        if(limit){

          if(page > 1){
            result = result.skip(limit * (page - 1));
          }

          result = result.take(limit);
        }

        result = {
          success: true,
          message: '',
          count: result.size,
          total,
          limit,
          page,
          object: result,
        };
      }

      return result;
    },
  }
}


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


const RootType = new GraphQLObjectType({
  name: 'RootType',
  description: 'Корневой раздел',
  fields: {
    companies: listField({
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
    ratings: {
      type: new GraphQLList(RatingType),
      name: "RatingsList",
      description: RatingType.description,
      args: listArgs,
      resolve: getRatings,
    },
    vote: {
      type: RatingType,
      description: "Рейтинг",
      resolve: getRating,
    },
    comments: listField({
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
  },
});

export default RootType;
