import { IngresoEgreso } from './ingres-egreso.model';
import * as fromItem from './ingreso-egreso.actions';

import { AppStore } from '../app.reducer';

export interface IngresoEgresoState {
    items: IngresoEgreso[];
}

// hacemos una extensión de la AppStore
export interface AppStore extends AppStore {
    ingresoEgreso: IngresoEgresoState;
}

const initState: IngresoEgresoState = {
    items : []
};

export function IngresoEgresoReducer( state = initState, action: fromItem.acciones): IngresoEgresoState {

    switch (action.type) {

        case fromItem.SET_ITEMS:
            return {
                // devolvemos siempre un objeto nuevo por cuestiones de seguridad
                // firebase nos va a devolver siempre un objeto nuevo pero es mejor hacerlo asi
                // javascript pasa los objetos por referencia. Asi partimos la relación, creando nuevos objetos
                // Esta el operador Rest y el operador Spread. Ambos usan ...
                // Rest convierte una lista de valores en un array.
                // Spread convierte un array en una lista de valores
                items : [...action.items.map( item => {
                            return { ... item };
                            })
                        ]
            };

        case fromItem.UNSET_ITEMS:
            return {
                items : []
            };

        default:
            return state;
    }
}
