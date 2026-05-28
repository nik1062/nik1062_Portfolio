const API_BASE_URL = "http://127.0.0.1:5050/api";

async function handleResponse(response) {
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || "Something went wrong");
  }
  return data;
}

export const apiService = {
  async checkHealth() {
    const response = await fetch(`${API_BASE_URL}/health`);
    return handleResponse(response);
  },

  async submitContact(payload) {
    const response = await fetch(`${API_BASE_URL}/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    return handleResponse(response);
  },

  async askAssistant(question) {
    const response = await fetch(`${API_BASE_URL}/assistant`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question })
    });
    return handleResponse(response);
  },

  async adminLogin(password) {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password })
    });
    return handleResponse(response);
  },

  async getMessages(token) {
    const response = await fetch(`${API_BASE_URL}/messages`, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });
    return handleResponse(response);
  },

  // Projects
  async getProjects() {
    const response = await fetch(`${API_BASE_URL}/projects`);
    return handleResponse(response);
  },

  async createProject(payload, token) {
    const response = await fetch(`${API_BASE_URL}/projects`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(payload)
    });
    return handleResponse(response);
  },

  async deleteProject(id, token) {
    const response = await fetch(`${API_BASE_URL}/projects/${id}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });
    return handleResponse(response);
  },

  // Blogs
  async getBlogs() {
    const response = await fetch(`${API_BASE_URL}/blogs`);
    return handleResponse(response);
  },

  async createBlog(payload, token) {
    const response = await fetch(`${API_BASE_URL}/blogs`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(payload)
    });
    return handleResponse(response);
  },

  async updateBlog(id, payload, token) {
    const response = await fetch(`${API_BASE_URL}/blogs/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(payload)
    });
    return handleResponse(response);
  },

  async deleteBlog(id, token) {
    const response = await fetch(`${API_BASE_URL}/blogs/${id}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });
    return handleResponse(response);
  }
};
