import {
  GraphQLID,
  GraphQLInt,
  GraphQLString,
  GraphQLBoolean,
  GraphQLList,
  GraphQLObjectType,
  GraphQLInputObjectType,
  GraphQLEnumType,
  GraphQLFloat,
  GraphQLNonNull,
} from 'graphql';

export default new GraphQLObjectType({
	name: "UserNotice",
	fields: {
		id: {
			type: new GraphQLNonNull(GraphQLInt),
			description: "ID уведомления",
		},
		type: {
			type: new GraphQLNonNull(GraphQLString),
			description: "Название уведомления",
		},
		comment: {
			type: new GraphQLNonNull(GraphQLString),
			description: "Комментарий к названию уведомления",
		},
		active: {
			type: new GraphQLNonNull(GraphQLBoolean),
			description: "Флаг активности настройки",
		},
	},
});