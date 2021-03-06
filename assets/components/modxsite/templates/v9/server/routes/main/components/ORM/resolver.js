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

import {
	listField,
	ObjectsListType,
} from 'modules/Site/components/ORM/fields';


import {
  Company,
  CompanyType,
} from 'modules/Site/components/ORM/Company';

import {
  getList as getCompanyList,
} from './Company';


import {
	ResourceType,
} from 'modules/Site/components/ORM/Resource';

import {
  getList as getResourcesList,
} from './Resource';


import {
  RatingType,
} from 'modules/Site/components/ORM/Rating';

import {
  getList as getRatingsList,
} from './Rating';


import {
  UserType,
} from 'modules/Site/components/ORM/User';

import {
  getList as getUsersList,
} from './User';


import {
  CommentType,
} from 'modules/Site/components/ORM/Comment';

import {
	getList as getCommentsList,
} from './Comment';


import WsConnectionType, {
} from 'modules/Site/components/ORM/WsConnection';

import {
  getList as getWsConnectionsList,
} from './WsConnection';


import WsMessageType, {
} from 'modules/Site/components/ORM/WsMessage';


import RedirectType, {
} from 'modules/Site/components/ORM/Redirect';

import {
  getList as getRedirects,
} from './Redirect';


import {
  SearchStatType,
} from 'modules/Site/components/ORM/SearchStat';

import {
  create as createSearchStat,
} from './SearchStat';


import EditVersionType from 'modules/Site/components/ORM/EditVersion';

import {
  getList as getEditVersionList,
  create as createEditVersion,
} from './EditVersion';


const rootResolver = (source, args, context, info) => {



    let result;


    const {
      fieldName,
      operation,
      returnType,
    } = info;

    // const {
    //   ofType,
    // } = returnType;

    if(source){

      if(typeof source.fieldResolver === 'function'){
        
        // console.log('fieldResolver source', source);
        
        result = source.fieldResolver(source, args, context, info);
      }

      else result = source[fieldName];

    }

    if(result === undefined){

      // Резолвим по типу объекта

      return new Promise( async (resolve, reject) => {



        const {
          returnType,
        } = info;

        const {
          name: returnTypeName,
        } = returnType;



        if(returnType instanceof ObjectsListType){
          
          const {
            _fields: {
              object: objectField,
            },
          } = returnType;

          if(objectField && objectField.type){

            const {
              type: objectType,
            } = objectField;

            const {
              ofType,
            } = objectType || {};
   
            await getObjectsList(ofType, source, args, context, info)
              .then(r => {
                result = r;
              })
              .catch(e => reject(e))
          }


        }

        else if(returnType instanceof GraphQLList){

          const {
            ofType,
          } = returnType;
          // const {
          //   id,
          // } = args;

          await getObjects(ofType, source, args, context, info)
            .then(r => {
              result = r;
            })
            .catch(e => reject(e))

        }

        else if(returnType instanceof GraphQLObjectType){

          // console.log('CompanyType.constructor', CompanyType);

         //  const {
         //    name: returnTypeName,
         //  } = returnType;

         //  const {
         //    id,
         //  } = args;

          await getObject(returnType, source, args, context, info)
            .then(r => {
              result = r;
            })
            .catch(e => reject(e))

        }

        if(operation && operation.name){

          // console.log("operation.name", operation.name, returnType);

          switch(operation.name.value){

            case "clearCache":

              // console.log("clearCache");

              const {
                scope,
              } = context;

              result = await scope.clearCache();

              // if(result && (result instanceof PlaceContact)){

              //   const {
              //     lat,
              //     lng,
              //   } = args;

              //   result.update({
              //     lat,
              //     lng,
              //   });

              // }

              break;

            // case "PlaceContactUpdateCoords":


            //   if(result && (result instanceof PlaceContact)){

            //     const {
            //       lat,
            //       lng,
            //     } = args;

            //     result = result.update({
            //       lat,
            //       lng,
            //     });

            //   }

            //   break;

            // Сохранение поискового запроса
            case "saveSearchStat":

              if(returnType === SearchStatType){

                result = await createSearchStat(null, args, context, info);

              }

              break;

            // Сохранение поискового запроса
            case "updateCompany":

              if(returnType === EditVersionType){

                // console.log("EditVersionType create args", args);

                result = createEditVersion(null, args, context, info);

              }

              break;

          }

        }


        resolve(result);

      });

    }

    return result;

}

