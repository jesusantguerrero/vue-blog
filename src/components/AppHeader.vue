<template>
   <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
      <div class="container">
        <router-link class="navbar-brand" to="/"> {{ appTitle }} </router-link>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarResponsive">
          <ul class="navbar-nav ml-auto">
              
            <li :key="i" v-for="(route, i) of routes" class="nav-item active" v-show="(!route.hideAuth && isLogged) || (route.hideAuth && !isLogged) || !route.hideAuth">
              <router-link class="nav-link" :to="route.href"> {{ route.name }}
                <span class="sr-only">(current)</span>
              </router-link>
            </li>

						<li class="nav-item dropdown" v-if="isLogged && $root.currentUser">
								<a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
									@{{ $root.currentUser.username }}
								</a>
								<div class="dropdown-menu" aria-labelledby="navbarDropdown">
									<router-link class="dropdown-item" :to="userLink()"> Profile </router-link>
									<router-link class="dropdown-item" to="/config"> config </router-link>
									<div class="dropdown-divider"></div>
									<a class="dropdown-item" href="/api/auth/logout">logout</a>
								</div>
							</li>

          </ul>
        </div>
      </div>
    </nav>
</template>

<script>
    export default {
        props: ['routes', 'appTitle']
    }
</script>

