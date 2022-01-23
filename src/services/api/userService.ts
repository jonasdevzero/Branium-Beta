import api from './';
import { Services } from '../../types/services';
import socket, { attachEvents } from '../socket';
import store from '../../store';
import UserActions from '../../store/actions/user';
import { setCookie, parseCookies, destroyCookie } from 'nookies';

const userService = {
  hasJwt() {
    return !!parseCookies(undefined)['branium.jwt'];
  },

  search(username) {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await api.get(`/user/search?username=${username}`);
        resolve(response.data.users);
      } catch (error) {
        reject(error);
      }
    });
  },

  getPreRegistration(id) {
    return new Promise(async (resolve, reject) => {
      try {
        const { data } = await api.get(`/user/pre_registration/${id}`);
        const { preRegistration } = data;

        resolve(preRegistration);
      } catch (error: any) {
        reject(error.response?.data.message);
      }
    });
  },

  preRegistration(data) {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await api.post('/user/pre_registration', data);
        resolve(response.data.message);
      } catch (error) {
        reject(error);
      }
    });
  },

  registration(id, data) {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await api.post(`/user/registration/${id}`, data);
        const { token } = response.data;

        setCookie(undefined, 'branium.jwt', `Bearer ${token}`, {
          maxAge: 60 * 60 * 24, // 24 hours
          path: '/',
        });

        resolve();
      } catch (error: any) {
        reject(error.response.data.message);
      }
    });
  },

  login(data) {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await api.post('/user/login', data);
        const { token } = response.data;

        setCookie(undefined, 'branium.jwt', `Bearer ${token}`, {
          maxAge: 60 * 60 * 24, // 24 hours
          path: '/',
        });

        resolve();
      } catch (error: any) {
        reject(error.response?.data.message);
      }
    });
  },

  auth(before) {
    before();
    return new Promise(async (resolve, reject) => {
      try {
        const { ['branium.jwt']: jwt } = parseCookies(undefined);

        if (!jwt) return reject('Sessão inválida!');

        const response = await api.post(
          '/user/auth',
          {},
          { headers: { Authorization: jwt } }
        );
        const user = response.data.user;

        api.defaults.headers['Authorization'] = jwt;
        socket.io.opts.query = { jwt };
        socket.connect();

        socket.once('auth', (error, action) => {
          if (error) {
            destroyCookie(undefined, 'branium.jwt', { path: '/' });
            return reject(error);
          }

          attachEvents();
          store.dispatch(UserActions.setUser(user));
          store.dispatch(action);
          resolve();
        });
      } catch (error: any) {
        destroyCookie(undefined, 'branium.jwt', { path: '/' });
        reject(error.response?.data.message);
      }
    });
  },

  update(data) {
    return new Promise(async (resolve, reject) => {
      try {
        await api.put('/user', data);

        resolve(data);
      } catch (error: any) {
        reject(error.response?.data.message);
      }
    });
  },

  update_email(data) {
    return new Promise(async (resolve, reject) => {
      try {
        await api.patch('/user/email', data);

        resolve(data.email);
      } catch (error: any) {
        reject(error.response?.data.message);
      }
    });
  },

  update_picture(picture) {
    return new Promise(async (resolve, reject) => {
      try {
        const formData = new FormData();
        formData.append('picture', picture);

        const { data } = await api.patch('/user/picture', formData);
        const { picture_url } = data;

        resolve(picture_url);
      } catch (error: any) {
        reject(error.response?.data.message);
      }
    });
  },

  forgotPassword(email: string) {
    return new Promise(async (resolve, reject) => {
      try {
        const { data } = await api.post('/user/forgot_password', { email });
        resolve(data.message);
      } catch (error: any) {
        reject(error.response.data.message);
      }
    });
  },

  resetPassword(data) {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await api.patch('/user/reset_password', data);
        resolve(response.data.message);
      } catch (error: any) {
        reject(error.response.data.message);
      }
    });
  },

  delete() {
    return new Promise(async (resolve, reject) => {
      try {
        await api.post('/delete');
        resolve();
      } catch (error: any) {
        reject(error.response?.data.message);
      }
    });
  },

  restore() {
    return new Promise(async (resolve, reject) => {
      try {
        await api.post('/restore');
        resolve();
      } catch (error: any) {
        reject(error.response?.data.message);
      }
    });
  },
} as Services.UserService;

export default userService;
