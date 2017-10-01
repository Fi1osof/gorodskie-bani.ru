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
	Company,
	CompanyType,
	getList as getCompanyList,
} from './Company';

import {
	Rating,
	RatingType,
	getList as getRatingsList,
} from './Rating';

const rootResolver = async (source, args, context, info) => {



    let result;

    // console.log('fieldResolver source', source);
    // console.log('fieldResolver args', args);
    console.log('fieldResolver info', info);

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

      if(returnType instanceof ObjectsListType){

        await getObjectsList(source, args, context, info)
        	.then(r => {
        		result = r;
        	})

      }

      else if(returnType instanceof GraphQLList){

        // const {
        //   id,
        // } = args;

        await getObjects(source, args, context, info)
        	.then(r => {
        		result = r;
        	})

      }

      else if(returnType instanceof CompanyType.constructor){

        const {
          name: returnTypeName,
        } = returnType;

        const {
          id,
        } = args;

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

  console.log('storeResolver args', args);

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

      let sortBy;

      switch(by){

        case 'id':

          sortBy = n => n.id;

          break;

        case 'rand()':

          sortBy = n => Math.random();

          break;
      }

      if(sortBy){

        state = sortBy(state, sortBy, dir);

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


const getObjectsList = async (source, args, context, info) => {

	let result;

  const {
  	returnType,
  } = info;

  const {
    name: returnTypeName,
  } = returnType;

  const {
  	_fields: {
  		object: objectField,
  	},
  } = returnType;


	const {
		type: objectType,
		type: {
			ofType,
		},
	} = objectField;

  if(objectField && objectField.type){

		// Поулчаем список компаний
		if(ofType === CompanyType){

	    await ObjectsListResolver(getCompanyList, source, args, context, info)
	    	.then(r => {
	    		result = r;
	    	});
	    	
	  }

	  // Получаем список рейтингов
		else if(ofType === RatingType){
	  
	  	console.log("ofType2", ofType);


	    await ObjectsListResolver(getRatingsList, source, args, context, info)
	    	.then(r => {
	    		result = r;
	    	});

	  }

  }


  return result;

}

const getObjects = async (source, args, context, info) => {

	let result;

  const {
  	returnType,
  } = info;

  const {
    name: returnTypeName,
  } = returnType;

  // const {
  // 	_fields: {
  // 		object: objectField,
  // 	},
  // } = returnType;


	const {
		ofType,
	} = returnType;

  // if(objectField && objectField.type){

		// Получаем список компаний
		if(ofType === CompanyType){
  		
  		console.log("CompanyType list source", source);
  		console.log("CompanyType list info", info);
  		console.log("CompanyType list args", args);

	    await ObjectsListResolver(getCompanyList, source, args, context, info)
	    	.then(r => {
	    		result = r && r.object;
	    	});
	  }

	  // Получаем список рейтингов
		else if(ofType === RatingType){
	  
	  	console.log("ofType2", ofType);


	    // await ObjectsListResolver(getRatingsList, source, args, context, info)
	    // 	.then(r => {
	    // 		result = r;
	    // 	});

	  }

  // }


  return result;

}

export default rootResolver;