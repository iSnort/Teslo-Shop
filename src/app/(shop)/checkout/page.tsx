import { Title } from "@/components";
import { initialData } from "@/seed/seed";
import Image from "next/image";
import Link from "next/link";

const productsInCart = [
    initialData.products[0],
    initialData.products[1],
    initialData.products[2],
];

export default function () {
    return (
        <div className="flex justify-center items-center mb-72 px-10">
            <div className="flex flex-col w-[1000px]">
                <Title title="Verificar oden" />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                    {/* carrito */}
                    <div className="flex flex-col mt-5">
                        <span className="text-xl">Ajustar elementos</span>
                        <Link href={"/cart"} className="underline mb-5">
                            Editar carrito
                        </Link>

                        {/* items */}
                        {productsInCart.map((product) => (
                            <div key={product.slug} className="flex mb-5">
                                <Image
                                    src={`/products/${product.images[0]}`}
                                    width={100}
                                    height={100}
                                    style={{
                                        width: '100px',
                                        height: '100px'
                                    }}
                                    alt={product.title}
                                    className="mr-5 rounded"
                                />

                                <div>
                                    <p>{product.title}</p>
                                    <p>${product.price} x 3</p>
                                    <p className="font-bold">Subtotal: ${ product.price * 3 }</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* check out */}
                    {/*como hacer una card con box-shadow facilmente: rounded-xl shadow-xl */}
                    <div className="bg-white rounded-xl shadow-xl p-7">
                        
                        <h2 className="text-2xl mb-2 font-bold">Dirección de entrega</h2>
                        <div className="mb-10">
                            <p className="text-xl">Jesús López</p>
                            <p>Calle 35 </p>
                            <p>a sur # 45</p>
                        </div>

                        {/* Divider */}
                        <div className="w-full h-0.5 rounded bg-gray-200 mb-10" />

                        <h2 className="text-2xl mb-2">Resumen de orden</h2>

                        <div className="grid grid-cols-2">
                            <span>No. Prodcutos</span>
                            <span className="text-right">3 artículos</span>

                            <span>Subtotal</span>
                            <span className="text-right">$ 100</span>

                            <span>Impuestos (15%)</span>
                            <span className="text-right">$ 100</span>

                            <span className="mt-5 text-2xl">Total</span>
                            <span className="mt-5 text-2xl text-right">$ 100</span>
                        </div>

                        <div className="mt-5 mb-5 w-full">

                            <p className="mb-5">
                                {/* Disclaimer */}
                                <span className="text-xs">
                                    Al hacer clic en "Colocar orden", aceptas nuestros <a href="#" className="underline">términos y condiciones y <a href="#" className="underline">política de privacidad</a></a>
                                </span>
                            </p>
                            <Link
                                className="flex btn-primary justify-center"
                                href={"/orders/123"}
                            >
                                Colocar orden
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
