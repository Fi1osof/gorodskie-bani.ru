import {
  GraphQLInputObjectType,
  GraphQLObjectType,
  GraphQLList,
  GraphQLNonNull,
  GraphQLEnumType,
  GraphQLInt,
  GraphQLString,
  GraphQLBoolean,
} from 'graphql';


import { List } from 'immutable';

// import type from 'graphql';

// import {
//   GraphQLField,
// } from 'graphql/type/';

// console.log('GraphQLField', GraphQLField);
// console.log('GraphQLField type', type);

// export class ModelObject{

//   constructor(props){

//     Object.assign(this, props);

//   }

//   fieldResolver(source, args, context, info) {
    
//     const {
//       fieldName,
//     } = info;
          
//     return source && source[fieldName] || undefined;

//   }

// }

import {
  CompanyType,
  getMany as getCompanies,
  getOne as getCompany,
} from './Company';

import {
  RatingType,
  RatingArgs,
  getMany as getRatings,
  getOne as getRating,
} from './Rating';

import {
  CommentType,
} from './Comment';

export const order = {
  type: new GraphQLEnumType({
    name: "SortType",
    values: {
      asc: {
        value: 'asc',
        description: 'В прямом порядке',
      },
      desc: {
        value: 'desc',
        description: 'В обратном порядке',
      },
    },
  }),
  description: 'Порядок сортировки',
};

export const SortBy = new GraphQLInputObjectType({
  name: "SortBy",
  fields: {
    by: {
      type: new GraphQLEnumType({
        name: 'SortByValues',
        values: {
          id: {
            value: 'id',
            description: 'По ID',
          },
          rand: {
            value: 'rand()',
            description: 'В случайном порядке',
          },
        },
      }),
      description: 'Способ сортировки',
    },
    dir: order,
  },
});

export const SortField = {
  type: new GraphQLList(SortBy),
};


// export class SchemaObject extends GraphQLObjectType{

//   constructor(props){

//     props = Object.assign({
//     }, props);

//     super(Props);
//   }
// }



export class ObjectsListType extends GraphQLObjectType{

  constructor(props){

    props = props || {};

    let {
      type,
      args,
      fields,
      ...other
    } = props;

    fields = Object.assign(fields || {}, {
      // success: {
      //   type: GraphQLBoolean,
      // },
      // message: {
      //   type: GraphQLString,
      // },
      count: {
        type: GraphQLInt,
      },
      total: {
        type: GraphQLInt,
      },
      limit: {
        type: GraphQLInt,
      },
      page: {
        type: GraphQLInt,
      },
      object: {
        type: new GraphQLList(type),
        // resolve: (response, args) => {

        //   // console.log('this.CompanyType Resolver', response, args);

        //   return response && response.success && response.object || [];
        // },
      },
    });

    Object.assign(props, {
      fields,
    });

    super(props);

  }



}

export const listArgs = {
  ids: {
    type: new GraphQLList(GraphQLInt),
    description: 'Список ID',
  },
  search: {
    type: GraphQLString,
    description: 'Поисковый запрос',
  },
  sort: SortField,
  limit: {
    type: new GraphQLNonNull(GraphQLInt),
    description: 'Лимит записей',
  },
  page: {
    type: GraphQLInt,
    description: 'Страница',
  },
  offset: {
    type: GraphQLInt,
    description: 'Сколько записей пропустить',
  },
};


export class listField {

  constructor(props){

    // Object.assign(this, props);


    let {
      description,
      args,
      resolve,
      ...other
    } = props;

    args = Object.assign(listArgs, args || {});

    Object.assign(this, {
      description,
      args,
    });

    // var a = {
    //   // type: new ObjectsListType({
    //   //   ...other,
    //   // }),
    //   // description,
    //   // args,
      
    // }

    this.type = new ObjectsListType({
      ...other,
    });

    // return this;

    this.resolve = resolve || ::this.resolve;
  }

  resolve(source, args, context, info){
    
    console.log('ObjectsListType fieldResolver', source, args, context, info);

    const {
      fieldName,
    } = info;
          
    let result = source && source[fieldName] || undefined;

    if(result){
      console.log('ObjectsListType fieldResolver result', result);

      let {
        ids,
        offset,
        limit,
        page,
      } = args;

      page = page || 1;

      const total = result.size;

      if(offset){
        result = result.skip(offset);
      }

      if(ids && ids.length){
        result = result.filter(n => ids.indexOf(n.id) !== -1);
      }

      if(limit){

        if(page > 1){
          result = result.skip(limit * (page - 1));
        }

        result = result.take(limit);
      }

      result = {
        success: true,
        message: '',
        count: result.size,
        total,
        limit,
        page,
        object: result,
      };
    }

    return result;
  }
}

export class RatingsListField extends listField{


