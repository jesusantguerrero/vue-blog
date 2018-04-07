<template>
  <div id="app">
    <froala :tag="'textarea'" :config="config" v-model="value" :value="model"></froala>
		<button @click="save"> {{ btnSaveText || 'Save' }} </button>
		<button @click="cancel"> {{ btnCancelText || 'Cancel' }} </button>
  </div>
</template>

<script>
import VueFroala from 'vue-froala-wysiwyg';

export default {
	props: ['model', 'btnSaveText', 'btnCancelText', 'id'],
  data () {
    return {
			value: this.model,
      config: {
        events: {
          'froalaEditor.initialized': function () {
  
          }
        }
      },
    }
	},
	methods: {
		save() {
			this.$emit('saved', this.value, this.id)
		},

		cancel() {
			this.$emit('canceled')
		}
	}
}
</script>