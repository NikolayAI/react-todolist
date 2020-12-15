import { instance, LoginParamsType, ResponseType } from './api'

export const authAPI = {
    me() {
        return instance
            .get<ResponseType<{ id: number; email: string; login: string }>>(`/auth/me`)
            .then((res) => res.data)
    },
    login(data: LoginParamsType) {
        return instance
            .post<ResponseType<{ userId?: number }>>(`auth/login`, data)
            .then((res) => res.data)
    },
    logout() {
        return instance
            .delete<ResponseType<{ userId?: number }>>(`/auth/login`)
            .then((res) => res.data)
    },
}
