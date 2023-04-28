// Configuração das rotas
import { Router, Request, Response } from 'express';
import { ProductModel, Product } from "./Product";

const router = Router();

// Testando o funcionamento das rotas
router.route('/')
    .get(async (req: Request, res: Response) => {
        res.send('Hello World!');
    });

// Métodos HTTP: Create (post), Read (get), Update (put) e Delete (delete)
router.route('/produtos')
    .get(async (req: Request, res: Response) => {
        const products = await ProductModel.find();
        res.json(products);
    })
    .post(async (req: Request, res: Response) => {
        const { nome, categoria, qtde, valor, img } = req.body;
        const product: Product = ({
            nome: nome,
            categoria: categoria,
            qtde: qtde,
            valor: valor,
            img: img
        });
        await ProductModel.create(product);
        res.json(product);
    })
    .put(async (req: Request, res: Response) => {
        try {
            const { id, nome, categoria, qtde, valor, img } = req.body;
            await ProductModel.updateOne({_id: id}, {$set: {nome: nome, categoria: categoria, qtde: qtde, valor: valor, img: img}});
            console.log("Produto alterado com sucesso!");
        } catch (error) {
            console.log("Algo deu errado!", error);
        }
    });

// Não repara na gambiarra!!
router.route('/exclusao')
    .put(async (req: Request, res: Response) => {
        try {
            const { id } = req.body;
            await ProductModel.deleteOne({_id: id});
            console.log("Produto excluído com sucesso!");
        } catch (error) {
            console.log("Algo deu errado!", error);
        }
        
    });

// Exportando rotas...
export default router;