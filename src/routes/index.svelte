<script>
	import { useCompaniesService } from '$src/companiesService';
	import { auth } from '$src/authContext';

	let newCompanyName = '';

	const companies = useCompaniesService($auth.uid);

	const createCompany = (companyName) => {
		companies.mutations.create({ companyName, userID: $auth.uid });
	};

	const deleteCompany = (companyID) => {
		companies.mutations.delete({ companyID });
	};

	const copyToClipboard = () => {
		$auth
			.getIdToken()
			.then((token) =>
				navigator.clipboard
					.writeText(token)
					.then(() => console.log('Clipboard now contains the ID token'))
			);
	};
</script>

<input type="text" bind:value={newCompanyName} />
<button on:click={() => createCompany(newCompanyName)}>Create Company</button>
<button on:click={copyToClipboard}>Copy ID Token to clipboard</button>

<div class="company-list">
	{#each $companies?.data || [] as company}
		<div class="company" on:click={() => deleteCompany(company.id)}>{company.name}</div>
	{/each}
</div>

<style>
	.company-list {
		display: grid;
		gap: 0.5rem;
		margin-top: 0.5rem;
	}

	.company {
		padding: 1rem;
		background-color: lightgray;
		font-weight: bold;
		cursor: pointer;
	}

	.company:hover {
		opacity: 0.9;
	}
</style>
