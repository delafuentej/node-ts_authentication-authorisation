import { envs } from './config/envs';
import { AppRoutes } from './presentation/routes';
import { Server } from './presentation/server';
import { MongoDB } from './data';


(async()=> {
  main();
})();


async function main() {

      await MongoDB.connect({
     mongoUrl: envs.MONGO_URL,
     dbName: envs.MONGO_DB_NAME,
     
    })

  const server = new Server({
    port: envs.PORT,
    routes: AppRoutes.routes,
  });

  server.start();
}