  groupByCompany(result){
    var result2 = List();

    const result_grouped = result.groupBy(x => x.company_id);

    result_grouped.map(n => {
      const first = n.get(0);

      const quantity = n.size;

      let ratings = [];

      n.map(i => {
        ratings.push(i.rating);
      });

      let max_vote;
      let min_vote;

      let rating = ratings.reduce((prev, next) => prev+next) / quantity;

      // console.log('result grouped rating', rating, ratings, ratings.reduce((prev, next) => prev+next), ratings.reduce((prev, next) => prev+next) / quantity);

      result2 = result2.push(Object.assign(first, {
        quantity,
        max_vote: Math.max.apply(null, ratings),
        min_vote: Math.min.apply(null, ratings),
        rating: parseFloat(rating.toFixed(2)),
      }));
    });

    // result.groupBy(x => x.company_id).map(n => {
    //   n.map(i => {
    //     i.quantity = n.size;
    //     result2 = result2.push(i);
    //   });

    //   console.log('result grouped n', n);

    // });

    return result2;
  }

  groupByRatingType(result){
    var result2 = List();

    const result_grouped = result.groupBy(x => x.type);

    result_grouped.map(n => {
      const first = n.get(0);

      const quantity = n.size;

      let ratings = [];

      let voted_companies = [];
      // let voters = [];

      n.map(i => {
        const {
          rating,
          company_id,
        } = i;

        ratings.push(rating);

        if(voted_companies.indexOf(company_id) === -1){
          voted_companies.push(company_id);
        }

        // voters.push(i.company_id);
      });

      let max_vote;
      let min_vote;

      let rating = ratings.reduce((prev, next) => prev+next) / quantity;

      // console.log('result grouped rating', rating, ratings, ratings.reduce((prev, next) => prev+next), ratings.reduce((prev, next) => prev+next) / quantity);

      result2 = result2.push(Object.assign({}, first, {
        quantity,
        voted_companies,
        max_vote: Math.max.apply(null, ratings),
        min_vote: Math.min.apply(null, ratings),
        rating: parseFloat(rating.toFixed(2)),
      }));
    });

    // result.groupBy(x => x.company_id).map(n => {
    //   n.map(i => {
    //     i.quantity = n.size;
    //     result2 = result2.push(i);
    //   });

    //   console.log('result grouped n', n);

    // });

    return result2;
  }

  resolve(source, args, context, info){
    
    // console.log('ObjectsListType fieldResolver', source, args, context, info);

    console.log('result grouped this', this);

    const {
      fieldName,
    } = info;
          
    let result = source && source[fieldName] || undefined;

    if(result){
      // console.log('ObjectsListType fieldResolver result', result);

      let {
        groupBy,
      } = args;

      console.log('groupBy', groupBy);

      // Способ группировки
      switch(groupBy){

        // case 'rating_type':
        case 'company':

          // console.log('result grouped', result.groupBy(x => x.company_id));

          result = this.groupByCompany(result);



          // console.log('result grouped result_grouped', result_grouped);
          // console.log('result grouped', result);

          break;

        // case 'rating_type':
        case 'rating_type':

          // console.log('result grouped', result.groupBy(x => x.company_id));

          result = this.groupByRatingType(result);



          // console.log('result grouped result_grouped', result_grouped);
          // console.log('result grouped', result);

          break;

      }

      // page = page || 1;

      // const total = result.size;

      // if(offset){
      //   result = result.skip(offset);
      // }

      // if(limit){

      //   if(page > 1){
      //     result = result.skip(limit * (page - 1));
      //   }

      //   result = result.take(limit);
      // }

      // result = {
      //   success: true,
      //   message: '',
      //   count: result.size,
      //   total,
      //   limit,
      //   page,
      //   object: result,
      // };
      
      // source.ratings = List([{
      //   rating: 3,
      // }]);

      source.ratings = result;
    }


    return super.resolve(source, args, context, info);
  }

}

// const CompanyType = new GraphQLObjectType({
//   name: 'Company',
//   fields: {
//     id: {
//       type: GraphQLInt,
//     },
//     name: {
//       type: GraphQLString,
//     },
//   },
// });

// const CommentType = new GraphQLObjectType({
//   name: 'Comment',
//   fields: {
//     id: {
//       type: GraphQLInt,
//     },
//     name: {
//       type: GraphQLString,
//     },
//   },
// });


const RatingsList = new RatingsListField({
  type: RatingType,
  name: "Ratings",
  description: RatingType.description,
  args: RatingArgs,
});

// console.log('RatingsList', RatingsList);

const RootType = new GraphQLObjectType({
  name: 'RootType',
  description: 'Корневой раздел',
  fields: {
    companies: new listField({
      type: CompanyType,
      name: "Companies",
      description: "Список компаний",
    }),
    company: {
      type: CompanyType,
      description: "Компания",
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLInt),
        },
      },
      resolve: getCompany,
    },
    ratings: RatingsList,
    vote: {
      type: RatingType,
      description: "Рейтинг",
      resolve: getRating,
    },
    comments: new listField({
      type: CommentType,
      name: "Comments",
      description: "Список комментариев",
      args: {
        thread: {
          type: GraphQLInt,
          description: 'ID диалоговой ветки',
        },
      },
    }),
    // // ratings: {
    // //   type: new GraphQLList(RatingType),
    // //   name: "RatingsList",
    // //   description: RatingType.description,
    // //   args: listArgs,
    // //   // resolve: getRatings,
    // // },
  },
});

export default RootType;
