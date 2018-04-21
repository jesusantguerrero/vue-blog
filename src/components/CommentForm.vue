<template>
  <div >
    <froala :tag="'textarea'" :config="config" v-model="value" :value="model" contenteditable="true" @input="input" v-show="atJsConfig.length"></froala>
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
	props: ['model', 'btnSaveText', 'btnCancelText', 'id', "isDeleteOnSave"],
  data () {
    return {
			value: this.model,
			atJsConfig,
      config: {
        events: {
          'froalaEditor.initialized': async (e, editor) => {
						await this.generateAtJsConfig();
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

	watch: {
		model() {
			this.value = this.model;
		}
	},

	mounted() {
		this.generateAtJsConfig()
	},

	methods: {
		save() {
			if (this.isEmpty()) {
				this.$emit('saved', this.value, this.id)
				if (this.isDeleteOnSave) {
					this.value = ''
				}
			} else {
				this.$toastr.warning("all the fields are required");
			}
		},

		cancel() {
			this.$emit('canceled')
		},

		input() {
			this.$emit('input', this.value)
		},

		async generateAtJsConfig() {
			const datasource = await this.$http.get('/users?password_ne&isActive_ne').catch((err) => console.log(err));

			// Build data to be used in At.JS config.
    	const names = datasource.data.map((value, i) => {
      	return {
        	'id': value.id, 'name': value.username, 'email': value.email
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
		},

		isEmpty() {
			return $('.fr-element.fr-view').text().trim()
  	}
	}
}
</script>

<style lang="sass" scoped>
	.btn
		margin: 5px
</style>
