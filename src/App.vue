<template>
  <div>
      <app-header appTitle="Vue Blog" :routes="routes"></app-header>
      <div class="container">
        <router-view></router-view>
      </div>
  </div>
</template>

<script>
	import AppHeader from './components/AppHeader';
	import Pusher from 'pusher-js';

  export default {
    components: {
      AppHeader
    },
    data() {
      return {
        routes: [
          {name: 'Home', href: '/'},
          {name: 'Login', href: '/login', hideAuth: true},
          {name: 'Registration', href: '/registration', hideAuth: true},
				],
				currentUser: {},
      }
		},
		
		mounted() {
			this.listenEvents();
			this.getCurrentUser();
		},
		
		methods: {
			listenEvents() {
				Pusher.logToConsole = true;

				const pusher = new Pusher('21afd18b9a96f017b4a4', {
					cluster: 'us2',
					encrypted: true
				});

				const channel = pusher.subscribe('comments', () => console.log('started'))

				channel.bind('new-mention', (data) => {
					console.log(data.mentions)
					if (data.mentions.includes(`@${this.me.username}`)) {
						this.$toastr.info(`${data.author.username} has metioned you in a comment`);
					}
				});
			},

			getCurrentUser() {
				this.$http.get('/auth/me')
				 .then(({data}) => {
					this.setCurrentUser(data);
				})
			}
		}
  };
</script>

<style lang="sass" scoped>
	.container
		padding-top: 50px
</style>


