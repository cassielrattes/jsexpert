import NotificationContext from "./notificationContext.js";

export default class HeroEntity extends NotificationContext {
    constructor({ name, age }) {
        super();

        this.name = name;
        this.age = age;
    }

    isValid() {

        if (this.age < 20) {
            this.addNotification("Age must be higher then 20!");
        }

        if (this.name?.length < 4) {
            this.addNotification("Name length must be higher then 4!");
        }

        return !this.hasNotification();
    }

}

