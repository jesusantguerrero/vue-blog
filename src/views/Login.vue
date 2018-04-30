<template>
    <div class="text-center login-box">
			<form class="form-signin">
				<h1 class="h3 mb-3 font-weight-normal">Please sign in</h1>
				
				<div class="form-group">
					<label class="sr-only" for="email">Email</label>
					<p :class="{ 'control': true }">
							<input v-validate="'required|email'" v-model.lazy="user.email" class="form-control" :class="{'input': true, 'is-danger': errors.has('email') }" name="email" type="text" placeholder="Email">
							<span v-show="errors.has('email')" class="help text-danger">{{ errors.first('email') }}</span>
					</p>
				</div>

				<div class="form-group">
					<label for="password" class="sr-only">Password</label>
					<p :class="{ 'control': true }">
							<input  type="password" id="password" v-model.lazy="user.password" v-validate="'required'" class="form-control" :class="{'input': true, 'is-danger': errors.has('password') }" name="password" placeholder="password">
							<span v-show="errors.has('password')" class="help text-danger">{{ errors.first('password') }}</span>
					</p>
				</div>
				
				<div class="checkbox mb-3">
					<label>
						<input type="checkbox" value="remember-me"> Remember me
					</label>
				</div>


				<button class="btn btn-lg btn-primary btn-block" type="submit" @click.prevent="login">Sign in</button>
				<router-link to="/reset_password">Forgot password </router-link>
				<p class="mt-5 mb-3 text-muted">&copy; 2017-2018</p>
    	</form>
		</div>
</template>

<script>
export default {
	data() {
		return {
			user: {
				email: '',
				password: ''
			}
		}
	},
	methods: {
		login() {
			this.$validator.validateAll()
				.then((result) => {
					if (result) {
						this.$http.post('/auth/login', this.user)
						.then((user) => {
							sessionStorage.setItem('user', this.user);
							if (user) {
								window.location.reload();
							}
						}).catch((err) => {
							this.$toastr.error(`${err.response.statusText}`);
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
		padding-top: 70px
		height: 60vh
		width: 100%
		display: flex
		align-items: center
		justify-content: center

		form
			width: 50%
</style>


