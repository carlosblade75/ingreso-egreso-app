import { Action } from '@ngrx/store';
import { IngresoEgreso } from './ingres-egreso.model';

export const SET_ITEMS = '[ Ingreso egreso] Set items';
export const UNSET_ITEMS = '[ Ingreso egreso] Unset items';

export class SetItemsAction implements Action {

    readonly type = SET_ITEMS;

    constructor(public items: IngresoEgreso[] ) {}
}

export class UnsetItemsAction implements Action {

    readonly type = UNSET_ITEMS;
}

export type acciones = SetItemsAction | UnsetItemsAction;