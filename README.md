# Context

Für einen Freund entwickle ich eine Web App zum erstellen von Klimabilanzen. Der Prototyp nutzt die Neo4j Datenbank, auf die mittels einer GraphQL API zugegriffen wird. Um im Frontend diese API effizient zu nutzen, möchte ich wiederkehrende Fetch-Logic in eine Helper-Function verpacken.

Mein Ziel ist es für einzelne Entitäten wie z.B. User, Company oder Location jeweils eine Funktion zu erstellen, die mir ein Objekt dieser Art zurück gibt:

```ts
type Service = {
	subscribe: (result) => Unsubscriber;
	mutations: {
		addNew: (input) => Result;
		delete: (id) => Result;
		// ...
	};
};

const locations: Service = useLocationService('company-id');

locations.subscribe((result) => console.log(result));

locations.mutations.addNew({ name: 'New Location', companyID: 'company-owning-the-location' });
```

useLocationService() würde ich überall da, wo ich zugriff auf die Locations brauche importieren.
So muss ich den Service nur einmal definieren:

```ts
export const useLocationsService = (companyID: string) =>
	createService({
		query: createQuery<QueryResult, QueryVariables>(
			client,
			{
				query: GET_LOCATIONS, // GraphQL Query
				variables: { companyID }
			},
			(result) => result.locations
		),
		mutations: {
			addNew: <AddNewResult, AddNewVariables>createMutation(client, { mutation: CREATE_LOCATION }),
			delete: <DeleteResult, DeleteVariables>createMutation(client, { mutation: DELETE_LOCATION })
		}
	});
```

Das technisch umzusetzen gelingt mir mit JavaScript. Mir ist es aber wichtig, dass jeder Service type safe ist und das gelingt mir nicht.

## Setup

```bash
npm install
npm run dev
```
