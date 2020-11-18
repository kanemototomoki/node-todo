<template>
  <div id="app">
    <router-view class="content" />
  </div>
</template>

<style lang="scss" scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  padding: 50px;

  .content {
    margin: 0 auto;
    width: 860px;
    text-align: center;
  }
}
</style>
