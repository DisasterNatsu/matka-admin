interface NavState {
  open: boolean;
}

interface LogInResponse {
  authToken: string;
  email: string;
}

interface User {
  email: string;
  authenticated: boolean;
}

interface AuthState {
  email: string | null;
}
