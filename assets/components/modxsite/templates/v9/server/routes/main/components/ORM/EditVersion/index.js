

// function UserException(message) {
//   this.message = message;
//   this.data = {
//     sdf: "Исключение, определенное пользователем",
//   };
// }

export const create = async (source, args, context, info) => {

  
  // throw(JSON.stringify({
  //   success: false,
  //   message: "DSfdsf 2222222222",
  //   data: [{
  //     id: "name",
  //     msg: "DSfsdfds 1",
  //   },{
  //     id: "pagetitle",
  //     msg: "DSfsdfds 2",
  //   }],
  // }));


  let {
    target_id,
    data,
  } = args || {};

  let editedby;

  let responseMessage;

  // Сначала отправляем запрос на MODX

  const action = "companies/update";

  let params = Object.assign(data || {}, {
    id: target_id,
  });

  const {
    SendMODXRequest,
  } = context;

  let request = SendMODXRequest(action, params); 


  let result;

  const saveResult = await request
  .then((data) => {
  
    console.log("Company update result", data);

    if(!data.success){

      const {
        data: saveErrors,
      } = data || {};

      let preventError;

      let error_code = saveErrors && saveErrors.find(n => n.id === "error_code");

      let user_id = saveErrors && saveErrors.find(n => n.id === "user_id");

      editedby = user_id && parseInt(user_id) || undefined;

      throw(editedby);

      if(error_code){

        preventError = true;

        switch(error_code.msg){

          case 'UNAUTHORIZED':

            responseMessage = "Вы были неавторизованы, поэтому данные будут опубликованы после проверки модератором. Отправленные вами данные сохранены. Спасибо!";

          case 'NOT_OWNER':

            responseMessage = "Вы не являетесь владельцем компании, поэтому данные будут опубликованы после проверки модератором. Отправленные вами данные сохранены. Спасибо!";

            break;

          default: preventError = false;
        }

      }



      if(!preventError){

        // throw(new Error(data.message || "Ошибка выполнения запроса"));
        // throw(new Error(data));
        // throw(data);
        // throw(new Error(JSON.stringify(data)));
        throw(JSON.stringify(data));
        // throw new UserException(data.message);
        // throw("dsfdsfdsfsdfdsf");

      }

    }

    result = data;
  })
  .catch((e) => {
    throw(new Error(e));
  });

  // return result;


  const {
    db: knex,
    getPrefix,
  } = context;

  const prefix = getPrefix();


  if(data !== undefined){

    try{
      data = data && JSON.stringify(data) || null;
    }
    catch(e){
      throw(new Error(e));
    }

  }

  var q = knex(`${prefix}edit_versions`);

  const insert = q.clone();

  insert
    .insert({
      target_id,
      data,
      editedby,
    });

  await insert
  .returning('*')
  .then(async r => {

    // console.log('createSearchStat toSQL', insert.toString());

    await q
    .select("*")
    // .select(knex.raw('unix_timestamp(date) as `date`'))
    .whereIn("id", r)
    .then(r => {
      
      // console.log('createSearchStat result', r);

      result = r && r[0] || null;

      let {
        data,
      } = result;

      if(data){

        try{
          data = data && JSON.parse(data) || null;

          result.data = data;
        }
        catch(e){
          throw(new Error(e));
        }

      }

    })
    .catch(e => {
      throw(new Error(e));
    });


  })
  .catch(e => {
    throw(new Error(e));
  });


  if(result){
    result.message = responseMessage;
  }


  return result;
}