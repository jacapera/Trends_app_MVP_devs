
export function validateContact (state){
    const{company_name,cuit,email,city,country,website,usuario,password} = state;
    const contacto = {company_name,cuit,email,city,country,website,usuario,password};

    for(let propiedad in contacto){
        if(contacto[propiedad] === "") return false;
    }
    return true;
};

export function errorContact (error){
    const{company_name,cuit,email,city,country,website,usuario,password} = error;
    const errorContactState = {company_name,cuit,email,city,country,website,usuario,password};

    for(let propiedad in errorContactState){
        if(errorContactState[propiedad]!=="" && errorContactState[propiedad]!==undefined) return false;
    }
    return true;
};

export function validateAcademic (state){
    const{level_required,study_area,experience_required,industry} = state;
    const academic = {level_required,study_area,experience_required,industry};

    for(let propiedad in academic){
        if(academic[propiedad] === "") return false;
    }
    return true;
};

export function errorAcademic (error){
    const{level_required,study_area,experience_required,industry} = error;
    const errorAcademicState = {level_required,study_area,experience_required,industry};
    
    for(let propiedad in errorAcademicState){
        if(errorAcademicState[propiedad]!=="" && errorAcademicState[propiedad]!==undefined) return false;
    }
    return true;
};

export function validateInfo (state){
    const{benefits,skills_required,job_description,job_goal,languages_required,availability,contract_offered} = state;
    const info = {benefits,skills_required,job_description,job_goal,languages_required,availability,contract_offered};

    for(let propiedad in info){
        if(info[propiedad] === "") return false;
    }
    return true;
};

export function errorInfo (error){
    const{benefits,skills_required,job_description,job_goal,languages_required,availability,contract_offered} = error;

    const errorInfoState = {benefits,skills_required,job_description,job_goal,languages_required,availability,contract_offered};

    for(let propiedad in errorInfoState){
        if(errorInfoState[propiedad]!=="" && errorInfoState[propiedad]!==undefined) return false;
    }
    return true;
};