import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api';
const state = () => ({
  todoList: [],
  targetTodo: {
    title: '',
    content: '',
  },
});

const getters = {
  todoList: (state) => state.todoList,
  targetTodo: (state) => state.targetTodo,
  todoListLen: (state, getters) => getters.todoList.length,
  completedTodoListLen: (state, getters) => getters.todoList.filter((val) => val.isCompleted).length,
};

const mutations = {
  updateTodoList(state, todoList) {
    state.todoList = todoList;
  },
  updateTargetTodo(state, todo) {
    state.targetTodo = todo;
  },
  resetTargetTodo(state) {
    state.targetTodo = {
      title: '',
      content: '',
    };
  },
};

const actions = {
  async updateTodoList({ commit }) {
    const todoList = await axios
      .get(`${BASE_URL}/todo`)
      .then((res) => res.data);
    commit('updateTodoList', todoList);
  },
  async postTargetTodo({ commit, dispatch }, todo) {
    await axios.post(`${BASE_URL}/todo`, todo);
    commit('resetTargetTodo');
    dispatch('updateTodoList');
  },
  async updateTodo({ dispatch }, todo) {
    await axios.put(`${BASE_URL}/todo/${todo.id}`, todo);
    dispatch('updateTodoList');
  },
  async deleteTodo({ dispatch }, todo) {
    await axios.delete(`${BASE_URL}/todo/${todo.id}`);
    dispatch('updateTodoList');
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
