import { User } from '../user.model';
import { Action } from '@ngrx/store';

export const SET_USER = '[Auth] Set user';
export const UNSET_USER = '[Auth] Unset user';

export class SetUserAction implements Action {

    readonly type = SET_USER;

    constructor( public user: User ) {}
}

export class UnsetUserAction implements Action {

    readonly type = UNSET_USER;
}


export type acciones = SetUserAction | UnsetUserAction;

