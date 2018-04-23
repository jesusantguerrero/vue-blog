<template>
    <div class="text-center login-box" v-show="users">
			<form class="form-signin">
				<h4 class="h3 mb-3 font-weight-normal"> Confirm Your Profile </h4>
				<div class="text-center">
					<img class="d-flex mr-3 rounded-circle" :src=" user.picture || 'http://placehold.it/50x50'" alt=""> 
				</div>
				<br>
				<button class="btn btn-lg btn-primary btn-block" type="submit" @click.prevent="setPicture"> Set Picture </button>

				<div class="form-group">
					<label for="username" class="sr-only"> Username </label>
					<p :class="{ 'control': true }">
						<input  type="name" id="username" v-model="user.username" v-validate="`required|alpha_num|not_in:${users}`" class="form-control" :class="{'input': true, 'is-danger': errors.has('username') }" name="username" placeholder="username">
						<span v-show="errors.has('username')" class="help text-danger">{{ errors.first('username') }}</span>
					</p>
				</div>

				<div class="form-group">
					<label for="username" class="sr-only"> Name </label>
					<p :class="{ 'control': true }">
						<input  type="name" id="name" v-model="user.name" v-validate="'required|alpha_spaces'" class="form-control" :class="{'input': true, 'is-danger': errors.has('name') }" name="name" placeholder="your name">
						<span v-show="errors.has('name')" class="help text-danger">{{ errors.first('name') }}</span>
					</p>
				</div>

				<div class="form-group">
					<label for="username" class="sr-only"> Lastname </label>
					<p :class="{ 'control': true }">
						<input  type="name" id="lastname" v-model="user.lastname" v-validate="'required|alpha_spaces'" class="form-control" :class="{'input': true, 'is-danger': errors.has('lastname') }" name="lastname" placeholder="lastname">
						<span v-show="errors.has('lastname')" class="help text-danger">{{ errors.first('lastname') }}</span>
					</p>
				</div>

				<div class="form-group">
					<label for="username" class="sr-only"> Description </label>
					<p :class="{ 'control': true }">
						<textarea  type="description" id="name" v-model="user.description" v-validate="'required'" class="form-control" :class="{'input': true, 'is-danger': errors.has('description') }" name="description" placeholder="description">
						</textarea>
						<span v-show="errors.has('description')" class="help text-danger">{{ errors.first('description') }}</span>
					</p>
				</div>
				<button class="btn btn-lg btn-primary btn-block" type="submit" @click.prevent="updateAccount"> Save </button>
    	</form>
		</div>
</template>

<script>
import axios from 'axios';
import gravatar from 'gravatar';

export default {
	data() {
		return {
			user: {
				username: '',
				name: '',
				lastname: '',
				description: '',
      	alias: '',
      	picture: '',
			},
			users: '',
		}
	},

	watch: {
		me() {
			if (this.me) {
				this.user.username = this.me.username;
			}
		}
	},

	mounted() {
		this.getUsers();
	},

	methods: {
		updateAccount() {
			this.$validator.validateAll()
				.then((result) => {
					if (result) {
						this.$http.post('/auth/confirmation', this.user)
						.then(() => {
							this.$toastr.success('done');
							this.$router.push('/new-post');
						}).catch((err) => {
							this.$toastr.error(`${err.response.statusText}`)
						});
						return
					}
					this.$toastr.warning('the form has some errors');
				})
		},

		getUsers() {
			this.$http.get('/users')
				.then(({ data }) => {
					const users = []; 
					data.forEach((user) => {
						if (user.username != this.me.username) 
							users.push(user.username)
					})
					this.users = users.join(',');
			})
		},

		setPicture() {
			this.user.picture = gravatar.url(this.me.email);
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

