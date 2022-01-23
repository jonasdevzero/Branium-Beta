import api from './';
import { Services } from '../../types/services';
import socket, { attachEvents } from '../socket';
import store from '../../store';
import UserActions from '../../store/actions/user';
import { setCookie, parseCookies, destroyCookie } from 'nookies';

const userService = {
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

  hasJwt() {
    return !!parseCookies(undefined)['branium.jwt'];
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
} as Services.UserService;

export default userService;
