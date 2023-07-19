
export default function ValidationFormCompany(input){
    const error ={};
    const regexEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

        //valido email
        if (!regexEmail.test(input.email)) {
            error.email="Debe ingresar un mail valido"
        }
        if(!input.email){
            error.email="Debe ingresar un mail"
        }
        
        //
    return error;
};