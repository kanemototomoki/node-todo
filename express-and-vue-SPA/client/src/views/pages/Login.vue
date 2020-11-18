<template>
  <my-login-form
    :user="user"
    @login="login"
  />
</template>

<script>
import { mapGetters } from 'vuex';
import MyLoginForm from '@/components/LoginForm.vue';

export default {
  components: {
    MyLoginForm,
  },
  data() {
    return {
      user: {
        username: 'user1',
        password: 'sugoi_pw',
      },
    };
  },
  methods: {
    login() {
      const param = {
        username: this.user.username,
        password: this.user.password,
      };
      this.$store.dispatch('user/updateLoginUser', param);
    },
  },
  computed: {
    ...mapGetters('user', [
      'loginUser',
      'isAuthenticated',
    ]),
  },
  watch: {
    isAuthenticated() {
      if (this.isAuthenticated) {
        this.$router.push({ name: 'home' });
      }
    },
  },
};
</script>
