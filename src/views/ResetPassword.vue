<template>
    <div class="text-center login-box">
			<form class="form-signin" v-if="!isReset">
				<h1 class="h3 mb-3 font-weight-normal"> Type your email </h1>
				<br>
				<p> if you didn't receive the email you can resend the validation, you have two hours to confirm</p>
				<div class="form-group">
					<label for="email" class="sr-only">Email</label>
					<p :class="{ 'control': true }">
							<input v-validate="'required|email'" v-model.lazy="credentials.email" class="form-control" :class="{'input': true, 'is-danger': errors.has('email') }" name="email" type="text" placeholder="Email">
							<span v-show="errors.has('email')" class="help text-danger">{{ errors.first('email') }}</span>
					</p>
				</div>

				<button class="btn btn-lg btn-primary btn-block" type="submit" @click.prevent="resetPassword"> send </button>
    	</form>

			<UpdatePassword v-else></UpdatePassword>
		</div>
</template>

<script>
import axios from 'axios';
import UpdatePassword from './UpdatePassword';

export default {
	components: {
		UpdatePassword
	},
	data() {
		return {
			credentials: {
				email: localStorage.getItem('validationEmail') || '',
			},
			
			isReset: false,

			validationCredentials: {
				token: this.$route.params.token || ''
			}
		}
	},

	mounted() {
		this.validateResetPassword();
	},

	methods: {
		resetPassword() {
			this.$validator.validateAll()
				.then((result) => {
					if (result) {
						axios.post('/auth/reset_password', this.credentials)
						.then(() => {
							this.$toastr.success('email sent, check your email');
						}).catch((err) => {
							this.$toastr.error(`${err.response.statusText}`);
						});
						return
					}

					this.$toastr.warning('the form has some errors');
				})
		},

		validateResetPassword() {
			if (this.validationCredentials.token) {
					axios.post('/auth/validate_reset_password', this.validationCredentials)
						.then(({ data }) => {
							this.$toastr.success('your token has been validated');
							this.setCurrentUser(data)
							this.isReset = true;
						}).catch((err) => {
							this.$toastr.error(`${err.response.statusText}`);
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

