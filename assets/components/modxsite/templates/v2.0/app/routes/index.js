

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
} from "modules/Site";

let routes = {
  path: "/",
  component: MainApp,
  indexRoute: { 
    component: MainPage 
  },
  childRoutes: [
    {
      path: "/",
      component: MainPage,
      childRoutes: [{
        path: "/index",
      },{
        path: "/index/@:lat,:lng,:zoom",
      },{
        path: "/@:lat,:lng,:zoom",
      },{
        path: "/:city/@:lat,:lng,:zoom",
      },],
    },
    {
      path: "/db",
      component: DbPage,
    },
    {
      path: "/bani-otzivy",
      component: OtzivyPage,
      childRoutes: [
        {
          path: "/bani-otzivy/:topicAlias",
        },
        {"path":"/moscow/:companyId/solyanyie-peshheryi-v-bannom-komplekse-sokolinaya-gora-1294.html"},


        {"path":"/kuncevskie-bani"},
        {"path":"/izmajlovskie-bani"},
        {"path":"/rzhevskie-bani"},
        {"path":"/pokrovskie-bani"},
        {"path":"/usachevskie-bani"},
        {"path":"/voroncovskie-bani"},
        {"path":"/varshavskie-bani"},
        {"path":"/babushkinskie-bani"},
        {"path":"/city\/moscow\/rzhevskie-bani\/rzhevskie-bani-zhutkoe-mesto-1387.html"},
        {"path":"/bannyj-klub-solovyov"},
        {"path":"/koptevskie-bani"},
        {"path":"/krasnopresnenskie-bani"},
        {"path":"/astraxanskie-bani"},
        {"path":"/seleznevskie-bani"},
        {"path":"/vostochnye-bani"},
        {"path":"/reutovskie-bani"},
        {"path":"/shhelkovskie-bani"},
        {"path":"/banya-na-ciolkovskogo-banya-2"},
        {"path":"/ivanovskaya-banya"},
        {"path":"/banya-na-raxmaninova"},
        {"path":"/kazachi-bani"},
        {"path":"/voroncovskie-bani-staraya-statya"},
        {"path":"/banya-na-krasnoznamennoj"},
        {"path":"/vodno-razvlekatelnyj-klub-atlantidaspa"},
        {"path":"/city\/moscow\/babushkinskie-bani\/babushkinskie-bani-zhut!-1437.html"},
      ]
    },
    {
      path: "/topics",
      component: TopicsPage,
      childRoutes: [
        {
          path: "/topics/:topicAlias",
        },
        {"path":"/rabota-dlya-vsex"},
        {"path":"/predlozhenie-dlya-vladelcev-saun"},
        {"path":"/rimskie-bani"},
        {"path":"/yaponskie-bani"},
        {"path":"/tureckaya-banya-xamam"},
        {"path":"/finskaya-sauna"},

      ],
    },
    {
      path: "/tag/:tag",
      component: TopicsPage,
    },
    {
      path: "/comments",
      component: CommentsPage,
      childRoutes: [{
        path: "/comments/comment-:commentId.html",
      }]
    },
    {
      path: "/people",
      component: UsersPage,
      childRoutes: [{
        path: "/profile/:username",
        childRoutes: [{
          path: "/profile/:username/:action",
        }],
      }],
    },
    {
      path: "/edits",
      description: "Изменения в данных заведений",
      component: CompaniesEditsPage,
    },
    {
      path: "/profile",
    },
    {
      path: "/bani/:companyId",
      component: CompanyPage,
    },
    {
      path: "/bani",
      component: CompaniesPage,
      // childRoutes: [{
      //   path: "/bani/:companyId",
      // }],
    },
    {
      path: "/st-petersburg/:companyId",
      component: CompanyPage,
    },
    {
      path: "/city/:city/@:lat,:lng,:zoom",
      component: MainPage,
      // component: CompaniesPage,
    },
    {
      path: "/city/:city",
      // component: MainPage,
      component: CompaniesPage,
      // childRoutes: [{
      //   // path: "/city/:city/:companyId",
      // }],
    },
    {
      path: "/city/*/:companyId",
      component: CompanyPage,
    },
    {
      path: "/ratings",
      component: RatingsPage,
      childRoutes: [{
        path: "/ratings/:ratingType",
      }]
    },
    {
      path: "/contacts.html",
      name: "Contacts",
      component: ContactsPage,
    },
    {
      path: "/crm",
      name: "CRM",
      component: CRMPage,
    },
    {
      // "path":"/moscow",
      // "component":MainPage,
      component: CompaniesPage,
      childRoutes: [
        {
          path: "/:city",
        },
      ]
    },
    {
      path: "/moscow/:companyId",
      component: CompanyPage,
    },
    {
      path: "/moskovskaya-oblast/:companyId",
      component: CompanyPage,
    },
    {
      path: "/chelyabinsk/:companyId",
      component: CompanyPage,
    },
    {
      path: "/cherepovecz/:companyId",
      component: CompanyPage,
    },
    {
      path: "/penza/:companyId",
      component: CompanyPage,
    },
    {
      path: "/st-petersburg/:companyId",
      component: CompanyPage,
    },
    {
      path: "/chelyabinsk/:companyId",
      component: CompanyPage,
    },
  ]
};

if(typeof window !== 'undefined'){
  routes.childRoutes.push({
    path: "*",
    // name: "notfound",
    component: NotFoundPage,
    // redirect: '/'
  });
}

export default routes;