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
  RatingType,
} from 'modules/Site/components/ORM/Rating';

import {
	getList as getRatingsList,
} from './Rating';

// const rootResolver = async (source, args, context, info) => {



//     let result;

//     // console.log('fieldResolver source', source);
//     // console.log('fieldResolver args', args);
//     // console.log('fieldResolver info', info);

//     // console.log('fieldResolver context', context);

//     const {
//       fieldName,
//       operation,
//       returnType,
//     } = info;

//     if(source){

//       if(typeof source.fieldResolver === 'function'){
        
//         // console.log('fieldResolver source', source);
        
//         result = source.fieldResolver(source, args, context, info);
//       }

//       else result = source[fieldName];

//     }

//     if(!result){

//       // Резолвим по типу объекта

//       if(returnType instanceof ObjectsListType){
    
//         console.log('fieldResolver returnType instanceof', source, info);

//         const {
//           name: returnTypeName,
//         } = returnType;

//         const {
//           id,
//         } = args;

// 	      const {
// 	      	_fields: {
// 	      		object: objectField,
// 	      	},
// 	      } = returnType;

// 	      let object;


// 	      if(objectField && objectField.type){

// 	      	const {
// 	      		type: objectType,
// 	      		type: {
// 	      			ofType,
// 	      		},
// 	      	} = objectField;


// 	        console.log("fieldResolver returnType instanceof ofType 2", ofType);

//           await getObjectsList(ofType, source, args, context, info)
//             .then(r => {
//               result = r;
//             })

// 	       //  if(ofType === CompanyType){

// 		      //   const {
// 		      //     name: returnTypeName,
// 		      //   } = returnType;

// 		      //   const {
// 		      //     id,
// 		      //   } = args;

// 		      //   console.log("returnTypeName CompanyType", source);

// 		      //   await getObjectsList(ofType, source, args, context, info)
// 		      //   	.then(r => {
// 		      //   		result = r;
// 		      //   	})

// 		      // }

// 	      }

// 	      // if(returnType instanceof GraphQLList){
    
//        //  	console.log('fieldResolver returnType instanceof 2', source, info);

// 	      //   const {
// 	      //     ofType,
// 	      //   } = returnType;

// 	      //   const {
// 	      //     id,
// 	      //   } = args;


// 	      //   console.log("ofType", ofType);

//        //    await getObjectsList(ofType, source, args, context, info)
//        //      .then(r => {
//        //        result = r;
//        //      })

// 	      // }

//       }

//       else if(returnType instanceof CompanyType.constructor){

//         const {
//           name: returnTypeName,
//         } = returnType;

//         const {
//           id,
//         } = args;

//         console.log("returnTypeName CompanyType", returnTypeName);

//       }

//     }

//     if(operation && operation.name){

//       switch(operation.name.value){

//         case "PlaceContactUpdateCoords":


//           if(result && (result instanceof PlaceContact)){

//             const {
//               lat,
//               lng,
//             } = args;

//             result.update({
//               lat,
//               lng,
//             });

//           }

//           break;

//       }

//     }


//     return result;

// }

const rootResolver = async (source, args, context, info) => {



    let result;

    // console.log('fieldResolver source', source);
    // console.log('fieldResolver args', args);
    // console.log('fieldResolver info', info);

    // console.log('fieldResolver context', context);

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

    if(!result){

      // Резолвим по типу объекта

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

      }

    }

    if(operation && operation.name){

      switch(operation.name.value){

        case "PlaceContactUpdateCoords":


          if(result && (result instanceof PlaceContact)){

            const {
              lat,
              lng,
            } = args;

            result.update({
              lat,
              lng,
            });

          }

          break;

      }

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

  // return {
  // 	count: 0,
  // 	total: object && object.length || 0,
  // 	limit: 0,
  // 	page: 0,
  // 	object: object,
  // };

  return object;
}

const getObjects = async (ofType, source, args, context, info) => {

  let result;

  await getObjectsList(ofType, source, args, context, info)
    .then(r => {
      result = r;
    });
    
  result = result && result.object;

  return result;

}

const getObject = async (ofType, source, args, context, info) => {

  let result;

  const {
    id,
  } = args;

  await getObjects(ofType, source, args, context, info)
    .then(r => {
      
      // console.log("ofType Company result", r);
      // console.log("ofType Company result", id, r.find(n => n.id == id));

      result = r;
    });
    
  result = result && result.find(n => parseInt(n.id) === id);

  return result;
}

export default rootResolver;