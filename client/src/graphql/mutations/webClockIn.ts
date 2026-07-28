import { gql, type TypedDocumentNode } from "@apollo/client";
import type { ClockInArgs, ClockInResponse } from "@hr-app/shared";


export const WEB_CLOCK_MUTATION:TypedDocumentNode<ClockInResponse,Pick<ClockInArgs,"timestamp">> = gql`mutation Mutation($timestamp: String!) {
  webClockIn(timestamp: $timestamp) {
    checkIn
    checkOut
    isLoggedIn
    loggedTimestamp
    status
    totalHours
  }
}` 

