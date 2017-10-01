
const defaultQuery = `

query apiData(
  $limit:Int = 0
  $getRatingsAvg:Boolean = false
  $getImageFormats:Boolean = false
  $getComments:Boolean = false
  $getCommentCompany:Boolean = false
  $getCompanyFullData:Boolean = false
){
  companies(
    limit:$limit
    # offset:1
  ) {
    object {
      ...Company
    }
  }
  ratings(
    limit:$limit
  ){
    object{
      rating
      type
      company_id
      voter
    }
  }
  users(limit:$limit) {
    object {
      ...User
    }
  }
}


query Companies (
  $limit:Int!
  $getRatingsAvg:Boolean = false
  $getImageFormats:Boolean = false
  $getComments:Boolean = false
  $getCommentCompany:Boolean = false
  $getCompanyFullData:Boolean = false
){
  companies(
    limit:$limit
  ){
    count
    total
    limit
    page
    object{
      ...Company
    }
  }
}

query Company(
	$id:Int!
  $getRatingsAvg:Boolean = false
  $getImageFormats:Boolean = false
  $getComments:Boolean = false
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
  $ratingThread:Int
  $countRatings:Boolean = false
  $getRatingCompany:Boolean = false
  $getCompanyFullData:Boolean = false
  $getComments:Boolean = false
  $getCommentCompany:Boolean = false
  $getImageFormats:Boolean = false
  $getRatingsAvg:Boolean = false
  $getRatingFullInfo:Boolean = false
){ 
  ratings(
    limit:$limit
    groupBy:$ratingsGroupBy
    thread:$ratingThread
  ) {
    count
    limit
    total @include(if:$countRatings)
    page
    object{
      ...Rating
    }
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
    companies @include(if:$getRatingCompany)
    {
      ...Company
    }
  }
}

query CompanyRatings(
  $thread:Int!
  $groupBy:RatingGroupbyEnum
){
  ratings(
    limit:0
    thread:$thread
    groupBy:$groupBy
  ) {
    count
    total
    limit
    page
    object {
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
}

query Users(
  $limit: Int!
  $ids:[Int]!
) {
  
  users(
    limit:$limit
    ids:$ids
  ){
    count
    total
    limit
    page
    object {
      ...User
    }
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
  coords{
    lat
    lng
  }
  ... on Company @include(if:$getCompanyFullData)
  {
    description 
    content
    image
    ...imageFormats @include(if:$getImageFormats)
  }
  comments @include(if:$getComments)
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
    company @include(if:$getCommentCompany)
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
}


`;

export default defaultQuery;