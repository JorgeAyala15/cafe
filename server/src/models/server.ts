import express, {Application} from 'express';
import routesProduct from '../routes/product.routes';
import routesUser from '../routes/user.routes'
import { Product } from './product.models';
import { User } from './user.models';

class Server{
    private app: Application;
    private port: string;


    constructor(){
        this.app = express();
        this.port = process.env.PORT || '8000';
        this.listen();
        this.middlewares();
        this.routes();
        this.dbConnection();
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log('Aplicacion corriendo en el puerto '+this.port)
        });
    }

    routes(){
        this.app.use('/api/products', routesProduct);
        this.app.use('/api/users', routesUser);
    }

    middlewares(){
        this.app.use(express.json());
    }

    async dbConnection(){
        try {
            //await Product.sync({force:true}); 
            //await User.sync({force:true}); 
            console.log('db Online');
        } catch (error) {
            console.error(error);
        }
    }

} 
export default Server;