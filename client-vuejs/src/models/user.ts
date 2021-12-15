export default class User {

    id: string;
    userName: string;
    email: string;

    constructor(nativeData: any) {
        this.id = nativeData?._id;
        this.userName = nativeData?.username;
        this.email = nativeData?.email;
    }
    
}