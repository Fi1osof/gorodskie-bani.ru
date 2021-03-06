import {
  GraphQLInt,
  GraphQLString,
  GraphQLList,
  GraphQLObjectType,
  GraphQLInputObjectType,
  GraphQLEnumType,
} from 'graphql';



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


import ObjectType, {order} from '../';
import ModelObject from '../model';

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


//   getCollection(object, args, context){

    



//     return [{
//       id: 234,
//       name: "SDfdsf",
//     }];

//     return;
//     const {
//       db,
//     } = context || {};

//     const {
//       getContacts,
//     } = db || {};

//     if(getContacts){
//       return getContacts(object, args, context);
//     }

//     // else

//     let {
//       id,
//       limit,
//       start,
//       sort,
//       search,
//     } = args || {};

//     const q = knex(`${prefix}modxsite_companies as companies`)
//       // .innerJoin(`${prefix}user_attributes as profile`, 'users.id', 'profile.internalKey')
//       // .select('profile.*')
//       .select('companies.*') 
//       // .limit('3')
//       ; 
   

//       if(id){
//         q.where('companies.id', id);
//       } 
//       if(search){
//         q.where('companies.name', 'like', `%${search}%`);
//       }
   

//       if(sort){
//         sort.map(n => {

//           let {
//             by,
//             dir,
//           } = n;

//           if(by){

//           // $c->sortby("if(Parent.id > 0, Parent.name, {$alias}.name) ASC, if(Parent.id > 0, {$alias}.name, '')", "ASC");

//             switch(by){

//               case 'rand()':

//                 by = knex.raw('RAND()');

//                 break;
              
//               default:;
//             }

//             q.orderBy(by, dir || 'ASC');
//           }

//         });
//       }

//       if(limit > 0){
//         q.limit(limit);
//       }


      

//     return q; 
//   }
// }


export const getList = (object, args, context, info) => {

  const {
    SendMODXRequest,
  } = context;

  const {
    resourceType,
  } = args;





  return new Promise((resolve, reject) => {
    // Эта функция будет вызвана автоматически

    // В ней можно делать любые асинхронные операции,
    // А когда они завершатся — нужно вызвать одно из:
    // resolve(результат) при успешном выполнении
    // reject(ошибка) при ошибке

    // 

    // let {
    //   id,
    //   limit,
    //   page,
    //   offset: start,
    //   count,
    //   voted_companies,
    //   search,
    //   template,
    // } = args || {};

    // limit = limit || 0;

    let action

    switch(resourceType){

      case 'topic':
      case 'obzor':

        action = 'topics/getdata';

        break;
    
      default: action = 'resources/getdata';
    }



    // throw(new Error( action)); 

    let {
      // sort,
      ...other
    } = args;

    let params = {...other};

    // params.limit = 3;

    let request = SendMODXRequest(action, params); 


    request
    .then((data) => {
      if(!data.success){

        return reject(data.message || "Ошибка выполнения запроса");
      }


      if(data.object && Array.isArray(data.object)){

        data.object.map(object => {

          const {
            id,
            pagetitle,
            deleted,
            hidemenu,
            searchable,
            published,
            content,
            template,
          } = object;

          // console.log("Resource server data", {
          //   deleted,
          //   hidemenu,
          //   searchable,
          //   published,
          // });

          if(object.tvs){
    
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
                  
                  tvs[name] = value;

                }

              }
            }

            object.tvs = tvs;



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

            object.tags = object.topic_tags && object.topic_tags.split(",").filter(tag => tag && tag.replace(/ /g, "") !== "") || null;


            Object.assign(object, {
              deleted: parseInt(deleted) === 1 ? true : false,
              hidemenu: parseInt(hidemenu) === 1 ? true : false,
              searchable: parseInt(searchable) === 1 ? true : false,
              published: parseInt(published) === 1 ? true : false,
            });

          }

          if([15, 28].indexOf(parseInt(template)) !== -1){

            // for(var i in contentCache){



            // }


            let editor_content;


            // let contentCache = contentCache[id];

            if(
              contentCache 
              && contentCache[id]
              && contentCache[id].content === content
            ){

              editor_content = contentCache[id].editor_content;

            }
            else if(content){




              try{
                
                editor_content = JSON.parse(content);

              }
              catch(e){
                
                // console.error(e);

                try{

                  const {
                    serverDOMBuilder,
                  } = context;



                  const blocks = convertFromHTML(content, serverDOMBuilder);



                  if(blocks){

                    const state = ContentState.createFromBlockArray(blocks);

                    editor_content = convertToRaw(state);

                    // editor_content = state && state.getCurrentContent();

                  }


                }
                catch(e){

                  console.error(e);

                }
                

                if(editor_content && editor_content.entityMap){

                  let textArray = [];

                  for(var i in editor_content.entityMap){
                    textArray[i] = editor_content.entityMap[i] || null;
                  }

                  editor_content.entityMap = textArray;

                }

              };

              contentCache[id] = {
                content,
                editor_content,
              };

            }


            Object.assign(object, {
              content: null,
              editor_content,
            });

          }


          Object.assign(object, {
            name: pagetitle,
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