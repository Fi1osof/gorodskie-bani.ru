


export const getList = async (Company, args, context, info) => {

  let {
    limit,
    start,
    page,
    sort,
    groupBy,
    uri,
  } = args || {};



  // console.log('getList rating', args, info);

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

  var q = knex(`${prefix}redirects as redirects`)
    
    .select('redirects.*')
    .select('site_content.uri as redirect_uri')
    ;

    q.innerJoin(`${prefix}site_content as site_content`, 'site_content.id', 'redirects.resource_id');


    if(uri){
      q.where('redirects.uri', uri);
    }

		// console.log('q2 toSQL2', q2.toString());

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


    if(limit > 0){
      q.limit(limit);
    }

    // 

  let result;

  await q
  .then((r) => {

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