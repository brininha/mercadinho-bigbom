import { prop, getModelForClass } from '@typegoose/typegoose';

class Product {
    @prop({required: true})
    nome!: string
    @prop({required: true})
    categoria!: string
    @prop({required: true})
    qtde!: number
    @prop({required: true})
    valor!: number
    @prop({required: true})
    img!: string
}

const ProductModel = getModelForClass(Product);
export { Product, ProductModel };