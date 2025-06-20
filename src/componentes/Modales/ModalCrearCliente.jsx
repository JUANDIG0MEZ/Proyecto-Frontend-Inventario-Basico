import InputText from "../InputText"
import InputLista from "../InputLista"
import Boton from "../Boton"
import { useState, useEffect, useContext} from "react"
import { ContextInventario } from "../../contextInventario"
import InputNumber from "../InputNumber"
import { FaTrash } from "react-icons/fa"
import Botonicono from "../BotonIcono"
import Select from "../Select"
export default function ModalCrearCliente(props){
    const {
        tiposClientes
    } = useContext(ContextInventario)

    const [nombre, setNombre] = useState("")
    const [direccion, setDireccion] = useState("")
    const [porPagarle, setPorPagarle] = useState("")
    const [debe, setDebe] = useState("")
    const [telefono, setTelefono] = useState("")
    const [email, setEmail] = useState("")
    const [tipo, setTipo] = useState("")

    function cerrarModal(){
        if (props.setShowModal){
            props.setShowModal(false)
        }
        
    }

    // function crearCliente(){
    //     const cliente = {
    //         nombre: nombre,
    //         direccion: direccion,
    //         telefono: telefono,
    //         email: email,
    //         tip
    //     }
    // }


    return (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex items-center justify-center">
            <div className="flex bg-white p-5 rounded-lg w-[1000px] items-center gap-4">
                <div className="flex flex-col flex-1 gap-7">
                    <h2 className="titulo">Crear contacto</h2>
                    <div className="flex gap-3">
                        <InputText label="Nombre" valor={nombre} setValor={setNombre}/>
                        <InputText label = "Direccion" valor = {direccion} setValor = {setDireccion}/> 
                        <Select opciones={tiposClientes} setValor={setTipo} label={"Tipo cliente"}/>                    
                        
                    </div>
                    <div className="flex justify-between">
                        <div className="flex gap-3">
                            <InputText estilo="w-80" label = "Email" valor = {email} setValor={setEmail}/>
                            <InputText estilo="w-44" label = "Telefono" valor={telefono} setValor={setTelefono} isNumber={true}/>
                        </div>
                        
                        <div className="flex gap-3">  
                            <InputNumber
                            estilo="w-32" label="Debe" valor={debe} setValor={setDebe} format={true}/>
                            <InputNumber
                            estilo="w-32"
                            label="Por pagarle" valor={porPagarle} setValor={setPorPagarle} format={true}/>
                            <Botonicono
                            texto={<FaTrash/>}/>
                        </div>
                        
                    </div>
                    <div className="flex justify-between">
                        <div className="flex gap-3 items-center">
                            
                        </div>
                        
                        <div className="flex w-full justify-end gap-3">  
                            <Boton onClick={cerrarModal} texto = "Cancelar"  isNormal = {true}/>
                            <Boton texto = "Crear" />  
                        </div>
                    </div>
                    

                </div>
            </div>
            {
                ModalCrearCliente ? <ModalCrearCliente /> : null
            }
        </div>
    )
}