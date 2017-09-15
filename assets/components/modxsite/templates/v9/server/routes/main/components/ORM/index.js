import {
  GraphQLObjectType,
  GraphQLEnumType,
} from 'graphql';

// import {db as db_config} from '../../../../config/config';

// let {
//   connection: {
//     prefix,
//   },
// } = db_config;


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


export default class ObjectType extends GraphQLObjectType{

  constructor(props, knex){

    let Props = Object.assign({
    }, props);

    super(Props);

    this.knex = knex;
  }
}
