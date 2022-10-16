

export default class ContextStrategy {
    constructor(dbStrategy) {
        this.dbStrategy = dbStrategy;
    }

    connect() {
        return this.dbStrategy.connect();
    }

    create(item) {
        return this.dbStrategy.create(item);

    }

    read(item) {
        return this.dbStrategy.read(item);
    };
}