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
} from './fields';


import {
	CompanyType,
	getList as getCompanyList,
} from './Company';

import {
	RatingType,
	getList as getRatingsList,
} from './Rating';

import {
	UserType,
	getList as getUsersList,
} from './User';


import {
  CommentType,
	getList as getCommentsList,
} from './Comment';


import {
  ResourceType,
	getList as getResourcesList,
} from './Resource';



// const rootResolver = async (source, args, context, info) => {



//     let result;

//     // console.log('fieldResolver source', source);
//     // console.log('fieldResolver args', args);
//     console.log('fieldResolver info', info);

//     // console.log('fieldResolver context', context);

//     const {
//       fieldName,
//       operation,
//       returnType,
//     } = info;

//     // const {
//     //   ofType,
//     // } = returnType;

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

//         await getObjectsList(source, args, context, info)
//         	.then(r => {
//         		result = r;
//         	})

//       }

//       else if(returnType instanceof GraphQLList){

//         // const {
//         //   id,
//         // } = args;

//         await getObjects(source, args, context, info)
//         	.then(r => {
//         		result = r;
//         	})

//       }

//       else if(returnType instanceof CompanyType.constructor){

//       	// console.log('CompanyType.constructor', CompanyType);

//        //  const {
//        //    name: returnTypeName,
//        //  } = returnType;

//        //  const {
//        //    id,
//        //  } = args;

//         await getObject(source, args, context, info)
//         	.then(r => {
//         		result = r;
//         	})

//       }

//     }

//     if(operation && operation.name){

// 	    switch(operation.name.value){

// 	      case "PlaceContactUpdateCoords":


// 	        if(result && (result instanceof PlaceContact)){

// 	          const {
// 	            lat,
// 	            lng,
// 	          } = args;

// 	          result.update({
// 	            lat,
// 	            lng,
// 	          });

// 	        }

// 	        break;

// 	    }

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

export const ObjectsListResolver = (resolver, object, args, context, info) => {

  return new Promise((resolve, reject) => {

    if(!resolver){
      // console.error("resolver is undefined", info);
      return reject("resolver is undefined");
    }

  	// console.log('storeResolver ObjectsListResolver args', args);

    resolver(object, args, context, info)
      .then(state => {


        // console.log("ObjectsListResolver state", state);

        let {
          ids,
          parent,
          offset,
          limit,
          sort,
          page,
        } = args; 

        page = page || 1;

        const total = state.size;

        state = storeResolver(state, args, context, info);

        

        return resolve({
          success: true,
          message: '',
          count: state.size,
          total,
          limit,
          page,
          object: state,
        });

      })
      .catch(e => {
        reject(e);

        console.error("ObjectsListResolver catch", e);

      });

  });
}

export const sortBy = function(state, by, dir){
  
  dir = dir || 'asc';

  return state.sortBy(by, (a, b) => {

    a = a && a.toLocaleUpperCase && a.toLocaleUpperCase() || a;
    b = b && b.toLocaleUpperCase && b.toLocaleUpperCase() || b;

    if(dir == 'asc'){
      if ( a > b ) return 1;
      if (a < b ) return -1;
      return 0;
    }
    else{
      if ( a < b ) return 1;
      if (a > b ) return -1;
      return 0;
    }

  });
}

export const storeResolver = function(state, args, context, info){

  let {
    id,
    ids,
    parent,
    offset,
    limit,
    sort,
    page,
  } = args;

  page = page || 1;

  // console.log('storeResolver args', args);

  if(id){

    state = state.filter(n => n.id === id);

  }

  if(ids){

    state = state.filter(n => ids.indexOf(n.id) !== -1);

  }

  if(parent){

    state = state.filter(n => n.parent === parent);

  }

  if(sort){

    sort.map(rule => {

      const {
        by,
        dir,
      } = rule;

      if(!by){
        return;
      }

      let sortByRules;

      switch(by){

        case 'id':

          sortByRules = n => n.id;

          break;

        case 'rand()':

          sortByRules = n => Math.random();

          break;
      }

      if(sortByRules){

        state = sortBy(state, sortByRules, dir);

      };

    });

  }

  if(offset){
    state = state.skip(offset);
  }

  if(limit){

    if(page > 1){
      state = state.skip(limit * (page - 1));
    }

    state = state.take(limit);
  }

  return state;
}


