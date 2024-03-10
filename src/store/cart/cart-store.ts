import type { CartProduct } from "@/interfaces";
import { create } from "zustand";
import { persist } from "zustand/middleware";


interface State {
    cart: CartProduct[];

    //metodos para modificar nuestro estado
    getTotalItems: () => number;

    getSummaryInformation: () => {
        subTotal: number;
        tax: number;
        total: number;
        itemsInCart: number;
    };

    addProductToCart: (product: CartProduct) => void;
    
    updatedProductQuantity: (Product: CartProduct, quantity: number) => void;

    removeProduct: (product: CartProduct) => void;

}

export const useCartStore = create<State>()(

    // la funcion persist se encarga automaticamente de guardar el state en el localStorage
    persist(
        (set, get) => ({
            cart: [],

            // Metodos
            getTotalItems: () => {
                const { cart } = get();

                return cart.reduce( (total, item) => total + item.quantity, 0);
            },

            getSummaryInformation: () => {
                const { cart } = get();

                const subTotal = cart.reduce(
                    (subTotal, product) => (product.quantity * product.price) + subTotal,
                    0
                );
                
                const tax = subTotal * 0.15;

                const total = subTotal + tax;

                const itemsInCart = cart.reduce( (total, item) => total + item.quantity, 0);

                return {
                    subTotal, tax, total, itemsInCart
                }
            },


            addProductToCart: (product: CartProduct) => {
                const { cart } = get();

                //1. Revisar si el producto existe en el carrito con la talla seleccionada
                const productInCart = cart.some(
                    (item) => (item.id === product.id && item.size === product.size)

                );

                if (!productInCart) {
                    // el set comunica a todas las pantallas cuándo el estado de cart a cambiado
                    set({ cart: [...cart, product] });
                    return;
                }

                //2. Se que el producto existe por talla, actualizamos la cantidad
                const updateCartProducts = cart.map((item) => {
                    if (item.id === product.id && item.size === product.size) {
                        return { ...item, quantity: item.quantity + product.quantity }
                    }

                    return item;
                });

                set({ cart: updateCartProducts });
            },
            
            updatedProductQuantity: ( product: CartProduct, quantity: number ) => {
                const { cart } = get();

                const updateCartProducts = cart.map((item) => {
                    if (item.id === product.id && item.size === product.size) {
                        return { ...item, quantity: quantity }
                    }

                    return item;
                });

                set({ cart: updateCartProducts });
            },

             removeProduct: (product: CartProduct) => {
                const { cart } = get();

                const updateCartProducts = cart.filter((item) => item.id !== product.id || item.size !== product.size);

                set({ cart: updateCartProducts });
             }

        }),
        //utilizando skipHydration podemos resolver la discrepancia entre el servidor y el cliente ocasionada por guardar nuestro
        //en el local storage
        {
            name: 'shopping-cart',
            //skipHydration: true,
        }
    )


)