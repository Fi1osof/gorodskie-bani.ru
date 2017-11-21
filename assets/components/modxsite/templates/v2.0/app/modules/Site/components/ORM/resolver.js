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


import EditVersionType, {
  getList as getEditVersionsList,
} from './EditVersion';


const rootResolver = function(source, args, context, info){

  let result;

  // console.log('fieldResolver source', source);
  // console.log('fieldResolver args', args);
  // console.log('fieldResolver info', info);


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

          return addCompany(source, args, context, info); 
          
        }

        break;

      case "addCompanyGalleryImage":

        if(returnType === CompanyType){

          return companyAddGalleryImage(source, args, context, info); 
          
        }

        break;

      case "addTopic":

        if(returnType === ResourceType){

          return addTopic(source, args, context, info); 
          
        }

        break;

      case "addComment":

        if(returnType === CommentType){

          return addComment(source, args, context, info); 
          
        }

        break;

      case "clearCache":

        // console.log("clearCache");

        if(typeof window !== "undefined"){
          throw("Операция не разрешена в окне");
        }

        const {
          scope,
        } = context;

        return new Promise(async (resolve, reject) => {

          try{

            result = await scope.clearCache();

            console.log("rootResolver clearCache");

            resolve(result);

          }
          catch(e){
            reject(e);
          }

        });


        break;

      // Сохранение поискового запроса
      case "updateCompany":

        const {
          remoteResolver,
        } = context;

        if(!remoteResolver){
          throw("remoteResolver undefined");
        }


        return new Promise(async (resolve, reject) => {

          try{

            const result = await remoteResolver(null, args, context, info);

            // console.log("rootResolver updateCompany result", result);

            // if(result && result.success){

            //   resolve(result);

            // }
            // else{
            //   reject(result);
            // }

            resolve(result);

          }
          catch(e){
            reject(e);
          }

        });

        break;

    }
  }


  if(source){

    result = source[fieldName];
  }

  if(result === undefined){

    // Резолвим по типу объекта

    // const {
    //   name: returnTypeName,
    // } = returnType;


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

        if(getResolverByType(ofType)){

          return getObjectsList(ofType, source, args, context, info);

        }

      }

    }

    else if(returnType instanceof GraphQLList){

      const {
        ofType,
      } = returnType;

      if(getResolverByType(ofType)){

        return getObjects(ofType, source, args, context, info);

      }

    }

    else if(returnType instanceof GraphQLObjectType){

      if(getResolverByType(returnType)){

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

  let result = getObject(returnType, source, args, context, info);

  // if(operation && operation.name){

  //   switch(operation.name.value){
  //   }

  // }

  return result;

}

export const ObjectsListResolver = (resolver, object, args, context, info) => {

  if(!resolver){
    console.error("resolver is undefined", info);
    // return reject("resolver is undefined");
    throw(new Error("resolver is undefined"));
  }

  let state = resolver(object, args, context, info);

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

  if(state){

    if(state instanceof Promise){

      

      return new Promise((resolve, reject) => {

        state.then(r => {

          if(r){

            r = processState(r, args, context, info);

          }

          resolve(r);
        })
        .catch(e => reject(e));

      });
      
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

const getObjectsList = (ofType, source, args, context, info) => {

  let result;

  let {
    fieldName,
  } = info;

  const resolver = getResolverByType(ofType);

  if(resolver){

    return ObjectsListResolver(resolver, source, args, context, info);

  }

}

// const getObjects = (ofType, source, args, context, info) => {

//   let result;

//   result = getObjectsList(ofType, source, args, context, info);
    
//   result = result && result.object;

//   return result;

// }

const getObjects = (ofType, source, args, context, info) => {

  let result;

  // console.log('getObjects', ofType);

  result = getObjectsList(ofType, source, args, context, info)
    // .then(r => {
    //   result = r;
    // });
  

  if(result){

    
    if(result instanceof Promise){

      return new Promise((resolve, reject) => {

        result
        .then(r => {

          resolve(r && r.object);

        })
        .catch(e => {
          reject(e);
        });

      });

    }

    result = result && result.object;
    
  }


  return result;
}

const getObject = (ofType, source, args, context, info) => {

  let state;

  // const {
  //   id,
  //   parent,
  // } = args;

  state = getObjects(ofType, source, args, context, info)

  if(state){



    
    if(state instanceof Promise){

      return new Promise((resolve, reject) => {

        state
        .then(r => {

          console.log('getObject state result', args, r);

          resolve(processObjectState(r, args));

        })
        .catch(e => {
          reject(e);
        });

      });

    }



    state = processObjectState(state, args);
    
  }

  return state;
}

const processObjectState = function (state, args){

  if(state){

    const {
      id,
      parent,
    } = args;

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


export default rootResolver;





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

  // Получаем результаты поиска
  else if(ofType === EditVersionType){

    resolver = getEditVersionsList;
      
  }


  return resolver;

}
