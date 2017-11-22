

import {
  MainApp,
  MainPage,
  TopicsPage,
  NotFoundPage,
  DbPage,
  CompaniesPage,
  CompanyPage,
  OtzivyPage,
  UsersPage,
  CommentsPage,
  RatingsPage,
  ContactsPage,
  CRMPage,
  CompaniesEditsPage,
} from 'modules/Site';


export const getList = (object, args, context, info) => {

  const {
    SendMODXRequest,
    localQuery,
  } = context;


  return new Promise( async (resolve, reject) => {
    // Эта функция будет вызвана автоматически

    // В ней можно делать любые асинхронные операции,
    // А когда они завершатся — нужно вызвать одно из:
    // resolve(результат) при успешном выполнении
    // reject(ошибка) при ошибке


    const {
      request,
      // component,
      geo,
      pathname: debugPathname,
      companyId: debugCompanyId,
      city: debugCity,
    } = args;

    console.log("SiteContent args", args);

    if(!request){
      reject({
        message: "Не был получен объект запроса",
      });
    }


    const {
      location,
      params,
      routes,
    } = request;


    if(!location){
      reject({
        message: "Не был получен объект URL",
      });
    }

    let {
      pathname,
      query,
    } = location;

    pathname = pathname || debugPathname;

    if(!pathname){
      reject("Не был получен УРЛ");
    }

    const {
      page,
    } = query || {};

    const relative_pathname = decodeURI(pathname.replace(/^\/+/, ''));


    let object;

    // const {
    //   params,
    //   location,
    //   routes,
    // } = renderProps;

    // console.log('router params', params);
    // console.log('router location', location);

    const {
      1: baseRouter,
    } = routes || [];


    const {
      component: Component,
    } = baseRouter || {};


    // let component = "MainPage";

    if(Component){

      // switch(Component){

      //   // Страница компаний
      //   case CompaniesPage:

      //     component = "CompaniesPage";

      //     break;

      // }

    }
    else{
      throw("Не был получен базовый компонент");
    }



    if(!geo){
      reject("Не были получены geo-данные");
    }

    const {
      0: lat,
      1: lng,
    } = geo.ll || {};


    let coords;

    if(lat && lng){
      coords = {
        lat,
        lng,
      };
    }

    if(!coords){
      reject("Не были получены координаты");
    }


    let cities;

    await localQuery({
      operationName: "MainMenuData",
      variables: {
        limit: 0,
        resourcesCenter: coords,
      },
    })
    .then(r => {

      const {
        ratings,
        // resources: cities,
        resources,
      } = r.data;

      // console.log("MainMenuData resourcesCenter cities", coords, cities);

      // this.setState({
      //   ratings,
      //   cities,
      // });

      cities = resources;

    })
    .catch(e => {
      console.error(e);
    });


    const {
      0: city,
    } = cities || {};

    const {
      longtitle: cityLongtitle,
    } = city || {};

    // console.log("City", typeof city, city);

    // console.log("City title", cityLongtitle, city && city.longtitle);


    // console.log("Component", Component);

    // console.log("CompaniesPage", CompaniesPage);

    // console.log("Component", Component.__proto__ === CompaniesPage.prototype);

    // console.log("Component 2", Component.prototype === CompaniesPage.__proto__);

    // console.log("Component 3", Component === CompaniesPage);


    // if(component){

    switch(Component){

      // Страница компаний
      case CompaniesPage:

        let {
          companyId,
          city,
        } = params;

        companyId = companyId || debugCompanyId;
        city = city || debugCity;

        // console.log("Company page aqual");

        // console.log("Company page aqual variables", {
        //   resourceUri: relative_pathname,
        // });

        /*
          Если указан companyId, то это конечная страница компании
        */
        if(companyId){

          const result = await localQuery({
            operationName: "CompanyByUri",
            variables: {
              resourceUri: relative_pathname,
            },
          })
          .then(r => {
            
            // console.log("SiteContent resource result", r);
            return r;

          })
          .catch(e => {
            reject(e);
          });

          // resolve(result && result.data);

          const {
            company,
          } = result && result.data || {};

          if(company){

            const {
              id,
              name,
            } = company;

            object = {
              id,
              status: 200,
              title: name,
              state: Object.assign(result.data, {cities}),
            };

          }

        }
        else{

          // if(!city){
          //   reject("Не был получен город");
          // }


          // Получаем список компаний
          // const result = await localQuery({
          //   operationName: "MapCompanies",
          //   variables: {
          //     limit: 12,
          //     withPagination: true,
          //     companiesCenter: coords,
          //     page,
          //   },
          // })
          // .then(r => {
            
          //   // console.log("SiteContent resource result", r);
          //   return r;

          // })
          // .catch(e => {
          //   reject(e);
          // });

          let result;

          const {
            loadServerData,
          } = Component.prototype;

          if(loadServerData){

            result = await loadServerData.call(this, localQuery, {
              page,
              cities,
            })
            .then(r => {
              
              console.log("Server loadServerData resource result", r);
              return r;

            })
            .catch(e => {
              reject(e);
            });

          }

          // resolve(result && result.data);

          // const {
          //   company,
          // } = result && result.data || {};

          // if(company){

          //   const {
          //     id,
          //     name,
          //   } = company;

          //   object = {
          //     id,
          //     status: 200,
          //     title: name,
          //     state: result.data,
          //   };

          // }


          // console.log("City cityLongtitle", cityLongtitle);

          if(result && result.data){

            let {
              title,
            } = result.data || {};

            object = {
              // id,
              status: 200,
              title: title || "Городские бани",
              state: Object.assign(result.data, {cities}),
            };

          }
          else{

            object = {
              // id,
              status: 404,
              title: "Страница не найдена",
              robots: "noindex,nofollow",
            };

          }


        }

        break;

    }

    // }
    // else{
    //   throw("Не был получен базовый компонент");
    // }

    // let {
    //   // sort,
    //   ...other
    // } = args;

    // let params = {...other};

    // // params.limit = 3;

    // let request = SendMODXRequest(action, params); 

    let result;

    let resources = [];

    object && resources.push(object);

    if(resources.length){

      result = {
        object: resources,
      };

    }


    resolve(result);

  });
}