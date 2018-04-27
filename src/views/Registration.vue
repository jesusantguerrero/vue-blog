<template>
    <div class="text-center login-box">
			<form class="form-signin">
				<h1 class="h3 mb-3 font-weight-normal">Sign Up</h1>
				<br>

				<div class="form-group">
					<label for="email" class="sr-only">Email</label>
					<p :class="{ 'control': true }">
							<input v-validate="'required|email'" v-model.lazy="user.email" class="form-control" :class="{'input': true, 'is-danger': errors.has('email') }" name="email" type="text" placeholder="Email">
							<span v-show="errors.has('email')" class="help text-danger">{{ errors.first('email') }}</span>
					</p>
				</div>

				<div class="form-group">
					<label for="username" class="sr-only"> Username </label>
					<p :class="{ 'control': true }">
						<input  type="name" id="username" v-model.lazy="user.username" v-validate="'required|alpha_num'" class="form-control" :class="{'input': true, 'is-danger': errors.has('username') }" name="username" placeholder="username">
						<span v-show="errors.has('username')" class="help text-danger">{{ errors.first('username') }}</span>
					</p>
				</div>

				<div class="form-group">
					<label for="password" class="sr-only" >Password</label>
					<p :class="{ 'control': true }">
							<input  type="password" id="password" v-model.lazy="user.password" v-validate="'required'" class="form-control" :class="{'input': true, 'is-danger': errors.has('password') }" name="password" placeholder="password">
							<span v-show="errors.has('password')" class="help text-danger">{{ errors.first('password') }}</span>
					</p>
				</div>

				<div class="form-group">
					<label for="password" class="sr-only"> Confirm Password</label>
					<p :class="{ 'control': true }">
							<input  type="password" id="confirm-password" v-validate="'required|confirmed:password'" class="form-control" :class="{'input': true, 'is-danger': errors.has('password-confirm') }" name="confirm-password" placeholder="confirm password">
							<span v-show="errors.has('confirm-password')" class="help text-danger">{{ errors.first('confirm-password') }}</span>
					</p>
				</div>

				<button class="btn btn-lg btn-primary btn-block" type="submit" @click.prevent="registerAccount">Sign up</button>
    	</form>
		</div>
</template>

<script>
import axios from 'axios';

export default {
	data() {
		return {
			user: {
      	email: '',
      	username: '',
      	alias: '',
      	picture: '',
      	password: '',
				isActive: false,
			},
		}
	},

	methods: {
		registerAccount() {
			this.$validator.validateAll()
				.then((result) => {
					if (result) {
						this.$http.post('/auth/registration', this.user)
						.then(() => {
							this.$toastr.success('you will receive a validation email');
							localStorage.setItem('validationEmail', this.user.email);
							this.$router.push('/account/validation');
						}).catch((err) => {
							this.$toastr.error(`${err.response.statusText}`)
							console.log(err);
						});
						return
					}

					this.$toastr.warning('the form has some errors');
				})
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

