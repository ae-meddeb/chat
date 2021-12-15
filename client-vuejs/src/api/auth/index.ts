import Api from '../index';

interface IUser {
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
}

const route = '/auth';

const authApi = {
    signIn({ email, password }: IUser): Promise<any> {
        return Api.post(`${route}/login`, { email, password });
    },

    signUp({ firstName, lastName, email, password }: IUser): Promise<any> {
        return Api.post(`${route}/register`, { firstName, lastName, email, password });
    }
};

export default authApi;