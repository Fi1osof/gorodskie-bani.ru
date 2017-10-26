



export const create = async (source, args, context, info) => {


  const {
    db: knex,
    getPrefix,
  } = context;

  const prefix = getPrefix();

  // console.log('createSearchStat args', args);
  
  let {
    query,
    finded,
  } = args || {};

  var q = knex(`${prefix}search_stat`);

  const insert = q.clone();

  insert
    .insert({
      query,
      finded,
    });

  // const insertResult = insert;

  // console.log('createSearchStat toSQL', q.toString());
  // console.log('createSearchStat result toSQL', select.toString());
  // console.log('createSearchStat result insertResult', insertResult.toString());

  let result;

  await insert
  .returning('*')
  .then(async r => {
    
    // console.log('createSearchStat result', r);

    // r && r.map(n => result.push({
    //   id: n,
    // }));

    await q
    .select("*")
    .select(knex.raw('unix_timestamp(date) as `date`'))
    .whereIn("id", r)
    .then(r => {
      // console.log('createSearchStat result', r);

      result = r && r[0] || null;

    })
    .catch(e => {
      throw(new Error(e));
    });

    // console.log('createSearchStat result 2 toSQL', result.toString());


  })
  .catch(e => {
    throw(new Error(e));
  });

  return result;

  // return {
  //   id: 4,
  // };

}



// export const create = async (Company, args, context, info) => {

//   let {
//     query,
//     finded,
//   } = args || {};




//   const {
//   	db: knex,
//   	getPrefix,
//   } = context;

//   const prefix = getPrefix();

//   var q = knex(`${prefix}search_stat`)
    
//     .select('redirects.*')
//     .select('site_content.uri as redirect_uri')
//     ;

//     q.innerJoin(`${prefix}site_content as site_content`, 'site_content.id', 'redirects.resource_id');


//     if(uri){
//       q.where('redirects.uri', uri);
//     }

// 		// console.log('q2 toSQL2', q2.toString());

//     if(totalSelection){

//       await knex.select(knex.raw(`count(*) as total`))
//         .from(q.clone().clearSelect().select(knex.raw('NULL')).as('t1'))
//         .then(r => {

//           rowsCount = r && r[0].total || 0;

//           // console.log('q2 result', r);
//         });

//         // console.log('q2 toSQL', q2.toSQL());
//         // console.log('q2 toSQL2', q2.toString());
// 		}


//     if(limit > 0){
//       q.limit(limit);
//     }

//     // 

//   let result;

//   await q
//   .then((r) => {

//   	result = {
//   		total: rowsCount,
//   		count: r.length,
//   		object: r,
//   		limit,
//   		page,
//   	};

//   })
//   .catch(e => {
//   	console.error(e);
//   });


//   return result; 
// }