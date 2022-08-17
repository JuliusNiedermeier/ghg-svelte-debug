import type {
	ApolloClient,
	ApolloQueryResult,
	NormalizedCacheObject,
	WatchQueryOptions
} from '@apollo/client/core';
import type { Subscription } from 'zen-observable-ts';

export type QueryRunner = <TransformedQueryResult>(
	onNext: (value: ApolloQueryResult<TransformedQueryResult>) => void
) => Subscription;

export type QueryResultTransformer = <QueryResult, TransformedQueryResult>(
	result: QueryResult
) => TransformedQueryResult;

export type QueryFactory = <QueryResult, QueryVariables>(
	client: ApolloClient<NormalizedCacheObject>,
	options: WatchQueryOptions<QueryVariables, QueryResult>,
	transform: QueryResultTransformer
) => QueryRunner;

export const createQuery: QueryFactory = (client, options, transform) => (onNext) => {
	const observableQuery = client.watchQuery(options);
	return observableQuery.subscribe((value) => onNext({ ...value, data: transform(value.data) }));
};
