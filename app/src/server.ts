import express from 'express';
import swaggerUi from 'swagger-ui-express';
import cors from 'cors';
import YAML from 'yamljs';
import { Request, Response } from 'express';
import path from "path";


interface CheckoutForm {
    name: string;

    totalAmount : number;
    items: { price: number; quantity: number; }[];
}

const swaggerDocument = YAML.load(path.join(__dirname, '../openapi.yaml'));

const app = express();

const allowedOrigins = ['http://http://localhost:3000/'];
app.use(cors({
    origin: function(origin, callback){
        if (!origin) {
            return callback(null, true);
        }

        if (allowedOrigins.includes(origin)) {
            const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    }

}));
app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


app.post('/checkout', (req: Request, res: Response) => {
    const checkoutData: CheckoutForm = req.body;
    console.log(checkoutData)


    const orderId = Math.random().toString(36).substr(2, 9).toUpperCase();

    const confirmationMessage = `Thank you for your purchase, ${checkoutData.name}! Your order is being processed.`;

    res.status(200).send({
        orderId: orderId,
        totalAmount: checkoutData.totalAmount,
        confirmationMessage: confirmationMessage
    });
});

const port = 8081;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
