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
  add as addCompany,
  addGalleryImage as companyAddGalleryImage,
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
	add as addComment,
} from './Comment';


import {
  ResourceType,
  getList as getResourcesList,
	add as addTopic,
} from './Resource';

import {
  SearchResultType,
  getList as getSearchResultsList,
} from './Search';

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

//     // const {
//     //   ofType,
//     // } = returnType;

//     if(source){

//       // if(typeof source.fieldResolver === 'function'){
        
//       //   // console.log('fieldResolver source', source);
        
//       //   result = source.fieldResolver(source, args, context, info);
//       // }

//       // else result = source[fieldName];

//       result = source[fieldName];
//     }

//     if(result === undefined){

//       // Резолвим по типу объекта

//       const {
//         returnType,
//       } = info;

//       const {
//         name: returnTypeName,
//       } = returnType;



//       if(returnType instanceof ObjectsListType){
        
//         const {
//           _fields: {
//             object: objectField,
//           },
//         } = returnType;

//         if(objectField && objectField.type){

//           const {
//             type: objectType,
//           } = objectField;

//           const {
//             ofType,
//           } = objectType || {};
 
//           return getObjectsList(ofType, source, args, context, info)
//             // .then(r => {
//             //   result = r;
//             // })
//         }


//       }

//       else if(returnType instanceof GraphQLList){

//         const {
//           ofType,
//         } = returnType;
//         // const {
//         //   id,
//         // } = args;

//         return getObjects(ofType, source, args, context, info)
//           // .then(r => {
//           //   result = r;
//           // })

//       }

//       else if(returnType instanceof GraphQLObjectType){

//         // console.log('CompanyType.constructor', CompanyType);

//        //  const {
//        //    name: returnTypeName,
//        //  } = returnType;

//        //  const {
//        //    id,
//        //  } = args;

//         return getObject(returnType, source, args, context, info)
//           // .then(r => {
//           //   result = r;
//           // })

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

// export const ObjectsListResolver = (resolver, object, args, context, info) => {

//   return new Promise((resolve, reject) => {

//     if(!resolver){
//       // console.error("resolver is undefined", info);
//       return reject("resolver is undefined");
//     }

//   	// console.log('storeResolver ObjectsListResolver args', args);

//     resolver(object, args, context, info)
//       .then(state => {


//         // console.log("ObjectsListResolver state", state);

//         let {
//           ids,
//           parent,
//           offset,
//           limit,
//           sort,
//           page,
//         } = args; 

//         page = page || 1;

//         const total = state.size;

//         state = storeResolver(state, args, context, info);

        

//         return resolve({
//           success: true,
//           message: '',
//           count: state.size,
//           total,
//           limit,
//           page,
//           object: state,
//         });

//       })
//       .catch(e => {
//         reject(e);

//         console.error("ObjectsListResolver catch", e);

//       });

//   });
// }

// export const sortBy = function(state, by, dir){
  
//   dir = dir || 'asc';

//   return state.sortBy(by, (a, b) => {

//     a = a && a.toLocaleUpperCase && a.toLocaleUpperCase() || a;
//     b = b && b.toLocaleUpperCase && b.toLocaleUpperCase() || b;

//     if(dir == 'asc'){
//       if ( a > b ) return 1;
//       if (a < b ) return -1;
//       return 0;
//     }
//     else{
//       if ( a < b ) return 1;
//       if (a > b ) return -1;
//       return 0;
//     }

//   });
// }

// export const storeResolver = function(state, args, context, info){

//   let {
//     id,
//     ids,
//     parent,
//     offset,
//     limit,
//     sort,
//     page,
//   } = args;

//   page = page || 1;

//   // console.log('storeResolver args', args);

//   if(id){

//     state = state.filter(n => n.id === id);

//   }

//   if(ids){

//     state = state.filter(n => ids.indexOf(n.id) !== -1);

//   }

//   if(parent){

//     state = state.filter(n => n.parent === parent);

//   }

//   if(sort){

//     sort.map(rule => {

//       const {
//         by,
//         dir,
//       } = rule;

//       if(!by){
//         return;
//       }

//       let sortByRules;

//       switch(by){

//         case 'id':

//           sortByRules = n => n.id;

//           break;

//         case 'rand()':

//           sortByRules = n => Math.random();

//           break;
//       }

//       if(sortByRules){

//         state = sortBy(state, sortByRules, dir);

//       };

//     });

//   }

//   if(offset){
//     state = state.skip(offset);
//   }

