import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api';
const state = () => ({
  loginUser: {
    userName: '',
    userId: null,
  },
  isAuthenticated: false,
  userList: [],
});

const getters = {
  loginUser: (state) => state.loginUser,
  isAuthenticated: (state) => state.isAuthenticated,
  userList: (state) => state.userList,
};

const mutations = {
  updateLoginUser(state, user) {
    state.loginUser = user;
  },
  resetLoginUser(state) {
    state.loginUser = {
      userName: '',
      userId: null,
    };
  },
  updateIsAuthenticated(state, payload) {
    state.isAuthenticated = payload;
  },
  updateUserList(state, userList) {
    state.userList = userList;
  },
};

const actions = {
  async updateLoginUser({ commit }, param) {
    const res = await axios
      .post(`${BASE_URL}/login`, param)
      .then((resp) => resp)
      .catch((err) => err.response);

    if (res.status === 200) {
      commit('updateLoginUser', res.data);
      commit('updateIsAuthenticated', true);
    } else {
      commit('resetLoginUser');
      commit('updateIsAuthenticated', false);
    }
  },
  async logout({ commit }) {
    await axios.post(`${BASE_URL}/logout`);
    commit('resetLoginUser');
    commit('updateIsAuthenticated', false);
  },
  async checkAuthenticated({ commit }) {
    const res = await axios
      .get(`${BASE_URL}/user`)
      .then((resp) => resp)
      .catch((err) => err.response);

    if (res.status === 200) {
      commit('updateLoginUser', res.data.user);
      commit('updateIsAuthenticated', true);
    } else {
      commit('resetLoginUser');
      commit('updateIsAuthenticated', false);
    }
  },
  async updateUserList({ commit }) {
    const userList = await axios
      .get(`${BASE_URL}/user/all`)
      .then((res) => res.data);
    commit('updateUserList', userList);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