const getObjectsList = async (ofType, source, args, context, info) => {

	let object;

  // console.log("ofType", ofType);

  if(ofType === CompanyType){
  
    // console.log("ofType Company", ofType);

    await getCompanyList(source, args, context, info)
      .then(r => {
        object = r;
      });

  }

  if(ofType === ResourceType){
  
    // console.log("ofType Company", ofType);

    await getResourcesList(source, args, context, info)
    	.then(r => {
    		object = r;
    	});

  }

  else if(ofType === RatingType){

    // console.log("ofType 2", ofType);

    await getRatingsList(source, args, context, info)
      .then(r => {
        object = r;
      })
      .catch(e => {
        console.error(e);
      });

  }

  else if(ofType === UserType){

    // console.log("ofType 2", ofType);

    await getUsersList(source, args, context, info)
      .then(r => {
        object = r;
      })
      .catch(e => {
        console.error(e);
      });

  }

  else if(ofType === CommentType){

    // console.log("ofType 2", ofType);

    await getCommentsList(source, args, context, info)
      .then(r => {
        object = r;
      })
      .catch(e => {
        console.error(e);
      });

  }


  if(ofType === WsConnectionType){

    await getWsConnectionsList(source, args, context, info)
      .then(r => {

        object = r;

        // console.log('getWsConnectionsList resolver result', r);

      })
      .catch(e => {
        console.error(e);
      });
      
  }


  if(ofType === RedirectType){

    await getRedirects(source, args, context, info)
      .then(r => {

        object = r;

        // console.log('getWsConnectionsList resolver result', r);

      })
      .catch(e => {
        console.error(e);
      });
      
  }


  if(ofType === EditVersionType){

    await getEditVersionList(source, args, context, info)
      .then(r => {

        object = r;

        // console.log('getWsConnectionsList resolver result', r);

      })
      .catch(e => {
        console.error(e);
      });
      
  }

  // return {
  // 	count: 0,
  // 	total: object && object.length || 0,
  // 	limit: 0,
  // 	page: 0,
  // 	object: object,
  // };

  return object;
}

// const getObjects = async (ofType, source, args, context, info) => {

//   let result;

//   await getObjectsList(ofType, source, args, context, info)
//     .then(r => {
//       result = r;
//     });
    
//   result = result && result.object;

//   return result;

// }

// const getObject = async (ofType, source, args, context, info) => {

//   let result;

//   const {
//     id,
//   } = args;

//   await getObjects(ofType, source, args, context, info)
//     .then(r => {
      
//       // console.log("ofType Company result", r);
//       // console.log("ofType Company result", id, r.find(n => n.id == id));

//       result = r;
//     });
    
//   result = result && result.find(n => parseInt(n.id) === id);

//   return result;
// }



const getObjects = async (ofType, source, args, context, info) => {

  let result;

  // console.log('getObjects', ofType);

  await getObjectsList(ofType, source, args, context, info)
    .then(r => {
      result = r;
    });
    
  result = result && result.object;

  return result;

}

const getObject = async (ofType, source, args, context, info) => {

  let state;

  const {
    id,
    parent,
  } = args;

  // // console.log('getObject', ofType);

  await getObjects(ofType, source, args, context, info)
    .then(r => {
      
      // // console.log("ofType Company result", r);
      // // console.log("ofType Company result", id, r.find(n => n.id == id));

      state = r;
    });

  // if(state){

  //   if(id !== undefined){
    
  //     state = state.filter(n => n.id === id);

  //   }

  //   if(parent !== undefined){
      
  //     state = state.filter(n => n.parent === parent);

  //   }
    
  //   // state = state && state.get(0);
  //   state = state && state.get(0);
    
  // }

  return state && state[0];
}
 

export default rootResolver;