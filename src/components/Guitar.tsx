import type { Tguitar } from "../types/types";

type TguitarProps = {
    guitar: Tguitar
    aggAlCarrito: (item: Tguitar) => void
}

export default function Guitar({ guitar, aggAlCarrito }: TguitarProps) {
    const { name, description, price, image } = guitar

    return (
        <div className="
            transition-transform 
            transform 
            hover:scale-105
            hover:shadow-lg 
            duration-300 
            ease-in-out
        ">
            <div className="grid grid-cols-[140px_250px] rounded-tl-xl rounded-bl-xl h-70 w-90 bg-base-100 border-1 border-gray-700">
                <figure className="col-start-1">
                    <img src={`/img/${image}.jpg`} alt="imagen guitarra" className="rounded-tl-xl rounded-bl-xl h-[280px] w-[150px]" />
                </figure>
                <div className="card-body h-60 w-60">
                    <h2 className="card-title ">{name}</h2>
                    <p className="p-0 m-0">{description}</p>
                    <span className="text-lime-500 text-3xl font-extrabold">${price}</span>
                    <div className="card-actions items-center">
                        <button
                            className="btn bg-[#fd7e14] text-white hover:bg-[#e07010]"
                            onClick={() => {
                                aggAlCarrito(guitar);
                                const modal = document.getElementById('my_modal_2') as HTMLDialogElement | null;
                                modal?.showModal();
                            }}
                        >
                            Agregar al carrito
                        </button>
                    </div>
                </div>
            </div>

            <dialog id="my_modal_2" className="modal">
                <div className="modal-box text-white">
                    <h3 className="font-bold text-lg">Agregado al carrito con Exito!</h3>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
        </div>
    )
}