import Api from './index';

const Default = (route: string) => ({
  create(object: any) {
    return Api.post(route, object);
  },

  findOne(id: string) {
    return Api.get(`${route}/${id}`);
  },

  find(params?: any) {
    return Api.get(route, { params });
  },

  update(object: any) {
    return Api.patch(route, object);
  },

  delete(id: string) {
    return Api.patch(`${route}/${id}`);
  }
});

export default Default;