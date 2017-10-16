
const defaultQuery = `


query apiData(
  $limit:Int = 0
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
){
  companies(
    limit:$limit
    # offset:1
  ) {
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
  ){
    ...User
  }
  
  comments(limit:$limit) {
    ...Comment
  }
  
  ...ResourcesList
  ...Topics
}

query Companies (
  $limit:Int!
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
){
  companies(
    limit:$limit
    ids:$companyIds
  ) @skip(if:$withPagination)
  {
    ...Company
  }
  companiesList(
    limit:$limit
    ids:$companyIds
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
){
  company(
    id: $id
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
){
  ...RatingsList
}



query MainMenuData(
  $limit:Int!
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
  $getTVs:Boolean = false
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
){
  ...RatingsList
  
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

# Список компаний для карты
query MapCompanies (
  $limit:Int!
  $getCompanyFullData:Boolean = false
  $getImageFormats:Boolean = true
  $getCompanyComments:Boolean = false
  $getCommentCompany:Boolean = false
  $getRatingsAvg:Boolean = true
  $withPagination:Boolean = false
  $getCompanyGallery:Boolean = false
  $getTVs:Boolean = false
  $companyCommentsSort:[SortBy]
  $getCommentAuthor:Boolean = false
  $getCompanyTopics:Boolean = false
  $getRatingVoters:Boolean = false
  $resourceGetAuthor:Boolean = false
  $resourceGetComments:Boolean = false
  $userGetComments:Boolean = false
){
  companiesList(
    limit:$limit
  )
  @include(if:$withPagination)
  {
    count
    total
    object{
      ...Company
    }
  }
  companies(
    limit:$limit
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
){
    ...Topics
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
) {
  
  usersList(
    limit:$limit
    ids:$userIds
    page:$usersPage
    delegatesOnly:$usersDelegatesOnly
  ) @include(if:$withPagination)
  {
    count
    total
    object{
      ...User
    }
  }
  users(
    limit:$limit
    ids:$userIds
    page:$usersPage
    delegatesOnly:$usersDelegatesOnly
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
  $getTVs:Boolean = true
  $resourceTemplate:Int
  $resourceExcludeTemplates:[Int]
  $resourceType:ResourceTypeEnum
  $getImageFormats:Boolean = true
  $resourceGetAuthor:Boolean = false
  $resourceGetComments:Boolean = false
  $getCommentAuthor:Boolean = false
  $userGetComments:Boolean = false
  $resourceParent:Int = 1296
){
  
  ...ResourcesList
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
){
  
  ...Topics
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
){
  
  ...Obzory
}

fragment Topics on RootType{
  topics:resources(
    ids:$resourceIds
    resourceType:topic
    limit:$resourcesLimit
    parent:$resourceParent
    sort:[{
      by:id
      dir:desc
    }]
  ) @skip(if:$withPagination)
  {
    ...Topic
  }
  topicsList:resourcesList(
    resourceType:topic
    limit:$resourcesLimit
    parent:$resourceParent
  ) @include(if:$withPagination)
  {
    count
    total
    object{
      ...Topic
    }
  }
}

fragment Obzory on RootType{
  topics:resources(
    ids:$resourceIds
    resourceType:obzor
    limit:$resourcesLimit
    parent:$resourceParent
    template:28
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
    resourceType:obzor
    limit:$resourcesLimit
    parent:$resourceParent
    template:28
    sort:[{
      by:id
      dir:desc
    }]
  ) @include(if:$withPagination)
  {
    count
    total
    object{
      ...Topic
    }
  }
}


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
  )@include(if:$withPagination)
  {
    count
    total
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
  )@skip(if:$withPagination)
  {
    ...Resource
  }
}

fragment Resource on ResourceType{
  
  ...ResourceFields
  
  Author @include(if:$resourceGetAuthor)
  {
    ...User
  }
  comments @include(if:$resourceGetComments)
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
  content
  alias
  uri
  deleted
  published
  publishedon
  pubdate
  createdon
  hidemenu
  short_text
  topic_tags
  topic_tags_array
  image
  imageFormats{
    thumb
    marker_thumb
    slider_thumb
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
  createdby
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
  ... on Company @include(if:$getCompanyFullData)
  {
    description 
    content
  }
  comments (
    sort:$companyCommentsSort
  )
  @include(if:$getCompanyComments)
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
}

fragment CompanyFields on Company{
  id
  name 
}

fragment imageFormats on Company{
    imageFormats {
      original
      thumb
      marker_thumb
      slider_thumb
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
  _Dirty
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

`;

export default defaultQuery;