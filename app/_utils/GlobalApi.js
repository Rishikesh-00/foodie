import { gql, request } from 'graphql-request'
const MASTER_URL=process.env.NEXT_PUBLIC_CLERK_BACKEND_API_URL;
// use to make getCategory request
const GetCategory=async()=>{
    const query=gql`
    query MyQuery {
  categories(first: 50) {
    id
    slug
    name
    icon {
      url
    }
  }
}
    `
    const result=await request(MASTER_URL,query)
    return result;
}


// 
const GetBusiness=async(category)=>{
  const query=gql`
    query GetBusiness {
  restaurants(where: {categories_some: {slug: "`+category+`"}}) {
    aboutUs
    address
    banner {
      url
    }
    categories {
      name
    }
    id
    name
    restroType
    slug
    workingHours
  }
}
  `

  const result=await request(MASTER_URL,query)
    return result;
}

export default{
    GetCategory,GetBusiness
}