

// import {
//   MainApp,
//   MainPage,
//   TopicsPage,
//   NotFoundPage,
//   DbPage,
//   CompaniesPage,
//   OtzivyPage,
//   UsersPage,
//   CommentsPage,
//   RatingsPage,
//   ContactsPage,
//   CRMPage,
//   CompaniesEditsPage,
// } from 'modules/Site';


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
      component,
      geo,
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

    const {
      pathname,
      query,
    } = location;

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

    // const {
    //   component: Component,
    // } = baseRouter || {};


    // console.log("Router Component 2", Component);

    // console.log("Router Component Type", typeof Component);

    // console.log("Router Component CompaniesPage Type", typeof CompaniesPage);

    // console.log("Router Component CompaniesPage Type aqual ", Component === CompaniesPage);


    // if(Component){

    //   switch(Component){

    //     // Страница компаний
    //     case CompaniesPage:

    //       const {
    //         companyId,
    //       } = params;

    //       console.log("Company page aqual");

    //       console.log("Company page aqual variables", {
    //         resourceUri: relative_pathname,
    //       });

    //       /*
    //         Если указан companyId, то это конечная страница компании
    //       */
    //       if(companyId){

    //         const result = await localQuery({
    //           operationName: "CompanyByUri",
    //           variables: {
    //             resourceUri: relative_pathname,
    //           },
    //         })
    //         .then(r => {
    //           console.log("SiteContent resource result", r);
    //         })
    //         .catch(e => {
    //           reject(e);
    //         });

    //       }

    //       break;

    //   }

    // }
    // else{
    //   throw("Не был получен базовый компонент");
    // }


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

    console.log("City", typeof city, city);

    console.log("City title", cityLongtitle, city && city.longtitle);

    if(component){

      switch(component){

        // Страница компаний
        case "CompaniesPage":

          const {
            companyId,
            city,
          } = params;

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
            const result = await localQuery({
              operationName: "MapCompanies",
              variables: {
                limit: 12,
                withPagination: true,
                companiesCenter: coords,
                page,
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

            object = {
              // id,
              status: 200,
              title: cityLongtitle || "Городские бани",
              state: Object.assign(result.data, {cities}),
            };

          }

          break;

      }

    }
    else{
      throw("Не был получен базовый компонент");
    }

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