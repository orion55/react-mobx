import { makeAutoObservable, runInAction } from 'mobx';
import axios from 'axios';
import { User } from '@/stores/users.ts';
import isEmpty from 'lodash/isEmpty';

const USERS_API_URL = 'https://jsonplaceholder.typicode.com/users';

class UserStore {
  users: User[] = [];
  loading = false;
  error: string | null = null;
  searchQuery = '';

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  async fetchUsers(): Promise<void> {
    this.loading = true;
    this.error = null;

    try {
      const { data } = await axios.get<User[]>(USERS_API_URL);
      runInAction(() => {
        this.users = data;
      });
    } catch (error) {
      runInAction(() => {
        this.error =
          error instanceof Error
            ? `Ошибка загрузки пользователей: ${error.message}`
            : 'Неизвестная ошибка';
      });
    } finally {
      runInAction(() => {
        this.loading = false;
      });
    }
  }

  setSearchQuery(query: string): void {
    this.searchQuery = query;
  }

  get filteredUsers(): User[] {
    if (isEmpty(this.searchQuery)) return this.users;
    const query = this.searchQuery.toLowerCase();
    return this.users.filter((user) => user.name.toLowerCase().includes(query));
  }
}

export const userStore = new UserStore();
