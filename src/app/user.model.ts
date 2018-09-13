
export class User {

    public nombre: string;
    public email: string;
    public uid: string;

    constructor( dataObj: DataObj) {
        this.nombre = dataObj && dataObj.nombre || null;
        this.email = dataObj && dataObj.email || null;
        this.uid = dataObj && dataObj.uid || null;
    }
}

interface DataObj {
    uid: string;
    email: string;
    nombre: string;
}