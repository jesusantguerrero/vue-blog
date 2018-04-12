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
    }
  };
</script>

<style lang="sass" scoped>
	.btn
		margin: 5px

	.container
		padding-top: 50px
</style>


