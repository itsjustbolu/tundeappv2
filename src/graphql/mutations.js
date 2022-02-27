/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createComplaint = /* GraphQL */ `
  mutation CreateComplaint(
    $input: CreateComplaintInput!
    $condition: ModelComplaintConditionInput
  ) {
    createComplaint(input: $input, condition: $condition) {
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
export const updateComplaint = /* GraphQL */ `
  mutation UpdateComplaint(
    $input: UpdateComplaintInput!
    $condition: ModelComplaintConditionInput
  ) {
    updateComplaint(input: $input, condition: $condition) {
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
export const deleteComplaint = /* GraphQL */ `
  mutation DeleteComplaint(
    $input: DeleteComplaintInput!
    $condition: ModelComplaintConditionInput
  ) {
    deleteComplaint(input: $input, condition: $condition) {
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
