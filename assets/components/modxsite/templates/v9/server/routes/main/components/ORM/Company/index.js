import {
  GraphQLInt,
  GraphQLString,
  GraphQLList,
  GraphQLObjectType,
  GraphQLInputObjectType,
  GraphQLEnumType,
} from 'graphql';

import ObjectType, {order} from '../';
import ModelObject from '../model';

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

export class SchemaType extends ObjectType{

  constructor(props, knex){

    

    let Props = Object.assign({

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

    super(Props, knex);
  }


  getCollection(object, args, context){

    
    console.log('CompanyType getCollection', object, args, context);
    console.log('CompanyType getCollection this', this);

    return [{
      id: 234,
      name: "SDfdsf",
    }];

    return;
    const {
      db,
    } = context || {};

    const {
      getContacts,
    } = db || {};

    if(getContacts){
      return getContacts(object, args, context);
    }

    // else

    let {
      id,
      limit,
      start,
      sort,
      // service_id,   // Поиск по услуге
      // services,   // Поиск по услугам
      // place_id,     // Поиск по геообъекту
      // parent,
      // filialsOnly,
      // withFilialsOnly,
      // withServicesOnly,
      search,
    } = args || {};

    const q = knex(`${prefix}modxsite_companies as companies`)
      // .innerJoin(`${prefix}user_attributes as profile`, 'users.id', 'profile.internalKey')
      // .select('profile.*')
      .select('companies.*') 
      // .limit('3')
      ; 
   

      if(id){
        q.where('companies.id', id);
      } 
      if(search){
        q.where('companies.name', 'like', `%${search}%`);
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

    // console.log("Contacts query toString()", q.toString());
      

    return q; 
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

        return [{
          id: 34543,
          text: "DSFdsf",
        }];

        break;

    }

    return super.fieldResolver(source, args, context, info);
  }

}
