import api from '.';
import { Services } from '~/types/services';
import { GroupMessage } from '../../types/user';

const groupService = {
  show(id) {
    return new Promise(async (resolve, reject) => {
      try {
        const { data } = await api.get(`/group/${id}`);

        resolve(data.group);
      } catch (error: any) {
        reject(error.response?.data.message);
      }
    });
  },

  create(data) {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await api.post('/group', data);

        resolve(response.data.group);
      } catch (error: any) {
        reject(error.response?.data.message);
      }
    });
  },

  update() {
    return new Promise(async (resolve, reject) => {
      try {
      } catch (error: any) {
        reject(error.response?.data.message);
      }
    });
  },

  update_picture() {
    return new Promise(async (resolve, reject) => {
      try {
      } catch (error: any) {
        reject(error.response?.data.message);
      }
    });
  },

  leave(id) {
    return new Promise(async (resolve, reject) => {
      try {
      } catch (error: any) {
        reject(error.response?.data.message);
      }
    });
  },

  delete(id) {
    return new Promise(async (resolve, reject) => {
      try {
      } catch (error: any) {
        reject(error.response?.data.message);
      }
    });
  },

  async getMessages() {
    return [] as GroupMessage[];
  },

  async viewMessages() {},
} as Services.GroupService;

export default groupService;
