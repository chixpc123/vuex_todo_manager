import axios from "axios";

const state = {
	todos: []
};

const getters = {
	allTodos: state => state.todos
};

const actions = {
	async fetchTodos({ commit }) {
		// prettier-ignore
		const response = await axios.get("https://jsonplaceholder.typicode.com/todos");

		commit("setTodos", response.data);
	},
	async addTodo({ commit }, title) {
		// prettier-ignore
		const response = await axios.post("https://jsonplaceholder.typicode.com/todos", { title, completed : false });

		commit("newTodo", response.data);
	},
	async deleteTodo({ commit }, id) {
		await axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`);

		commit("removeTodo", id);
	},
	async filterTodos({ commit }, e) {
		//  Get selected number
		const options = e.target.options;
		const limit = parseInt(options[options.selectedIndex].innerText);

		// prettier-ignore
		const response = await axios.get(`https://jsonplaceholder.typicode.com/todos?_limit=${limit}`);

		commit("setTodos", response.data);
	},
	async updateTodo({ commit }, updTodo) {
		// prettier-ignore
		await axios.put(`https://jsonplaceholder.typicode.com/todos/${updTodo.id}`,updTodo);

		commit("updateTodo", updTodo);
	}
};

const mutations = {
	setTodos: (state, todos) => (state.todos = todos),
	newTodo: (state, todo) => (state.todos = [todo, ...state.todos]),
	removeTodo: (state, id) => {
		return (state.todos = state.todos.filter(todo => todo.id !== id));
	},
	updateTodo: (state, updTodo) => {
		const index = state.todos.findIndex(todo => todo.id === updTodo.id);
		if (index !== -1) {
			state.todos.splice(index, 1, updTodo);
		}
	}
};

export default {
	state,
	getters,
	actions,
	mutations
};