const getObjectsList = async (ofType, source, args, context, info) => {

	let result;

	// Поулчаем список компаний
	if(ofType === CompanyType){

    await ObjectsListResolver(getCompanyList, source, args, context, info)
    	.then(r => {
    		result = r;
    	});
    	
  }

  // Получаем список рейтингов
	else if(ofType === RatingType){

    await ObjectsListResolver(getRatingsList, source, args, context, info)
    	.then(r => {
    		result = r;
    	});

  }

  // Получаем список пользователей
	else if(ofType === UserType){

  

    await ObjectsListResolver(getUsersList, source, args, context, info)
    	.then(r => {
  			
  			// console.log("ofType2 UserType", args, r);

    		result = r;
    	});

  }

  // Получаем список пользователей
	else if(ofType === CommentType){
  
  	// console.log("ofType2", ofType);


    await ObjectsListResolver(getCommentsList, source, args, context, info)
    	.then(r => {
    		result = r;
    	});

  }

  // Получаем список пользователей
	else if(ofType === ResourceType){
  
  	// console.log("ofType2", ofType);


    await ObjectsListResolver(getResourcesList, source, args, context, info)
    	.then(r => {
    		result = r;
    	});

  }


  return result;

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
    
  result = result && result.find(n => n.id === id);

  return result;
}

// const getObjects = async (source, args, context, info) => {

// 	let result;

//   const {
//   	returnType,
//   } = info;

//   const {
//     name: returnTypeName,
//   } = returnType;

//   // const {
//   // 	_fields: {
//   // 		object: objectField,
//   // 	},
//   // } = returnType;


// 	const {
// 		ofType,
// 	} = returnType;

//   // if(objectField && objectField.type){



// 		// Получаем список компаний
// 		if(ofType === CompanyType){
  		
//   		// console.log("CompanyType list source", source);
//   		// console.log("CompanyType list info", info);
//   		// console.log("CompanyType list args", args);

// 	    await ObjectsListResolver(getCompanyList, source, args, context, info)
// 	    	.then(r => {
// 	    		result = r;
// 	    	});
// 	  }

// 	  // Получаем список рейтингов
// 		else if(ofType === RatingType){
	  
// 	  	console.log("ofType2", ofType);


// 	    await ObjectsListResolver(getRatingsList, source, args, context, info)
// 	    	.then(r => {
// 	    		result = r;
// 	    	});

// 	  }
		
// 		result = result && result.object;

//   // }


//   return result;

// }

// const getObject = async (source, args, context, info) => {

// 	let result;

//   const {
//   	returnType,
//   } = info;

//   const {
//     name: returnTypeName,
//   } = returnType;

//   // const {
//   // 	_fields: {
//   // 		object: objectField,
//   // 	},
//   // } = returnType;

// 	const {
// 		id,
// 	} = args;

// 	if(!id){
// 		throw new Error("Не указан ID объекта", returnType);
// 	}


//   // if(objectField && objectField.type){

// 	// Получаем список компаний
// 	if(returnType === CompanyType){
		
// 		// console.log("CompanyType list source", source);
// 		// console.log("CompanyType list info", info);
// 		// console.log("CompanyType list args", args);

//     await ObjectsListResolver(getCompanyList, source, args, context, info)
//     	.then(r => {
// 				// console.log("CompanyType result", r);	
//     		result = r;
//     	});
//   }

//   // Получаем список рейтингов
// 	else if(returnType === RatingType){
  
//   	// console.log("ofType2", ofType);


//     await ObjectsListResolver(getRatingsList, source, args, context, info)
//     	.then(r => {
//     		result = r;
//     	});

//   }
	
// 	result = result && result.object && result.object.find(n => n.id === id);

//   // }


//   return result;

// }

export default rootResolver;