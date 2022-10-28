export default class NotificationContext {
    constructor() {
        this.notifications = [];
    }

    hasNotification() {
        return this.notifications.length > 0;
    }

    addNotification(notification) {
        this.notifications.push(notification);
    }

}