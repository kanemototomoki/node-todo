<template>
  <div class="nav">
    <router-link to="/home">TodoList</router-link> |
    <router-link :to="{ name: 'userHome' }">MyPage</router-link> |
    <router-link :to="{ name: 'userList' }">UserList</router-link>
  </div>
</template>

<style lang="scss" scoped>
.nav {
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
