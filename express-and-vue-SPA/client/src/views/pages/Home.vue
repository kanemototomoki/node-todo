<template>
  <div>
    <my-navi />
    <template>
      <my-add-todo-form
        @add-todo="addTodo"
        :targetTodo="targetTodo"
      />
    </template>
    <template>
      <div class="list-status">
        <p>総件数: {{ todoListLen }}</p>
        <p>完了済み: {{ completedTodoListLen }}</p>
      </div>
    </template>
    <template>
      <ul class="list">
        <my-todo-detail
          v-for="todo in todoList"
          :key="todo.id"
          :todo="todo"
          @update-completed="updateTodo(todo)"
          @delete-todo="deleteTodo(todo)"
          @update-todo="updateTodo(todo)"
        />
      </ul>
    </template>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

import MyNavi from '@/components/Navi.vue';
import MyAddTodoForm from '@/components/AddTodoForm.vue';
import MyTodoDetail from '@/components/TodoDetail.vue';

export default {
  components: {
    MyNavi,
    MyAddTodoForm,
    MyTodoDetail,
  },
  created() {
    this.getTodoList();
  },
  methods: {
    ...mapActions('todo', [
      'updateTodo',
      'deleteTodo',
    ]),
    ...mapActions('todo', {
      getTodoList: 'updateTodoList',
      addTodo: 'postTargetTodo',
    }),
  },
  computed: {
    ...mapGetters('todo', [
      'todoList',
      'targetTodo',
      'todoListLen',
      'completedTodoListLen',
    ]),
  },
};
</script>

<style lang="scss" scoped>
.list {
  list-style: none;
  padding: initial;
}
</style>
