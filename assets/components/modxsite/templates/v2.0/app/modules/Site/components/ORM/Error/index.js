import {
  GraphQLInt,
  GraphQLString,
  GraphQLList,
  GraphQLObjectType,
  GraphQLInputObjectType,
  GraphQLEnumType,
  GraphQLFloat,
  GraphQLBoolean,
} from 'graphql';


const ErrorType = new GraphQLObjectType({
	name: "ErrorType",
	description: "Ошибка при попытке сохранения объекта",
	fields: {
		name: {
			type: GraphQLString,
			description: "Идентификатор поля",
		},
		error_message: {
			type: GraphQLString,
			description: "Сообщение",
		},
	},
});

export default ErrorType;
