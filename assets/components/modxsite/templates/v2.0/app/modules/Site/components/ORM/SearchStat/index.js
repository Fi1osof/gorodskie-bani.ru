import {
  GraphQLID,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
  GraphQLObjectType,
  GraphQLInputObjectType,
  GraphQLEnumType,
  GraphQLFloat,
} from 'graphql';

import { List } from 'immutable';


export const SearchStatType = new GraphQLObjectType({
  name: 'SearchStatType',
  description: 'Статистика поиска',
  fields: () => {

    return {
      id: {
        type: GraphQLInt,
      },
      query: {
        type: GraphQLString,
        description: "Поисковый запрос",
      },
      finded: {
        type: GraphQLInt,
        description: "Количество найденных заведений",
      },
      date: {
        type: GraphQLInt,
        description: "Дата запроса",
      },
    };

  },
});
