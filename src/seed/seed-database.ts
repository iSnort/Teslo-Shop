import prisma from "../lib/prisma";
import { initialData } from "./seed";

async function main() {

    // 1. Borrar registros previos
    // await Promise.all([
    await prisma.productImage.deleteMany();
    await prisma.product.deleteMany();
    await prisma.category.deleteMany();
    // ])

    const { categories, products } = initialData

    // Categorias
    const categoriesData = categories.map( category => ({
        name: category
    }))

    await prisma.category.createMany({
        data: categoriesData
    });


    //Usamos .findMany() para traer la información de la tabla
    const categoriesDB = await prisma.category.findMany();

    const categoriesMap = categoriesDB.reduce( (map, category) => {
        map[ category.name.toLocaleLowerCase() ] = category.id;
        return map;
    }, {} as Record<string, string>)

    // Productos
    // de estas forma podemos declarar que queremos tener un nuevo objeto, pero sin las propiedades que fueron desdestructuradas anteriormente
    
    products.forEach( async(product) => {
        const { images, type, ...rest } = product;

        const dbProduct = await prisma.product.create({
            data: {
                ...rest,
                categoryId: categoriesMap[type]
            }
        });

        // Images
        const imagesData = images.map( image => ({
            url: image,
            productId: dbProduct.id
        }));

        await prisma.productImage.createMany({
            data: imagesData
        });
    });

    console.log('Seed Executed Succesfully')
}

(() => {

    if (process.env.NODE_ENV === 'production') return;

    main();
})()