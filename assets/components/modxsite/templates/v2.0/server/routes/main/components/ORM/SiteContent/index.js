


export const getList = (object, args, context, info) => {

  const {
    SendMODXRequest,
  } = context;


  return new Promise( async (resolve, reject) => {
    // Эта функция будет вызвана автоматически

    // В ней можно делать любые асинхронные операции,
    // А когда они завершатся — нужно вызвать одно из:
    // resolve(результат) при успешном выполнении
    // reject(ошибка) при ошибке


    const {
      request,
    } = args;

    console.log("SiteContent args", args);

    if(!request){
      reject({
        message: "Не был получен объект запроса",
      });
    }


    const {
      location,
      params,
    } = request;


    if(!location){
      reject({
        message: "Не был получен объект URL",
      });
    }


    // let {
    //   // sort,
    //   ...other
    // } = args;

    // let params = {...other};

    // // params.limit = 3;

    // let request = SendMODXRequest(action, params); 

    let result;

    let resources = [];

    let object = {
      id: 12,
    };

    resources.push(object);

    result = {
      object: resources,
    };

    resolve(result);

  });
}