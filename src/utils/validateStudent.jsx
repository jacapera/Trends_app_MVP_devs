
export function validateContact (state){
    const{name,lastname,dni,email,gender,city,country,username,password,professional_support} = state;

    const contact = {name,lastname,dni,email,gender,city,country,username,password,professional_support};

    for(let propiedad in contact){
        if(contact[propiedad] === "") return false;
    }
    return true;
};

export function errorContact (error){
    const{name,lastname,dni,email,gender,city,country,username,password,professional_support} = error;
    const errorContactState = {name,lastname,dni,email,gender,city,country,username,password,professional_support};

    for(let propiedad in errorContactState){
        if(errorContactState[propiedad]!=="" && errorContactState[propiedad]!==undefined) return false;
    }
    return true;
};

export function validateAcademic (state){
    const{type_student,level,institution,study_area,planned_graduation} = state;

    const academic = {type_student,level,institution,study_area,planned_graduation};

    for(let propiedad in academic){
        if(academic[propiedad] === "") return false;
    }
    return true;
};

export function errorAcademic (error){
    const{type_student,level,institution,study_area,planned_graduation} = error;
    const errorAcademicState = {type_student,level,institution,study_area,planned_graduation};

    for(let propiedad in errorAcademicState){
        if(errorAcademicState[propiedad]!=="" && errorAcademicState[propiedad]!==undefined) return false;
    }
    return true;
};

export function validateInterest (state){
    const{career_interest,skills,interests,languages,availability,contract} = state;
    const interest = {career_interest,skills,interests,languages,availability,contract};

    for(let propiedad in interest){
        if(interest[propiedad] === "") return false;
    }
    return true;
};

export function errorInterest (error){
    const{career_interest,skills,interests,languages,availability,contract} = error;
    const errorInterestState = {career_interest,skills,interests,languages,availability,contract};

    for(let propiedad in errorInterestState){
        if(errorInterestState[propiedad]!=="" && errorInterestState[propiedad]!==undefined) return false;
    }
    return true;
};

export function validateExtra (state){
    const{goals} = state;
    const extra = {goals};

    for(let propiedad in extra){
        if(extra[propiedad] === "" || extra[propiedad].length===0) return false;
    }
    return true;
};

export function errorExtra (error){
    const{goals,other_goals,problematic,other_problematic} = error;
    const errorExtraState = {goals,other_goals,problematic,other_problematic};

    for(let propiedad in errorExtraState){
        if(errorExtraState[propiedad]!=="" && errorExtraState[propiedad]!==undefined) return false;
    }
    return true;
};