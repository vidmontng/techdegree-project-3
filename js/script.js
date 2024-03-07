/*** Declaring all variables ***/
const   form = document.querySelector('form'),
        // nameInputLabel = document.querySelector('label[for="name"]'),
        jobRole = document.querySelector('#title'),
        otherJobRole = document.querySelector('#other-job-role'),
        selectDesign = document.querySelector('#design'),
        selectColor = document.querySelector('#color'),
        colorOptions = selectColor.querySelectorAll('option[data-theme]'),
        activitiesFieldset = document.querySelector('#activities'),
        checkboxesOfActivities = activitiesFieldset.querySelectorAll('input[type="checkbox"]'),
        selectPayment = document.querySelector('#payment'),
        payPal = document.querySelector('#paypal'),
        bitcoin = document.querySelector('#bitcoin'),
        creditCardInfo = document.querySelector('#credit-card'),
        creditCardOption =document.querySelector('option[value="credit-card"]'),
        nameInputField = document.querySelector('#name'),
        emailInputField = document.querySelector('#email'),
        ccNumberInput = document.querySelector('#cc-num'),
        zipInput = document.querySelector('#zip'),
        cvvInput = document.querySelector('#cvv'),
        nameError = document.querySelector('#name-hint'),
        emailError = document.querySelector('#email-hint'),
        activitiesError = document.querySelector('#activities-hint'),
        creditCardError = document.querySelector('#cc-hint'),
        zipError = document.querySelector('#zip-hint'),
        cvvError = document.querySelector('#cvv-hint'),
        activityCheckboxes = activitiesFieldset.querySelectorAll('input');
               

         

        

/*** Default states for elements on page load ***/
nameInputField.focus();
otherJobRole.style.display = 'none';
selectColor.disabled = true;
payPal.style.display = 'none';
bitcoin.style.display = 'none';
creditCardOption.selected = true;




/*** Adding visible focus/blur states to the activities ***/

activityCheckboxes.forEach((activity) => { 
    activity.addEventListener('focus', (e) => {
        const label = e.target.parentNode;
        label.className = 'focus';
    }
    )
});

activityCheckboxes.forEach((activity) => { 
    activity.addEventListener('blur', (e) => {
        const label = e.target.parentNode;
        label.className = 'blur';
    }
    )
});




/***Event listener to hide/reveal "other job" field ***/

jobRole.addEventListener('change', e => {
    if (e.target.value === "other") {
        document.querySelector('input[id="other-job-role"]').style.display = 'inline-block';
    }
});


/***Event listener to reflect only the colors available for the selected t-shirt theme***/

selectDesign.addEventListener('change', e => {
    selectColor.disabled = false;
    let selectDesign = e.target;
    let design = selectDesign.value;
     colors = Array.from(colorOptions);
    let currentOptions = [];
    
    for (let i=0; i<colors.length; i++) {

        let colorOption = colors[i];
        let colorOptionValue = colors[i].getAttribute('data-theme');
        
        if (design === colorOptionValue) {
            colorOption.hidden = false;
            // console.log(colorOption);
            currentOptions.push(colorOption);
            } else {
            colorOption.hidden = true;
            }         
        }
        currentOptions[0].selected = 'selected';     
    
});

/***Event listener for 'Register For Activities' section***/

activitiesFieldset.addEventListener('change', () => {
    //selecting the element that will reflect the total price of all chosen activities
   let totalCostElement = activitiesFieldset.querySelector('#activities-cost');   
   let total = 0;
        //looping through every checkbox to check if the activity was checked by a user
        for (let i=0; i<checkboxesOfActivities.length; i++) {
            if (checkboxesOfActivities[i].checked) {
                total +=parseInt(checkboxesOfActivities[i].getAttribute('data-cost'));
                totalCostElement.textContent = `Total: $${total}`;
            } 
        }  
        //updating text content of Total to new amount
        


});


/*** Event listener to hide payment methods other than selected ***/

