import { gql, type TypedDocumentNode } from "@apollo/client";
import type { LoginArgs, LoginMutationResponse } from "@hr-app/shared";


export const LOGIN_MUTATION :TypedDocumentNode<LoginMutationResponse,LoginArgs> = gql`
mutation Login($input:LoginCredentials!) {
  login(input: $input) {
    accessToken
    role
    profile_image_path
  }
}
`;

export const REGISTER_MUTATION = gql`
mutation RegisterCompany($input: RegisterDetails!) {
  register(input: $input) {
    message
  }
}`
