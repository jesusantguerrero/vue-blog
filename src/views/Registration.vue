<template>
    <div class="text-center login-box">
			<form class="form-signin">
				<h1 class="h3 mb-3 font-weight-normal">Sign Up</h1>


				<div class="form-group">
					<label for="inputEmail" class="sr-only"> Username </label>
					<input type="email" id="inputEmail" class="form-control" placeholder="Email address" required autofocus>
				</div>
				
				<div class="form-group">
					<label for="inputEmail" class="sr-only">Email address</label>
					<input type="email" id="inputEmail" class="form-control" placeholder="Email address" required autofocus>
				</div>

				<div class="form-group">
					<label for="inputPassword" class="sr-only">Password</label>
					<input type="password" id="inputPassword" class="form-control" placeholder="Password" required>
				</div>
				
				<div class="checkbox mb-3">
					<label>
						<input type="checkbox" value="remember-me"> Remember me
					</label>
				</div>

				<button class="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
				<p class="mt-5 mb-3 text-muted">&copy; 2017-2018</p>
    	</form>
		</div>
</template>

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

