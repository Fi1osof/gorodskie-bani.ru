
import {
  GraphQLInputObjectType,
  GraphQLObjectType,
  GraphQLList,
  GraphQLNonNull,
  GraphQLEnumType,
  GraphQLInt,
  GraphQLString,
  GraphQLFloat,
  GraphQLBoolean,
  GraphQLUnionType,
} from 'graphql';

import GraphQLJSON from 'graphql-type-json';

import EditorStateBuilder from 'react-cms/src/app/components/ORM/Comment';


import {
	CompanyType
} from '../Company';


export const EditorEntityCompanyType = new GraphQLObjectType({
	name: "CustomEditorEntityCompanyType",
	description: "Компания",
	fields: {
		mutability: {
			type: GraphQLJSON,
		},
		type: {
			type: GraphQLJSON,
		},
		data: {
			type: new GraphQLObjectType({
				name: "CustomEditorStateEntityDataType",
				fields: () => ({
					// gallery: {
					// 	type: new GraphQLList(CommentGalleryType),
					// },
					target: {
						type: GraphQLString,
					},
					title: {
						type: GraphQLString,
					},
					url: {
						type: GraphQLString,
					},
					company_id: {
						type: GraphQLInt,
						description: "ID компании",
					},
					Company: {
						type: CompanyType,
						description: CompanyType.description,
						resolve: (source, args, context, info) => {

							return null;

		          const {
		            fieldName,
		          } = info;

							const {
								company_id,
							} = source;

            	// console.log("Company company_id", company_id);

							if(!company_id){
								return null;
							}

		          const {
		            localQuery,
		          } = context;

		          let result = source && source[fieldName];

		          if(!result){

		            const {
		              localQuery,
		            } = context;

		            // const {
		            //   resource_id: company_id,
		            // } = source;

		            if(!company_id){
		              return null;
		            }

		            Object.assign(args, {
		              id: company_id,
		            });
		   
		 
		            return localQuery({
		              operationName: "Company",
		              variables: args,
		            })
		            .then(r => {

		            	// console.log("Company result", r);

		              const {
		                company,
		              } = r.data;

		              return company;

		            })
		            .catch(e => {
		            	throw(e);
		            }); 
		          }
		          
		          return result;


							// const {
							// 	company_id,
							// } = source;

							// if(!company_id){
							// 	return null;
							// }

							// const {
							// 	rootResolver,
							// } = context;

							// Object.assign(args, {
							// 	id: company_id,
							// });

							// return rootResolver(null, args, context, info);

						},
					},
					src: {
						type: GraphQLString,
					},
					_map: {
						type: GraphQLJSON,
					},
				}),
			}),
		},
	},
});


const fields = () => {

	// return {
	// 	// company_id: {
	// 	// 	type: GraphQLInt,
	// 	// 	description: "ID компании",
	// 	// },
	// 	Company: {
	// 		type: CompanyType,
	// 		description: CompanyType.description,
	// 	}
	// }

};

const types = [
	EditorEntityCompanyType,
];

const typesResolver = (data) => {

	const {
		type,
	} = data;

	// console.log("editorBlockTypeResolve data", data);

	// const returnType = typesResolver && typesResolver(data);

	// if(returnType){
	// 	return returnType;
	// }

	switch(type){
		
		case "COMPANY":

			return EditorEntityCompanyType;
			break;

		default: return null;
	}

}

export const CommentEditorStateType = EditorStateBuilder(types, typesResolver, fields);

// import {
// 	EditorStateBlockType,
// 	// EditorEntityType,
// 	EditorStateEntityDataType,
// 	EditorEntityTypes,
// 	editorBlockTypeResolve as ReactCrmEditorBlockTypeResolve,
// } from 'react-cms/src/app/components/ORM/Comment';


// export const EditorEntityCompanyType = new GraphQLObjectType({
// 	name: "EditorEntityCompanyType",
// 	description: "Компания",
// 	fields: () => ({
// 		mutability: {
// 			type: GraphQLJSON,
// 		},
// 		type: {
// 			type: GraphQLJSON,
// 		},
// 		data: {
// 			type: EditorStateEntityDataType,
// 		},
// 	}),
// });


// export const editorBlockTypeResolve = (data) => {

// 	const {
// 		type,
// 	} = data;

// 	// console.log("editorBlockTypeResolve data", data);

// 	switch(type){
		
// 		// case "GALLERY":

// 		// 	return EditorEntityGalleryType;
// 		// 	break;
		
// 		// case "LINK":

// 		// 	return EditorEntityLinkType;
// 		// 	break;
		
// 		case "COMPANY":

// 			return EditorEntityCompanyType;
// 			break;
		
// 		// case "IMAGE":

// 		// 	return EditorEntityImageType;
// 		// 	break;

// 		default: return ReactCrmEditorBlockTypeResolve(data);
// 	}

// }


// EditorEntityTypes.push(EditorEntityCompanyType);


// export const EditorEntityType = new GraphQLUnionType({
// 	name: "EditorEntityType",
// 	types: EditorEntityTypes,
// 	resolveType: editorBlockTypeResolve,
// });

// export const CommentEditorStateType = new GraphQLObjectType({
// 	name: "EditorStateType",
// 	description: "Состояние редактора",
// 	fields: {
// 		blocks: {
// 			type: new GraphQLList(EditorStateBlockType),
// 		},
// 		entityMap: {
// 			// type: new GraphQLList(EditorEntityGalleryType),
// 			type: new GraphQLList(EditorEntityType),
// 			// type: EditorEntityType,
// 			// resolve: source => {

// 			// 	// console.log("CommentEditorStateType", source && source.entityMap);

// 			// 	return source && source.entityMap || null;

// 			// }
// 		},
// 	},
// });
