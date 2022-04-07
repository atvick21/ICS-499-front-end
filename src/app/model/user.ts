export class User {

	public id: number;
    public userId: string;
    public email: string;
    public username: string;
    public firstName: string;
    public lastName: string;
    public password: string;
    public profileImgUrl: string;
    public lastLoginDate: Date;
    public lastLoginDisplay: Date;
    public joinDate: Date;
    public role: string;
    public authorities: string[];
    public active: boolean;
    public notLocked: boolean;
    
    public highScore: number;

    constructor() {
        this.id = 0;
        this.userId = '';
        this.firstName = '';
        this.lastName = '';
        this.username = '';
        this.email = '';
        this.lastLoginDate = null;
        this.lastLoginDisplay = null;
        this.joinDate = null;
        this.profileImgUrl = '';
        this.active = false;
        this.role = '';
        this.authorities = [];
    }

}