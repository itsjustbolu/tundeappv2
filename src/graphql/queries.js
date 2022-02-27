/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getComplaint = /* GraphQL */ `
  query GetComplaint($id: ID!) {
    getComplaint(id: $id) {
      id
      name
      business_name
      email
      date
      area
      description
      image
      createdAt
      updatedAt
    }
  }
`;
export const listComplaints = /* GraphQL */ `
  query ListComplaints(
    $filter: ModelComplaintFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listComplaints(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        business_name
        email
        date
        area
        description
        image
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
