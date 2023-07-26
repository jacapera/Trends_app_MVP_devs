import { Select, SelectItem, Subtitle, TextInput, Title } from "@tremor/react";
import { useEffect, useState } from "react";
import DataJobCompany from "./dataJobCompany/dataJobCompany";
import InfoJobCompany from "./infoJobCompany/infoJobCompany";


const JobFormCompany = ()=>{

const[pageForm, setPageForm] = useState({
    button1:"Anterior",
    button1_hide:true,
    button2:"Continuar",
    button2_hide:false,
    div_data:false,
    div_info:true,
});

const handlePageForm = (event) =>{
    console.log("presiona boton");
    if(!pageForm.div_data){
        //SI ESTAMOS EN PAGINA DATOS LABORALES
        console.log("entra a div_data");
        setPageForm({
            button1:"Anterior",
            button1_hide:false,
            button2:"Continuar",
            button2_hide:true,
            div_data:true,
            div_info:false,            
        });
    };

    if(!pageForm.div_info){
        //SI ESTAMOS EN PAGINA INFORMACION LABORAL
        console.log("entramos a div_info");
        setPageForm({
            button1:"Anterior",
            button1_hide:true,
            button2:"Continuar",
            button2_hide:false,
            div_data:false,
            div_info:true,               
        });
    };
}

    return(
        <div>
            <Title>Carga de Oferta Laboral</Title>
            <form>
                {/* DATOS DE OFERTA LABORAL*/}
                <div hidden={pageForm.div_data}>
                    <DataJobCompany
                    />
                </div>
            
                {/* INFORMACION Y BENEFICIOS DE OFERTA LABORAL*/}
                <div hidden={pageForm.div_info}>
                    <InfoJobCompany/>
                </div>
                {/* BOTON GUARDAR */}
                <div>
                    <button>Cargar Oferta Laboral</button>
                </div>
            </form>
            {/* BOTONES NAVEGACION */}
            <div>
                <button
                    name="Anterior"
                    hidden={pageForm.button1_hide}
                    onClick={handlePageForm}
                    style={{ margin: 10, padding: 10 }}
                >{pageForm.button1}</button>
                <button
                    name="Continuar"
                    hidden={pageForm.button2_hide}
                    onClick={handlePageForm}
                    style={{ margin: 10, padding: 10 }}
                >{pageForm.button2}</button>
            </div>
        </div>
    )
};

export default JobFormCompany;