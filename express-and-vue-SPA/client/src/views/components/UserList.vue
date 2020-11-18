<template>
  <div>
    <ul style="list-style: none; padding-left: 0;">
      <li
        v-for="user in userList"
        :key="user.id"
      >
        <p>
          ID: {{ user.id }}
          ユーザーネーム: {{ user.username }}
        </p>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    userList: {
      type: Array,
    },
  },
  created() {
    this.$emit('update-user-list');
  },
};
</script>
