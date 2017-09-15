import {
  GraphQLInt,
  GraphQLString,
  GraphQLList,
  GraphQLObjectType,
  GraphQLInputObjectType,
  GraphQLEnumType,
} from 'graphql';

import {
  SchemaObject,
  order,
  ModelObject,
} from '../';
// import ModelObject from '../model';

// import {getQuery as getServiceQuery} from '../Service';

// import {db as db_config} from '../../../../../config/config';


// let {
//   connection: {
//     prefix,
//   },
// } = db_config;
 

export const CompanySortBy = new GraphQLInputObjectType({
  name: "CompanySortBy",
  fields: {
    by: {
      type: new GraphQLEnumType({
        name: 'CompanySortBy',
        values: {
          id: {
            value: 'contacts.id',
            description: 'По ID',
          },
          name: {
            value: 'contacts.name',
            description: 'По названию',
          },
          // active: {
          //   value: 'contacts.active',
          //   description: 'По активности',
          // },
          // parent_name: {
          //   value: 'Parent.name',
          //   description: 'По названию родителя',
          // },
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

export const CompanySort = {
  type: new GraphQLList(CompanySortBy),
};


export const getQuery = function(knex, args, context){
}

// export const updateQuery = function(knex, args, context){

//   console.log('updateQuery(knex, args, context)', knex, args, context);

//   const {
//     db,
//   } = context || {};

//   if(db){
//     return db.updateContact(args, context);
//   }

//   let {
//     id,
//     name,
//     parent,
//   } = args || {};

//   const q = knex(`${prefix}modxsite_contacts as contacts`)
//     .where('contacts.id', id);

//   if(name !== undefined){
//     q.update({
//       name,
//     });    
//   }
  
//   if(parent !== undefined){
//     q.update({
//       parent,
//     });    
//   }

//   console.log('updateQuery toSQL', q.toString());

//   return q;
// }

export class SchemaType extends SchemaObject{

  constructor(props){

    

    props = Object.assign({

      fields: () => {

        return {
          id: {
            type: GraphQLInt
          },
          name: {
            type: GraphQLString
          },
        };

      },
    }, props);

    super(props);
  }
}

export default class Company extends ModelObject{

  fieldResolver(source, args, context, info){
    console.log('Company fieldResolver', source, args, context, info);
    

    const {
      fieldName,
    } = info;

    switch(fieldName){

      case 'comments': 

        return new Promise((resolve, reject) => {
          resolve([{
            id: 345,
            text: "DSFdsf",
          }]);
        });

        break;

    }

    return super.fieldResolver(source, args, context, info);
  }

}
