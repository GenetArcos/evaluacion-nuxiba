import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { jsonPlaceholderService } from '../api/jsonPlaceholderService';

export const fetchUsers = createAsyncThunk('user/fetchUsers', async () => {
    const response = await jsonPlaceholderService.getUsers();
    return response.data.slice(0, 10);
});

export const fetchPostsWithComments = createAsyncThunk(
    'user/fetchPostsWithComments',
    async (userId) => {
        const postsResponse = await jsonPlaceholderService.getUserPosts(userId);
        const posts = postsResponse.data;

        const postsWithComments = await Promise.all(
            posts.map(async (post) => {
                const commentsResponse = await jsonPlaceholderService.getPostComments(post.id);
                return { ...post, comments: commentsResponse.data };
            })
        );

        return postsWithComments;
    }
);

export const fetchTodos = createAsyncThunk('user/fetchTodos', async (userId) => {
    const response = await jsonPlaceholderService.getUserTodos(userId);
    return response.data.sort((a, b) => b.id - a.id);
});

export const createTodo = createAsyncThunk('user/createTodo', async (newTodo) => {
    const response = await jsonPlaceholderService.addTodo(newTodo);
    return { ...newTodo, id: response.data.id };
});

const userSlice = createSlice({
    name: 'user',
    initialState: {
        users: [],
        selectedUser: null,
        posts: [],
        todos: [],
        activeTab: null,
        loading: false,
    },
    reducers: {
        setSelectedUser: (state, action) => {
            state.selectedUser = action.payload;
            state.posts = [];
            state.todos = [];
            state.activeTab = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending, (state) => { state.loading = true; })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload;
            })
            .addCase(fetchPostsWithComments.pending, (state) => { state.loading = true; })
            .addCase(fetchPostsWithComments.fulfilled, (state, action) => {
                state.loading = false;
                state.posts = action.payload;
                state.activeTab = 'posts';
            })
            .addCase(fetchTodos.pending, (state) => { state.loading = true; })
            .addCase(fetchTodos.fulfilled, (state, action) => {
                state.loading = false;
                state.todos = action.payload;
                state.activeTab = 'todos';
            })
            .addCase(createTodo.fulfilled, (state, action) => {
                state.todos.unshift(action.payload);
            });
    },
});

export const { setSelectedUser } = userSlice.actions;
export default userSlice.reducer;