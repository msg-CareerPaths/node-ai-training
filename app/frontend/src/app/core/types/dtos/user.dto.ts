export interface UserDto {
  id: string;
  username: string;
  fullname: string;
  roles: string[];
}

export interface CreateUserDto {
  username: string;
  fullname: string;
  password: string;
  roles: string[];
}
