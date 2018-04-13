<template>
	<li class="nav-item">
		<a class="nav-link" :class="classes" :id="ids" data-toggle="pill" :href="refs" role="tab" :aria-controls="ids" aria-selected="false"> 
			{{ title}}
		</a>
	</li>
</template>

<script>
export default {
	props: ["ids", "refs", "title", "classes" ]
}
</script>

