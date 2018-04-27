<template>
    <div class="text-center login-box" v-show="users && me">
			<form class="form-signin">
				<h4 class="h3 mb-3 font-weight-normal"> {{ title || 'Confirm Your Profile'}} </h4>
				<div class="d-flex justify-content-center">
					<img class="d-flex mr-3 rounded-circle" :src=" user.picture || 'http://placehold.it/50x50'" alt=""> 
				</div>
				<br>
				<button class="btn btn-lg btn-primary btn-block" type="submit" @click.prevent="setPicture"> Set Picture </button>
				<br>

				<div class="form-group">
					<label for="username" class="sr-only"> Username </label>
					<p :class="{ 'control': true }">
						<input  type="name" id="username" v-model.lazy="user.username" v-validate="`required|alpha_num|not_in:${users}`" class="form-control" :class="{'input': true, 'is-danger': errors.has('username') }" name="username" placeholder="username">
						<span v-show="errors.has('username')" class="help text-danger">{{ errors.first('username') }}</span>
					</p>
				</div>

				<div class="form-group">
					<label for="username" class="sr-only"> Name </label>
					<p :class="{ 'control': true }">
						<input  type="name" id="name" v-model.lazy="user.name" v-validate="'required|alpha_spaces'" class="form-control" :class="{'input': true, 'is-danger': errors.has('name') }" 
						name="name" placeholder="your name">
						<span v-show="errors.has('name')" class="help text-danger">{{ errors.first('name') }}</span>
					</p>
				</div>

				<div class="form-group">
					<label for="username" class="sr-only"> Lastname </label>
					<p :class="{ 'control': true }">
						<input  type="name" id="lastname" v-model="user.lastname" v-validate.lazy="'required|alpha_spaces'" class="form-control" :class="{'input': true, 'is-danger': errors.has('lastname') }" name="lastname" placeholder="lastname">
						<span v-show="errors.has('lastname')" class="help text-danger">{{ errors.first('lastname') }}</span>
					</p>
				</div>

				<div class="form-group">
					<label for="username" class="sr-only"> Description </label>
					<p :class="{ 'control': true }">
						<textarea  type="description" id="description" v-model="user.description" v-validate.lazy="'required'" class="form-control" :class="{'input': true, 'is-danger': errors.has('description') }" name="description" placeholder="description">
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
	props: {
		title: {
			type: String,
			default: null
		},
		redirect: {
			type: Boolean,
			default: true
		}
	},
	data() {
		return {
			user: {
				username: '',
				name: '',
				lastname: '',
				description: '',
      	alias: '',
				picture: '',
				isPrivate: false,
			},
			users: '',
		}
	},

	watch: {
		me() {
			if (this.me.length) {
				this.user.username = this.me.username;
				this.user = this.me;
			}
		},
		'user.name'() {
			this.user.alias = `${this.user.name} ${this.user.lastname}`; 
		},

		'user.lastname'() {
			this.user.alias = `${this.user.name} ${this.user.lastname}`; 
		}
	},

	mounted() {
		this.getUsers();
		this.user = this.me;
	},

	methods: {
		updateAccount() {
			this.$validator.validateAll()
				.then((result) => {
					if (result) {
						this.$http.post(`/auth/update_profile/${this.me.id}`, this.user)
						.then(() => {
							this.$toastr.success('done');
							if (this.redirect) {
								this.$router.push('/new-post');
							} else {
								window.location.reload();
							}
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
						if (user.username !== this.me.username) 
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

