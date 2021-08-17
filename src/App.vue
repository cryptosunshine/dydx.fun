<template>
  <div id="app">
    <img class="logo" src="./assets/1500x500.jpeg">
  </div>
</template>

<script>
export default {
  name: 'app',
}
</script>

<style>
html,body {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background: #13131c;
  width: 100%;
  height: 100%
}
.logo{
  width: 100%;
  position: absolute;
  bottom: 0;
}
</style>
