/*** Declaring all variables ***/
const   jobRole = document.querySelector('#title'),
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
        creditCardError = document.querySelector('#cc-hint'),
        zipError = document.querySelector('#zip-hint'),
        cvvError = document.querySelector('#cvv-hint');
        

/*** Default states for elements on page load ***/
nameInputField.focus();
otherJobRole.style.display = 'none';
selectColor.disabled = true;
payPal.style.display = 'none';
bitcoin.style.display = 'none';
creditCardOption.selected = true;




//event listener to hide/reveal "other job" field 
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
   let totalCostElement = activitiesFieldset.querySelector('p[id="activities-cost"]');   
   let total = 0;
        //looping through every checkbox to check if the activity was checked by a user
        for (let i=0; i<checkboxesOfActivities.length; i++) {
            if (checkboxesOfActivities[i].checked) {
                total +=parseInt(checkboxesOfActivities[i].getAttribute('data-cost'));
            } 
        }  
        //updating text content of Total to new amount
        totalCostElement.textContent = `Total: $${total}`;
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
 * SOme variables at the bottom are assigned new text content and some assigned text content that was already assigned in the HTML. 
 * It was done because the function that creates event objects for listeners has the same format for all input fields, 
 * but need different error messages for different errors. Some of them match the text already assigned to them in HTML, some - don't. ***/
const   regexName = /^[a-zA-Z]+$/,
        regexEmail = /^[^@]+@[^@.]+\.[a-z]+$/i,
        regexCreditCard = /^[\d]{13,16}$/,
        regexZipCode = /^[\d]{5}$/,
        regexCVV = /^[\d]{3}$/,
        nameErrorMsg = `Name can only contain letters`,
        emailErrorMsg = emailError.textContent,
        ccErrorMsg = creditCardError.textContent,
        zipCodeError = zipError.textContent,
        cvvErrorMsg = cvvError.textContent;

//this function will validate all input fields
function validator (value, regex) {
    return regex.test(value);
}


//created closure - function that will return event objects for event listeners for all input fields
function eventListener (inputField, regex, errorMsg, errorText) {
    return e => {
        const text = inputField.value;
        const validation = validator (text, regex);

        if (!validation && text!=='') {
            errorMsg.style.display = 'block';
            errorMsg.textContent = errorText;
        } else if (validation || text ===''){
            errorMsg.style.display = 'none';
        }  
    }
}

//event listeners for all input fields
nameInputField.addEventListener('keyup', eventListener(nameInputField, regexName, nameError, nameErrorMsg));
emailInputField.addEventListener('keyup', eventListener(emailInputField, regexEmail, emailError, emailErrorMsg));
ccNumberInput.addEventListener('keyup', eventListener(ccNumberInput, regexCreditCard, creditCardError, ccErrorMsg));
zipInput.addEventListener('keyup', eventListener(zipInput, regexZipCode, zipError, zipCodeError));
cvvInput.addEventListener('keyup', eventListener(cvvInput, regexCVV, cvvError));
