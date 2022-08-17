<div class="spinner" />

<style>
	.spinner {
		width: 1.5rem;
		height: 1.5rem;
		border: 2px solid black;
		border-top-color: transparent;
		border-radius: 50%;
		animation-name: spin;
		animation-duration: 1s;
		animation-timing-function: ease;
		animation-iteration-count: infinite;
	}

	@keyframes spin {
		from {
			transform: rotate(0deg);
		}

		to {
			transform: rotate(360deg);
		}
	}
</style>
