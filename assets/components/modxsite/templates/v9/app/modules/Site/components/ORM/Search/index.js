
import { List } from 'immutable';

import {
  GraphQLInt,
  GraphQLString,
  GraphQLFloat,
  GraphQLList,
  GraphQLObjectType,
  GraphQLUnionType,
} from 'graphql';



import Company,
{
  CompanyType,
  // getMany as getCompanies,
  // getOne as getCompany,
  getList as getCompaniesList,
} from '../Company';

// console.log('CompanyType', CompanyType);

const resolveType = (data) => {
  // if (data.username) {
  //   return UserType;
  // }
  // if (data.director) {
  //   return MovieType;
  // }
  // if (data.author) {
  //   return BookType;
  // }

  console.log("resolveType", data);
  // console.log("resolveType", data, data.getFullData);

  // if(data instanceof Place){
  //   return PlaceType;
  // }
  // else{
  //   return CompanyType;
  // }

  return CompanyType;
};

export const SearchResultType = new GraphQLUnionType({
  name: 'SearchResultType',
  description: "Результат поиска",
  types: () => ([
    CompanyType, 
    // PlaceType,
  ]),
  resolveType,
});

// export {getQuery};

// export default SearchResultType;



export const getList = (source, args, context, info) => {

  let {
    search,
    limit,
  } = args;

  // limit = limit && limit / 2 || 5;

  if(!search){
    return null;
  }

  console.log("SearchResultType getList");

  return getCompaniesList(null, args, context, info);

  // return new Promise((resolve, reject) => {
    
  //   const {
  //     localQuery,
  //   } = context;

  //   localQuery({
  //     operationName: "Companies",
  //     variables: {
  //       companiesSearchQuery: search,
  //       limit,
  //       getImageFormats: true,
  //     },
  //   })
  //   .then(r => {

  //     console.log("SearchResultType result", r);

  //     let {
  //       companies,
  //     } = r.data;

  //     companies = companies && companies.map(n => Object.assign(n, {
  //       objectType: "Company",
  //     }));

  //     resolve(companies && List(companies));
      
  //   })
  //   .catch(e => {
  //     console.error(e);
  //     reject(e);
  //   });
    
  // });


  // const {
  //   ContactsStore,
  //   PlacesStore,
  // } = context.state;

  // let {
  //   search,
  //   limit,
  // } = args;

  // limit = limit && limit / 2;

  // const searchRule = new RegExp(search, 'ui');

  // let result; 

  // // console.log('contactsState args', args);
  // // console.log('contactsState searchRule', searchRule);

  // let state;



  // let contactsState = ContactsStore.getState().filter(n => searchRule.test(n.name));
  // let placesState = PlacesStore.getState().filter(n => searchRule.test(n.name));
  // // let placesState = PlacesStore.getState();

  // if(limit){
  //   contactsState = contactsState.take(limit);
  //   placesState = placesState.take(limit);
  // }

  // // console.log('contactsState', contactsState);

  // // console.log('placesState', placesState);

  // state = contactsState.concat(placesState);

  // // console.log('search state', state);

  // // return [{
  // //   id: "DSfdsf",
  // //   name: "аэробус",
  // // }];

  // return state;

};

