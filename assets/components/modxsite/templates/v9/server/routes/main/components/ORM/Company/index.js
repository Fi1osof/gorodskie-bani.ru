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

    
    // console.log('CompanyType getCollection', object, args, context);
    // console.log('CompanyType getCollection this', this);

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

// export default class Company extends ModelObject{

//   fieldResolver(source, args, context, info){
//     console.log('Company fieldResolver', source, args, context, info);
    

//     const {
//       fieldName,
//     } = info;

//     switch(fieldName){

//       case 'comments': 

//         return new Promise((resolve, reject) => {
//           resolve([{
//             id: 345,
//             text: "DSFdsf",
//           }]);
//         });

//         return [{
//           id: 34543,
//           text: "DSFdsf",
//         }];

//         break;

//     }

//     return super.fieldResolver(source, args, context, info);
//   }

// }


const prepareScheduleData = function(schedule){

  if(schedule && schedule.length){

    schedule = schedule.map((n, index) => {

      if(!n){
        return null;
      }

      let {
        start,
        end,
        // day: defaultWeekDay,
      } = n;

      const defaultWeekDay = index;

      if(start){

        let {
          year,
          month,
          day,
          hour,
          minute,
          second,
          weekDay,
        } = start;

        start = {
          year: year || 0,
          month: month || 0,
          day: day || 0,
          hour: hour || 0,
          minute: minute || 0,
          second: second || 0,
          weekDay: weekDay !== undefined ? weekDay : defaultWeekDay,
        };

      }

      if(end){

        let {
          year,
          month,
          day,
          hour,
          minute,
          second,
          weekDay,
        } = end;

        end = {
          year: year || 0,
          month: month || 0,
          day: day || 0,
          hour: hour || 0,
          minute: minute || 0,
          second: second || 0,
          weekDay: weekDay !== undefined ? weekDay : defaultWeekDay,
        };

      }

      n = {
        start,
        end,
      };
      
      return n;

    });

  }

  return schedule;

}


export const getList = (object, args, context, info) => {

  const {
    SendMODXRequest,
  } = context;

  // console.log("Companies getList args", args);
  // console.log("Companies getList req", req);
  // console.log("Companies getList context", context);


  let {
    variableValues
  } = info;

  // console.log("Companies getList variableValues", variableValues);

  return new Promise((resolve, reject) => {
    // Эта функция будет вызвана автоматически

    // В ней можно делать любые асинхронные операции,
    // А когда они завершатся — нужно вызвать одно из:
    // resolve(результат) при успешном выполнении
    // reject(ошибка) при ошибке

    // 

    let {
      id,
      ids,
      limit,
      page,
      offset: start,
      count,
      voted_companies,
      search,
    } = args || {};

    limit = limit || 0;

    let action = 'companies/getdata';

    let params = {
      // with_coors_only: false,       // Только с координатами
      company_id: id,
      ids,
      limit,
      page,
      start,
      count: count === undefined ? 1 : count,
      companies: voted_companies,
      search,
    };

    let request = SendMODXRequest(action, params); 


    request
    .then((data) => {
    
      // console.log("Company result", data);

      if(!data.success){

        return reject(data.message || "Ошибка выполнения запроса");
      }

      // delete(data.object);

      // 

      if(data.object && Array.isArray(data.object)){

        data.object.map(object => {

          let {
            properties,
            tvs,
          } = object;

          try{
            properties = properties && JSON.parse(properties);
          }
          catch(e){
            console.error(e);
          }

          let {
            schedule,
            schedule_men,
            schedule_women,
            schedule_family,
          } = properties || {};

          if(tvs){
    
            let tvs = {};


            for(var name in object.tvs){

              var tv = object.tvs[name];

              if(tv){

                let v;

                if(tv.tv_id === undefined){
                  tvs[name] = tv;
                }
                else{

                  let {
                    tv_id: id,
                    caption,
                    value,
                  } = tv;
                  
                  switch(name){
                    
                    case 'approved':

                      value = value === "1" ? true : false;

                      break;
                  }

                  tvs[name] = value;

                }

              }
            }

            object.tvs = tvs;

            // console.log("object.tvs", object.tvs);

            let {
              coords,
            } = object;

            if(coords){

              const {
                0: lng,
                1: lat,
              } = coords;

              object.coords = {
                lat,
                lng,
              };
              
            }

          }



          // if(schedule && schedule.length){

          //   schedule = schedule.map(n => {

          //     if(!n){
          //       return null;
          //     }

          //     let {
          //       start,
          //       end,
          //       day: defaultWeekDay,
          //     } = n;

          //     defaultWeekDay = defaultWeekDay || 0;

          //     if(start){

          //       let {
          //         year,
          //         month,
          //         day,
          //         hour,
          //         minute,
          //         second,
          //         weekDay,
          //       } = start;

          //       start = {
          //         year: year || 0,
          //         month: month || 0,
          //         day: day || 0,
          //         hour: hour || 0,
          //         minute: minute || 0,
          //         second: second || 0,
          //         weekDay: weekDay !== undefined ? weekDay : defaultWeekDay,
          //       };

          //     }

          //     if(end){

          //       let {
          //         year,
          //         month,
          //         day,
          //         hour,
          //         minute,
          //         second,
          //         weekDay,
          //       } = end;

          //       end = {
          //         year: year || 0,
          //         month: month || 0,
          //         day: day || 0,
          //         hour: hour || 0,
          //         minute: minute || 0,
          //         second: second || 0,
          //         weekDay: weekDay !== undefined ? weekDay : defaultWeekDay,
          //       };

          //     }

          //     n = {
          //       start,
          //       end,
          //     };
              
          //     return n;

          //   });

          // }

          Object.assign(object, {
            schedule: prepareScheduleData(schedule),
            schedule_men: prepareScheduleData(schedule_men),
            schedule_women: prepareScheduleData(schedule_women),
            schedule_family: prepareScheduleData(schedule_family),
          });
          
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

// export const companiesResolver = (object, args) => {

//   return new Promise((resolve, reject) => {

//     this.companiesListResolver(object, args)
//       .then((result) => {

        

//         if(!result.success){

//           return reject(result.message || "Ошибка выполнения запроса");
//         }

//         // 

//         return resolve(result.object && result.object || null);
//       })
//       .catch((e) => {
//         return reject(e);
//       })
//     ;
//   });
// }

// export const companyResolver = (object, args) => {

//   return new Promise((resolve, reject) => {

//     this.companiesResolver(object, args)
//       .then((result) => {

        

//         // 

//         return resolve(result && result[0] || null);
//       })
//       .catch((e) => {
//         return reject(e);
//       })
//     ;
//   });
// }
