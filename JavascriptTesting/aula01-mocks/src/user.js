class User {
    constructor({ name, id, profession, age }) {
        Date.prototype.getFullYear = () => 2020

        this.name = name;
        this.id = parseInt(id);
        this.profession = profession;
        this.birthDay = new Date().getFullYear() - age;
    }
}


module.exports = User;