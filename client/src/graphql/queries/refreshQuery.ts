import { gql } from "@apollo/client";

export const REFRESH_QUERY = gql`query RefreshEndpoint {
  refreshEndpoint {
    accessToken
    profile_image_path
    role
  }
}`