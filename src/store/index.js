import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    status: "",
    token: localStorage.getItem("token") || "",
    user: JSON.parse(localStorage.getItem("user")) || "",
    snackbar: {
      visible: false,
      color: "success",
      text: null,
      timeout: 10000,
      multiline: false
    },
    language: localStorage.getItem("language") || "en",
    endpoint: process.env.NODE_ENV === 'production' ? "https://coronapp.es/prod-backend": "http://xxx.xx.xxx.xx:8000"
  },
  mutations: {
    auth_request(state) {
      state.status = "loading";
    },
    auth_success(state, data) {
      state.status = "success";
      state.token = data.token;
      state.user = data.user;
    },
    auth_error(state) {
      state.status = "error";
    },
    logout(state) {
      state.status = "";
      state.token = "";
      state.user = "";
    },
    alert(state, payload) {
      state.snackbar.text = payload.text;
      state.snackbar.multiline = payload.text.length;

      // Si es mas de 50 caracteres definirlo como multilinea
      if (payload.multiline) {
        state.snackbar.multiline = payload.multiline;
      }

      // Color para mensajes de error o éxito
      if (payload.color) {
        state.snackbar.color = payload.color;
      }

      // Tiempo de duración
      if (payload.timeout) {
        state.snackbar.timeout = payload.timeout;
      }
      state.snackbar.visible = true;
    },
    closeAlert(state) {
      state.snackbar.visible = false;
      state.snackbar.multiline = false;
      state.snackbar.text = null;
    },
    setLocale(state, lang) {
      localStorage.setItem("language", lang);
      state.language = lang;
    },
  },
  actions: {
    setLanguage({ commit }, language) {
      if (typeof language === "string") {
        commit("setLocale", language);
      }
    },
    login({ commit }, user) {
      return new Promise((resolve, reject) => {
        commit("auth_request");
        axios({
          url: this.state.endpoint + "/login/",
          data: user,
          method: "POST"
        })
            .then(resp => {
              const token = "token " + resp.data.token;
              const user = resp.data.user;
              localStorage.setItem("token", token);
              localStorage.setItem("user", JSON.stringify(user));
              axios.defaults.headers.common["Authorization"] = token;
              commit("auth_success", { token, user });
              resolve(resp);
            })
            .catch(err => {
              commit("auth_error");
              localStorage.removeItem("token");
              localStorage.removeItem("user");
              reject(err);
            });
      });
    },
    logout({ commit }) {
      return new Promise((resolve, reject) => {
        axios({ url: this.state.endpoint + "/logout/", method: "POST" })
            .then(resp => {
              localStorage.removeItem("token");
              localStorage.removeItem("user");
              delete axios.defaults.headers.common["Authorization"];
              commit("logout");
              resolve();
            })
            .catch(err => {
              commit("auth_error");
              localStorage.removeItem("token");
              localStorage.removeItem("user");
              reject(err);
            });
      });
    },

    forceLogout({ commit }) {
      return new Promise((resolve) => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        delete axios.defaults.headers.common["Authorization"];
        commit("logout");
        resolve();
      });
    }
  },
  getters: {
    isLoggedIn: state => !!state.token,
    authStatus: state => state.status,
    user: state => state.user,
  }
});

