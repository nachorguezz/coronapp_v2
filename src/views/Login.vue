<template>
  <v-main>
    <v-container fluid fill-height>
      <v-layout justify-center>
        <v-flex xs12 sm8 md4>
          <v-card class="elevation-12" @keydown.enter="login">
            <v-toolbar color="primary" dark flat>
              <v-toolbar-title>Login form</v-toolbar-title>
              <v-spacer></v-spacer>
            </v-toolbar>
            <v-card-text>
              <v-form>
                <v-text-field
                    v-model="username"
                    label="Username"
                    name="username"
                    prepend-icon="person"
                    type="text"
                ></v-text-field>

                <v-text-field
                    v-model="password"
                    id="password"
                    label="Password"
                    name="password"
                    prepend-icon="lock"
                    type="password"
                ></v-text-field>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn @click="login" color="primary">Login</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-main>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      password: "",
      fromRoute: undefined
    };
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.fromRoute = from.name;
    });
  },

  methods: {
    handleBack() {
      if (this.fromRoute) {
        this.$router.back();
      } else {
        this.$router.push("/");
      }
    },
    login: function() {
      let username = this.username;
      let password = this.password;
      this.$store
          .dispatch("login", { username, password })
          .then(resp => {
            this.$i18n.locale = resp.data.user.userprofile.preferred_language;
            this.$store.dispatch(
                "setLanguage",
                resp.data.user.userprofile.preferred_language
            );
            this.handleBack();
          })
          .catch(err => {
            console.log(err);
            if (err.response.status === 400) {
              this.$store.commit("alert", {
                color: "error",
                timeout: 3000,
                text: err.response.data.detail
              });
            } else {
              this.$store.commit("alert", {
                color: "error",
                timeout: 3000,
                text: "An error has occurred. please try again"
              });
            }
          });
    }
  }
};
</script>
