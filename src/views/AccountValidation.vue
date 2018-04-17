<template>
    <div class="text-center login-box">
			<form class="form-signin">
				<h1 class="h3 mb-3 font-weight-normal"> Email Validation </h1>
				<br>
				<p> if you didn't receive the email you can resend the validation, you have two hours to confirm</p>
				<div class="form-group">
					<label for="email" class="sr-only">Email</label>
					<p :class="{ 'control': true }">
							<input v-validate="'required|email'" v-model="credentials.email" class="form-control" :class="{'input': true, 'is-danger': errors.has('email') }" name="email" type="text" placeholder="Email">
							<span v-show="errors.has('email')" class="help text-danger">{{ errors.first('email') }}</span>
					</p>
				</div>

				<button class="btn btn-lg btn-primary btn-block" type="submit" @click.prevent="resendValidation"> Resend </button>
    	</form>
		</div>
</template>

<script>
import axios from 'axios';

export default {
	data() {
		return {
			credentials: {
      	email: localStorage.getItem('validationEmail') || '',
			},

			validationCredentials: {
				email: this.$route.params.email || '',
				token: this.$route.params.token || ''
			}
		}
	},

	methods: {
		resendValidation() {
			this.$validator.validateAll()
				.then((result) => {
					if (result) {

						axios.post('/auth/send_confirmation', this.credentials)
						.then(() => {
							this.$toastr('email sent, check yout email');
							//this.$router.push('/confirmation');
						}).catch((err) => {
							console.log(err);
						});
						return
					}

					this.$toastr.warning('the form has some errors');
				})
		},

		validateEmail() {
			if (this.validationCredentials.email && this.validationCredentials.token) {
					axios.post('/auth/validation', this.validationCredentials)
						.then(() => {
							this.$toastr('your email has been validated');
							this.$router.push('/new-post');
						}).catch((err) => {
							console.log(err);
						});
						return	
			}
		}
	}
}
</script>


<style lang="sass" scoped>
	.login-box
		margin-top: 30px
		padding-top: 70px
		height: 60vh
		width: 100%
		display: flex
		align-items: center
		justify-content: center

		form
			width: 50%
			max-width: 300px
</style>

