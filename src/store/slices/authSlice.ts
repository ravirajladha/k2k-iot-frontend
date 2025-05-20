import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { jwtDecode } from 'jwt-decode';
import { IRootState } from '@/store/store';
import { v4 as uuidv4 } from 'uuid';
interface AuthState {
    user: any | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;
}

interface DecodedToken {
    exp: number;
}

const initialState: AuthState = {
    user: null,
    isAuthenticated: false,
    isLoading: false,
    error: null,
};

interface RefreshTokenResponse {
    accessToken: string;
    refreshToken: string;
}

// Helper function to decode tokens and check expiry
const isTokenExpired = (token: string): boolean => {
    try {
        const decoded = jwtDecode<DecodedToken>(token);
        return decoded.exp * 1000 < Date.now(); // Token expiration check
    } catch (error) {
        console.error('Invalid token:', error);
        return true; // Treat invalid tokens as expired
    }
};

// Login Thunk

// Create AsyncThunk for refreshing the access token

export const registerUser = createAsyncThunk(
    'auth/registerUser',
    async ({ fullName, username, email, password }: { fullName: string; username: string; email: string; password: string }, { rejectWithValue }) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_APP_API_URL}/users/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ fullName, username, email, password }),
                credentials: 'include', // if cookies are needed
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error('Error response:', errorData); // Log the error response
                throw new Error(errorData.message || 'Registration failed');
            }

            const data = await response.json();
            console.log('Full response from registration:', data); // Log the entire response

            // Verify the structure of the response
            if (data.data.user) {
                console.log('user data post registration', {
                    user: data.user,
                    accessToken: data.accessToken,
                    data: data,
                });
                return { user: data.data.user, accessToken: data.data.accessToken, refreshToken: data.data.refreshToken };
            } else {
                console.error('User data is missing in the response', data);
                return rejectWithValue('User data is missing in the response');
            }
        } catch (error) {
            console.error('Registration error:', error);
            return rejectWithValue(error instanceof Error ? error.message : 'Unexpected error');
        }
    }
);

// store/slices/authSlice.ts
// import { createAsyncThunk } from '@reduxjs/toolkit';

export const loginUser = createAsyncThunk('auth/loginUser', async ({ username, password }: { username: string; password: string }, { rejectWithValue }) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_APP_API_URL}/users/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
            credentials: 'include',
        });
        // console.log("response",response);

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Login failed');
        }

        const data = await response.json();
        console.log('data', data);

        if (!data.data.accessToken) {
            throw new Error('Access token missing in response');
        }
        localStorage.setItem('accessToken', data.data.accessToken);
        localStorage.setItem('refreshToken', data.data.refreshToken);
        localStorage.setItem('user', JSON.stringify(data.data.user));

        console.log('user data with accesstoken', { user: data.data.user, accessToken: data.data.accessToken, data: data });
        return { user: data.data.user, accessToken: data.data.accessToken, refreshToken: data.data.refreshToken }; // Include token explicitly
    } catch (error) {
        return rejectWithValue(error instanceof Error ? error.message : 'Unexpected error');
    }
});

//Working login but with mock details and mock tokens
// export const loginUser = createAsyncThunk(
//   'auth/loginUser',
//   async ({ username, password }: { username: string; password: string }, { rejectWithValue }) => {
//     try {
//       console.log("username",username);
//       console.log("password",password);

//       // Simulate backend login by checking credentials
//       if (username !== 'admin@gmail.com' || password !== 'admin') {
//         throw new Error('Invalid email or password');
//       }

//       // Simulate a user object
//       const mockUser = {
//         _id: 'mock-user-id',
//         username: 'admin@gmail.com',
//         email: 'admin@gmail.com',
//         fullName: 'Admin User',
//         type: 'admin',
//       };

//       // Generate mock tokens (you can use a library like uuid or hardcode them)
//       const mockAccessToken = `mock-access-token-${uuidv4()}`; // e.g., "mock-access-token-1234"
//       const mockRefreshToken = `mock-refresh-token-${uuidv4()}`; // e.g., "mock-refresh-token-5678"

