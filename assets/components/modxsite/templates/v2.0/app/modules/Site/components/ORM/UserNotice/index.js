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

const UserNoticeType = new GraphQLObjectType({
	name: "UserNoticeType",
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


export default UserNoticeType;
