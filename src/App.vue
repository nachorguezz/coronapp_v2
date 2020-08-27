<template>
  <v-app id="app">
    <NavBar/>
    <v-main>
      <SnackBar/>
      <router-view/>
    </v-main>
    <Footer/>
  </v-app>
</template>

<script>
import Footer from "@/views/Footer";
import NavBar from "@/views/NavBar";
import SnackBar from "@/views/SnackBar";

export default {
  components: {SnackBar, NavBar, Footer},
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
