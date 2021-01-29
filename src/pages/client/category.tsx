import React, { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import gql from "graphql-tag";
import { RESTAURANT_FRAGMENT, CATEGORY_FRAGMENT } from "../../fragments";
import { useQuery } from "@apollo/client";
import { category, categoryVariables } from "../../__generated__/category";

const CATEGORY_QUERY = gql`
  query category($input: CategoryInput!) {
    category(input: $input) {
      ok
      error
      totalPages
      totalResults
      restaurants {
        ...RestaurantParts
      }
      category{
        ...CategoryParts
      }
    }
    ${RESTAURANT_FRAGMENT}
    ${CATEGORY_FRAGMENT}
  }
`;

interface ICategoryParams {
  slug: string;
}

export const Category = () => {
  const params = useParams<ICategoryParams>();
  const { data, loading } = useQuery<category, categoryVariables>(
    CATEGORY_QUERY,
    {
      variables: {
        input: {
          page: 1,
          slug: params.slug
        }
      }
    }
  );
  return <h1>Category</h1>;
};
