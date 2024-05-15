import { ValidRoles } from 'src/auth/interfaces';
import * as bcript from 'bcrypt';

export const users = [
  {
    email: 'test1@gmail.com',
    firstname: 'John',
    lastname: 'Doe',
    password: bcript.hashSync('Test1234&', 10),
    role: ValidRoles.admin,
  },
  {
    email: 'test2@gmail.com',
    firstname: 'John2',
    lastname: 'Doe',
    password: bcript.hashSync('Test1234&', 10),
    role: ValidRoles.user,
  },
];
