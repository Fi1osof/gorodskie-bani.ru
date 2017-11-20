
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

const WsMessageType = new GraphQLObjectType({
  name: 'WsMessageType',
  description: 'Веб-сокет сообщение',
  fields: {
    type: {
      type: GraphQLString,
    },
    text: {
      type: GraphQLString,
    },
    message_id: {
      type: GraphQLInt,
    },
  },
});

export default WsMessageType;