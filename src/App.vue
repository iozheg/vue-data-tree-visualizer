<template>
  <div id="app">
    <TreeVisualizer msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
import TreeVisualizer from "./components/TreeVisualizer.vue";

export default {
  name: "App",
  components: {
    TreeVisualizer,
  },
};
</script>

<style>
* {
  box-sizing: border-box;
  margin: 0;
}
html, body {
  height: 100%;
}
#app {
  width: 100%;
  height: 100%;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
}
</style>
