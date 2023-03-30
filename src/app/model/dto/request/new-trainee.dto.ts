export class newTraineeDto{
    name: string;
    nickName: string;
    level:number;
    constructor(name:string, nickName:string, level:number){
        this.name = name;
        this.nickName = nickName;
        this.level = level;
    }
}