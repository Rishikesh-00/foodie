import { gql, request } from 'graphql-request'
const MASTER_URL = process.env.NEXT_PUBLIC_CLERK_BACKEND_API_URL;
// use to make getCategory request
const GetCategory = async () => {
  const query = gql`
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
  const result = await request(MASTER_URL, query)
  return result;
}


// 
const GetBusiness = async (category) => {
  // Adjust the query based on category
  const query = gql`
    query GetBusiness {
      restaurants${category && category !== 'all' ? `(where: {categories_some: {slug: "${category}"}})` : ''} {
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
  `;

  const result = await request(MASTER_URL, query);
  return result;
};



const GetBusinessDetails = async (businessSlug) => {
  // console.log(businessSlug)
  const query = gql`
    query RestaurantDetails {
  restaurant(where: {slug: "`+ businessSlug + `"}) {
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
    menu {
      ... on Menu {
        id
        category
        menuItem {
          ... on MenuItem {
            id
            name
            description
            price
            productImage {
              url
            }
          }
        }
      }
    }
  }
}
  `

  const result = await request(MASTER_URL, query)
  return result;
}


const AddToCart = async (data) => {
  // console.log({data})
  const query = gql`
      mutation MyMutation {
  createUserCart(
    data: {email: "`+data?.email+`", price: `+data.price+`, productDescription: "`+data.description+`", productImage: "`+data?.productImage+`", productName: "`+data.name+`"
    , restaurant: {connect: {slug: "`+data?.restaurantSlug+`"}}
    }
  ) {
    id
  }
  
  publishManyUserCarts(to: PUBLISHED) {
    count
  }
}
  `

  const result = await request(MASTER_URL, query)
  return result;
}

const GetUserCart=async(userEmail)=>{
  // console.log(userEmail)
  const query=gql`
    query GetUserCart {
  userCarts(where: {email: "`+userEmail+`"}, first: 100000000) {
    id
    price
    productDescription
    productImage
    productName
     restaurant {
    name
    banner {
      url
    }
    slug
  }
  }
}
  `
  const result = await request(MASTER_URL, query)
  return result;

}

export default {
  GetCategory, GetBusiness, GetBusinessDetails, AddToCart, GetUserCart
}