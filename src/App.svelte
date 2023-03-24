<script>
	import Navbar from "./Navbar.svelte";
	import Logo from "./Logo.svelte"
	import AppOriginal from "./wordleOriginal/AppOriginal.svelte"
</script>

<main>
	<Navbar />
	<Logo />
	<AppOriginal />
</main>

<style>
	main {
		height: 100vh;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: center;
		background-color: #121212;
		border-radius: 10px;
	}
</style>