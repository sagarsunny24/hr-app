import { gql } from "@apollo/client";


export const LOGIN_MUTATION = gql`
mutation {
  login(input: $input) {
    accessToken
    role
  }
}
`;

export const REGISTER_MUTATION = gql`
mutation RegisterCompany($input: RegisterDetails!) {
  register(input: $input) {
    message
  }
}`
