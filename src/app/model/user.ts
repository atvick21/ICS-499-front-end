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
    public logInDateDisplay: Date;
    public joinDate: Date;
    public role: string;
    public authorities: string[];
    public active: boolean;
    public notLocked: boolean;
    
    public highScore: number;

    constructor() {
    	this.firstName = '';
    	this.lastName = '';
    	this.username = '';
    	this.email = '';
    	this.active = false;
    	this.notLocked = false;
    	this.role = '';
    	this.authorities = [];
    }

}