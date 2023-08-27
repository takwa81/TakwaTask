// graphql/queries.ts
import { gql } from "@apollo/client";

export const GET_SYSTEM_PARAMETERS = gql`
query GetSystemParameters {
  getSystemParameters(pk: "hearAboutUs") {
      Items
      LastEvaluatedKey
      Count
  }
}
`;