//   if(limit){

//     if(page > 1){
//       state = state.skip(limit * (page - 1));
//     }

//     state = state.take(limit);
//   }

//   return state;
// }


// const getObjectsList = async (ofType, source, args, context, info) => {

// 	let result;

// 	// Поулчаем список компаний
// 	if(ofType === CompanyType){

//     await ObjectsListResolver(getCompanyList, source, args, context, info)
//     	.then(r => {
//     		result = r;
//     	});
    	
//   }

//   // Получаем список рейтингов
// 	else if(ofType === RatingType){

//     await ObjectsListResolver(getRatingsList, source, args, context, info)
//     	.then(r => {
//     		result = r;
//     	});

//   }

//   // Получаем список пользователей
// 	else if(ofType === UserType){

  

//     await ObjectsListResolver(getUsersList, source, args, context, info)
//     	.then(r => {
  			
//   			// console.log("ofType2 UserType", args, r);

//     		result = r;
//     	});

//   }

//   // Получаем список пользователей
// 	else if(ofType === CommentType){
  
//   	// console.log("ofType2", ofType);


//     await ObjectsListResolver(getCommentsList, source, args, context, info)
//     	.then(r => {
//     		result = r;
//     	});

//   }

//   // Получаем список пользователей
// 	else if(ofType === ResourceType){
  
//   	// console.log("ofType2", ofType);


//     await ObjectsListResolver(getResourcesList, source, args, context, info)
//     	.then(r => {
//     		result = r;
//     	});

//   }


//   return result;

// }

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
    
//   result = result && result.find(n => n.id === id);

//   return result;
// }


const rootResolver = (source, args, context, info) => {

  // Object.assign(info, {
  //   rootResolver,
  // });

  let result;

  // console.log('fieldResolver source', source);
  // console.log('fieldResolver args', args);
  // console.log('fieldResolver info', info);

  // console.log('fieldResolver context', context);

  let {
    fieldName,
    returnType,
    operation,
  } = info;

  // Если это не корневой вызов, сбрасываем операцию, чтобы сквозной вызов не выполнялся
  if(source){
    operation = undefined;
  }


  if(operation && operation.name){

    switch(operation.name.value){

      case "addCompany":

        if(returnType === CompanyType){

          // console.log("rootResolver addCompany info", info);

          return addCompany(source, args, context, info); 
          
        }

        break;

      case "addCompanyGalleryImage":

        if(returnType === CompanyType){

          // console.log("rootResolver addCompany info", info);

          return companyAddGalleryImage(source, args, context, info); 
          
        }

        break;

      case "addTopic":

        if(returnType === ResourceType){

          // console.log("rootResolver addCompany info", info);

          return addTopic(source, args, context, info); 
          
        }

        break;

      case "addComment":

        if(returnType === CommentType){

          // console.log("rootResolver addCompany info", info);

          return addComment(source, args, context, info); 
          
        }

        break;
    }
  }


  // const {
  //   ofType,
  // } = returnType;

  if(source){

    // if(typeof source.fieldResolver === 'function'){
      
    //   // console.log('fieldResolver source', source);
      
    //   result = source.fieldResolver(source, args, context, info);
    // }

    // else result = source[fieldName];

    result = source[fieldName];
  }

  if(result === undefined){

    // Резолвим по типу объекта

    // const {
    //   returnType,
    // } = info;

    const {
      name: returnTypeName,
    } = returnType;



    if(returnType instanceof ObjectsListType){
      
      // console.log('ObjectsListType', returnType);

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

        if(getResolverByType(ofType)){

          return getObjectsList(ofType, source, args, context, info);

        }

          // .then(r => {
          //   result = r;
          // })
      }


    }

    else if(returnType instanceof GraphQLList){
      
      // console.log('GraphQLList', returnType);

      const {
        ofType,
      } = returnType;
      // const {
      //   id,
      // } = args;



      // Получаем список контактов
      // if((ofType === ContactType)

      // // Получаем список заведений
      // ||(ofType === PlaceType)

      // // Получаем список услуг
      // ||(ofType === ServiceType)

      // // Получаем список связок место-контакт
      // ||(ofType === PlaceContactType)

      // // Получаем список связок место-услуга
      // ||(ofType === PlaceServiceType)

      // // Получаем список связок контакт-услуга
      // ||(ofType === ContactServiceType)

      // // Получаем список типов мест
      // ||(ofType === PlaceTypeType)
      // )

      if(getResolverByType(ofType)){

        return getObjects(ofType, source, args, context, info);

      }

        // .then(r => {
        //   result = r;
        // })

    }

    else if(returnType instanceof GraphQLObjectType){
      
      // console.log('GraphQLObjectType', returnType);
      // console.log('GraphQLObjectType args', args);

      // console.log('CompanyType.constructor', CompanyType);

     //  const {
     //    name: returnTypeName,
     //  } = returnType;

     //  const {
     //    id,
     //  } = args;




      // Получаем список контактов
      // if((returnType === ContactType)

      // // Получаем список заведений
      // ||(returnType === PlaceType)

      // // Получаем список услуг
      // ||(returnType === ServiceType)

      // // Получаем список связок место-контакт
      // ||(returnType === PlaceContactType)

      // // Получаем список связок место-услуга
      // ||(returnType === PlaceServiceType)

      // // Получаем список связок контакт-услуга
      // ||(returnType === ContactServiceType)

      // // Получаем список типов мест
      // ||(returnType === PlaceTypeType)
      // )

      if(getResolverByType(returnType)){

        // return new Promise((resolve, reject) => {

        //   objectResolver(returnType, source, args, context, info)
        //   .then(r => {

        //     resolve(r);

        //   })
        //   .catch(e => reject(e));

        // });

        return objectResolver(returnType, source, args, context, info);

      }        

    }

  }


  return result;

}

