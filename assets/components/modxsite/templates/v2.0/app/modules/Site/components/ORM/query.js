
const defaultQuery = `

query apiData(
  $limit:Int = 0
  $apiDataGetCurrentUser:Boolean = false
  $apiGetCompenies:Boolean = true
  $getRatingsAvg:Boolean = false
  $getImageFormats:Boolean = false
  $getCompanyComments:Boolean = false
  $getCommentCompany:Boolean = false
  $getCompanyFullData:Boolean = false
  $getCompanyGallery:Boolean = true
  $companyCommentsSort:[SortBy]
  $getTVs:Boolean = true
  $getCommentAuthor:Boolean = false
  $resourcesLimit:Int = 0
  $withPagination:Boolean = false
  $resourceTemplate:Int
  $resourceExcludeTemplates:[Int] = [27,28,15]
  $resourceType:ResourceTypeEnum
  $resourceParent:Int
  $getCompanyTopics:Boolean = false
  $getRatingVoters:Boolean = false
  $resourceGetAuthor:Boolean = false
  $resourceGetComments:Boolean = false
  $resourceIds:[Int]
  $userGetComments:Boolean = false
  $resourceTag:String
  $resourceUri:String
  $resourceGetContent:Boolean = true
  $editVersionStatus:[String]
  $editVersionLimit:Int = 0
  $editVersionSort:[SortBy] = [{
    by:id,
    dir:desc
  }]
  $editVersionGetCreator:Boolean = false
  $editVersionGetEditor:Boolean = false
  $editVersionGetCompany:Boolean = false
  $editVersionCompanyId:Int
  $companyGetEditVersions:Boolean = false
  $resourcesCoords:SearchCoordsType
  $resourcesCenter:InputCoordsType
  $resourcesPage:Int
  $commentGetResource:Boolean = false
){
  companies(
    limit:$limit
    # offset:1
  ) @include(if:$apiGetCompenies)
  {
    ...Company
  }
  ratings(
    limit:$limit
  ){
    rating
    type
    target_id
    target_class
    voter
  }
  users(limit:$limit) {
    ...User
  }
  
  user(
    ownProfile: true
  ) @include(if:$apiDataGetCurrentUser)
  {
    ...User
  }
  
  comments(limit:$limit) {
    ...Comment
  }
  
  ...ResourcesList
  
  ...RootTopics
  
  ...RootEditVersions
}

mutation clearCache{
  clearCache
}

query SiteContentTest(
  $component:String
  $request:JSON!
  $geo:JSON!
){
  ...RootSiteContentTest
}

query CompanyPageContent(
  $pathname:String = "moscow/bannyij-kompleks-«sokolinaya-gora»/"
  $component:String = "CompaniesPage"
  $companyId:String = "Sokolinka"
  $city:String = "chita"
  $geo:JSON = {
    ll:[55,37]
  }
){
  siteContent(
    pathname:$pathname
    companyId:$companyId
    component:$component
    city:$city
    request:{
      params: {
        companyId: "moscow"
      },
      location:{ 
        pathname: $pathname,
        search: "",
        hash: "",
        state: undefined,
        action: undefined,
        key: undefined,
        query: {} 
      }
    }
    geo:$geo
  ){
    ...SiteContentTest
  }
}

query CompaniesPageContent(
  $component:String = "CompaniesPage"
  $pathname:String = "moscow/"
  $geo:JSON = {
    ll:[55,37]
  }
){
  siteContent(
    component:$component
    request:{
      params: {
        city:"moscow"
      },
      location:{ 
        pathname: $pathname,
        search: "",
        hash: "",
        state: undefined,
        action: undefined,
        key: undefined,
        query: {} 
      }
    }
    geo:$geo
  ){
    ...SiteContentTest
  }
}

fragment RootSiteContentTest on RootType{
  siteContent(
    component:$component
    request:$request
    geo:$geo
  ){
    ...SiteContentTest
  }
}

fragment SiteContentTest on SiteContentType{
  id
  status
  title
  description
  keywords
  robots
  content
  state
  _errors
  _isDirty
}


query Companies (
  $limit:Int!
  $companiesSearchQuery:String
  $getRatingsAvg:Boolean = false
  $getImageFormats:Boolean = false
  $getCompanyComments:Boolean = false
  $getCommentCompany:Boolean = false
  $getCompanyFullData:Boolean = false
  $companyIds:[Int]
  $getCompanyGallery:Boolean = false
  $getTVs:Boolean = false
  $withPagination:Boolean = false
  $companyCommentsSort:[SortBy]
  $getCommentAuthor:Boolean = false
  $getCompanyTopics:Boolean = false
  $getRatingVoters:Boolean = false
  $resourceGetAuthor:Boolean = false
  $resourceGetComments:Boolean = false
  $userGetComments:Boolean = false
  $resourceUri:String
  $resourceGetContent:Boolean = true
  $companyGetEditVersions:Boolean = false
  $editVersionGetCreator:Boolean = false
  $editVersionGetEditor:Boolean = false
  $editVersionGetCompany:Boolean = false
  $companiesCoords:SearchCoordsType
  $companiesCenter:InputCoordsType
){
  companies(
    limit:$limit
    ids:$companyIds
    uri:$resourceUri
    search:$companiesSearchQuery
    coords:$companiesCoords
    center:$companiesCenter
  ) @skip(if:$withPagination)
  {
    ...Company
  }
  companiesList(
    limit:$limit
    ids:$companyIds
    uri:$resourceUri
    search:$companiesSearchQuery
    coords:$companiesCoords
    center:$companiesCenter
  ) @include(if:$withPagination)
  {
    count
    total
    object{
      ...Company
    }
  }
}

query Company(
  $id:Int!
  $resourceUri:String
  $getRatingsAvg:Boolean = true
  $getImageFormats:Boolean = true
  $getCompanyComments:Boolean = true
  $getCommentCompany:Boolean = false
  $getCompanyFullData:Boolean = true
  $getCompanyGallery:Boolean = true
  $getTVs:Boolean = true
  $companyCommentsSort:[SortBy] = {by: id, dir:asc}
  $getCommentAuthor:Boolean = true
  $getCompanyTopics:Boolean = true
  $getRatingVoters:Boolean = true
  $resourceGetAuthor:Boolean = false
  $resourceGetComments:Boolean = false
  $userGetComments:Boolean = false
  $resourceGetContent:Boolean = true
  $companyGetEditVersions:Boolean = false
  $editVersionGetCreator:Boolean = false
  $editVersionGetEditor:Boolean = false
  $editVersionGetCompany:Boolean = false
){
  ...RootCompany
}

query CompanyById(
  $id:Int!
  $resourceUri:String
  $getRatingsAvg:Boolean = true
  $getImageFormats:Boolean = true
  $getCompanyComments:Boolean = true
  $getCommentCompany:Boolean = false
  $getCompanyFullData:Boolean = true
  $getCompanyGallery:Boolean = true
  $getTVs:Boolean = true
  $companyCommentsSort:[SortBy] = {by: id, dir:asc}
  $getCommentAuthor:Boolean = true
  $getCompanyTopics:Boolean = true
  $getRatingVoters:Boolean = true
  $resourceGetAuthor:Boolean = false
  $resourceGetComments:Boolean = false
  $userGetComments:Boolean = false
  $resourceGetContent:Boolean = true
  $companyGetEditVersions:Boolean = false
  $editVersionGetCreator:Boolean = false
  $editVersionGetEditor:Boolean = false
  $editVersionGetCompany:Boolean = false
){
  ...RootCompany
}

query CompanyByUri(
  $id:Int
  $resourceUri:String!
  $getRatingsAvg:Boolean = true
  $getImageFormats:Boolean = true
  $getCompanyComments:Boolean = true
  $getCommentCompany:Boolean = false
  $getCompanyFullData:Boolean = true
  $getCompanyGallery:Boolean = true
  $getTVs:Boolean = true
  $companyCommentsSort:[SortBy] = {by: id, dir:asc}
  $getCommentAuthor:Boolean = true
  $getCompanyTopics:Boolean = true
  $getRatingVoters:Boolean = true
  $resourceGetAuthor:Boolean = false
  $resourceGetComments:Boolean = false
  $userGetComments:Boolean = false
  $resourceGetContent:Boolean = true
  $companyGetEditVersions:Boolean = false
  $editVersionGetCreator:Boolean = false
  $editVersionGetEditor:Boolean = false
  $editVersionGetCompany:Boolean = false
){
  ...RootCompany
}

fragment RootCompany on RootType{
  company(
    id: $id
    uri: $resourceUri
  ) {
    ...Company
    ratingsByType {
      rating
      max_vote
      min_vote
      type
      quantity
      quantity_voters
    }
  }
}


query Ratings(
  $limit:Int!
  $ratingsGroupBy:RatingGroupbyEnum
  $getRatingCompanies:Boolean = false
  $getRatingCompany:Boolean = false
  $getCompanyFullData:Boolean = false
  $getCompanyComments:Boolean = false
  $getCommentCompany:Boolean = false
  $getImageFormats:Boolean = false
  $getRatingsAvg:Boolean = false
  $getRatingFullInfo:Boolean = false
  $getRatingVoter:Boolean = false
  $withPagination:Boolean = false
  $ratingsResourceId:Int
  $getCompanyGallery:Boolean = false
  $getTVs:Boolean = false
  $companyCommentsSort:[SortBy]
  $getCommentAuthor:Boolean = false
  $getCompanyTopics:Boolean = false
  $getRatingVoters:Boolean = false
  $resourceGetAuthor:Boolean = false
  $resourceGetComments:Boolean = false
  $userGetComments:Boolean = false
  $ratingGetType:Boolean = false
  $resourceGetContent:Boolean = true
  $companyGetEditVersions:Boolean = false
  $editVersionGetCreator:Boolean = false
  $editVersionGetEditor:Boolean = false
  $editVersionGetCompany:Boolean = false
){
  ...RatingsList
}



query MainMenuData(
  $limit:Int!
  $menuGetRatings:Boolean = false
  $ratingsGroupBy:RatingGroupbyEnum = rating_type
  $getRatingCompanies:Boolean = false
  $getRatingCompany:Boolean = false
  $getCompanyFullData:Boolean = false
  $getCompanyComments:Boolean = false
  $getCommentCompany:Boolean = false
  $getImageFormats:Boolean = false
  $getRatingsAvg:Boolean = false
  $getRatingFullInfo:Boolean = true
  $getRatingVoter:Boolean = false
  $withPagination:Boolean = false
  $ratingsResourceId:Int
  $getCompanyGallery:Boolean = false
  $getTVs:Boolean = true
  $companyCommentsSort:[SortBy]
  $getCommentAuthor:Boolean = false
  $getCompanyTopics:Boolean = false
  $getRatingVoters:Boolean = false
  $resourceGetAuthor:Boolean = false
  $resourceGetComments:Boolean = false
  $userGetComments:Boolean = false
  $ratingGetType:Boolean = true
  
  $resourcesLimit:Int = 0
  $resourceTemplate:Int
  $resourceExcludeTemplates:[Int]
  $resourceType:ResourceTypeEnum
  $resourceParent:Int = 1296
  $resourceUri:String
  $resourceGetContent:Boolean = true
  $companyGetEditVersions:Boolean = false
  $editVersionGetCreator:Boolean = false
  $editVersionGetEditor:Boolean = false
  $editVersionGetCompany:Boolean = false
  $resourcesCoords:SearchCoordsType
  $resourcesCenter:InputCoordsType
  $resourcesPage:Int
){
  ...RatingsList @include(if: $menuGetRatings)
  
  ...ResourcesList
}

fragment RatingsList on RootType{
  ...Ratings @skip(if:$withPagination)
  
  ratingsList(
    limit:$limit
    groupBy:$ratingsGroupBy
  )@include(if:$withPagination)
  {
    count
    total
    object{
      ...Rating
    }
  }
}

fragment Ratings on RootType{
  ratings(
    limit:$limit
    groupBy:$ratingsGroupBy
    resource_id:$ratingsResourceId
    sort:[{
      by:rating
      dir:desc
    }]
  )
  {
    ...Rating
  }
}

query Comments(
  $limit:Int!
  $getCompanyFullData:Boolean = false
  $getImageFormats:Boolean = false
  $getCompanyComments:Boolean = false
  $getCommentCompany:Boolean = false
  $getRatingsAvg:Boolean = false
  $getCompanyGallery:Boolean = false
  $withPagination:Boolean = false
  $commentsResourceId:Int
  $commentParent:Int
  $getTVs:Boolean = false
  $commentsSort:[SortBy]
  $companyCommentsSort:[SortBy]
  $getCommentAuthor:Boolean = false
  $getCompanyTopics:Boolean = false
  $getRatingVoters:Boolean = false
  $resourceGetAuthor:Boolean = false
  $resourceGetComments:Boolean = false
  $commentsCreatedBy:Int
  $userGetComments:Boolean = false
  $commentsPage:Int = 1
  $commentsIds:[Int]
  $resourceGetContent:Boolean = true
  $companyGetEditVersions:Boolean = false
  $editVersionGetCreator:Boolean = false
  $editVersionGetEditor:Boolean = false
  $editVersionGetCompany:Boolean = false
  $commentGetResource:Boolean = false
){
  commentsList(
    ids: $commentsIds
    limit: $limit
    page:$commentsPage
    resource_id:$commentsResourceId
    parent:$commentParent
    sort:$commentsSort
    createdby:$commentsCreatedBy
  )@include(if:$withPagination)
  {
    count
    total
    limit
    page
    object{
      ...Comment
    }
  }
  comments(
    ids: $commentsIds
    limit: $limit
    page:$commentsPage
    resource_id:$commentsResourceId
    parent:$commentParent
    sort:$commentsSort
    createdby:$commentsCreatedBy
  )@skip(if:$withPagination)
  {
    ...Comment
  }
}


query Comment(
  $commentId:Int
  $getCompanyFullData:Boolean = false
  $getImageFormats:Boolean = false
  $getCompanyComments:Boolean = false
  $getCommentCompany:Boolean = false
  $getRatingsAvg:Boolean = false
  $getCompanyGallery:Boolean = false
  # $commentsResourceId:Int
  # $commentParent:Int
  $getTVs:Boolean = false
  # $commentsSort:[SortBy]
  $companyCommentsSort:[SortBy]
  $getCommentAuthor:Boolean = false
  $getCompanyTopics:Boolean = false
  $getRatingVoters:Boolean = false
  $resourceGetAuthor:Boolean = false
  $resourceGetComments:Boolean = false
  # $commentsCreatedBy:Int
  $userGetComments:Boolean = false
  # $commentsPage:Int = 1
  # $commentsIds:[Int]
  $resourceGetContent:Boolean = true
  $companyGetEditVersions:Boolean = false
  $editVersionGetCreator:Boolean = false
  $editVersionGetEditor:Boolean = false
  $editVersionGetCompany:Boolean = false
  $commentGetResource:Boolean = false
){
  comment(
    id: $commentId
  )
  {
    ...Comment
  }
}

# Список компаний для карты.Частичные данные
query MapData (
  $limit:Int!
  $page:Int
  $companyIds:[Int]
  $withPagination:Boolean = false
  $companiesCoords:SearchCoordsType
  $companiesCenter:InputCoordsType
){
  companiesList(
    page:$page
    limit:$limit
    ids:$companyIds
    coords:$companiesCoords
    center:$companiesCenter
  )
  @include(if:$withPagination)
  {
    count
    total
    limit
    page
    object{
      ...MapCompany
    }
  }
  companies(
    page:$page
    limit:$limit
    ids:$companyIds
    coords:$companiesCoords
    center:$companiesCenter
  )
  @skip(if:$withPagination)
  {
    ...MapCompany
  }
}

fragment MapCompany on Company{
  id
  name
  longtitle
  alias
  uri
  coords {
    lat
    lng
    zoom
  }
  image
  imageFormats{
    marker_thumb
  }
  mapIcon
  ratingAvg {
    rating
  }
}

# Список компаний для карты
query MapCompanies (
  $limit:Int!
  $page:Int
  $companyIds:[Int]
  $getCompanyFullData:Boolean = false
  $getImageFormats:Boolean = true
  $getCompanyComments:Boolean = false
  $getCommentCompany:Boolean = false
  $getRatingsAvg:Boolean = true
  $withPagination:Boolean = false
  $getCompanyGallery:Boolean = false
  $getTVs:Boolean = true
  $companyCommentsSort:[SortBy]
  $getCommentAuthor:Boolean = false
  $getCompanyTopics:Boolean = false
  $getRatingVoters:Boolean = false
  $resourceGetAuthor:Boolean = false
  $resourceGetComments:Boolean = false
  $userGetComments:Boolean = false
  $resourceGetContent:Boolean = true
  $companyGetEditVersions:Boolean = false
  $editVersionGetCreator:Boolean = false
  $editVersionGetEditor:Boolean = false
  $editVersionGetCompany:Boolean = false
  $companiesCoords:SearchCoordsType
  $companiesCenter:InputCoordsType
){
  companiesList(
    page:$page
    limit:$limit
    ids:$companyIds
    coords:$companiesCoords
    center:$companiesCenter
  )
  @include(if:$withPagination)
  {
    count
    total
    limit
    page
    object{
      ...Company
    }
  }
  companies(
    page:$page
    limit:$limit
    ids:$companyIds
    coords:$companiesCoords
    center:$companiesCenter
  )
  @skip(if:$withPagination)
  {
    ...Company
  }
}

# Получаем рейтинг конкретной компании
query CompanyRatings(
  $limit:Int = 0
  $ratingCompanyId:Int!
  $groupBy:RatingGroupbyEnum
  $getRatingFullInfo:Boolean = true
  $getRatingCompanies:Boolean = false
  $getRatingCompany:Boolean = false
  $getCompanyFullData:Boolean = false
  $getRatingVoter:Boolean = false
  $getImageFormats:Boolean = false
  $getCompanyComments:Boolean = false
  $getCommentCompany:Boolean = false
  $getRatingsAvg:Boolean = false
  $getCompanyGallery:Boolean = false
  $getTVs:Boolean = false
  $getAllRatings:Boolean = true
  $getByTypeRatings:Boolean = false
  $companyCommentsSort:[SortBy]
  $getCommentAuthor:Boolean = false
  $getCompanyTopics:Boolean = false
  $getRatingVoters:Boolean = false
  $resourceGetAuthor:Boolean = false
  $resourceGetComments:Boolean = false
  $userGetComments:Boolean = false
  $ratingGetType:Boolean = false
  $resourceGetContent:Boolean = true
  $companyGetEditVersions:Boolean = false
  $editVersionGetCreator:Boolean = false
  $editVersionGetEditor:Boolean = false
  $editVersionGetCompany:Boolean = false
){
  ratings(  
    limit:$limit
    groupBy:$groupBy
    resource_id:$ratingCompanyId
  ) 
  @include(if:$getAllRatings)
  @skip(if:$getByTypeRatings)
  {
    ...Rating
  }
  
  #по типу
  ratingsByType:ratings(  
    limit:$limit
    groupBy:rating_type
    resource_id:$ratingCompanyId
  ) @include(if:$getByTypeRatings)
  {
    ...Rating
  }
}

# Получаем комментарии конкретной компании
query CompanyComments(
  $limit:Int = 0
  $commentsCompanyId:Int!
  $getCompanyFullData:Boolean = false
  $getImageFormats:Boolean = false
  $getCompanyComments:Boolean = false
  $getCommentCompany:Boolean = false
  $getRatingsAvg:Boolean = false
  $getCompanyGallery:Boolean = false
  $withPagination:Boolean = false
  $getTVs:Boolean = false
  $commentsSort:[SortBy]
  $companyCommentsSort:[SortBy]
  $getCommentAuthor:Boolean = false
  $getCompanyTopics:Boolean = false
  $getRatingVoters:Boolean = false
  $resourceGetAuthor:Boolean = false
  $resourceGetComments:Boolean = false
  $userGetComments:Boolean = false
  $resourceGetContent:Boolean = true
  $companyGetEditVersions:Boolean = false
  $editVersionGetCreator:Boolean = false
  $editVersionGetEditor:Boolean = false
  $editVersionGetCompany:Boolean = false
  $commentGetResource:Boolean = false
){
  comments(  
    limit:$limit
    resource_id:$commentsCompanyId
    sort:$commentsSort
  ) @skip(if:$withPagination)
  {
    ...Comment
  }
  commentsList(  
    limit:$limit
    resource_id:$commentsCompanyId
    sort:$commentsSort
  ) @include(if:$withPagination)
  {
    count
    total
    object{
      ...Comment
    }
  }
}

# Получаем средний рейтинг по компании
query CompanyAvgRatings(
  $ratingCompanyId:Int!
  $getRatingFullInfo:Boolean = true
  $getRatingCompanies:Boolean = false
  $getRatingCompany:Boolean = false
  $getCompanyFullData:Boolean = false
  $getRatingVoter:Boolean = true
  $getImageFormats:Boolean = true
  $getCompanyComments:Boolean = false
  $getCommentCompany:Boolean = false
  $getRatingsAvg:Boolean = false
  $getCompanyGallery:Boolean = false
  $getTVs:Boolean = false
  $companyCommentsSort:[SortBy]
  $getCommentAuthor:Boolean = false
  $getCompanyTopics:Boolean = false
  $getRatingVoters:Boolean = false
  $resourceGetAuthor:Boolean = false
  $resourceGetComments:Boolean = false
  $userGetComments:Boolean = false
  $ratingGetType:Boolean = false
  $resourceGetContent:Boolean = true
  $companyGetEditVersions:Boolean = false
  $editVersionGetCreator:Boolean = false
  $editVersionGetEditor:Boolean = false
  $editVersionGetCompany:Boolean = false
){
  ratings(  
    limit:1
    groupBy:company
    resource_id:$ratingCompanyId
  ) {
    ...Rating
  }
}

# Получаем средний рейтинг по компании
query CompanyTopics(
  $resourcesLimit:Int = 0
  $resourceParent:Int!
  $getTVs:Boolean = false
  $withPagination:Boolean = false
  $getImageFormats:Boolean = true
  $resourceGetAuthor:Boolean = false
  $resourceGetComments:Boolean = false
  $resourceIds:[Int]
  $getCommentAuthor:Boolean = false
  $userGetComments:Boolean = false
  $resourceTag:String
  $resourceGetContent:Boolean = true
  $resourcesPage:Int
  $resourceTemplate:Int
  $resourceUri:String
){
    ...RootTopics
}

query Users(
  $limit: Int!
  $getImageFormats:Boolean = false
  $userIds:[Int]
  $withPagination:Boolean = false
  $userGetComments:Boolean = false
  $getCommentAuthor:Boolean = false
  $usersPage:Int = 1
  $usersDelegatesOnly:Boolean = false
  $usersMyOnly:Boolean = false
) {
  
  usersList(
    limit:$limit
    ids:$userIds
    page:$usersPage
    delegatesOnly:$usersDelegatesOnly
    myOnly:$usersMyOnly
  ) @include(if:$withPagination)
  {
    count
    total
    limit
    page
    object{
      ...User
    }
  }
  users(
    limit:$limit
    ids:$userIds
    page:$usersPage
    delegatesOnly:$usersDelegatesOnly
    myOnly:$usersMyOnly
  ) @skip(if:$withPagination)
  {
    ...User
  }
}

query User(
  $userId: Int
  $getImageFormats:Boolean = false
  $userGetComments:Boolean = false
  $getCommentAuthor:Boolean = false
  $username:String
) {
  
  user(
    id:$userId
    username:$username
  ){
    ...User
  }
}

query CurrentUser(
  $getImageFormats:Boolean = false
  $userGetComments:Boolean = false
  $getCommentAuthor:Boolean = false
) {
  
  user(
    ownProfile: true
  ){
    ...User
  }
}

query Resources(
  $resourcesLimit:Int = 0
  $withPagination:Boolean = false
  $getTVs:Boolean = true
  $resourceTemplate:Int
  $resourceExcludeTemplates:[Int] = [27,28,15]
  $resourceType:ResourceTypeEnum
  $getImageFormats:Boolean = true
  $resourceGetAuthor:Boolean = false
  $resourceGetComments:Boolean = false
  $getCommentAuthor:Boolean = false
  $userGetComments:Boolean = false
  $resourceParent:Int
  $resourceUri:String
  $resourceGetContent:Boolean = true
  $resourcesCoords:SearchCoordsType
  $resourcesCenter:InputCoordsType
  $resourcesPage:Int
){
  
  ...ResourcesList
  # resources(
  #   limit:$resourcesLimit
  #   template:$resourceTemplate
  #   excludeTemplates:$resourceExcludeTemplates
  # )@skip(if:$withPagination)
  # {
  #   ...Resource
  # }
}

query Cities(
  $resourcesLimit:Int = 0
  $withPagination:Boolean = false
  $resourceTemplate:Int
  $resourceExcludeTemplates:[Int]
  $resourceType:ResourceTypeEnum
  $resourceParent:Int = 1296
  $resourceUri:String
  $resourcesCoords:SearchCoordsType
  $resourcesCenter:InputCoordsType
  $resourceAlias:String
  $cityGetFullData:Boolean = false
  $getImageFormats:Boolean = false
  $getTVs:Boolean = false
  $getCommentAuthor:Boolean = false
  $resourceGetAuthor:Boolean = false
  $resourceGetComments:Boolean = false
  $userGetComments:Boolean = false
  $resourceGetContent:Boolean = true
){
  
  ...CitiesList
}

fragment CitiesList on RootType{
  resourcesList(
    limit:$resourcesLimit
    template:$resourceTemplate
    excludeTemplates:$resourceExcludeTemplates
    resourceType:$resourceType
    parent:$resourceParent
    uri:$resourceUri
    coords:$resourcesCoords
    center:$resourcesCenter
    alias:$resourceAlias
  )@include(if:$withPagination)
  {
    count
    total
    object{
      ...City
    }
  }
  resources(
    limit:$resourcesLimit
    template:$resourceTemplate
    excludeTemplates:$resourceExcludeTemplates
    resourceType:$resourceType
    parent:$resourceParent
    uri:$resourceUri
    coords:$resourcesCoords
    center:$resourcesCenter
    alias:$resourceAlias
  )@skip(if:$withPagination)
  {
    ...City
  }
}

fragment City on ResourceType{
  id
  name
  longtitle
  alias
  uri
  coords {
    lat
    lng
    zoom
  }
  image
  imageFormats{
    marker_thumb
  }
  parent
  ...Resource @include(if: $cityGetFullData)
}

# Типы рейтингов
query RatingTypes(
  $resourcesLimit:Int = 0
  $withPagination:Boolean = false
  $getTVs:Boolean = true
  $resourceTemplate:Int = 30
  $resourceExcludeTemplates:[Int]
  $resourceType:ResourceTypeEnum
  $getImageFormats:Boolean = true
  $resourceGetAuthor:Boolean = false
  $resourceGetComments:Boolean = false
  $getCommentAuthor:Boolean = false
  $userGetComments:Boolean = false
  $resourceParent:Int = 1349
  $resourceUri:String
  $resourceGetContent:Boolean = true
  $resourcesCoords:SearchCoordsType
  $resourcesCenter:InputCoordsType
  $resourcesPage:Int
){
  
  ...ResourcesList
}

# Данные для страницы рейтингов
query RatingsPageData(
  $resourcesLimit:Int = 0
  $resourceTemplate:Int = 30
  $resourceExcludeTemplates:[Int]
  $resourceType:ResourceTypeEnum
  $resourceParent:Int = 1349
  
  $limit:Int = 0
  $ratingsGroupBy:RatingGroupbyEnum
  $getRatingCompanies:Boolean = false
  $getRatingCompany:Boolean = false
  $getCompanyFullData:Boolean = false
  $getCompanyComments:Boolean = false
  $getCommentCompany:Boolean = false
  $getImageFormats:Boolean = false
  $getRatingsAvg:Boolean = false
  $getRatingFullInfo:Boolean = false
  $getRatingVoter:Boolean = false
  $withPagination:Boolean = false
  $ratingsResourceId:Int
  $getCompanyGallery:Boolean = false
  $getTVs:Boolean = false
  $companyCommentsSort:[SortBy]
  $getCommentAuthor:Boolean = false
  $getCompanyTopics:Boolean = false
  $getRatingVoters:Boolean = false
  $resourceGetAuthor:Boolean = false
  $resourceGetComments:Boolean = false
  $userGetComments:Boolean = false
  $ratingGetType:Boolean = false
  $resourceUri:String
  $resourceGetContent:Boolean = true
  $companyGetEditVersions:Boolean = false
  $editVersionGetCreator:Boolean = false
  $editVersionGetEditor:Boolean = false
  $editVersionGetCompany:Boolean = false
  $resourcesCoords:SearchCoordsType
  $resourcesCenter:InputCoordsType
  $resourcesPage:Int
){
  
  ...ResourcesList
  
  ...Ratings
}


query Topics(
  $resourcesLimit:Int = 0
  $withPagination:Boolean = false
  $getTVs:Boolean = true
  $resourceParent:Int
  $getImageFormats:Boolean = true
  $resourceGetAuthor:Boolean = false
  $resourceGetComments:Boolean = false
  $resourceIds:[Int]
  $getCommentAuthor:Boolean = false
  $userGetComments:Boolean = false
  $resourceTag:String
  $resourceGetContent:Boolean = true
  $resourcesPage:Int
  $resourceTemplate:Int
  $resourceUri:String
){
  
  ...RootTopics
}


query Topic(
  # $resourcesLimit:Int = 0
  # $withPagination:Boolean = false
  $getTVs:Boolean = true
  # $resourceParent:Int
  $getImageFormats:Boolean = true
  $resourceGetAuthor:Boolean = false
  $resourceGetComments:Boolean = false
  $resourceId:Int
  $getCommentAuthor:Boolean = false
  $userGetComments:Boolean = false
  $resourceTag:String
  $resourceGetContent:Boolean = true
  # $resourcesPage:Int
  # $resourceTemplate:Int
  $resourceUri:String
){
  topic:resource(
    id:$resourceId
    uri:$resourceUri
    resourceType:topic
    tag:$resourceTag
  ){
    ...Topic
  }
}

query ObzoryZavedeniy(
  $resourcesLimit:Int = 0
  $resourceParent:Int
  $getTVs:Boolean = false
  $withPagination:Boolean = false
  $getImageFormats:Boolean = true
  $resourceGetAuthor:Boolean = false
  $resourceGetComments:Boolean = false
  $resourceIds:[Int]
  $getCommentAuthor:Boolean = false
  $userGetComments:Boolean = false
  $resourceGetContent:Boolean = true
  $resourceTag:String
  $resourcesPage:Int
  $resourceTemplate:Int = 28
  $resourceUri:String
){
  
  ...RootTopics
}

fragment RootTopics on RootType{
  topics:resources(
    ids:$resourceIds
    resourceType:topic
    limit:$resourcesLimit
    parent:$resourceParent
    template:$resourceTemplate
    uri:$resourceUri
    tag:$resourceTag
    sort:[{
      by:id
      dir:desc
    }]
  ) @skip(if:$withPagination)
  {
    ...Topic
  }
  topicsList:resourcesList(
    ids:$resourceIds
    resourceType:topic
    limit:$resourcesLimit
    page:$resourcesPage
    parent:$resourceParent
    template:$resourceTemplate
    uri:$resourceUri
    tag:$resourceTag
    sort:[{
      by:id
      dir:desc
    }]
  ) @include(if:$withPagination)
  {
    count
    total
    limit
    page
    object{
      ...Topic
    }
  }
}

# fragment Obzory on RootType{
#   topics:resources(
#     ids:$resourceIds
#     resourceType:obzor
#     limit:$resourcesLimit
#     parent:$resourceParent
#     template:28
#     sort:[{
#       by:id
#       dir:desc
#     }]
#   ) @skip(if:$withPagination)
#   {
#     ...Topic
#   }
#   topicsList:resourcesList(
#     ids:$resourceIds
#     resourceType:obzor
#     limit:$resourcesLimit
#     parent:$resourceParent
#     template:28
#     sort:[{
#       by:id
#       dir:desc
#     }]
#   ) @include(if:$withPagination)
#   {
#     count
#     total
#     object{
#       ...Topic
#     }
#   }
# }


fragment Topic on ResourceType{
  ...Resource
}

fragment ResourcesList on RootType{
  resourcesList(
    limit:$resourcesLimit
    template:$resourceTemplate
    excludeTemplates:$resourceExcludeTemplates
    resourceType:$resourceType
    parent:$resourceParent
    uri:$resourceUri
    coords:$resourcesCoords
    center:$resourcesCenter
    page:$resourcesPage
  )@include(if:$withPagination)
  {
    count
    total
    limit
    page
    object{
      ...Resource
    }
  }
  resources(
    limit:$resourcesLimit
    template:$resourceTemplate
    excludeTemplates:$resourceExcludeTemplates
    resourceType:$resourceType
    parent:$resourceParent
    uri:$resourceUri
    coords:$resourcesCoords
    center:$resourcesCenter
  )@skip(if:$withPagination)
  {
    ...Resource
  }
}

fragment Resource on ResourceType{
  
  ...ResourceFields
  
  content @include(if:$resourceGetContent)
  editor_content @include(if:$resourceGetContent)
  plainText @include(if:$resourceGetContent)
  
  Author @include(if:$resourceGetAuthor)
  {
    ...User
  }
  comments(
    sort:{by: id, dir:asc}
  ) @include(if:$resourceGetComments)
  {
    ...CommentFields
    Author @include(if:$getCommentAuthor)
    {
      ...User
    }
  }
}

fragment ResourceFields on ResourceType{
  id
  name
  pagetitle
  longtitle
  template
  parent
  description
  alias
  uri
  deleted
  published
  publishedon
  pubdate
  createdon
  hidemenu
  searchable
  short_text
  tags
  image
  imageFormats{
    thumb
    marker_thumb
    slider_thumb
    slider_dot_thumb
    small
    middle
    big
  }
  createdby
  tvs @include(if:$getTVs)
  {
    address
    site
    facility_type
    phones
    work_time
    prices
    metro
  }
  coords{
    lat
    lng
  }
  _errors
  _isDirty
}

fragment Comment on CommentType{
  
  ...CommentFields
  
  Company @include(if:$getCommentCompany)
  {
    ...Company
  }
  Author @include(if:$getCommentAuthor)
  {
    ...User
  }
  Resource @include(if:$commentGetResource)
  {
    id
    name
    uri
  }
}

fragment CommentFields on CommentType{
  id
  resource_id  
  target_id
  target_class
  text
  parent
  published
  deleted
  createdon
  createdonFormatted
  createdby
  _errors
  _Dirty
}

fragment Rating on RatingType{
  rating
  max_vote
  min_vote
  type
  target_id
  target_class
  voter
  ... on RatingType @include(if:$getRatingFullInfo)
  {
    quantity
    quantity_voters
    voted_companies
    voted_users
    voters @include(if:$getRatingVoter)
    {
      ...User
    }
    companies @include(if:$getRatingCompanies)
    {
      ...Company
    }
  }
  Company @include(if:$getRatingCompany)
  {
    ...Company
  }
  Type @include(if:$ratingGetType)
  {
    ...ResourceFields
  }
}

fragment Company on Company{
  
  ...CompanyFields
  
  ... on Company @include(if:$getCompanyFullData)
  {
    description 
    content
  }
  
  comments (
    sort:$companyCommentsSort
  )@include(if:$getCompanyComments)
  {
    id
    thread_id
    text
    author_username
    author_fullname
    author_avatar
    createdby
    parent
    published
    deleted
    createdon
    Company @include(if:$getCommentCompany)
    {
      ...CompanyFields
    }
    Author @include(if:$getCommentAuthor)
    {
      ...User
    }
  }
  
  ratingAvg @include(if: $getRatingsAvg) 
  {
    rating
    max_vote
    min_vote
    type
    target_id
    quantity
    quantity_voters
    voted_companies
    voted_users
    voter
    voters @include(if:$getRatingVoters)
    {
      ...User
    }
  }
  
  topics @include(if:$getCompanyTopics)
  {
    ...Topic
  }
  
  editVersions @include(if:$companyGetEditVersions)
  {
    ...editVersion
  }
}

fragment CompanyFields on Company{
  id
  name
  longtitle
  alias
  uri
  city_id
  city
  city_uri
  template
  published
  publishedon
  pubdate
  createdon
  createdby
  editedby
  editedon
  mapIcon
  image
  ...imageFormats @include(if:$getImageFormats)
  
  gallery @include(if:$getCompanyGallery)
  {
    image
    imageFormats @include(if:$getImageFormats)
    {
      original
      thumb
      marker_thumb
      slider_thumb
      slider_dot_thumb
      small
      middle
      big
    }
  }
  coords{
    lat
    lng
  }
  tvs @include(if:$getTVs)
  {
    address
    site
    facility_type
    phones
    work_time
    prices
    metro
    approved
  }
  schedule{
    ...ScheduleDay
  }
  schedule_men{
    ...ScheduleDay
  }
  schedule_women{
    ...ScheduleDay
  }
  schedule_family{
    ...ScheduleDay
  }
  prices
  errors
  _isDirty
}

fragment ScheduleDay on ScheduleDayType{
  start{
    ...ScheduleDayRange
  }
  end{
    ...ScheduleDayRange
  }
}

fragment ScheduleDayRange on ScheduleDayRangeType{
  year
  month
  day
  hour
  minute
  second
  weekDay
}

fragment imageFormats on Company{
    imageFormats {
      original
      thumb
      marker_thumb
      slider_thumb
      slider_dot_thumb
      small
      middle
      big
    }
}

fragment User on UserType {
  ...UserFields
  comments @include(if:$userGetComments)
  {
    ...CommentFields
    Author @include(if:$getCommentAuthor)
    {
      ...UserFields
    }
  }
}

fragment UserFields on UserType{
  id
  username
  fullname
  email
  active
  sudo
  blocked
  createdon
  createdby
  delegate
  offer
  offer_date
  contract_date
  image
  imageFormats @include(if:$getImageFormats)
  {
    thumb
    small
    middle
    big
  }
  notices{
    ...UserNoticeFields
  }
  _Dirty
}


fragment UserNoticeFields on UserNoticeType{
  id
  type
  comment
  active
}

query test(
  $limit:Int = 10
){
  companies(
    limit:$limit
    ids:[1275]
  ){
    id
    name
    # topics{
    #   id
    #   name
    # }
    # ratingsByType{
    #   id
    #   rating
    #   max_vote
    #   min_vote
    #   type
    #   target_id
    #   quantity
    #   voted_users
    # }
    comments{
      id
      published
      deleted
      text
    }
    # ratingAvg {
    #   id
    #   rating
    #   max_vote
    #   min_vote
    #   type
    #   quantity
    #   companies{
    #     id
    #     name
    #     pagetitle
    #     ratings {
    #       id
    #       target_id
    #       target_class
    #     }
    #   }
    # }
  }
}

mutation addCompany(
  $getRatingsAvg:Boolean = true
  $getImageFormats:Boolean = true
  $getCompanyComments:Boolean = true
  $getCommentCompany:Boolean = false
  $getCompanyFullData:Boolean = true
  $getCompanyGallery:Boolean = true
  $getTVs:Boolean = true
  $companyCommentsSort:[SortBy]
  $getCommentAuthor:Boolean = true
  $getCompanyTopics:Boolean = true
  $getRatingVoters:Boolean = true
  $resourceGetAuthor:Boolean = false
  $resourceGetComments:Boolean = false
  $userGetComments:Boolean = false
  $resourceGetContent:Boolean = true
  $companyGetEditVersions:Boolean = false
  $editVersionGetCreator:Boolean = false
  $editVersionGetEditor:Boolean = false
  $editVersionGetCompany:Boolean = false
){
  addCompany{
    ...Company
  }
}


# WebSocket connection

query WsConnections(
  $wsConnectionUserId:Int
  $wsConnectionSendMessage:Boolean = false
  $wsConnectionGetUser:Boolean = false
  $wsConnectionMessageType:String = ""
  $wsConnectionMessageText:String
  $getImageFormats:Boolean = false
  $wsConnectionGetCoords:Boolean = false
){
  ...RootWsConnections
}

query WsConnectionsByUserId(
  $wsConnectionUserId:Int!
  $wsConnectionSendMessage:Boolean = false
  $wsConnectionGetUser:Boolean = false
  $wsConnectionMessageType:String = ""
  $wsConnectionMessageText:String
  $getImageFormats:Boolean = false
  $wsConnectionGetCoords:Boolean = false
){
  ...RootWsConnections
}

fragment RootWsConnections on RootType{
  ws_connections(
    user:$wsConnectionUserId
  ){
    ...WsConnection
  }
}

fragment WsConnection on WsConnectionType{
  id
  status
  query{
    uid
  }
  coords @include(if:$wsConnectionGetCoords)
  {
    lat
    lng
    zoom
  }
  user @include(if:$wsConnectionGetUser)
  {
    ...UserFields
  }
  sendWsUserMessageTypeNotice(
    type:$wsConnectionMessageType
    text:$wsConnectionMessageText
  ) @include(if:$wsConnectionSendMessage)
  {
    type
    text
    message_id
  }
}

mutation logCoords(
  $lat:Float!
  $lng:Float!
  $wsConnectionSendMessage:Boolean = false
  $wsConnectionGetUser:Boolean = false
  $wsConnectionMessageType:String = ""
  $wsConnectionMessageText:String
  $getImageFormats:Boolean = false
  $wsConnectionGetCoords:Boolean = false
){
  logCoords(
    lat:$lat
    lng:$lng
  ){
    ...WsConnection
  }
}

query Redirects(
  $redirectsLimit:Int = 10
  $withPagination:Boolean = false
){
  ...RootRedirectsList
}

fragment RootRedirectsList on RootType{
  redirectsList(
    limit:$redirectsLimit
  ) @include(if:$withPagination)
  {
    count
    total
    object{
      ...Redirect
    }
  }
  
  redirects(
    limit:$redirectsLimit
  ) @skip(if:$withPagination)
  {
    ...Redirect
  }
}

fragment Redirect on RedirectType{
  id
  uri
  redirect_uri
  resource_id
}

mutation addCompanyGalleryImage(
  $companyId:Int!
  $image:String!
  $getRatingsAvg:Boolean = true
  $getImageFormats:Boolean = true
  $getCompanyComments:Boolean = true
  $getCommentCompany:Boolean = false
  $getCompanyFullData:Boolean = true
  $getCompanyGallery:Boolean = true
  $getTVs:Boolean = true
  $companyCommentsSort:[SortBy] = {by: id, dir:asc}
  $getCommentAuthor:Boolean = true
  $getCompanyTopics:Boolean = true
  $getRatingVoters:Boolean = true
  $resourceGetAuthor:Boolean = false
  $resourceGetComments:Boolean = false
  $userGetComments:Boolean = false
  $resourceGetContent:Boolean = true
  $companyGetEditVersions:Boolean = false
  $editVersionGetCreator:Boolean = false
  $editVersionGetEditor:Boolean = false
  $editVersionGetCompany:Boolean = false
){
  addCompanyGalleryImage(
    id: $companyId
    image: $image
  ){
    ...Company
  }
}

query Search(
  $searchLimit:Int = 10
  $searchQuery:String!
  $getRatingsAvg:Boolean = false
  $getImageFormats:Boolean = false
  $getCompanyComments:Boolean = false
  $getCommentCompany:Boolean = false
  $getCompanyFullData:Boolean = false
  $getCompanyGallery:Boolean = false
  $getTVs:Boolean = false
  $companyCommentsSort:[SortBy]
  $getCommentAuthor:Boolean = false
  $getCompanyTopics:Boolean = false
  $getRatingVoters:Boolean = false
  $resourceGetAuthor:Boolean = false
  $resourceGetComments:Boolean = false
  $userGetComments:Boolean = false
  $resourceGetContent:Boolean = true
  $companyGetEditVersions:Boolean = false
  $editVersionGetCreator:Boolean = false
  $editVersionGetEditor:Boolean = false
  $editVersionGetCompany:Boolean = false
){
  search(
    limit:$searchLimit
    search:$searchQuery
  ){
    ...Company
  }
}

query searchStats(
  $searchStatLimit:Int = 10
  $withPagination:Boolean = false
){
  ...RootSearchStats
}

fragment RootSearchStats on RootType{
  searchStatsList(
    limit:$searchStatLimit
  ) @include(if:$withPagination)
  {
    count
    total
    object{
      ...SearchStat
    }
  }
  
  searchStats(
    limit:$searchStatLimit
  ) @skip(if:$withPagination)
  {
    ...SearchStat
  }  
}

fragment SearchStat on SearchStatType{
  id
  query
  finded
  date
}

mutation saveSearchStat(
  $searchQuery:String!
  $searchFinded:Int!
){
  saveSearchStat(
    query: $searchQuery
    finded: $searchFinded
  ){
    ...SearchStat
  }
}

mutation addTopic(
  $getTVs:Boolean = true
){
  addTopic{
    ...ResourceFields
  }
}

mutation addComment(
  $commentTargetId:Int!
  $commentTargetClass:String = "modResource"
  $commentText:String
  $getCompanyFullData:Boolean = false
  $getImageFormats:Boolean = true
  $getCompanyComments:Boolean = false
  $getCommentCompany:Boolean = false
  $getRatingsAvg:Boolean = false
  $getCompanyGallery:Boolean = false
  $commentParent:Int
  $getTVs:Boolean = false
  $companyCommentsSort:[SortBy]
  $getCommentAuthor:Boolean = true
  $getCompanyTopics:Boolean = false
  $getRatingVoters:Boolean = false
  $resourceGetAuthor:Boolean = false
  $resourceGetComments:Boolean = false
  $userGetComments:Boolean = false
  $resourceGetContent:Boolean = true
  $companyGetEditVersions:Boolean = false
  $editVersionGetCreator:Boolean = false
  $editVersionGetEditor:Boolean = false
  $editVersionGetCompany:Boolean = false
  $commentGetResource:Boolean = false
){
  addComment(
    target_id:$commentTargetId
    target_class:$commentTargetClass
    parent:$commentParent
    text:$commentText
  ){
    ...Comment
  }
}

query editVersions(
  $editVersionStatus:[String]
  $editVersionCompanyId:Int
  $editVersionLimit:Int = 10
  $editVersionGetCreator:Boolean = false
  $editVersionGetEditor:Boolean = false
  $editVersionGetCompany:Boolean = false
  $withPagination:Boolean = false
  $editVersionSort:[SortBy] = [{
    by:id,
    dir:desc
  }]
  $getImageFormats:Boolean = false
  $getCompanyGallery:Boolean = false
  $getTVs:Boolean = false
){
  ...RootEditVersions
}

fragment RootEditVersions on RootType{
  editVersionsList(
    status:$editVersionStatus
    companyId:$editVersionCompanyId
    sort:$editVersionSort
    limit:$editVersionLimit
  ) @include(if:$withPagination)
  {
    count
    total
    object{
      ...editVersion
    }
  }
  editVersions(
    status:$editVersionStatus
    companyId:$editVersionCompanyId
    sort:$editVersionSort
    limit:$editVersionLimit
  ) @skip(if:$withPagination)
  {
    ...editVersion
  }
}


fragment editVersion on EditVersionType{
  
  ...editVersionFields
  
  CreatedBy @include(if:$editVersionGetCreator)
  {
    ...UserFields
  }
  
  EditedBy @include(if:$editVersionGetEditor)
  {
    ...UserFields
  }
  
  Company @include(if:$editVersionGetCompany)
  {
    ...CompanyFields
  }
}

fragment editVersionFields on EditVersionType{id
  target_id
  createdby
  createdon
  editedby
  editedon
  status
  data
  message
  errors
}


mutation updateCompany(
  $updateCompanyId:Int!
  $updateCompanyData:JSON!
  $getImageFormats:Boolean = false
  $editVersionGetCreator:Boolean = false
  $editVersionGetEditor:Boolean = false
  $editVersionGetCompany:Boolean = false
  $getCompanyGallery:Boolean = false
  $getTVs:Boolean = false
){
  updateCompany(
    target_id: $updateCompanyId
    data:$updateCompanyData
  ){
    ...editVersion
  }
}

`;

export default defaultQuery;