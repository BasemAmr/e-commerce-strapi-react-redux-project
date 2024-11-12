// services/auth-service.ts
import { jwtDecode } from 'jwt-decode';
import CookiesService from './cookies';
import { AuthUser, UserRole } from '../interfaces';

interface DecodedToken {
  id: number;
  email: string;
  role: UserRole;
  exp: number;
}


class AuthService {
    private tokenKey = 'jwt';

    public getToken(): string | null {
      return CookiesService.getCookie(this.tokenKey);
    }
  
    public setToken(token: string): void {
      CookiesService.setCookie(this.tokenKey, token, { path: '/' });
    }
  
    public removeToken(): void {
      CookiesService.removeCookie(this.tokenKey);
    }
  
    public getCurrentUser(): Omit<AuthUser, 'username'> | null {
      const token = this.getToken();
      if (!token) return null;
  
      const decoded = this.decodeToken(token);
      console.log(decoded);
      return {
        id: decoded.id,
        email: decoded.email,
        role: decoded.role,
        jwt: token
      };
    }
  
    public hasRole(role: UserRole): boolean {
      const user = this.getCurrentUser();
      return user?.role === role;
    }
  
    private decodeToken(token: string): DecodedToken {
      try {
        return jwtDecode(token);
      } catch {
        this.removeToken();
        throw new Error('Invalid token');
      }
    }
}

export default new AuthService();