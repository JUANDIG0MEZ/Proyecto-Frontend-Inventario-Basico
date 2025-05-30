

export default function HabilitadorTabla(props){

    return (
        <ul className="flex justify-between gap-5">
            {
                Object.keys(props.isVisible).map((key, index)=>{
                    return <li  
                        key={index} 
                        className={`${props.isVisible[key] ? 'text-gray-600 bg-gray-50 border hover:shadow-md': 'bg-white hover:bg-gray-50 hover:text-gray-600'} cursor-pointer py-2 px-2 rounded-xl font-bold`} 
                        onClick={()=> {
                            props.setVisible({
                                ...props.isVisible,
                                [key]: !props.isVisible[key]
                            })
                    }}
                    >
                        {(props.rename && props.rename[key] ) ? props.rename[key] : key}</li>
                })
               
            }
        </ul>
    )

}