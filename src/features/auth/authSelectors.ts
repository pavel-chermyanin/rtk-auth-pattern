import { RootState } from './../../store/store';

// использовать в компоненте в хуке useSelector(если надо)
export const selectIsAuthenticated = (state: RootState) => state.authReducer.isAuthenticated
export const selectUser = (state: RootState) => state.authReducer.user