selectPayment.addEventListener('change', () => {
    if (selectPayment.value === 'paypal') {
        document.querySelector('div[id="paypal"]').style.display = 'block';
        document.querySelector('div[id="bitcoin"]').style.display = 'none';
        creditCardInfo.style.display = 'none';
    } else if (selectPayment.value === 'bitcoin') {
        document.querySelector('div[id="bitcoin"]').style.display = 'block';
        document.querySelector('div[id="paypal"]').style.display = 'none';
        creditCardInfo.style.display = 'none';
    } else if (selectPayment.value === 'credit-card') {
        creditCardInfo.style.display = 'block';
        document.querySelector('div[id="bitcoin"]').style.display = 'none';
        document.querySelector('div[id="paypal"]').style.display = 'none';        
    }

});

/**************************************************/
/**************** Form Validation *****************/
/**************************************************/


/*** Declared variables for validation part of the project. 
 * Some variables at the bottom are assigned new text content and some assigned text content that was already assigned in the HTML. 
 * It was done because the function that creates event objects for listeners has the same format for all input fields, 
 * but need different error messages for different errors. Some of them match the text already assigned to them in HTML, some - don't. ***/
const   regexName = /^[a-zA-Z]+$/,
        regexEmail = /^[^@]+@[^@.]+\.[a-z]+$/i,
        regexCreditCard = /^[\d]{13,16}$/,
        regexZipCode = /^[\d]{5}$/,
        regexCVV = /^[\d]{3}$/,
        invalidName = `Name can only contain letters`,
        invalidEmail = emailError.textContent,
        invalidCC = creditCardError.textContent,
        invalidZip = zipError.textContent,
        invalidCVV = cvvError.textContent,
        emptyName = nameError.textContent,
        emptyEmail = `Email field cannot be blank`,
        emptyCC = `Credit Card field cannot be blank`,
        emptyZip = `Zip Code cannot be blank`,
        emptyCVV = `CVV field cannot be blank`;


function textInputValidator (inputField, regex) {
    
    const input = inputField.value;
    const validation = regex.test(input);
    
    if (validation) {
        return 'valid input';
    } else if (input==="") {
        return 'empty input';
    } else if (!validation && input!=="") {
        return 'invalid input';
    }

}


//created closure - function that will return event objects for event listeners for all input fields
function showCustomError (inputField, regex, tooltip, emptyFieldError, invalidInputError) {
    return e => {
        
        
        if (textInputValidator(inputField, regex) === 'valid input') {
            tooltip.style.display = 'none';
            
        } else if (textInputValidator(inputField, regex) === 'empty input') {
            tooltip.style.display = 'block';
            tooltip.textContent = emptyFieldError;
            
        } else if (textInputValidator(inputField, regex) === 'invalid input') {
            tooltip.style.display = 'block';
            tooltip.textContent = invalidInputError;
        }
    }
}

//validator for Activities section, or checkbox validator
// activitiesFieldset.addEventListener('change', (e) => {



// });


//event listeners for all input fields
nameInputField.addEventListener('input', showCustomError(nameInputField, regexName, nameError, emptyName, invalidName));
emailInputField.addEventListener('input', showCustomError(emailInputField, regexEmail, emailError, emptyEmail, invalidEmail));
ccNumberInput.addEventListener('input', showCustomError(ccNumberInput, regexCreditCard, creditCardError, emptyCC, invalidCC));
zipInput.addEventListener('input', showCustomError(zipInput, regexZipCode, zipError, emptyZip, invalidZip));
cvvInput.addEventListener('input', showCustomError(cvvInput, regexCVV, cvvError, emptyCVV, invalidCVV));






// form.addEventListener('submit', (e) => {
    
//     if (!validator(nameInputField, regexName)) {
//         e.preventDefault();
        
//     }
//     // || !validator(emailInputField, regexEmail) 
//     // ||  !validator(ccNumberInput, regexCreditCard) 
//     // || !validator(zipInput, regexZipCode) || 
//     //     !validator(cvvInput, regexCVV))    
//     {

//         nameInputField.parentNode.className = 'not-valid';
//         nameError.style.display = 'block';
//     } else if (!validator(emailInputField, regexEmail)) {
//         emailInputField.parentNode.className = 'not-valid';
//         emailError.style.display = 'block';
//     }
// });











