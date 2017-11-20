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

import Draft from 'draft-js';

const {
  // Editor, 
  // EditorState, 
  // RichUtils, 
  // CompositeDecorator, 
  convertToRaw, 
  // convertFromRaw, 
  ContentState,
  // SelectionState, 
  // Modifier, 
  convertFromHTML, 
  // genKey, 
  // ContentBlock, 
  // getDefaultKeyBinding
} = Draft;

let contentCache = {};


// import {getQuery as getServiceQuery} from '../Service';

// import {db as db_config} from '../../../../../config/config';


// let {
//   connection: {
//     prefix,
//   },
// } = db_config;
 

// export const CompanySortBy = new GraphQLInputObjectType({
//   name: "CompanySortBy",
//   fields: {
//     by: {
//       type: new GraphQLEnumType({
//         name: 'CompanySortBy',
//         values: {
//           id: {
//             value: 'contacts.id',
//             description: 'По ID',
//           },
//           name: {
//             value: 'contacts.name',
//             description: 'По названию',
//           },
//           // active: {
//           //   value: 'contacts.active',
//           //   description: 'По активности',
//           // },
//           // parent_name: {
//           //   value: 'Parent.name',
//           //   description: 'По названию родителя',
//           // },
//           rand: {
//             value: 'rand()',
//             description: 'В случайном порядке',
//           },
//         },
//       }),
//       description: 'Способ сортировки',
//     },
//     dir: order,
//   },
// });

// export const CompanySort = {
//   type: new GraphQLList(CompanySortBy),
// };


// export const getQuery = function(knex, args, context){
// }

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

// export class SchemaType extends ObjectType{

//   constructor(props, knex){

    

//     let Props = Object.assign({

//       fields: () => {

//         return {
//           id: {
//             type: GraphQLInt
//           },
//           name: {
//             type: GraphQLString
//           },
//         };
//       },
//     }, props);

//     super(Props, knex);
//   }


//   // getCollection(object, args, context){

    
//   //   console.log('CompanyType getCollection', object, args, context);
//   //   console.log('CompanyType getCollection this', this);

//   //   return [{
//   //     id: 234,
//   //     name: "SDfdsf",
//   //   }];

//   //   return;
//   //   const {
//   //     db,
//   //   } = context || {};

//   //   const {
//   //     getContacts,
//   //   } = db || {};

//   //   if(getContacts){
//   //     return getContacts(object, args, context);
//   //   }

//   //   // else

//   //   let {
//   //     id,
//   //     limit,
//   //     start,
//   //     sort,
//   //     // service_id,   // Поиск по услуге
//   //     // services,   // Поиск по услугам
//   //     // place_id,     // Поиск по геообъекту
//   //     // parent,
//   //     // filialsOnly,
//   //     // withFilialsOnly,
//   //     // withServicesOnly,
//   //     search,
//   //   } = args || {};

//   //   const q = knex(`${prefix}modxsite_companies as companies`)
//   //     // .innerJoin(`${prefix}user_attributes as profile`, 'users.id', 'profile.internalKey')
//   //     // .select('profile.*')
//   //     .select('companies.*') 
//   //     // .limit('3')
//   //     ; 
   

//   //     if(id){
//   //       q.where('companies.id', id);
//   //     } 
//   //     if(search){
//   //       q.where('companies.name', 'like', `%${search}%`);
//   //     }
   

//   //     if(sort){
//   //       sort.map(n => {

//   //         let {
//   //           by,
//   //           dir,
//   //         } = n;

//   //         if(by){

//   //         // $c->sortby("if(Parent.id > 0, Parent.name, {$alias}.name) ASC, if(Parent.id > 0, {$alias}.name, '')", "ASC");

//   //           switch(by){

//   //             case 'rand()':

//   //               by = knex.raw('RAND()');

//   //               break;
              
//   //             default:;
//   //           }

//   //           q.orderBy(by, dir || 'ASC');
//   //         }

//   //       });
//   //     }

//   //     if(limit > 0){
//   //       q.limit(limit);
//   //     }

//   //   // console.log("Contacts query toString()", q.toString());
      

//   //   return q; 
//   // }
// }

// export default class Comment extends ModelObject{

// }


export const getList = (object, args, context, info) => {

  const {
    SendMODXRequest,
  } = context;

  return new Promise((resolve, reject) => { 

    // 

    let {
      id,
      limit,
      page,
      offset: start,
      count,
      // voted_companies,
      search,
    } = args || {};

    limit = limit || 0;

    let action = 'comments/getdata';

    let params = {
      // with_coors_only: false,       // Только с координатами
      // company_id: id,
      id,
      limit,
      page,
      start,
      count: count === undefined ? 1 : count,
      // companies: voted_companies,
      search,
    };

    let request = SendMODXRequest(action, params); 


    request
    .then((data) => {
    
      // console.log("Company result", data);

      if(!data.success){

        return reject(data.message || "Ошибка выполнения запроса");
      }
 

      let {
        object,
      } = data || {};


      if(object && object.length){
        
        const {
          serverDOMBuilder,
        } = context;

        object.map(comment => {

          let {
            id,
            text,
          } = comment;


          let text_content;


          // let contentCache = contentCache[id];


          if(text){

            if(
              contentCache 
              && contentCache[id]
              && contentCache[id].text === text
            ){

              text_content = contentCache[id].text_content;

            }
            else{

              try{
                
                text_content = JSON.parse(text);

              }
              catch(e){
                
                // console.error(e);

                try{
      

                  // console.log("Comments serverDOMBuilder", contentCache && contentCache.length);

                  const blocks = convertFromHTML(text || "", serverDOMBuilder);

                  // console.log('blocks', blocks);

                  if(blocks){

                    const state = ContentState.createFromBlockArray(blocks);

                    text_content = convertToRaw(state);

                    // editor_content = state && state.getCurrentContent();

                  }


                }
                catch(e){

                  console.error(e);

                }

              };

              contentCache[id] = {
                text,
                text_content,
              };

            }


            // if(text_content){
            //   console.log("text_content", text_content);
            // }

            Object.assign(comment, {
              text: text_content,
            });

          }


        });

      }

      return resolve(data);
    })
    .catch((e) => {
      return reject(e);
    })
    ;
  });
}
