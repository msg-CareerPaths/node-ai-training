export interface LoginCredentialsDto {
  username: string;
  password: string;
}

export interface RegisterRequestDto {
  username: string;
  fullname: string;
  password: string;
}

export interface JwtPayloadDto {
  access_token: string;
}
