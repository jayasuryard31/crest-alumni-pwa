const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://alumni-connect-backend-7u7e.onrender.com/api'
  : 'http://localhost:3001/api';

interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  alumni?: T;
  token?: string;
  error?: string;
}

class ApiClient {
  private baseURL: string;

  constructor() {
    this.baseURL = API_BASE_URL;
  }

  private async request<T>(
    endpoint: string, 
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseURL}${endpoint}`;
    
    const config: RequestInit = {
      mode: 'cors',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    // Add auth token if available
    const token = localStorage.getItem('alumni_token');
    if (token && !endpoint.includes('/auth/')) {
      config.headers = {
        ...config.headers,
        'Authorization': `Bearer ${token}`,
      };
    }

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        let errorMessage = 'Request failed';
        try {
          const errorData = await response.json();
          errorMessage = errorData.error || errorData.message || errorMessage;
        } catch {
          errorMessage = `HTTP ${response.status}: ${response.statusText}`;
        }
        throw new Error(errorMessage);
      }

      const data = await response.json();
      return data;
    } catch (error: any) {
      console.error('API Request failed:', error);
      
      // Handle network errors
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        throw new Error('Network error: Unable to connect to server. Please check if the backend server is running.');
      }
      
      throw error;
    }
  }

  // Auth endpoints
  async login(email: string, password: string) {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }

  async register(data: any) {
    return this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // Alumni endpoints
  async getProfile() {
    return this.request('/alumni/profile', {
      method: 'GET',
    });
  }

  async getProfileByToken(token: string) {
    return this.request('/alumni/profile-by-token', {
      method: 'POST',
      body: JSON.stringify({ token }),
    });
  }

  async updateProfile(data: any) {
    return this.request('/alumni/profile', {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async getAllAlumni(params?: {
    page?: number;
    limit?: number;
    search?: string;
    batch?: string;
    course?: string;
    branch?: string;
  }) {
    const queryParams = new URLSearchParams();
    
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== '') {
          queryParams.append(key, value.toString());
        }
      });
    }

    const queryString = queryParams.toString();
    const endpoint = `/alumni/all${queryString ? `?${queryString}` : ''}`;
    
    return this.request(endpoint, { method: 'GET' });
  }

  // Health check
  async healthCheck() {
    return this.request('/health', { method: 'GET' });
  }
}

export const apiClient = new ApiClient();
export default apiClient;
