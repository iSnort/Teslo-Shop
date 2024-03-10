'use server';


import prisma from '@/lib/prisma'
import { sleep } from '@/utils';

export const getStockBySlug = async ( slug: string ): Promise<number> => {
    try {

        //await sleep(3);

        const stock = await prisma.product.findFirst({
            where: { slug },
            select: { inStock: true } // marcamos en "true" el/los campos que queramos traer de la db
        });

        return stock?.inStock ?? 0;
    } catch (error) {
        console.log("Error mientras se consultaba la base de datos: ", error)
        return 0;
    }
}