import {
  GraphQLInt,
  GraphQLString,
  GraphQLList,
  GraphQLObjectType,
  GraphQLInputObjectType,
  GraphQLEnumType,
  GraphQLFloat,
  GraphQLBoolean,
} from 'graphql';

import GraphQLJSON from 'graphql-type-json';

// import {
//   // SchemaObject,
//   // order,
//   // ModelObject,
// } from '../';


// import {
//   CommentEditorStateType,
// } from 'react-cms/src/app/components/ORM/Comment';


import {
  CommentEditorStateType,
} from '../EditorState';

import moment from 'moment';

import {browserHistory} from 'react-router';

// moment.locale('ru');

import ModelObject from '../object';

import {
  CommentType,
} from '../Comment';

import {
  RatingType,
} from '../Rating';

import {
  UserType,
} from '../User';

import ErrorType from '../Error';

import {
  imageType,
  coordsType,
  SortField,
  TVsField,
  GalleryField,
} from '../fields';


export const ResourceType = new GraphQLObjectType({
  name: 'ResourceType',
  fields: () => {

    return {
      id: {
        type: GraphQLInt
      },
      name: {
        type: GraphQLString,
        resolve: (source) => {
          return source.pagetitle;
        },
      },
      pagetitle: {
        type: GraphQLString
      },
      longtitle: {
        type: GraphQLString
      },
      description: {
        type: GraphQLString
      },
      summary: {
        type: GraphQLString
      },
      introtext: {
        type: GraphQLString
      },
      short_text: {
        type: GraphQLString
      },
      content: {
        type: GraphQLString
      },
      editor_content: {
        type: CommentEditorStateType,
        description: "Содержимое редактора",
      },
      plainText: {
        type: GraphQLString,
        description: "Чистый текст документа",
      },
      alias: {
        type: GraphQLString
      },
      uri: {
        type: GraphQLString
      },
      createdby: {
        type: GraphQLInt,
        description: "ID автора ресурса",
      },
      image: {
        type: GraphQLString,
        description: "Картинка",
      },
      tags: {
        type: new GraphQLList(GraphQLString),
        description: "Теги",
      },
      imageFormats: imageType,
      city_id: {
        type: GraphQLInt
      },
      city: {
        type: GraphQLString
      },
      parent: {
        type: GraphQLInt,
        description: "ID родительского документа",
      },
      template: {
        type: GraphQLInt,
        description: "ID шаблона",
      },
      deleted: {
        type: GraphQLBoolean,
        description: "Флаг, что документ удален",
      },
      hidemenu: {
        type: GraphQLBoolean,
        description: "Флаг, что документ скрывается в меню",
      },
      searchable: {
        type: GraphQLBoolean,
        description: "Флаг, что документ индексируемый",
      },
      createdon: {
        type: GraphQLInt,
        description: "Дата создания в секундах",
      },
      published: {
        type: GraphQLBoolean,
        description: "Флаг, что документ опубликован",
      },
      publishedon: {
        type: GraphQLInt,
        description: "Дата публикации в секундах",
      },
      pubdate: {
        type: GraphQLString,
        description: 'Дата публикации',
        resolve: (source, args) => {

          let time = source && (source.publishedon || source.createdon);

          if(!time){
            return null;
          }

          return moment(time * 1000).format('YYYY-MM-DD') || null;
        },
      },
      tvs: TVsField,
      gallery: GalleryField,
      coords: {
        type: coordsType,
      },
      // coords: {
      //   type: coordsType,
      //   resolve: (source) => {

      //     let {
      //       coords,
      //     } = source;

      //     if(coords && coords.lat === undefined){

      //       const {
      //         0: lng,
      //         1: lat,
      //       } = coords;

      //       coords = {
      //         lat,
      //         lng,
      //       };

      //     }

      //     return coords;
      //   },
      // },
      votes: {
        description: 'Все голоса по документу',
        type: new GraphQLList(RatingType),
        resolve: async (company, args, context, info) => {

          const {
            localQuery,
          } = context;

          const {
            id: company_id,
          } = company;

          Object.assign(args, {
            ratingResourceId: company_id,
          });

          let result;

          await localQuery({
            operationName: "ResourceRatings",
            variables: args,
          })
            .then(r => {

              const {
                ratings,
              } = r.data;



              result = ratings;

            });

          return result;

          // return this.RatingsResolver(company, args);
        },
      },
      ratingsByType: {
        description: 'Рейтинг по типам',
        type: new GraphQLList(RatingType),
        resolve: async (company, args, context, info) => {

          // 

          const {
            localQuery,
          } = context;

          const {
            id: company_id,
          } = company;

          Object.assign(args, {
            ratingResourceId: company_id,
            getByTypeRatings: true,
          });

          let result;

          await localQuery({
            operationName: "ResourceRatings",
            variables: args,
          })
            .then(r => {

              const {
                ratingsByType,
              } = r.data;



              result = ratingsByType;

            });

          return result;

          // return this.RatingsResolver(company, args);
        },
      },
      comments: {
        type: new GraphQLList(CommentType),
        description: CommentType.description,
        args: {
          sort: SortField,
        },
        resolve: async (source, args, context, info) => {
 
          // let result;

          const {
            localQuery,
          } = context;

          const {
            id: commentsCompanyId,
          } = source;

          if(!commentsCompanyId){
            return null;
          }

          const {
            sort: commentsSort,
          } = args;

          Object.assign(args, {
            resource_id: commentsCompanyId,
            sort: commentsSort,
          });


          const {
            rootResolver,
          } = context;

          return rootResolver(null, args, context, info);
        },
        // resolve: async (source, args, context, info) => {
 
        //   let result;

        //   const {
        //     localQuery,
        //   } = context;

        //   const {
        //     id: commentsResourceId,
        //   } = source;

        //   if(!commentsResourceId){
        //     return null;
        //   }

        //   const {
        //     sort: commentsSort,
        //   } = args;

        //   Object.assign(args, {
        //     commentsResourceId,
        //     commentsSort,
        //   });



        //   await localQuery({
        //     // query: q,
        //     operationName: "ResourceComments",
        //     variables: args,
        //   })
        //     .then(r => {

        //       const {
        //         comments,
        //       } = r.data;

        //       result = comments;

        //     });

        //   return result;
        // },
      },
      ratings: {
        type: new GraphQLList(RatingType),
        description: RatingType.description,
      },
      ratingAvg: {
        description: 'Суммарный рейтинг',
        type: RatingType,
        // args: {
        //   groupBy: {
        //     type : RatingGroupbyEnum,
        //   },
        // },
        resolve: async (source, args, context, info) => {

          // 

          let result;

          const {
            localQuery,
          } = context;

          const {
            id: ratingResourceId,
          } = source;

          Object.assign(args, {
            ratingResourceId,
          });

          await localQuery({
            operationName: "ResourceAvgRatings",
            variables: args,
          })
            .then(r => {

              const {
                ratings,
              } = r.data;

              result = ratings && ratings[0];

              return result;

            }).catch(e => {
              console.error(e);
            });

          return result;

        },
      },
      Author: {
        type: UserType,
        description: UserType.description,
        resolve: async (source, args, context, info) => {

          const {
            fieldName,
          } = info;

          const {
            rootResolver,
          } = context;

          let {
            createdby: userId,
          } = source;

          userId = parseInt(userId);

          if(!userId){
            return null;
          }

          Object.assign(args, {
            id: userId,
          });

          return rootResolver(null, args, context, info);
        },
      },
      // _errors: {
      //   type: new GraphQLList(ErrorType),
      //   description: "Ошибки после попытки сохранения",
      // },
      _errors: {
        type: GraphQLJSON,
        description: "Ошибки после попытки сохранения",
      },
      _isDirty: {
        type: GraphQLJSON,
        description: "Массив измененных данных",
        // resolve: source => {

        //   return source && source._isDirty || null;
        //   // return source && source._isDirty ? true : false;

        // },
      },
    }
  }
});


