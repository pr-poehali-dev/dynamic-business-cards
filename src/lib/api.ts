const API_URLS = {
  auth: 'https://functions.poehali.dev/24b03183-051f-4668-8827-0ac88abcd754',
  users: 'https://functions.poehali.dev/84a5d795-f92f-4892-8e91-a349781922ef',
  stats: 'https://functions.poehali.dev/021c3a22-ea5b-49b5-aa20-212c2b4f9f26',
};

export const api = {
  async login(email: string, password: string) {
    const response = await fetch(API_URLS.auth, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'login', email, password }),
    });
    return response.json();
  },

  async register(email: string, password: string, name: string) {
    const response = await fetch(API_URLS.auth, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'register', email, password, name }),
    });
    return response.json();
  },

  async getUser(userId: string) {
    const response = await fetch(`${API_URLS.users}?user_id=${userId}`);
    return response.json();
  },

  async updateUser(userId: string, data: any) {
    const response = await fetch(API_URLS.users, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_id: userId, ...data }),
    });
    return response.json();
  },

  async getStats(userId: string) {
    const response = await fetch(`${API_URLS.stats}?user_id=${userId}`);
    return response.json();
  },
};
