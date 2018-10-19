<template>
  	<div class="tab-pane fade" :class="classes" :id="ids" role="tabpanel" aria-labelledby="pills-contact-tab">
			<slot></slot>
		</div>
</template>

<script>
export default {
	name: "TabLink",
	props: ["ids", "classes"]
}
</script>

