import { gql } from 'graphql-tag';

export const GET_DISH = gql`
  query getDishQuery($input: GetDishInput!) {
    getDish(input: $input) {
      ok
      error
      dish {
        id
        name
        description
        price
        image
        restaurant {
          id
          name
          description
          coverImage
          address
          tel
          owner {
            id
            email
            phone
          }
        }
        dishOption {
          option
          choice {
            kind
            extraPrice
          }
          extraPrice
        }
      }
    }
  }
`;

export const LIKE_DISH = gql`
  mutation likeDishMutation($input: LikeDishInput!) {
    likeDish(input: $input) {
      ok
      error
    }
  }
`;

export const UNLIKE_DISH = gql`
  mutation unlikeDishMutation($input: UnlikeDishInput!) {
    unlikeDish(input: $input) {
      ok
      error
    }
  }
`;

export const CREATE_USER_MUTATION = gql`
  mutation createUserMutation($input: CreateUserInput!) {
    createUser(input: $input) {
      ok
      error
      user {
        id
      }
    }
  }
`;

export const LOGIN_MUTATION = gql`
  mutation loginUserMutation($input: LoginInput!) {
    loginUser(input: $input) {
      ok
      error
      token
    }
  }
`;

export const SEARCH = gql`
  query searchQuery($input: SearchInput!) {
    search(input: $input) {
      ok
      error
      restaurants {
        id
        name
        description
        coverImage
        address
        tel
        category {
          id
          name
        }
      }
      restaurantsCount
      dishes {
        id
        name
        description
        price
        image
      }
      dishCount
    }
  }
`;

export const ORDER = gql`
  mutation orderMutation($input: OrderInput!) {
    order(input: $input) {
      ok
      error
      order {
        id
        status
        dishes {
          name
          description
          image
        }
        totalPrice
        dishOption {
          option
          choice {
            kind
          }
        }
      }
    }
  }
`;

export const GET_ORDER = gql`
  query getOrderQuery($input: GetOrderInput!) {
    getOrder(input: $input) {
      ok
      error
      order {
        client {
          email
          address
          phone
          avatar
        }
        rider {
          email
          address
          phone
          avatar
          lat
          lng
        }
        status
        dishes {
          id
          name
          description
          image
          restaurant {
            id
            name
            description
            tel
            address
          }
        }
        totalPrice
        dishOption {
          option
          choice {
            kind
            extraPrice
          }
          extraPrice
        }
      }
    }
  }
`;

export const EDIT_USER = gql`
  mutation editUserMutation($input: EditUserInput!) {
    editUser(input: $input) {
      ok
      error
    }
  }
`;

export const CHANGE_ORDER_SUBSCRIPTION = gql`
  subscription changeOrderSubscription {
    changeOrder {
      id
      client {
        id
        email
      }
      rider {
        id
        email
        lat
        lng
      }
      status
    }
  }
`;

export const EDIT_ORDER = gql`
  mutation editOrderMutation($input: EditStatusOrderInput!) {
    editOrder(input: $input) {
      ok
      error
    }
  }
`;
