import { writable } from 'svelte/store';
import type { ApolloQueryResult } from '@apollo/client/core';
import type { QueryRunner } from './createQuery';
import type { MutationRunner } from './createMutation';

export const createService = <MutationRunnerMap, TransformedQueryResult>(options: {
	query: QueryRunner<TransformedQueryResult>;
	mutations: Record<keyof MutationRunnerMap, MutationRunner>;
}) => {
	const genericStore = writable<ApolloQueryResult<TransformedQueryResult> | null>(null, (set) => {
		options.query((data) => set(data));
	});

	return {
		subscribe: genericStore.subscribe,
		mutations: options.mutations,
		// refresh: (ignoreCache: boolean) => {} // tell query observable to refetch
	};
};
