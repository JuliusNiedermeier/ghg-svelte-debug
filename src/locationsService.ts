import { client } from '$src/services/apolloClient';
import { gql } from '@apollo/client/core';
import { createService, createQuery, createMutation } from '$src/utils/create-service';

const GET_LOCATIONS = gql`
	query ($companyID: ID!) {
		locations(where: { company: { id: $companyID } }) {
			id
			name
		}
	}
`;

interface Location {
	id: string;
	name: string;
}

interface QueryResult {
	locations: Location[];
}

interface CreateLocationMutationResult {
	locations: Location[];
}

interface QueryVariables {
	companyID: string;
}

interface MutationVars {
	companyID: string;
}

export const useLocationsService = (companyID: string) =>
	createService({
		query: createQuery<QueryResult, QueryVariables>(
			client,
			{
				query: GET_LOCATIONS,
				variables: { companyID }
			},
			(result) => result
		),
		mutations: {
			createLocation: createMutation<CreateLocationMutationResult, MutationVars>(client, {
				mutation: gql``,
				variables: { companyID }
			}),
			updateLocation: createMutation<CreateLocationMutationResult, MutationVars>(client, {
				mutation: gql``,
				variables: { companyID }
			}),
			deleteLocation: createMutation<CreateLocationMutationResult, MutationVars>(client, {
				mutation: gql``,
				variables: { companyID }
			})
		}
	});
