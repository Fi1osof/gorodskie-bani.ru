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


export const listArgs = {
  ids: {
    type: new GraphQLList(GraphQLInt),
    description: 'Список ID',
  },
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


export class listField {

  constructor(props){

    // Object.assign(this, props);


    let {
      description,
      args,
      resolve,
      ...other
    } = props;

    args = Object.assign(listArgs, args || {});

    Object.assign(this, {
      description,
      args,
    });

    // var a = {
    //   // type: new ObjectsListType({
    //   //   ...other,
    //   // }),
    //   // description,
    //   // args,
      
    // }

    this.type = new ObjectsListType({
      ...other,
    });

    // return this;

    this.resolve = resolve || ::this.resolve;
  }

  beforeCount(source, args, context, info){

    let {
      ids,
    } = args;

    if(ids && ids.length){
      source = source.filter(n => ids.indexOf(n.id) !== -1);
    }

    return source;
  }

  resolve(source, args, context, info){
    
    console.log('ObjectsListType fieldResolver', source, args, context, info);

    const {
      fieldName,
    } = info;
          
    let result = source && source[fieldName] || undefined;

    if(result){
      console.log('ObjectsListType fieldResolver result', result);

      let {
        ids,
        offset,
        limit,
        page,
      } = args;

      page = page || 1;


      result = this.beforeCount(result, args, context, info);

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
  }
}