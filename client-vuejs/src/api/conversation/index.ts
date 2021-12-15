import Api from '../index';
import Default from '../default';
import Conversation from '@/models/conversation';

const route = '/conversations';

const conversationApi = {
    findByUser(userId: string): Promise<Conversation[]> {
        return Api.get(`${route}/${userId}`);
    },
    ...Default(route)
};

export default conversationApi;