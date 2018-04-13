<template>
  <div>
    <froala :tag="'textarea'" :config="config" v-model="value" :value="model" contenteditable="true" @input="input"></froala>
			<slot></slot>
			<div class="d-flex flex-row justify-content-end">
					<slot name="actions-before"></slot>
					<button class="btn btn-danger" @click="cancel"> {{ btnCancelText || 'Cancel' }} </button>
					<slot name="actions-between"></slot>
					<button @click="save" class="btn btn-success"> {{ btnSaveText || 'Save' }} </button>
					<slot name="actions-after"></slot>
			</div>
  </div>
</template>

<script>
import VueFroala from 'vue-froala-wysiwyg';
const atJsConfig = {}

export default {
	props: ['model', 'btnSaveText', 'btnCancelText', 'id'],
  data () {
    return {
			value: this.model,
			atJsConfig,
      config: {
        events: {
          'froalaEditor.initialized': (e, editor) => {
						this.generateAtJsConfig();
						editor.$el.atwho(this.atJsConfig)

						editor.events.on('keydown', (e) => {
							if (e.which == $.FroalaEditor.KEYCODE.ENTER && editor.$el.atwho('isSelecting')) {
								return false;
							}
						}, true)
          }
        }
      },
    }
	},

	mounted() {
		this.generateAtJsConfig()
	},

	methods: {
		save() {
			this.$emit('saved', this.value, this.id)
		},

		cancel() {
			this.$emit('canceled')
		},

		input() {
			this.$emit('input', this.value)
		},

		generateAtJsConfig() {
			const datasource = ["Jacob", "Isabella", "Ethan", "Emma", "Michael", "Olivia" ];

			// Build data to be used in At.JS config.
    	const names = datasource.map((value, i) => {
      	return {
        	'id': i, 'name': value, 'email': value + "@email.com"
      	};
			});
			
 
    	// Define config for At.JS.
    	this.atJsConfig = {
      	at: "@",
				data: names,
				editableAtwhoQueryAttrs: {"data-fr-verified": true},
      	displayTpl: '<li>${name} <small>${email}</small></li>',
      	limit: 200
    	}
		}
	}
}
</script>

<style lang="sass" scoped>
	.btn
		margin: 5px
</style>
