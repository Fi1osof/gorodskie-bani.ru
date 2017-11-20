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

import {
  CompanyType,
  // getMany as getCompanies,
  // getOne as getCompany,
} from '../Company';


const EditVersionType = new GraphQLObjectType({
	name: "EditVersionType",
	description: "История изменения объекта",
	fields: () => ({
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
    createdby: {
      type: GraphQLInt,
      description: "Кто внес изменения",
    },
    createdon: {
      type: GraphQLInt,
      description: "Дата изменения",
    },
		editedby: {
			type: GraphQLInt,
			description: "Кто редактировал",
		},
		editedon: {
			type: GraphQLInt,
			description: "Дата редактирования",
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
    CreatedBy: {
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
          createdby: userId,
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
    EditedBy: {
      type: UserType,
      description: "Редактор изменений",
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
    Company: {
      type: CompanyType,
      description: "Компания, для которой выполнены изменения",
      resolve: async (source, args, context, info) => {

        const {
          fieldName,
        } = info;

        const {
          rootResolver,
        } = context;

        const {
          target_id,
        } = source;

        if(!target_id){
          return null;
        }

        Object.assign(args, {
          id: target_id,
        });

        return rootResolver(null, args, context, info);
      },
    },
	}),
});

export default EditVersionType;



export const getList = (source, args, context, info) => {

  // console.log('Comments args', args);

  const {
    EditVersionsStore,
  } = context.state;

  const {
    companyId,
    status,
    createdby,
    editedby,
  } = args;

  let state = EditVersionsStore.getState();


  // Фильтруем неактивные
  // state = state.filter(n => n.published === 1 && n.deleted === 0);

  // Фильтр по документу
  if(companyId){

    state = state.filter(n => n.target_id === companyId);

  }
  
  if(createdby){

    state = state.filter(n => n.createdby === createdby);

  }

  if(editedby){

    state = state.filter(n => n.editedby === editedby);

  }

  // // Фильтр по родителю
  if(status && status.length){

  	// console.log("status", status);

    state = state.filter(n => status.indexOf(n.status) !== -1);

  }

  // // Фильтр по автору
  // if(createdby){

  //   state = state.filter(n => n.createdby === createdby);

  // }

  return state;

};

