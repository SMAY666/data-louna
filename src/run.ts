import {startServer} from './server';
import {pgConnection} from './connections/postgresConnection';

export function run() {
    return Promise.all([
        pgConnection.connect(),
    ])
        .then(() => startServer()
            .then(() => console.log('Server is running')))
        .catch((err) => console.log(err));
}