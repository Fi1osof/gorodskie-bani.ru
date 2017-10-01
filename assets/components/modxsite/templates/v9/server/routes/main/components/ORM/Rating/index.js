


export const getList = async (Company, args, context, info) => {

  let {
    type,
    company,
    limit,
    start,
    page,
    sort,
    groupBy,
  } = args || {};



  // console.log('getList rating', args, info);

  const {
    fieldNodes: {
      0: {
        selectionSet,
      }
    },
  } = info;

  // console.log('getList selectionSet', selectionSet);

  // console.log('getList selectionSet total', selectionSet && selectionSet.selections.find(n => n.name.value === "total"));

  const totalSelection = selectionSet && selectionSet.selections.find(n => n.name.value === "total");


  const {
  	db: knex,
  	getPrefix,
  } = context;

  const prefix = getPrefix();

  let rowsCount = 0;

  // console.log('select ratins args', args);

  var q = knex(`${prefix}society_votes as votes`)
    
    .select('votes.type')
    // .select('votes.target_id as company_id')
    .select('votes.target_id')
    .select('votes.target_class')
    .select('votes.user_id as voter')
    .select('votes.vote_value as rating')
    ;


    q.where('type', '!=', 0);

    if(type){
      q.where('type', type);
    }

    if(company){
      q.where('target_id', company);
    }

    if(groupBy){
      
      q.count('* as quantity');
      q.select(knex.raw('round(sum(votes.vote_value) / count(*), 2) as rating'));
      q.select(knex.raw('max(votes.vote_value) as max_vote'));
      q.select(knex.raw('min(votes.vote_value) as min_vote'));
      q.select(knex.raw('count(DISTINCT votes.user_id) as quantity_voters'));
      
      q.select(knex.raw('GROUP_CONCAT(DISTINCT votes.target_id) as voted_companies'));

      switch(groupBy){
        // q.select(knex.raw('round(sum(votes.vote_value) / count(*), 2) as rating'))

        // q.groupBy('type');
        // q.groupBy('target_id');

        // Сгруппировать по компаниям (общий рейтинг)
        case 'company':

          q.groupBy('target_id');
          break;

        case 'rating_type':

          q.groupBy('type');
          break;

        // Сколько всего 
        case 'company_and_rating_type':
    
          // q.countDistinct('round(sum(votes.vote_value) / count(*), 2) as rating');
      
          // q.select(knex.raw('GROUP_CONCAT(votes.target_id) as voted_companies'));

          q.groupBy('target_id');
          q.groupBy('type');
          break;

        // case 'rating_type_and_company':

        //   q.groupBy('type');
        //   break;

        default:;
      }

    }
    else{
      // q.select('1 as quantity');
    }

		// knex.avg('sum_column1').from(function() {
		//   this.sum('column1 as sum_column1').from('t1').groupBy('column1').as('t1')
		// }).as('ignored_alias')
		
		// let q2 = knex.count('*').from(function(){
		// 	return this.select(knex.raw('NULL')).from(q).as('t1');
		// });

		if(totalSelection){

			await knex.select(knex.raw(`count(*) as total`))
				.from(q.clone().clearSelect().as('t1'))
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

	 	
	 	// console.log("q toSQL", q.toString());

 		// console.log("Result", r);

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