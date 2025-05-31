import type { TcarritoItem, Tguitar } from "../types/types";

type HeaderProps = {
  carrito: TcarritoItem[]
  eliminarDelCarrito:(id: Tguitar['id']) => void
  incrementarCantidad:(id: Tguitar['id']) => void
  decrementarCantidad:(id: Tguitar['id']) => void
  vaciarElCarrito:() => void
  carritoLleno: boolean
  carritoTotal: number
}

export default function Header({ 
    carrito,
    eliminarDelCarrito, 
    incrementarCantidad, 
    decrementarCantidad, 
    vaciarElCarrito, 
    carritoLleno, 
    carritoTotal
  } : HeaderProps ){

  return (
    <header className="grid grid-cols-1 md:grid-cols-5 h-88 bg-cover bg-center bg-blend-overlay bg-gradient-to-r from-black/70 to-black/70" style={{backgroundImage: `url('/img/header.jpg')`}}>
          <div className="col-start-1">
            <img className="h-[200px] w-[200px]" src="/img/logo.svg" alt="imagen logo" />
          </div>
          <button className="btn btn-circle indicator col-start-7 fixed justify-self-end m-4" popoverTarget="popover-1">
            <span className="indicator-item badge rounded-4xl bg-[#fd7e14]">{carrito.reduce((total, guitar) => total + guitar.quantity, 0)}</span>
            <svg className="size-6 shrink-0 text-white group-hover:text-gray-500" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
            </svg>
          </button>
          <ul className="dropdown dropdown-left mr-2 mt-2 w-116 h-100 rounded-box bg-base-300 shadow-sm" popover="auto" id="popover-1">
            <li className="">
              <div className="p-0">
                <div>
                  {carritoLleno ? (
                    <p className="text-center text-white mt-44 ">El carrito esta vacio</p>
                  ) : (
                    <>
                      <table className="table">
                          <thead>
                            <tr>
                              <th>Imagen</th>
                              <th>Nombre</th>
                              <th>Precio</th>
                              <th>Cantidad</th>
                            </tr>
                          </thead>
                        <tbody>
                            {carrito.map( guitar => (
                            <tr key={guitar.name}>
                              <td>
                                <img className="w-12 h-20" src={`./img/${guitar.image}.jpg`} alt="imagen guitarra" />
                              </td>
                              <td>{guitar.name}</td>
                              <td className="font-bold">{guitar.price}</td>
                              <td className="flex items-center justify-around">
                                <button type="button" className="btn btn-sm bg-[#fd7e14]" onClick={() => decrementarCantidad(guitar.id)}>
                                  -                                  
                                </button>
                                  {guitar.quantity}
                                <button type="button" className="btn btn-sm bg-[#fd7e14]" onClick={() => incrementarCantidad(guitar.id)}>
                                  +
                                </button>
                                <button className="btn btn-sm btn-error ml-6 bg-[#fd7e14]" 
                                type="button"
                                onClick={() => eliminarDelCarrito(guitar.id)}
                                >
                                  Borrar
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      <p className="flex justify-center">Total ha pagar es: ${carritoTotal}</p>
                      <button className="btn h-12 w-[450px] mb-4 bg-[#fd7e14]" onClick={vaciarElCarrito}>Vaciar el carrito</button>
                    </>
                  )}
                </div>
              </div>
            </li>
          </ul>
    </header>
  );
}