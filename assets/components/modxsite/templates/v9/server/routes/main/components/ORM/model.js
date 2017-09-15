
export default class ModelObject{

	constructor(props){

		Object.assign(this, props);

	}

	fieldResolver(source, args, context, info) {
    
    const {
      fieldName,
    } = info;
          
		return source && source[fieldName] || undefined;

  }

}