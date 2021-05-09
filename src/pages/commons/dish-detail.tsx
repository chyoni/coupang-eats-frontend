import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import React from 'react';
import { useParams } from 'react-router';
import { Loading } from '../../components/loading';
import {
  getDishQuery,
  getDishQueryVariables,
} from '../../__generated__/getDishQuery';

const GET_DISH = gql`
  query getDishQuery($input: GetDishInput!) {
    getDish(input: $input) {
      ok
      error
      dish {
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

interface IParams {
  id: string;
}

export const DishDetail: React.FunctionComponent = () => {
  const { id: dishId } = useParams<IParams>();
  const {
    loading: getDishLoading,
    error: getDishError,
    data: getDishData,
  } = useQuery<getDishQuery, getDishQueryVariables>(GET_DISH, {
    variables: { input: { id: parseInt(dishId) } },
  });
  console.log(getDishData);
  if (getDishLoading || getDishError) {
    return (
      <div className='container w-full max-w-full h-screen flex items-center justify-center'>
        <Loading />
      </div>
    );
  } else {
    return (
      <div className='container max-w-full w-full h-screen mt-32 px-10 flex flex-col'>
        <div className='w-full flex items-center justify-center h-1/2'>
          <div className='w-1/2 flex items-center justify-center'>
            <img src={getDishData?.getDish.dish?.image} alt={"food"} className="rounded-full w-96 h-96" />
          </div>
          <div className="w-1/2 flex flex-col">
            <div className="border border-gray-300 w-full flex flex-col p-4 rounded-sm">
              <div className="text-xs text-gray-700">Menu info.</div>
              <div>
                <div className="flex items-center mt-2">
                  <div className="text-base mr-3">Menu:</div>
                  <div className="text-base">{getDishData?.getDish.dish?.name}</div>
                </div>
                <div className="flex items-center mt-2">
                  <div className="text-base mr-3">Description:</div>
                  <div className="text-base">{getDishData?.getDish.dish?.description}</div>
                </div>
                <div className="flex items-center mt-2">
                  <div className="text-base mr-3">Price:</div>
                  <div className="text-base">{getDishData?.getDish.dish?.price} 원</div>
                </div>
              </div>
            </div>
            <div className="border border-gray-300 w-full flex flex-col p-4 rounded-sm mt-7">
              <div className="text-xs text-gray-700">Restaurant info.</div>
              <div className="flex items-center mt-4">
                <div className="text-base mr-3">Restaurant:</div>
                <div className="text-base">{getDishData?.getDish.dish?.restaurant.name}</div>
              </div>
              <div className="flex items-center mt-4">
                <div className="text-base mr-3">Address:</div>
                <div className="text-base">{getDishData?.getDish.dish?.restaurant.address}</div>
              </div>
              <div className="flex items-center mt-4">
                <div className="text-base mr-3">Tel:</div>
                <div className="text-base">{getDishData?.getDish.dish?.restaurant.tel}</div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full h-1/2 flex items-center justify-center">
          <div className="p-5 border border-gray-300 rounded-lg mb-10 hover:border-black transition-colors cursor-pointer">Start order</div>
        </div>
      </div>
    );
  }
};