// Добавляем новый топик
export const add = (source, args, context, info) => {



  let {
    TopicsStore,
  } = context.state;

  const {
    user: {
      user: currentUser,
    },
  } = context.props;

  const id = Math.round(Math.random() * 10000000) * -1;

  const uri = `topics/${id}/`;

  let data = {
  };

  let item = {
    id,
    uri,
    createdby: currentUser && currentUser.id || undefined,
    createdon: Math.round(new Date().getTime() / 1000),
    _isDirty: {},
  };

  TopicsStore.getDispatcher().dispatch(TopicsStore.actions.CREATE, item);

  // item.update(data);

  browserHistory.push(uri);

  return item;

};


const inCoords = function(center, radius, item){

  const {
    lat,
    lng,
  } = center;

  let {
    lat: itemLat,
    lng: itemLng,
  } = item.coords || {};

  if(!lat || !lng || !itemLat || !itemLng){
   return false;
  }

  // let {
  //  minLat,
  //  maxLat,
  //  minLng,
  //  maxLng,
  // } = this.getScreenBounds() || {};

  radius = radius || 1;

  const minLat = lat - radius;
  const maxLat = lat + radius;
  const minLng = lng - radius;
  const maxLng = lng + radius;

  if(
    itemLat < maxLat && itemLat > minLat
    &&
    itemLng > minLng && itemLng < maxLng
  ){
    return true;
  }

  return false
}

