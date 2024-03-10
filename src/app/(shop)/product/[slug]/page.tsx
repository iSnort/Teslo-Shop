export const revalidate = 604800; // 7 dias 

import { notFound } from "next/navigation";

import { titleFont } from "@/config/fonts";
import { ProductMobileSlideshow, ProductSlideshow, QuantitySelector, SizeSelector, StockLabel } from "@/components";
import { getProductBySlug } from "@/actions";
import { Metadata, ResolvingMetadata } from "next";

interface Props {
    params: {
        slug: string;
    }
}
// Con esta implementación se busca ser más SEO friendly
export async function generateMetadata({ params }: Props, parent: ResolvingMetadata): Promise<Metadata> {
    // read route params
    const slug = params.slug;

    //fetch data
    const product = await getProductBySlug(slug);

    // optionaly access and extend (rather than replace) parent metadata
    //const previousImages = (await parent).openGraph?.images || []

    return {
        title: product?.title ?? 'Producto no encontrado',
        description: product?.description ?? '',
        // los openGraph son más buscados por las redes sociales, es por eso que duplicamos la información (title, description)
        openGraph: {
            title: product?.title ?? 'Producto no encontrado',
            description: product?.description ?? '',
            images: [`/products/${ product?.images[1] }`]
        }
    }
}

export default async function({ params }: Props) {

    const { slug } = params;
    const product = await getProductBySlug(slug);

    if ( !product ) {
        notFound();
    }

    return (
        <div className="mt-5 mb-20 grid grid-cols-1 md:grid-cols-3 gap-3">
            
            {/* Slideshow */}
            <div className="col-span-1 md:col-span-2">
                {/* Mobile Slideshow */}
                <ProductMobileSlideshow 
                title={ product.title }
                images={ product.images }
                className="bloc md:hidden"
                />
                {/* Desktop Slideshow */}
                <ProductSlideshow 
                title={ product.title }
                images={ product.images }
                className="hidden md:block"
                />
            </div>

            {/* Detalles */} 
            <div className="col-span-1 px-5">

                <StockLabel slug={ product.slug } />
                
                <h1 className={`${ titleFont.className } antialiased font-bold text-xl `}>
                    { product.title }
                </h1>
                <p className="text-lg mb-5">${ product.price }</p>
                {/* Selector de Tallas */}
                <SizeSelector
                    availableSizes={product.sizes}
                    selectedSize={product.sizes[1]}
                />

                {/*Selector de Cantidad*/}
                <QuantitySelector
                    quantity={2}
                />

                {/* Button */}
                <button className="btn-primary my-5">
                    Agregar al carrito
                </button>

                {/*Descripción */}
                <h3 className="font-bold text-sm">Descripción</h3>
                <p className="font-light">
                    { product.description }
                </p>
            </div>
        </div>
    )
}