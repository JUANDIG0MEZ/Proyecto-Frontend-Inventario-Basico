import { useEffect } from "react"
import InputText from "../../componentes/InputText"
import Boton from "../../componentes/Boton"
import RadioBoton from "../../componentes/RadioBoton"
import { useState } from "react"
import { useParams } from "react-router-dom"
import ModalModificarProductoFactura from "../../componentes/Modales/ModalModificarProductoFactura"
import DiffTabla from "../../componentes/DiffTabla"
import { fetchManager } from "../../serviciosYFunciones/fetchFunciones"
import InputNumber from "../../componentes/InputNumber"
export default function Venta(){

    const {id} = useParams()

    const [showModal, setShowModal] = useState(false)
    //const [showModalConfirmar, setShowModalConfirmar] = useState(false)
    const [idProductoSeleccionado, setIdProductoSeleccionado] = useState(null)

    const [facturaOriginal, setFacturaOriginal] = useState([])
    const [facturaModificada, setFacturaModificada] = useState([])

    const [fecha, setFecha] = useState("")
    const [nombre, setNombre] = useState("")
    const [direccion, setDireccion] = useState("")
    const [telefono, setTelefono] = useState("")
    const [email, setEmail] = useState("")
    const [estado, setEstado] = useState("")

    const [total, setTotal] = useState("")
    const [totalModificado, setTotalModificado] = useState(null)
    const [totalTabla, setTotalTabla] = useState(null)
    const [pagado, setPagado] = useState(null)

    useEffect(()=>{

        if (idProductoSeleccionado){
            setShowModal(true)      
        }

    }, [idProductoSeleccionado])

    function cancelarCambios(){
        setFacturaModificada(facturaOriginal)
    }


    useEffect(()=>{
        function cb(resData){
            setFacturaOriginal(resData.datos)
            setFacturaModificada(resData.datos)
            setFecha(resData.info.fecha)
            setNombre(resData.info.cliente)
            setTelefono(resData.info.telefono)
            setEmail(resData.info.email)
            setDireccion(resData.info.direccion)
            setEstado(resData.info.estado)
            setPagado(resData.info.pagado)
            setTotal(resData.info.total)
            setTotalTabla(resData.datos.reduce((acc, item) => acc + parseInt(item.subtotal), 0))
        }
        fetchManager(`http://localhost:3000/api/v1/facturas/ventas/${id}`, cb, "GET")
    }, [])


    function guardarCambios(){
        const detalles = facturaModificada.map(item => {
            return {
                producto_id: item.id,
                cantidad: item.cantidad,
                precio: item.precio ,
                subtotal: item.subtotal
            }
        })
        
        function cb(resData){
            setFacturaOriginal(facturaModificada)
            setTotalTabla(totalModificado)
            setTotal(resData.total)
            if ("pagado" in resData){
                setPagado(resData.pagado)
            }
        }
        fetchManager(`http://localhost:3000/api/v1/facturas/ventas/${id}`,cb, "PATCH", detalles)    
    }


    useEffect(()=> {
        setTotalModificado(facturaModificada.reduce((acc, item) => acc + parseInt(item.subtotal), 0))
    }, [facturaModificada])


    function cambiarEstado(nuevoValor){
        setEstado(nuevoValor)
    }

    return (
        <div className="w-[1400px] flex flex-col mx-auto gap-3">
            
            
            <div className="flex justify-between my-2">
                <h1 className="text-2xl font-bold flex items-center">FACTURA DE VENTA ID:<p className="text-red-500 border rounded-md p-1">{id}</p></h1>
                <h1 className="text-xl font-bold flex items-center"> Fecha: {fecha}</h1>
            </div>

            <div className="flex flex-col gap-6 w-full">
                <div className="w-full flex gap-3">
                    <InputText estilo={"w-[500px]"} label="Nombre cliente" valor = {nombre}/>
                    <InputText estilo={"w-[500px]"} label="Direccion" valor={direccion}/>
                </div>
                <div className="w-full flex justify-between">
                    <div className="flex gap-3">
                        <InputText estilo={"w-48"} label="Telefono" valor={telefono} isNumber={true}/>
                        <InputText estilo={"w-96"} label="Email" valor={email} />
                    </div>
                    
                    <div className="flex gap-4">
                        <RadioBoton onChange={cambiarEstado} name="estado" valor="Por entregar" label="No entregado" checked={estado === "Por entregar"}/>
                        <RadioBoton onChange={cambiarEstado} name="estado" valor="Entregado" label="Entregado" checked={estado === "Entregado"}/>
                    </div>
                    <div className="flex gap-3">
                        <InputNumber estilo={"w-48"} label="Pagado" valor={pagado} isPrice={true} format={true}/>
                        <InputNumber estilo={"w-48"} label="Total" valor={total} isPrice={true} format={true}/>
                    </div>
                    
                </div>
            </div>
            <div>
                <h1 className="text-xl font-bold">FACTURA DE COMPRA</h1>
                <DiffTabla tabla1={facturaOriginal} tabla2={facturaModificada} total={totalTabla} total2= {totalModificado} setIdItemSeleccionado={setIdProductoSeleccionado}/>
            </div>
            
            <div className="flex justify-between">
                <Boton texto="Devolver todo" isNormal={true}/>
                
                <div className="flex gap-3">
                    <Boton texto="Cancelar cambios" isNormal={true} onClick={cancelarCambios}/>
                    <Boton texto="Guardar Cambios" onClick={() => guardarCambios()}/>
                </div>
                
            </div>
            
            <div>
                
            </div>
                {showModal && <ModalModificarProductoFactura setShowModal={setShowModal} idProductoSeleccionado={idProductoSeleccionado} datos={facturaModificada} setDatos={setFacturaModificada} />}
            <div>
            </div>
        </div>
    )
}