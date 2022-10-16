

import knex from "knex";

export default class PostgresStrategy {
    #instance;

    constructor(connectionString) {
        this.connectionString = connectionString;
        this.table = "warriors";
    }

    connect() {
        this.#instance = knex({
            client: 'pg',
            connection: this.connectionString
        });

        return this.#instance.raw('select 1+1 as result');
    }

    create(item) {
        return this.#instance
            .insert(item)
            .into(this.table);
    }

    read(item) {
        return this.#instance
            .select()
            .from(this.table);
    };
}