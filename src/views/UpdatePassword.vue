<template>
			<form class="form-signin">
				<br>
				<div class="form-group" v-if="requireOld">
					<label for="password" >Old Password</label>
					<p :class="{ 'control': true }">
							<input  type="password" id="old-password" v-model="user.oldPassword" v-validate="'required'" class="form-control" :class="{'input': true, 'is-danger': errors.has('old-password') }" name="old-password" placeholder="old password">
							<span v-show="errors.has('old-password')" class="help text-danger">{{ errors.first('old-password') }}</span>
					</p>
				</div>

				<div class="form-group">
					<label for="password" >Password</label>
					<p :class="{ 'control': true }">
							<input  type="password" id="password" v-model="user.password" v-validate="'required'" class="form-control" :class="{'input': true, 'is-danger': errors.has('password') }" name="password" placeholder="password">
							<span v-show="errors.has('password')" class="help text-danger">{{ errors.first('password') }}</span>
					</p>
				</div>

				<div class="form-group">
					<label for="password"> Confirm Password</label>
					<p :class="{ 'control': true }">
							<input  type="password" id="confirm-password" v-validate="'required|confirmed:password'" class="form-control" :class="{'input': true, 'is-danger': errors.has('password-confirm') }" name="confirm-password" placeholder="confirm password">
							<span v-show="errors.has('confirm-password')" class="help text-danger">{{ errors.first('confirm-password') }}</span>
					</p>
				</div>

				<button class="btn btn-lg btn-primary btn-block" type="submit" @click.prevent="updatePassword">Sign up</button>
    	</form>
</template>

<script>
import axios from 'axios';

export default {
	props: {
		requireOld: {
			type: Boolean,
			default: false
		}
	},
	data() {
		return {
			user: {
      	oldPassword: '',
      	password: '',
			},
		}
	},

	methods: {
		updatePassword() {
			this.$validator.validateAll()
				.then((result) => {
					if (result) {
						this.$http.post('/auth/update_password', this.user)
						.then(() => {
							this.$toastr.success('new password');
							this.setCurrentUser(null);
							this.$router.push('/login');
						}).catch((err) => {
							this.$toastr.error(`${err.response.statusText}`)
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
