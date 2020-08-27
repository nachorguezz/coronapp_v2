<template>
  <v-app-bar color="green" dense dark app>
    <v-row>
      <v-col cols="2" class="d-flex justify-center without-padding-left">
        <v-toolbar-title>
          <router-link to="/" tag="span" style="cursor: pointer">
            <v-img
                :src="require('../assets/covid19-icon.png')"
                class="my-3"
                contain
                height="50"
            />
          </router-link>
        </v-toolbar-title>
      </v-col>
      <v-col cols="3"/>
      <v-spacer/>
      <v-spacer/>
      <v-spacer/>
      <v-col cols="4" class="d-flex justify-end align-center without-padding-right">
        <v-btn v-if="isAuthenticated" icon @click="userSignOut">
          <v-icon>exit_to_app</v-icon>
        </v-btn>
        <v-btn v-else icon to="/login">
          <v-icon>lock_open</v-icon>
        </v-btn>
      </v-col>
      <v-col class="without-padding-left"/>

    </v-row>
  </v-app-bar>
</template>

<script>
export default {
  components: {  },
  computed: {
    isAuthenticated() {
      return this.$store.getters.isLoggedIn;
    }
  },
  data() {
    return {
    };
  },
  methods: {
    userSignOut() {
      this.$store.dispatch("logout").then(() => {
        this.$i18n.locale = "en";
        this.$store.dispatch("setLanguage", "en");
        this.$router.push("/login");
      });
    }
  }
};
</script>
