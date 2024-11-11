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
  private static readonly TOKEN_KEY = 'jwt';

  public getToken(): string | null {
    return CookiesService.getCookie(AuthService.TOKEN_KEY);
  }

  public setToken(token: string): void {
    const decoded = this.decodeToken(token);
    const expires = new Date(decoded.exp * 1000);
    
    CookiesService.setCookie(AuthService.TOKEN_KEY, token, {
      expires,
      path: '/'
    });
  }

  public removeToken(): void {
    CookiesService.removeCookie(AuthService.TOKEN_KEY);
  }

  public isAuthenticated(): boolean {
    const token = this.getToken();
    if (!token) return false;
    
    const decoded = this.decodeToken(token);
    return decoded.exp * 1000 > Date.now();
  }

  public getCurrentUser(): AuthUser | null {
    const token = this.getToken();
    if (!token) return null;

    const decoded = this.decodeToken(token);
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