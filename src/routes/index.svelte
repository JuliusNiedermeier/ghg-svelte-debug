<script lang="ts">
	import { useLocationsService } from '$src/locationsService';

	const locations = useLocationsService('');
	$: console.log($locations);

	const mutate = () => locations.mutations.createLocation({});
</script>

<button on:click={mutate} />
