import {startServer} from './server';
import {pgConnection} from './connections/postgresConnection';
import {redisConnection} from './connections/redisConnection';

export function run() {
    return Promise.all([
        pgConnection.connect(),
        redisConnection.connect(),
    ])
        .then(() => startServer()
            .then(() => console.log('Server is running')))
        .catch((err) => console.log(err));
}