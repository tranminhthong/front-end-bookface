export interface LoginResponse {
  userRole?: string;
  authenticationToken?: string;
  refreshToken?: string;
  expiresAt?: Date;
  username?: string;
  userId?: number;
}
