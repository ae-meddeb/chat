import Api from '../index';
import Message from '@/models/message';

const route = '/messages';

const messageApi = {
    findByConversation(conversationId: string): Promise<Message[]> {
        return Api.get(`${route}/${conversationId}`);
    },

    addMessage(message: Message): Promise<Message> {
        return Api.post(route, message);
    }
};

export default messageApi;