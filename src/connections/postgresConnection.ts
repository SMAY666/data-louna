import postgres from "postgres";
import {Model} from '../interfaces/postgres/model';
import {Entity} from '../interfaces/postgres/entity';
import {FieldsConfig} from '../interfaces/postgres/model/types';
import {ENV} from '../constants/env';


class PostgresConnection {
    constructor(config: postgres.Options<any>) {
        try {
            this.connection = postgres(config);
        } catch (err) {
            throw new Error(JSON.stringify(err));
        }
        this.models = [];
    }


    // ----- [ PRIVATE MEMBERS ] ---------------------------------------------------------------------------------------

    private readonly connection: postgres.Sql<{}>
    private readonly models: Model<Entity<any, any>>[];


    // ----- [ PUBLIC METHODS ] ----------------------------------------------------------------------------------------

    public async connect(): Promise<void> {
        try {
            console.log('[postgres]: Connection established');
            this.models.forEach((model) => model.createTable());
        } catch (err) {
            throw new Error(JSON.stringify(err));
        }
    }

    public async query(sql: string) {
        return await this.connection.unsafe(sql);
    }

    public define<T extends Entity<any, any>>(fields: FieldsConfig<T['_dataValues']>, name: string): Model<T> {
        const newModel = new Model<T>(fields, name);
        this.models.push(newModel);

        return newModel;
    }
}

export const pgConnection = new PostgresConnection({
    host: ENV.HOST,
    port: ENV.DB_PORT,
    user: ENV.DB_USER,
    password: ENV.DB_PASSWORD,
    database: ENV.DB_NAME,
});
