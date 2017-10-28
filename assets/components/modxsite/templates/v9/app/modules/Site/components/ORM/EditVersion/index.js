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

import GraphQLJSON from 'graphql-type-json';


const EditVersionType = new GraphQLObjectType({
	name: "EditVersionType",
	description: "История изменения объекта",
	fields: {
		id: {
			type: GraphQLInt,
			description: "Идентификатор поля",
		},
		target_id: {
			type: GraphQLInt,
			description: "Идентификатор изменного объекта",
		},
		data: {
			type: GraphQLJSON,
			description: "Изменнные данные",
		},
		editedby: {
			type: GraphQLInt,
			description: "Кто внес изменения",
		},
		editedon: {
			type: GraphQLString,
			description: "Дата изменения",
		},
		status: {
			type: GraphQLString,
			description: "Статус изменения. 0 - Новый. 1 - Подтвержден. 2 - Отменен",
		},
	},
});

export default EditVersionType;
