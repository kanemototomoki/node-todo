<template>
  <form class="login-form" @submit.prevent="$emit('login')">
    <div class="row">
      <label>
        username:
        <input type="text" v-model="user.username">
      </label>
    </div>
    <div class="row">
      <label>
        password:
        <input type="password" v-model="user.password">
      </label>
    </div>
    <div class="row">
      <input type="submit" value="Login">
    </div>
  </form>
</template>

<script>
export default {
  props: {
    user: {
      type: Object,
      default() {
        return {
          username: '',
          password: '',
        };
      },
    },
  },
};
</script>


<style lang="scss" scoped>
.login-form {
  .row {
    & + .row {
      margin-top: 10px;
    }
  }

  input {
    display: inline-block;
  }
}
</style>
