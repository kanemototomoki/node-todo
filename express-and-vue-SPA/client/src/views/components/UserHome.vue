<template>
  <div>
    <p>{{ loginUser.userName }} でログインしています。</p>
    <button
      type="button"
      @click="$emit('logout')"
    >
      ログアウト
    </button>
  </div>
</template>

<script>

export default {
  props: {
    loginUser: {
      type: Object,
    },
  },
};
</script>