const objectResolver = (returnType, source, args, context, info) => {

  let {
    fieldName,
    operation,
  } = info;


  // Если это не корневой вызов, сбрасываем операцию, чтобы сквозной вызов не выполнялся
  if(source){
    operation = undefined;
  }

  // console.log("await getObject object", result);

  let result = getObject(returnType, source, args, context, info);
  // .then(r => {
  //   result = r;

  //   // console.log('GraphQLObjectType result', result);

  // })

  // console.log("await getObject object 2", result);

  if(operation && operation.name){

    switch(operation.name.value){

      // case "ContactUpdateWorktime":

      //   // console.log("ContactUpdateWorktime object", result);

      //   if(result && (result instanceof Contact)){

      //     return result.updateWorktime(source, args, context, info);

      //   }

      //   break;

      // case "contactSetParent":

      //   // console.log("contactSetParent object", result);

      //   if(result && (result instanceof Contact)){

      //     return result.contactSetParent(source, args, context, info)
      //       // .catch(e => {
      //       //   throw(new Error(e));
      //       // });

      //   }

      //   break;

      // case "PlaceContactUpdateCoords":


      //   if(result && (result instanceof PlaceContact)){

      //     // console.log("PlaceContactUpdateCoords Object result", result);

      //     const {
      //       lat,
      //       lng,
      //     } = args;

      //     // Object.assign(result, {
      //     //   lat,
      //     //   lng,
      //     // });
      //     let coords;

      //     if(lat && lng){
      //       coords = {
      //         lat,
      //         lng,
      //       };
      //     }

      //     return result.update({
      //       lat,
      //       lng,
      //       coords,
      //     });

      //   }

      //   break;
    }

  }

  return result;

}

export const ObjectsListResolver = (resolver, object, args, context, info) => {

  // return new Promise((resolve, reject) => {

    if(!resolver){
      console.error("resolver is undefined", info);
      // return reject("resolver is undefined");
      throw(new Error("resolver is undefined"));
    }

    // console.log('storeResolver ObjectsListResolver args', args);

    let state = resolver(object, args, context, info)
      // .then(state => {


        // console.log("ObjectsListResolver state", state);
    if(state){
      
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

      

      return state && {
        success: true,
        message: '',
        count: state.size,
        total,
        limit,
        page,
        object: state,
      } || null;

    }

    return state;

      // })
      // .catch(e => {
      //   reject(e);

      //   console.error("ObjectsListResolver catch", e);

      // });

  // });
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

  // console.log('storeResolver state', state);

  if(state){

    if(state instanceof Promise){

      

      return new Promise((resolve, reject) => {

        state.then(r => {
          // console.log("sdfsdfsdf", r);

          if(r){

            r = processState(r, args, context, info);

          }

          resolve(r);
        })
        .catch(e => reject(e));

      });

      // return async () => {

      //   // state

      //   // state = processState(state, args, context, info);

      //   state.then(r => {
      //     console.log("sdfsdfsdf", r);
      //   });

      //   return [{}];
      // }

      // console.log();
      
    }
    else{

      state = processState(state, args, context, info);
    }

    
  }

  return state;
}


