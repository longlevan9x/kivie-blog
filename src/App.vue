<template>
  <Header></Header>
  <router-view />
  <Footer></Footer>
</template>

<style lang="scss"></style>
<script lang="ts">
import Header from "@/views/layouts/Header.vue";
import Footer from "@/views/layouts/Footer.vue";
import { Options, Vue } from "vue-class-component";

@Options({
  components: {
    Header,
    Footer,
  },
})
export default class HomeView extends Vue {}
</script>
