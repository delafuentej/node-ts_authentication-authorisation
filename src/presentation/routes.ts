import { Router } from 'express';
import { AuthRoutes } from './auth/routes';
import { CategoryRoutes } from './category/routes';
import { ProudctRoutes } from './product/routes';
import { FileUploadRoutes } from './file-upload/routes';
import { ImagesRoutes } from './images/routes';





export class AppRoutes {


  static get routes(): Router {

    const router = Router();
    
    // Routes definition
      router.use('/api/auth', AuthRoutes.routes);
      router.use('/api/categories', CategoryRoutes.routes)
      router.use('/api/products', ProudctRoutes.routes )
      router.use('/api/upload', FileUploadRoutes.routes)
      router.use('/api/images', ImagesRoutes.routes)

    return router;
  }


}

