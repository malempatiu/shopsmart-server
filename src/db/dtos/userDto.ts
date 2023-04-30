export interface BaseUserDto {
  id: number;
  email: string;
  firstName?: string | null;
  lastName?: string | null;
  image?: string | null;
}

export interface UserDto extends BaseUserDto {
  jwtToken: string;
}