export const getList = (source, args, context, info) => {


  // console.log("Resources getList args", args);

  const {
    CompaniesStore,
    TopicsStore,
    ResourcesStore,
  } = context.state;

  let {
    parent,
    template,
    tag,
    resourceType,
    coords,
    center,
    alias,
    uri,
  } = args;
 
  let state

  switch(resourceType){

    case 'topic':
    case 'obzor':
    
      state = TopicsStore.getState();
      
      break;

    case 'company':
    
      state = CompaniesStore.getState();

      break;

    default: state = ResourcesStore.getState();
  }


  if(parent){

    state = state.filter(n => n.parent === parent);

  }

  if(template){

    state = state.filter(n => n.template === template);

  }

  if(alias){

    state = state.filter(n => n.alias === alias);

  }

  if(uri !== undefined){

    uri = decodeURI(uri);

    uri = uri && uri.replace(/^\/+/, '');

    state = state.filter(n => n.uri === uri);
  }

  if(tag){

    tag = decodeURI(tag);

    const search = new RegExp(tag, 'ui');

    state = state.filter(n => n.tags && n.tags.findIndex(i => i.match(search)) !== -1);

  }

  // Поиск по координатам (в заданном квадрате)
  if(coords){

    const {
      radius,
      center,
    } = coords;

    state = state.filter(n => inCoords(center, radius, n));

  }

  // Если указан центр, сортируем по удаленности от центра
  if(center){

    const {
      lat,
      lng,
    } = center;

    state = state.sort((a,b) => {

      const {
        coords: aCoords,
      } = a;

      const {
        coords: bCoords,
      } = b;




      if(!aCoords || !bCoords){
        return -1;
      }

      const {
        lat: aLat,
        lng: aLng,
      } = aCoords;
      

      const {
        lat: bLat,
        lng: bLng,
      } = bCoords;
      


      const aLatDiff = Math.abs(lat - aLat);
      const aLngDiff = Math.abs(lng - aLng);

      const bLatDiff = Math.abs(lat - bLat);
      const bLngDiff = Math.abs(lng - bLng);

      const aDiff = Math.sqrt((aLatDiff*aLatDiff + aLngDiff*aLngDiff));

      const bDiff = Math.sqrt(bLatDiff*bLatDiff + bLngDiff*bLngDiff);





      if(aDiff > bDiff){
        return 1;
      }
      else if(bDiff > aDiff){
        return -1;
      }

      // a = a && a.toLocaleUpperCase && a.toLocaleUpperCase() || a;
      // b = b && b.toLocaleUpperCase && b.toLocaleUpperCase() || b;

      // if(dir == 'asc'){
      //   if ( a > b ) return 1;
      //   if (a < b ) return -1;
      //   return 0;
      // }
      // else{
      //   if ( a < b ) return 1;
      //   if (a > b ) return -1;
      //   return 0;
      // }

      return 0;

    });

  }

  return state;

};
