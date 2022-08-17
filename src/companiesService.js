import { client } from '$src/services/apolloClient';
import { gql } from '@apollo/client/core';
import { createService } from '$src/utils/create-service/createServiceJS';

const GET_COMPANIES = gql`
	query ($userID: ID!) {
		companies(where: { users_SINGLE: { id: $userID } }) {
			id
			name
		}
	}
`;

const CREATE_COMPANY = gql`
	mutation ($userID: ID!, $companyName: String!) {
		createCompanies(
			input: { name: $companyName, users: { connect: { where: { node: { id: $userID } } } } }
		) {
			companies {
				id
				name
			}
		}
	}
`;

const DELETE_COMPANY = gql`
	mutation ($companyID: ID!) {
		deleteCompanies(where: { id: $companyID }) {
			nodesDeleted
		}
	}
`;

export const useCompaniesService = (userID) => {
	return createService(
		client,
		{ query: GET_COMPANIES, variables: { userID }, transform: (result) => result.companies },
		{
			create: {
				mutation: CREATE_COMPANY,
				update: (cache, result) => {
					const cachedResult = cache.readQuery({ query: GET_COMPANIES, variables: { userID } });
					cache.writeQuery({
						query: GET_COMPANIES,
						variables: { userID },
						data: {
							companies: [...cachedResult.companies, result.data.createCompanies.companies[0]]
						}
					});
				}
			},
			delete: {
				mutation: DELETE_COMPANY,
				refetchQueries: [{ query: GET_COMPANIES, variables: { userID } }]
			}
		}
	);
};
