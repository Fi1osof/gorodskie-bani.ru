

export const create = async (source, args, context, info) => {


  const {
    db: knex,
    getPrefix,
  } = context;

  const prefix = getPrefix();
  
  let {
    target_id,
    data,
  } = args || {};


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
    });

  let result;

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

  return result;
}