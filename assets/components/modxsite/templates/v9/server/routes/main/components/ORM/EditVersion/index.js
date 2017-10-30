

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
  
    // console.log("Company update result", data);

    if(!data.success){

      const {
        data: saveErrors,
      } = data || {};

      let preventError;

      let error_code = saveErrors && saveErrors.find(n => n.id === "error_code");

      let user_id = saveErrors && saveErrors.find(n => n.id === "user_id");

      editedby = user_id && parseInt(user_id.msg) || undefined;

      // throw(editedby);

      if(error_code){

        preventError = true;

        switch(error_code.msg){

          case 'UNAUTHORIZED':

            responseMessage = "Вы не были авторизованы, поэтому данные будут опубликованы после проверки модератором. Отправленные вами данные сохранены. Спасибо!";

            break; 


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

    // result = data;

    return data;
  })
  .catch((e) => {
    throw(new Error(e));
  });

  // return result;

  if(saveResult && saveResult.success){
    return saveResult;
  }


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
    .select(knex.raw('unix_timestamp(editedon) as editedon'))
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


export const getList = async (Company, args, context, info) => {

  let {
    limit,
    start,
    page,
    sort,
    companyId,
    status,
  } = args || {};



  // console.log('edit_versions getList args', args);

  const {
    fieldNodes: {
      0: {
        selectionSet,
      }
    },
  } = info;

  const totalSelection = selectionSet && selectionSet.selections && selectionSet.selections.find(n => n.name.value === "total");


  const {
    db: knex,
    getPrefix,
  } = context;

  const prefix = getPrefix();

  let rowsCount = 0;

  var q = knex(`${prefix}edit_versions as edit_versions`)
  .select('edit_versions.*')
  .select(knex.raw('unix_timestamp(edit_versions.editedon) as editedon'))
  ;
    

  if(status && status.length){
    q.whereIn('edit_versions.status', status);
  }

  if(companyId !== undefined){
    q.where('edit_versions.target_id', companyId);
  }

  // q.innerJoin(`${prefix}site_content as site_content`, 'site_content.id', 'redirects.resource_id');


  // if(uri){
  //   q.where('redirects.uri', uri);
  // }

  // console.log('edit_versions getList toSQL', q.toString());

  if(totalSelection){

    await knex.select(knex.raw(`count(*) as total`))
      .from(q.clone().clearSelect().select(knex.raw('NULL')).as('t1'))
      .then(r => {

        rowsCount = r && r[0].total || 0;

        // console.log('q2 result', r);
      });

      // console.log('q2 toSQL', q2.toSQL());
      // console.log('q2 toSQL2', q2.toString());
  }



  if(sort){
    sort.map(n => {

      let {
        by,
        dir,
      } = n;

      if(by){

      // $c->sortby("if(Parent.id > 0, Parent.name, {$alias}.name) ASC, if(Parent.id > 0, {$alias}.name, '')", "ASC");

        switch(by){

          case 'rand()':

            by = knex.raw('RAND()');

            break;
          
          default:;
        }

        q.orderBy(by, dir || 'ASC');
      }

    });
  }


  if(limit > 0){
    q.limit(limit);
  }

    // 

  let result;

  await q
  .then((r) => {

    r && r.map(row => {

      try{

        row.data = row.data && JSON.parse(row.data) || null;

      }
      catch(e){
        console.error(e);
      }

    });

    result = {
      total: rowsCount,
      count: r.length,
      object: r,
      limit,
      page,
    };

  })
  .catch(e => {
    console.error(e);
  });


  return result; 
}
