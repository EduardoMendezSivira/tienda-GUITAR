import { useEffect, useState, useMemo } from "react"
import { db } from '../data/db'
import type { TcarritoItem, Tguitar } from "../types/types"


export const useCarrito = () => {
    
      const carritoAlIniciar = () : TcarritoItem[] => {
        const localStorageCarrito = localStorage.getItem('carrito')
        return localStorageCarrito ? JSON.parse(localStorageCarrito) : []
      }
    
      const [data] = useState(db)
      const [carrito, setCarrito] = useState(carritoAlIniciar)
      const MAXIMA_COMPRA = 5
      const MINIMA_COMPRA = 1
    
      useEffect(() => {
        localStorage.setItem('carrito', JSON.stringify(carrito))
        }, [carrito])
    
      function aggAlCarrito(item: Tguitar) {
        const itemExiste = carrito.findIndex((guitar) => guitar.id === item.id)
        if(itemExiste >= 0) {
          if (carrito[itemExiste].quantity >= MAXIMA_COMPRA) return
          const updatedCarrito = [...carrito]
          updatedCarrito[itemExiste].quantity++
          setCarrito(updatedCarrito)
        } else {
          const newItem : TcarritoItem = {...item, quantity : 1}
         setCarrito([...carrito, newItem])  
        }
      }
    
      function eliminarDelCarrito (id: Tguitar['id']) {
        setCarrito(prevCarrito => prevCarrito.filter(guitar => guitar.id !== id))
      }
    
      function incrementarCantidad (id: Tguitar['id']) {
        const updatedCarrito = carrito.map (item => {
          if(item.id === id && item.quantity < MAXIMA_COMPRA) {
            return{
              ...item,
              quantity: item.quantity + 1
            }
          }
          return item
        })
        setCarrito(updatedCarrito)
      }
      function decrementarCantidad (id: Tguitar['id']) {
        const updatedCarrito = carrito.map (item => {
          if(item.id === id && item.quantity > MINIMA_COMPRA) {
            return{
              ...item,
              quantity: item.quantity - 1
            }
          }
          return item
        })
        setCarrito(updatedCarrito)
      }
      function vaciarElCarrito() {
        setCarrito([])
      }
      
        const carritoLleno = useMemo(() => carrito.length === 0, [carrito]);
        const carritoTotal = useMemo(() =>carrito.reduce((total, item) => total + (item.quantity * item.price), 0), [carrito]
         );

    return {
        data,
        carrito,
        aggAlCarrito,
        eliminarDelCarrito,
        incrementarCantidad,
        decrementarCantidad,
        vaciarElCarrito,
        carritoLleno,
        carritoTotal
    }
}

