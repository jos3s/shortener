export class CreateUserResponseDto {
  id: number;
  email: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(id: number, email: string, createdAt: Date, updatedAt: Date) {
    this.id = id;
    this.email = email;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
