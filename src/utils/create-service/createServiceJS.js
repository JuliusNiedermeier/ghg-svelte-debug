import { readable } from 'svelte/store';

export const createService = (client, queryConfig, mutationConfigMap) => {
	const { subscribe } = readable(null, (set) => {
		client
			.watchQuery(queryConfig)
			.subscribe((result) => set({ ...result, data: queryConfig.transform(result.data) }));
	});

	const mutations = Object.keys(mutationConfigMap).reduce((mutations, mutationConfigKey) => {
		const mutation = (variables) => {
			return client.mutate({ ...mutationConfigMap[mutationConfigKey], variables });
		};
		return { ...mutations, [mutationConfigKey]: mutation };
	}, {});

	return {
		subscribe,
		mutations,
		refresh: (ignoreCache) => {} // tell query observable to refetch
	};
};
