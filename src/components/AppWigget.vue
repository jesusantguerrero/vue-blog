<template>
		<!-- Search Widget -->
	<div class="card my-4">
		<h5 class="card-header"> {{ title }}</h5>
		<div class="card-body">
			<slot></slot>
		</div>
	</div>
</template>

<script>
	export default {
		props: ['title']
	}
</script>

