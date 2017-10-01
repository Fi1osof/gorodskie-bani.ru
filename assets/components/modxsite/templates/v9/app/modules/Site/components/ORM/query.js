
const defaultQuery = `

query apiData(
  $limit:Int = 0
  $getRatingsAvg:Boolean = false
  $getImageFormats:Boolean = false
  $getCompanyComments:Boolean = false
  $getCommentCompany:Boolean = false
  $getCompanyFullData:Boolean = false
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
    company_id
    voter
  }
  users(limit:$limit) {
    ...User
  }
  comments(limit:$limit) {
    ...Comment
  }
}


query Companies (
  $limit:Int!
  $getRatingsAvg:Boolean = false
  $getImageFormats:Boolean = false
  $getCompanyComments:Boolean = false
  $getCommentCompany:Boolean = false
  $getCompanyFullData:Boolean = false
  $companyIds:[Int]
){
  companies(
    limit:$limit
    ids:$companyIds
  ){
    ...Company
  }
}

query Company(
	$id:Int!
  $getRatingsAvg:Boolean = false
  $getImageFormats:Boolean = false
  $getCompanyComments:Boolean = false
  $getCommentCompany:Boolean = false
  $getCompanyFullData:Boolean = false
){
  company(
    id: $id
  ) {
  	...Company
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
){ 
  ratings(
    limit:$limit
    groupBy:$ratingsGroupBy
  ) {
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
){
  comments(
    limit: $limit
  ){
    ...Comment
  }
}

fragment Comment on CommentType{
  id
  thread_id
  text
  parent
  published
  deleted
  createdon
  createdby
  resource_id
  Company @include(if:$getCommentCompany)
  {
    ...Company
  }
}

fragment Rating on RatingsType{
  rating
  max_vote
  min_vote
  type
  company_id
  ... on RatingsType @include(if:$getRatingFullInfo)
  {
    quantity
    quantity_voters
    voted_companies
    companies @include(if:$getRatingCompanies)
    {
      ...Company
    }
  }
  Company @include(if:$getRatingCompany)
  {
    ...Company
  }
}

query CompanyRatings(
  $groupBy:RatingGroupbyEnum
){
  ratings(
    limit:0
    groupBy:$groupBy
  ) {
    rating
    max_vote
    min_vote
    type
    company_id
    quantity
    quantity_voters
    voted_companies
    voted_users
    voter
  }
}

query Users(
  $limit: Int!
  $getImageFormats:Boolean = false
) {
  
  users(
    limit:$limit
  ){
    ...User
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
  image
  coords{
    lat
    lng
  }
  ... on Company @include(if:$getCompanyFullData)
  {
    description 
    content
    ...imageFormats @include(if:$getImageFormats)
  }
  comments @include(if:$getCompanyComments)
  {
    id
    thread_id
    text
    author_username
    author_fullname
    author_avatar
    parent
    published
    deleted
    createdon
    Company @include(if:$getCommentCompany)
    {
      ...CompanyFields
    }
  }
  ratingAvg @include(if: $getRatingsAvg) 
  {
    rating
    max_vote
    min_vote
    type
    company_id
    quantity
    quantity_voters
    voted_companies
    voted_users
    voter
    voters{
      ...User
    }
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
      small
      middle
      big
    }
}

fragment User on UserType {
  id
  username
  fullname
  email
  active
  sudo
  blocked
  image
  imageFormats @include(if:$getImageFormats)
  {
    thumb
    small
    middle
    big
  }
}


`;

export default defaultQuery;