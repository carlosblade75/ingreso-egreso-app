import { ActionReducerMap } from '@ngrx/store';
import * as fromUI from './shared/ui.reducer';
import * as fromAuth from './auth/auth.reducer';

// esta constante es usada en el app module para definir todos los reduces que vamos a usar

export interface AppStore {

    ui: fromUI.State;
    auth: fromAuth.AuthState;
}

export const appReducers: ActionReducerMap<AppStore> = {

    // se usa la importación * as from... porque así es más fácil identificar de que tipo es cada reducer.
    // Pudiera ser que los nombres fueran iguales o parecidos
    ui: fromUI.uiReducer,
    auth: fromAuth.AuthReducer
};
