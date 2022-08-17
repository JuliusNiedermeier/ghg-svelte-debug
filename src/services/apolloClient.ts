import { ApolloClient, InMemoryCache, HttpLink, ApolloLink } from '@apollo/client/core';
import { setContext } from '@apollo/client/link/context';
import { auth as authContext } from '$src/authContext';

const getIdToken = () =>
	new Promise<string | null>((resolve) => {
		authContext.subscribe(async (user) => {
			if (!user) resolve(null);
			else resolve(await user.getIdToken());
		});
	});

const authLink = setContext(async (operation, { headers }) => {
	const token = await getIdToken();
	return { headers: { ...headers, authorization: `Bearer ${token}` } };
});

const httpLink = new HttpLink({ uri: 'http://localhost:4000' });

export const client = new ApolloClient({
	link: ApolloLink.from([authLink, httpLink]),
	cache: new InMemoryCache({
		typePolicies: {
			Location: {
				fields: {
					name: (existing) => `Cached: ${existing}`
				}
			}
		}
	})
});
