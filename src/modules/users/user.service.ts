import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  getUser(): string {
    return 'List of all User!';
  }

  addUser() {
    return 'User added!';
  }

  updateUserById() {
    return 'Update User by Id';
  }

  deleteUserById() {
    return 'Delete User By Id';
  }
}
