import { User } from '../user.model';
import { Action } from '@ngrx/store';

export const SET_USER = '[Auth] Set user';

export class SetUserAction implements Action {

    readonly type = SET_USER;

    constructor( public user: User ) {}
}

export type acciones = SetUserAction;

