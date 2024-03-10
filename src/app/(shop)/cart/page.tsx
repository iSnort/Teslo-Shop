import Link from "next/link";

import { Title } from "@/components";
import { ProductsInCart } from "./ui/ProductsInCart";
import { OlderSummary } from "./ui/OlderSummary";



export default function () {

    /*redirect("/empty")*/

    return (
        <div className="flex justify-center items-center mb-72 px-10">
            <div className="flex flex-col w-[1000px]">
                <Title title="Carrito" />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                    {/* carrito */}
                    <div className="flex flex-col mt-5">
                        <span className="text-xl">Agregas más items</span>
                        <Link href={"/"} className="underline mb-5">
                            Continúa comprando
                        </Link>

                        {/* items */}
                        <ProductsInCart />
                    </div>

                    {/* check out */}
                    {/*como hacer una card con box-shadow facilmente: rounded-xl shadow-xl */}
                    <div className="bg-white rounded-xl shadow-xl p-7 h-fit">
                        <h2 className="text-2xl mb-2">Resumen de orden</h2>

                        <OlderSummary />

                        <div className="mt-5 mb-5 w-full">
                            <Link
                                className="flex btn-primary justify-center"
                                href={"/checkout/address"}
                            >
                                Checkout
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
