import {
  GraphQLObjectType,
  GraphQLList,
  GraphQLNonNull,
  GraphQLEnumType,
  GraphQLInt,
  GraphQLString,
  GraphQLBoolean,
} from 'graphql';

// import type from 'graphql';

import {
  GraphQLField,
} from 'graphql/type/';

console.log('GraphQLField', GraphQLField);
// console.log('GraphQLField type', type);

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


export class SchemaObject extends GraphQLObjectType{

  constructor(props){

    props = Object.assign({
    }, props);

    super(Props);
  }
}


export class ModelObject{

  constructor(props){

    Object.assign(this, props);

  }

  fieldResolver(source, args, context, info) {
    
    const {
      fieldName,
    } = info;
          
    return source && source[fieldName] || undefined;

  }

}

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
  offset: {
    type: GraphQLInt,
    description: 'Сколько записей пропустить',
  },
  limit: {
    type: new GraphQLNonNull(GraphQLInt),
    description: 'Лимит записей',
  },
  page: {
    type: GraphQLInt,
    description: 'Страница',
  },
  search: {
    type: GraphQLString,
    description: 'Поисковый запрос',
  },
};


const listField = function (props) {

  const {
    description,
    ...other
  } = props;

  return {
    type: new ObjectsListType({
      ...other,
    }),
    description,
    args: listArgs,
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


const CompanyType = new GraphQLObjectType({
  name: 'Company',
  fields: {
    id: {
      type: GraphQLInt,
    },
    name: {
      type: GraphQLString,
    },
  },
});

const CommentType = new GraphQLObjectType({
  name: 'Comment',
  fields: {
    id: {
      type: GraphQLInt,
    },
    name: {
      type: GraphQLString,
    },
  },
});


const RootType = new GraphQLObjectType({
  name: 'RootType',
  description: 'Корневой раздел',
  fields: {
    companies: listField({
      type: CompanyType,
      name: "Companies",
      description: "Список компаний",
    }),
    comments: listField({
      type: CommentType,
      name: "Comments",
      description: "Список комментариев",
    }),
  },
});

export default RootType;
