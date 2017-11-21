
// export default class ModelObject{

// 	constructor(props){

// 		Object.assign(this, props);

// 	}

// 	fieldResolver(source, args, context, info) {
    
//     const {
//       fieldName,
//     } = info;
          
// 		return source && source[fieldName] || undefined;

//   }

// }



var _app;

export default class ModelObject{

  constructor(props, app){

    Object.assign(this, props);

    _app = app;

  }

  getApp(){
    return _app;
  }

  
  /*
    Обновление объекта.
    В каждом отдельном классе надо прописать свой апдейтер
  */
  // update(data, silent){

  //   console.error("Метод update не задан");

  //   return true;
  // }

  update(data){

    Object.assign(this, data);

  }

  /*
    Для ререндеринга. Выкидываем сигнал, чтобы в каждом отдельном интерфейсе ререндеринг произошел
  */
  forceUpdate(){

    this.update(null, true);
  }


  reloadStores(stores){

    // console.log('this.getApp()', this,  this.getApp()); 

    stores && stores.map(store => {

      store && store.getState().map(n => {
        if(n.id === this.id){

          /*
            Если это не тот же самый объект, мержим данные
          */

          if(n !== this){
            Object.assign(n, this);
          }

          
          store.getDispatcher().dispatch(store.actions.UPDATE, n, null);

        }
      });

    });

  };


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

  getFullData(params, force){

    return new Promise((resolve, reject) => {

      if(this._loaded && !force){
        return resolve();
      }

      this.getData(params)
        .then(result => {

          this._loaded = true;

          // console.log('getFullData', result);
          resolve(result);
        });

    });

  }

  remoteQuery(params = {}){

    let {
      variables,
    } = params;

    variables = Object.assign(variables || {}, {
      id: this.id,
    })

    Object.assign(params, {
      variables,
    });

    // console.log('remoteQuery', params);

    return new Promise((resolve, reject) => {

      _app.remoteQuery(params)
        .then(result => {
          // console.log('remoteQuery result 3', result);

          if(result && result.data){

            const {
              item,
            } = result.data;

            Object.assign(this, item);
            // this.forceUpdate();
          }
          
          resolve(result);

        })
        .catch(e => reject(e));

    });
  }

}