import { gql, useMutation, useApolloClient } from "@apollo/client";
import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import {
  verifyEmail,
  verifyEmailVariables
} from "../../__generated__/verifyEmail";
import { useLocation, useHistory } from "react-router";
import { useMe } from "../../hooks/useMe";

const VERIFY_EMAIL_MUTATION = gql`
  mutation verifyEmail($input: VerifyEmailInput!) {
    verifyEmail(input: $input) {
      ok
      error
    }
  }
`;

export const ConfirmEmail = () => {
  const { data: userData, refetch } = useMe();
  const client = useApolloClient();
  const history = useHistory();
  const onCompleted = async (data: verifyEmail) => {
    const {
      verifyEmail: { ok }
    } = data;
    if (ok && userData?.me.id) {
      await refetch();
      history.push("/");
    }
  };
  const [verifyEmail] = useMutation<verifyEmail, verifyEmailVariables>(
    VERIFY_EMAIL_MUTATION,
    {
      onCompleted
    }
  );
  const location = useLocation();
  useEffect(() => {
    const [_, code] = window.location.href.split("code=");
    verifyEmail({
      variables: {
        input: {
          code
        }
      }
    });
  }, [verifyEmail]);
  return (
    <div className="mt-52 flex flex-col items-center justify-center">
      <Helmet>
        <title>Verify Email | Nuber Eats</title>
      </Helmet>
      <h2 className="text-lg mb-1 font-medium">Confirming email...</h2>
      <h4 className="text-gray-700 text-sm">
        Please wait, don't close this page...
      </h4>
    </div>
  );
};
