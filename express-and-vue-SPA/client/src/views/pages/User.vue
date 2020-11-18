<template>
  <div>
    <my-navi />
    <router-view
      :loginUser="loginUser"
      :userList="userList"
      @update-user-list="updateUserList"
      @logout="logout"
    />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import MyNavi from '@/components/Navi.vue';

export default {
  components: {
    MyNavi,
  },
  methods: {
    ...mapActions('user', [
      'logout',
      'updateUserList',
    ]),
  },
  computed: {
    ...mapGetters('user', [
      'loginUser',
      'isAuthenticated',
      'userList',
    ]),
  },
  watch: {
    isAuthenticated() {
      if (!this.isAuthenticated) {
        this.$router.push({ name: 'login' });
      }
    },
  },
};
</script>
