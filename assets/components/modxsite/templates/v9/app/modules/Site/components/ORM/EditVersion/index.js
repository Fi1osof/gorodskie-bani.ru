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


import {
  UserType,
} from '../User';


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
			type: GraphQLInt,
			description: "Дата изменения",
		},
		status: {
			type: GraphQLString,
			description: "Статус изменения. 0 - Новый. 1 - Подтвержден. 2 - Отменен",
		},
		message: {
			type: GraphQLString,
			description: "Серверное сообщение",
		},
    errors: {
      type: GraphQLJSON,
      description: "Ошибки после попытки сохранения",
    },
    EditedBy: {
      type: UserType,
      description: "Автор изменений",
      resolve: async (source, args, context, info) => {

        const {
          fieldName,
        } = info;

        const {
          rootResolver,
        } = context;

        const {
          editedby: userId,
        } = source;

        if(!userId){
          return null;
        }

        Object.assign(args, {
          id: userId,
        });

        return rootResolver(null, args, context, info);
      },
    },
	},
});

export default EditVersionType;



export const getList = (source, args, context, info) => {

  // console.log('Comments args', args);

  const {
    EditVersionsStore,
  } = context.state;

  const {
    // resource_id,
    // parent,
    // createdby,
  } = args;

  let state = EditVersionsStore.getState();


  // Фильтруем неактивные
  // state = state.filter(n => n.published === 1 && n.deleted === 0);

  // Фильтр по документу
  // if(resource_id){

  //   state = state.filter(n => n.resource_id === resource_id);

  // }

  // // Фильтр по родителю
  // if(parent){

  //   state = state.filter(n => n.parent === parent);

  // }

  // // Фильтр по автору
  // if(createdby){

  //   state = state.filter(n => n.createdby === createdby);

  // }

  return state;

};

