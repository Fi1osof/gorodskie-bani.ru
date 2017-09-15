import {
  GraphQLObjectType,
  GraphQLList,
  GraphQLEnumType,
  GraphQLInt,
  GraphQLString,
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

const RootType = new GraphQLObjectType({
  name: 'RootType',
  description: 'Корневой раздел',
  fields: {
    companies: {
      type: new GraphQLList(new GraphQLObjectType({
        name: 'Company',
        fields: {
          id: {
            type: GraphQLInt,
          },
          name: {
            type: GraphQLString,
          },
        },
      })),
    },
  },
});

export default RootType;
