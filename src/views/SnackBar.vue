<template>
  <v-container>
    <v-snackbar
        top=""
        v-model="snackbar.visible"
        :timeout="snackbar.timeout"
        :multi-line="snackbar.multiline === true"
        :color="snackbar.color"
        align-center
    >
      {{ snackbar.text }}
      <v-btn text="" dark="" @click="closeAlert">Close</v-btn>
    </v-snackbar>
  </v-container>
</template>
<script>
import { mapMutations } from "vuex";
export default {
  computed: {
    snackbar() {
      return this.$store.state.snackbar;
    }
  },
  methods: {
    ...mapMutations(["closeAlert"])
  }
};
</script>
