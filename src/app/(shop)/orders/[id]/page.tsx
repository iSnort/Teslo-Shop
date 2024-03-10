import { Title } from "@/components";
import { initialData } from "@/seed/seed";
import clsx from "clsx";
import Image from "next/image";
import { IoCartOutline } from "react-icons/io5";

const productsInCart = [
    initialData.products[0],
    initialData.products[1],
    initialData.products[2],
];

interface Props {
    params: {
        id: string;
    }
}

export default function ({ params }: Props) {

    const { id } = params;

    //verificar 

    return (
        <div className="flex justify-center items-center mb-72 px-10">
            <div className="flex flex-col w-[1000px]">
                <Title title={`Orden #${id}`} />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                    {/* carrito */}
                    <div className="flex flex-col mt-5">

                        <div className={
                                clsx(
                                    "flex items-center rounded-lg py-2 px-3.5 text-xs font-bold text-white mb-5",
                                    {
                                        'bg-red-500': false,
                                        'bg-green-700': true
                                    }
                                )
                            }>
                                <IoCartOutline size={30} />
                                <span className="mx-2">Pendiente de pago</span>
                                <span className="mx-2">Orden pagada</span>
                        </div>


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
                            
                            <div className={
                                clsx(
                                    "flex items-center rounded-lg py-2 px-3.5 text-xs font-bold text-white mb-5",
                                    {
                                        'bg-red-500': false,
                                        'bg-green-700': true
                                    }
                                )
                            }>
                                <IoCartOutline size={30} />
                                <span className="mx-2">Pendiente de pago</span>
                                <span className="mx-2">Orden pagada</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
