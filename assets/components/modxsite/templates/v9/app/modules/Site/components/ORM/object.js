export default class ModelObject{

  constructor(props, app){

    Object.assign(this, props);

    this._app = app;

  }

  fieldResolver(source, args, context, info) {
    
    const {
      fieldName,
    } = info;
          
    return source && source[fieldName] || undefined;

  }

}