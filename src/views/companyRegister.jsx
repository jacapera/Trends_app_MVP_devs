import { useEffect, useState } from "react";
import Validation from '../utils/validateFormCompany';
import RegisterCompany from "../components/companyRegisterContact";



export default function companyRegister() {

    return(
        <div>
            <h1>Registro de Empresa</h1>
            <div>
                <div className="Contact">
                    <RegisterCompany/>
                </div>
                <div className="Academic">
                    
                </div>
                <div className="Info">

                </div>
            </div>
        </div>
    )
}