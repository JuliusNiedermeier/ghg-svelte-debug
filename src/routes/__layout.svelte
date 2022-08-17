<script lang="ts">
	import { auth } from '$src/services/firebase';
	import { onAuthStateChanged } from 'firebase/auth';
	import { onMount } from 'svelte';
	import Spinner from '$src/components/Spinner.svelte';
	import { auth as authContext } from '$src/authContext';
	import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

	function loginWithGoogle() {
		const provider = new GoogleAuthProvider();
		signInWithPopup(auth, provider);
	}

	onMount(() => {
		onAuthStateChanged(auth, async (user) => {
			if (!user) return loginWithGoogle();

			authContext.set(user);
			loading = false;
		});
	});

	let loading = true;
</script>

{#if loading}
	<div class="spinner">
		<Spinner />
	</div>
{/if}

{#if !loading}
	<slot />
{/if}

<style>
	:global(:root) {
		font-family: sans-serif;
	}

	.spinner {
		width: 100vw;
		height: 100vh;
		display: grid;
		place-items: center;
	}
</style>