//       // Store tokens in localStorage
//       localStorage.setItem('accessToken', mockAccessToken);
//       localStorage.setItem('refreshToken', mockRefreshToken);
//       localStorage.setItem('user', JSON.stringify(mockUser));

//       console.log('Simulated login successful:', {
//         user: mockUser,
//         accessToken: mockAccessToken,
//         refreshToken: mockRefreshToken,
//       });

//       return {
//         user: mockUser,
//         accessToken: mockAccessToken,
//         refreshToken: mockRefreshToken,
//       };
//     } catch (error) {
//       return rejectWithValue(error instanceof Error ? error.message : 'Unexpected error');
//     }
//   }
// );

// Fetch User Details Thunk
export const fetchUserDetails = createAsyncThunk('auth/fetchUserDetails', async (_, { rejectWithValue }) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_APP_API_URL}/users/me`, {
            method: 'GET',
            credentials: 'include', // Ensure cookies are sent
        });

        if (!response.ok) {
            throw new Error('Failed to fetch user details');
        }

        const data = await response.json();
        return data.user;
    } catch (error) {
        return rejectWithValue(error instanceof Error ? error.message : 'Unexpected error');
    }
});

export const refreshAccessToken = createAsyncThunk<
    { accessToken: string }, // Return type
    void, // Argument type
    { rejectValue: string } // Reject type (error message)
>('auth/refreshAccessToken', async (_, { rejectWithValue, getState }) => {
    try {
        const { auth } = getState() as IRootState;

        console.log('Getting refresh token from state:', auth); // Log the refresh token from Redux

        console.log('Getting refresh token from state:', auth.user.refreshToken); // Log the refresh token from Redux

        const refreshToken = auth.user?.refreshToken; // Assuming the refresh token is stored in Redux

        if (!refreshToken) {
            console.error('No refresh token available'); // Log when no refresh token is found
            throw new Error('No refresh token available');
        }

        const response = await fetch(`${import.meta.env.VITE_APP_API_URL}/users/refresh-token`, {
            method: 'POST',
            credentials: 'include',
        });

        console.log('Response from refresh endpoint:', response); // Log the response from the API

        if (!response.ok) {
            console.error('Failed to refresh access token:', response); // Log failure
            throw new Error('Failed to refresh access token');
        }

        const { accessToken } = await response.json();
        console.log('New access token received:', accessToken); // Log the new access token

        return { accessToken };
    } catch (error) {
        console.error('Error in refreshAccessToken:', error); // Log any errors
        return rejectWithValue(error instanceof Error ? error.message : 'Failed to refresh access token');
    }
});

// Logout Thunk
export const logoutUser = createAsyncThunk('auth/logoutUser', async (_, { rejectWithValue }) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_APP_API_URL}/users/logout`, {
            method: 'POST',
            credentials: 'include',
        });

        if (!response.ok) {
            throw new Error('Logout failed');
        }

        return true;
    } catch (error) {
        return rejectWithValue(error instanceof Error ? error.message : 'Unexpected error');
    }
});

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        resetError(state) {
            state.error = null;
        },
        clearUser(state) {
            state.user = null;
            state.isAuthenticated = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.user = action.payload.user;
                state.isAuthenticated = true;
                state.isLoading = false;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.error = action.payload as string;
                state.isLoading = false;
            })
            .addCase(loginUser.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.user = {
                    ...action.payload.user,
                    accessToken: action.payload.accessToken,
                    refreshToken: action.payload.refreshToken,
                };
                state.isAuthenticated = true;
                state.isLoading = false;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.error = action.payload as string;
                state.isLoading = false;
            })
            .addCase(fetchUserDetails.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchUserDetails.fulfilled, (state, action) => {
                state.user = action.payload;
                state.isAuthenticated = true;
                state.isLoading = false;
            })
            .addCase(fetchUserDetails.rejected, (state, action) => {
                state.error = action.payload as string;
                state.isLoading = false;
                state.isAuthenticated = false;
            })
            .addCase(logoutUser.fulfilled, (state) => {
                state.user = null;
                state.isAuthenticated = false;
                state.error = null;
            })
            .addCase(logoutUser.rejected, (state, action) => {
                state.error = action.payload as string;
            });
    },
});

export const { resetError, clearUser } = authSlice.actions;
export default authSlice.reducer;
