export default class ModelObject{

  constructor(props, app){

    Object.assign(this, props);

    this._app = app;

  }

  fieldResolver(source, args, context, info) {
    
    const {
      fieldName,
    } = info;
          
    let value = source && source[fieldName] || undefined;



    // switch(fieldName){

    //   case 'image': 
          
    //     console.log('Company imageType image', source, value, this);

    //     // value = value && value.image && value.image.original || null;
    //     value = value && value.original || null;

    //     break;
    // }

    return value;
  }

}