import api from '.';
import { Services } from '~/types/services';
import { Group } from '~/types/user';

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

  update(data) {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await api.put(`/group/${data.group_id}`, data);

        resolve(response.data);
      } catch (error: any) {
        reject(error.response?.data.message);
      }
    });
  },

  update_picture(group_id, picture) {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await api.patch(`/group/${group_id}`, { picture });

        resolve(response.data.picture);
      } catch (error: any) {
        reject(error.response?.data.message);
      }
    });
  },

  leave(id) {
    return new Promise(async (resolve, reject) => {
      try {
        await api.post(`/group/${id}/leave`);

        resolve();
      } catch (error: any) {
        reject(error.response?.data.message);
      }
    });
  },

  delete(id) {
    return new Promise(async (resolve, reject) => {
      try {
        await api.delete(`/group/${id}`);

        resolve();
      } catch (error: any) {
        reject(error.response?.data.message);
      }
    });
  },

  users: {
    index(group_id) {
      return new Promise(async (resolve, reject) => {
        const { data } = await api.get(`/group/users/${group_id}`);

        resolve(data.users);
        try {
        } catch (error: any) {
          reject(error.response?.data.message);
        }
      });
    },

    add(group_id, user_id) {
      return new Promise(async (resolve, reject) => {
        try {
          const { data } = await api.post('/group/users', {
            group_id,
            user_id,
          });

          resolve(data.member);
        } catch (error: any) {
          reject(error.response?.data.message);
        }
      });
    },

    role(data) {
      return new Promise(async (resolve, reject) => {
        try {
          await api.patch('/group/users/role', data);

          resolve();
        } catch (error: any) {
          reject(error.response?.data.message);
        }
      });
    },

    remove(data) {
      return new Promise(async (resolve, reject) => {
        try {
          await api.post('/group/users/remove', data);

          resolve();
        } catch (error: any) {
          reject(error.response?.data.message);
        }
      });
    },
  },

  messages: {
    index(group: Group) {
      return new Promise(async (resolve, reject) => {
        try {
          const { fetch_messages_count, pushed_messages } = group.extra;
          const { data } = await api.get(
            `/group/messages/${group.id}?limit=30&skip=${fetch_messages_count}&skip_u=${pushed_messages}`
          );

          resolve(data.messages);
        } catch (error: any) {
          reject(error.response?.data.message);
        }
      });
    },

    create(data) {
      return new Promise(async (resolve, reject) => {
        try {
          const { to, text, medias } = data;

          const formData = new FormData();
          formData.append('to', to);
          formData.append('text', text);
          medias.forEach((m) => formData.append('medias', m));

          await api.post('/group/messages', formData);

          resolve();
        } catch (error: any) {
          reject(error.response?.data.message);
        }
      });
    },

    view(group_id) {
      return new Promise(async (resolve, reject) => {
        try {
          await api.patch(`/group/messages/${group_id}/view`);

          resolve();
        } catch (error: any) {
          reject(error.response?.data.message);
        }
      });
    },

    delete(message_id) {
      return new Promise(async (resolve, reject) => {
        try {
          await api.post(`/group/messages/${message_id}/delete`);

          resolve();
        } catch (error: any) {
          reject(error.response?.data.message);
        }
      });
    },
  },
} as Services.GroupService;

export default groupService;
