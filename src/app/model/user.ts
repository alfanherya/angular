import { from } from 'rxjs';
import { Role } from './role';
export class User {
    id: number;
    username: String = "";
    password: String = "";
    name: String = "";
    role: Role;
    token: String = "";
}