import type { UserInterface } from 'lib/interfaces';
import { variables } from 'lib/variables';
// import axios from 'axios';

//TODO: how do I make it more general with return types?

export class BackendApi {
  baseUrl: string = '';
  groupEndpoint: string = '';
  constructor(group: string, override?: boolean) {
    if (!override) {
      this.groupEndpoint = group
      this.baseUrl = `http://${variables.backendUrl}:${variables.backendPort}/${group}`;
    } else {
      this.baseUrl = group;
    }
    console.log(this.baseUrl, group);
  }

  async get(id?: string | number): Promise<UserInterface[] | undefined> {
    try {
      let res: any;
      if (id) {
        res = await fetch(`${this.baseUrl}/${id}`, { method: 'GET' });
      } else {
        res = await fetch(`${this.baseUrl}`, { method: 'GET' });
      }

      if (res.status === 200) {
        return await res.json();
      }
    } catch (e) {
      console.warn(e);
    }
  }

  async post(payload: UserInterface): Promise<UserInterface | undefined> {
    try {
      const res = await fetch(`${this.baseUrl}`, { body: JSON.stringify(payload), headers: { 'Content-Type': 'application/json; charset=utf8', }, method: 'POST' });
      if (res.status === 200) {
        return res
      }
    } catch (e) {
      console.warn(e);
    }
  }

  //TODO: make the change in the backend so that it return the obj
  // async delete(id?: number): Promise<string> {
  // 	try {
  // 		if (id) {
  // 			return await axios.delete(`${this.baseUrl}/${id}`);
  // 		} else {
  // 			return await axios.delete(`${this.baseUrl}`);
  // 		}
  // 	} catch (e) {
  // 		console.warn(e);
  // 	}
  // }

  // async patch(id: number, payload: BlogPost): Promise<BlogPost> {
  // 	try {
  // 		const res = await axios.patch(`${this.baseUrl}/${id}`, payload);
  // 		if (res.status === 200) {
  // 			return res.data;
  // 		}
  // 	} catch (e) {
  // 		console.warn(e);
  // 	}
  // }
}
