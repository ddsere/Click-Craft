import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

// Local Storage එකේ කලින් ලොග් වෙච්ච කෙනෙක්ගේ ඩේටා තියෙනවද බලනවා (Page එක refresh කරත් ලොග් අවුට් නොවී තියාගන්න)
const userInfoFromStorage = localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo') as string)
    : null;

// TypeScript Interface
interface AuthState {
    userInfo: any | null;
}

const initialState: AuthState = {
    userInfo: userInfoFromStorage,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        // ලොගින් වුණාම ඩේටා සේව් කරන එක
        setCredentials: (state, action: PayloadAction<any>) => {
            state.userInfo = action.payload;
            localStorage.setItem('userInfo', JSON.stringify(action.payload));
        },
        // ලොග් අවුට් වෙද්දී ඩේටා මකන එක
        logout: (state) => {
            state.userInfo = null;
            localStorage.removeItem('userInfo');
        },
    },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;