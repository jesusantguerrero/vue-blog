<template>
  <div >
    <froala :tag="'textarea'" :config="config" v-model="value" :value="model" contenteditable="true" @input="input" v-show="atJsConfig.length"></froala>
			<slot></slot>
			<div class="d-flex flex-row justify-content-end">
					<slot name="actions-before"></slot>
					<button class="btn btn-danger" @click.prevent="cancel"> {{ btnCancelText || 'Cancel' }} </button>
					<slot name="actions-between"></slot>
					<button @click.prevent="save" class="btn btn-success"> {{ btnSaveText || 'Save' }} </button>
					<slot name="actions-after"></slot>
			</div>
  </div>
</template>

<script>
import VueFroala from 'vue-froala-wysiwyg';
const atJsConfig = {};
const commentToolbar =  ['undo', 'redo' , '|', 'bold', 'italic', 'underline', 'strikeThrough', 'subscript', 'superscript', 'clearFormatting', 'insertTable'];
const reachToolbar = [...commentToolbar, '|','formatOL','formatUL','insertLink','insertImage','insertVideo','|','quote','paragraphStyle', 'paragraphFormat', ];

export default {
	props: ['model', 'btnSaveText', 'btnCancelText', 'id', "isDeleteOnSave",'isComment'],
  data () {
    return {
			value: this.model,
			atJsConfig,
      config: {
				toolbarButtons: this.isComment ? commentToolbar : reachToolbar,
				imageUploadParam: 'froala',
				imageUploadURL: '/api/upload_froala',
				imageUploadMethod: 'POST',
        imageMaxSize: 5 * 1024 * 1024, 
        imageAllowedTypes: ['jpeg', 'jpg', 'png'],
        events: {
          'froalaEditor.initialized': async (e, editor) => {
						await this.generateAtJsConfig();
						editor.$el.atwho(this.atJsConfig)

						editor.events.on('keydown', (e) => {
							if (e.which == $.FroalaEditor.KEYCODE.ENTER && editor.$el.atwho('isSelecting')) {
								return false;
							}
						}, true)
					},
					'froalaEditor.image.uploaded': (e, editor, response) => {
      		},
      		'froalaEditor.image.error': (e, editor, error, response) => {
						switch (error.code) {
							case 1:
								
								break;
						
							default:
								break;
						}
        	}
				}
			}
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
			this.value = '';
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
				insertTpl: '<a href="/#/author/${id}">${atwho-at}${name}</a>',
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
