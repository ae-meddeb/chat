import Api from '../index';
import Default from '../default';
import User from '@/models/user';

const route = '/users';

const usersCache: {[key: string]: User} = {};

const userApi = {
    findOne(id: string): Promise<User> {
        if (usersCache[id]) return Promise.resolve(usersCache[id]);
        return Api.get(route, {params: {userId: id}});
    },
};

export default userApi;