const processState = function(state, args, context, info){

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


const getResolverByType = function(ofType){

  let resolver;

  if(ofType === CompanyType){

    resolver = getCompanyList;
      
  }

  // Получаем список рейтингов
  else if(ofType === RatingType){

    resolver = getRatingsList;
      
  }

  // Получаем список пользователей
  else if(ofType === UserType){

    resolver = getUsersList;
      
  }

  // Получаем список пользователей
  else if(ofType === CommentType){

    resolver = getCommentsList;
      
  }

  // Получаем список документов
  else if(ofType === ResourceType){

    resolver = getResourcesList;
      
  }

  // Получаем результаты поиска
  else if(ofType === SearchResultType){

    resolver = getSearchResultsList;
      
  }


  return resolver;

}

const getObjectsList = (ofType, source, args, context, info) => {

  let result;

  let {
    fieldName,
  } = info;

  const resolver = getResolverByType(ofType);

  if(resolver){

    return ObjectsListResolver(resolver, source, args, context, info)
      // .then(r => {

      //   // console.log('getObjectsList ContactType', args, result);

      //   result = r;

      // })
      // .catch(e => {
      //   console.error(e);
      // });
  }

  // Получаем список контактов
  // if(ofType === ContactType){

  //   await ObjectsListResolver(getContactsList, source, args, context, info)
  //     .then(r => {

  //       // console.log('getObjectsList ContactType', args, result);

  //       result = r;

  //     })
  //     .catch(e => {
  //       console.error(e);
  //     });
      
  // }

  // // Получаем список заведений
  // else if(ofType === PlaceType){

  //   await ObjectsListResolver(getPlacesList, source, args, context, info)
  //     .then(r => {

  //       result = r;

  //     })
  //     .catch(e => {
  //       console.error(e);
  //     });
      
  // }

  // // Получаем список услуг
  // else if(ofType === ServiceType){

  //   await ObjectsListResolver(getServicesList, source, args, context, info)
  //     .then(r => {

  //       result = r;

  //     })
  //     .catch(e => {
  //       console.error(e);
  //     });
      
  // }

  // // Получаем список связок место-контакт
  // else if(ofType === PlaceContactType){

  //   await ObjectsListResolver(getPlacesContactsList, source, args, context, info)
  //     .then(r => {

  //       result = r;

  //     })
  //     .catch(e => {
  //       console.error(e);
  //     });
      
  // }

  // // Получаем список связок место-услуга
  // else if(ofType === PlaceServiceType){

  //   await ObjectsListResolver(getPlacesServicesList, source, args, context, info)
  //     .then(r => {

  //       result = r;

  //     })
  //     .catch(e => {
  //       console.error(e);
  //     });
      
  // }

  // // Получаем список связок контакт-услуга
  // else if(ofType === ContactServiceType){

  //   await ObjectsListResolver(getContactsServicesList, source, args, context, info)
  //     .then(r => {

  //       result = r;

  //     })
  //     .catch(e => {
  //       console.error(e);
  //     });
      
  // }

  // // Получаем список типов мест
  // else if(ofType === PlaceTypeType){

  //   await ObjectsListResolver(getPlaceTypesList, source, args, context, info)
  //     .then(r => {

  //       result = r;

  //    })
  //     .catch(e => {
  //       console.error(e);
  //     });
      
  // }
  // else{

  //   result = source && source[fieldName];

  //   result = {
  //     object: result && (Array.isArray(result) ? result : List([result])) || null,
  //   }
  // }


  // return result;

}

const getObjects = (ofType, source, args, context, info) => {

  let result;

  // console.log('getObjects', ofType);

  result = getObjectsList(ofType, source, args, context, info)
    // .then(r => {
    //   result = r;
    // });
    
  result = result && result.object;

  return result;

}

const getObject = (ofType, source, args, context, info) => {

  let state;

  const {
    id,
    parent,
  } = args;

  // console.log('getObject', ofType);

  state = getObjects(ofType, source, args, context, info)
    // .then(r => {
      
    //   // console.log("ofType Company result", r);
    //   // console.log("ofType Company result", id, r.find(n => n.id == id));

    //   state = r;
    // });

  if(state){

    if(id !== undefined){
    
      state = state.filter(n => n.id === id);

    }

    if(parent !== undefined){
      
      state = state.filter(n => n.parent === parent);

    }
    
    state = state && state.get(0);
    
  }

  return state;
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