

import {
  MainApp,
  MainPage,
  TopicsPage,
  NotFoundPage,
  DbPage,
  CompaniesPage,
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
      path: "/index",
      component: MainPage
    },
    {
      path: "/index/@:lat,:lng,:zoom",
      component: MainPage
    },
    {
      path: "/@:lat,:lng,:zoom",
      component: MainPage
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
      path: "/bani",
      component: CompaniesPage,
      childRoutes: [{
        path: "/bani/:companyId",
      }],
    },
    {
      childRoutes: [{
        path: "/st-petersburg/:companyId",
        component: CompaniesPage,
      }],
    },
    {
      path: "/city/:city/@:lat,:lng,:zoom",
      component: MainPage,
      // component: CompaniesPage,
    },
    {
      childRoutes: [{
        path: "/city/:city/:companyId",
        component: CompaniesPage,
      }],
    },
    {
      path: "/city/:city",
      // component: MainPage,
      component: CompaniesPage,
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
      path: "/:city/@:lat,:lng,:zoom",
      component: MainPage
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
      component: CompaniesPage,
    },
    {
      path: "/moskovskaya-oblast/:companyId",
      component: CompaniesPage,
    },
    {
      path: "/chelyabinsk/:companyId",
      component: CompaniesPage,
    },
    {
      path: "/cherepovecz/:companyId",
      component: CompaniesPage,
    },
    {
      path: "/penza/:companyId",
      component: CompaniesPage,
    },
    {
      path: "/st-petersburg/:companyId",
      component: CompaniesPage,
    },
    {
      path: "/chelyabinsk/:companyId",
      component: CompaniesPage,
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