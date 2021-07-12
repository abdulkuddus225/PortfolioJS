function validateForm(){
    let valFirstName = document.contactForm.firstname.value;
    let valLastName = document.contactForm.lastname.value;
    let valEmail = document.contactForm.email.value;
    const emailFormat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if(valFirstName == ""){
        document.getElementById("firstnameValidation").innerHTML="Required!!";
        return false;
    }
    if(valLastName == ""){
        document.getElementById("lastnameValidation").innerHTML="Required!";
        return false;
    }
    if(!valEmail.match(emailFormat)){
        document.getElementById("emailValidation").innerHTML="Incorrect email format";
        return false;
    }

    return true;
}