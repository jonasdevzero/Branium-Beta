import api from ".";
import { GroupMessage } from "../../types/user";

interface CreateGroupI {
  name: string;
  description: string;
  picture: File;
  members?: string[];
}

const groupService = {
  show(id: string) {
    return new Promise(async (resolve, reject) => {
      try {
        const { data } = await api.get(`/group/${id}`);

        resolve(data.group);
      } catch (error: any) {
        reject(error.response?.data.message);
      }
    });
  },

  async create(data: CreateGroupI) {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await api.post("/group", data);

        resolve(response.data.group);
      } catch (error: any) {
        reject(error.response?.data.message);
      }
    });
  },

  async update() {
    return new Promise(async (resolve, reject) => {
      try {
      } catch (error: any) {
        reject(error.response?.data.message);
      }
    });
  },

  async update_picture() {
    return new Promise(async (resolve, reject) => {
      try {
      } catch (error: any) {
        reject(error.response?.data.message);
      }
    });
  },

  async leave() {
    return new Promise(async (resolve, reject) => {
      try {
      } catch (error: any) {
        reject(error.response?.data.message);
      }
    });
  },

  async delete() {
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
};

export default groupService;
