import type {
	ApolloClient,
	FetchResult,
	MutationOptions,
	NormalizedCacheObject
} from '@apollo/client/core';

export type MutationRunner = <MutationResult, MutationVariables>(
	variables: MutationVariables
) => Promise<FetchResult<MutationResult>>;

export type MutationFactory = <MutationResult, MutationVariables>(
	client: ApolloClient<NormalizedCacheObject>,
	options: MutationOptions<MutationResult, MutationVariables>
) => MutationRunner;

export const createMutation: MutationFactory = (client, options) => (variables) =>
	client.mutate({ ...options, variables });
