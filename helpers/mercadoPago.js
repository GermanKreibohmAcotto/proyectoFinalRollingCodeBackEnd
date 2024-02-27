import { express } from "express";
import cors from "cors";
import { MercadoPagoConfig, Preference} from "mercadopago";

const client = new MercadoPagoConfig({
    accessToken: "TEST-5057765008632971-022116-272adbbd4874da6a2b8c7e9a0a07aa7e-397377944",
});

const app = express()

app.use(cors())
app.use(express.json())

app.post("/api/create_preference"), async (req,res) => {
    try {
        const body = {
            items: [
                {
                    title: req.body.title,
                    quantity: Number(req.body.quantity),
                    unit_price: Number(req.body.price),
                    currency_id: "ARS",
                }
            ],
            backs_urls: {
                success: "/",
                failure: "/",
                pending: "/",
            },
            auto_return: "approved",
        }
        const preference = new Preference(client);
        const result = await preference.create({body});
        res.json({
            id: result.id,
        })
    } catch (error) {
        console.log(error)
    }
}

