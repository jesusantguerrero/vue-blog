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
          {name: 'Login', href: '/login'},
          {name: 'Registration', href: '/registration'},
          {name: 'My Posts', href: '/my-posts'},
        ]
      }
		},
		
		mounted() {
			this.listenEvents();
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
					console.log(data);
					this.$toastr.info(`${data.comment.author.alias} has metioned you in a ${data.message}`);
				});
			}
		}
  };
</script>

<style lang="sass" scoped>
	.container
		padding-top: 50px
</style>


