/*** Selected all form elements that will be needed for the project ***/
const   form = document.querySelector('form'),
        jobRole = document.querySelector('#title'),
        otherJobRoleOption = document.querySelector('input[value="other"]'),
        otherJobRole = document.querySelector('#other-job-role'),
        selectDesign = document.querySelector('#design'),
        selectColor = document.querySelector('#color'),
        colorOptions = selectColor.querySelectorAll('option[data-theme]'),
        activitiesFieldset = document.querySelector('#activities'),
        activities = document.querySelector('#activities-box'),
        totalCostElement = activitiesFieldset.querySelector('#activities-cost'),
        checkboxesOfActivities = activitiesFieldset.querySelectorAll('input'),
        selectPayment = document.querySelector('#payment'),
        paypal = document.querySelector('#paypal'),
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
        cvvError = document.querySelector('#cvv-hint');

       

/***Setting up default states for elements on page load ***/
nameInputField.focus();
otherJobRole.hidden = 'true';
selectColor.disabled = true;
paypal.style.display = 'none';
bitcoin.style.display = 'none';
creditCardOption.selected = true;


/*** Adding visible focus/blur states to the activities ***/
function activeBlur (state) {
    return e => {
        const label = e.target.parentNode;
        label.className = state;
    }
}

//event listener that accepts activeBlur() function
checkboxesOfActivities.forEach((activity) => { 
    activity.addEventListener('focus', activeBlur('focus'));
    activity.addEventListener('blur',  activeBlur('blur'));
});


/***Event listener to hide/reveal "other job" field ***/
jobRole.addEventListener('change', (e) => {
    const job = e.target;
    if (job.value === 'other') {
        otherJobRole.style.display = 'block';
    } else if (job.value !== 'other') {
        otherJobRole.style.display = 'none';
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
        let colorValue = colors[i].getAttribute('data-theme');
        
        if (design === colorValue) {
            colorOption.hidden = false;
            currentOptions.push(colorOption);
            } else {
                colorOption.hidden = true;
            }         
    } currentOptions[0].selected = 'selected';
});

/**********************************************************/
/***Event listener for 'Register For Activities' section***/
/***It listenesfor a "change" event and calculates the total cost of chosen activities AND 
 * disables activities with the same time period to  prevent users from selecting activities that occur at the same time. */
/**********************************************************/

activitiesFieldset.addEventListener('change', (e) => {
    //selecting the element that will reflect the total price of all chosen activities
        
    

        for (let i=0; i<checkboxesOfActivities.length; i++) {
            const activity = e.target;
            const checked = activity.checked;
            const activityTime = activity.getAttribute('data-day-and-time');
            const sameTime = [];
            let total = 0;
            const newActivity = checkboxesOfActivities[i];  
            const newActivityTime = newActivity.getAttribute('data-day-and-time');
            const newActivityCost = newActivity.getAttribute('data-cost');
            //  = activity.getAttribute('data-day-and-time');

            if (checked) {
                total += parseInt(newActivityCost);
            }

            if (newActivity!==activity && newActivityTime === activityTime) {                    
                sameTime.push(newActivity);
            } 
            if (checked) {
            sameTime.forEach(sameTimeActivity => {
                sameTimeActivity.disabled = true;
                sameTimeActivity.parentElement.classList.add('disabled');
            });
        } else {
            sameTime.forEach(sameTimeActivity => {
                sameTimeActivity.disabled = false;
                sameTimeActivity.parentElement.classList.remove('disabled');
            });

        }

        //updating text content of Total to new amount
        totalCostElement.textContent = `Total: $${total}`;
        }
});



// const activity = e.target;
//         const checked = activity.checked;
//         const activityTime = activity.getAttribute('data-day-and-time');
//         const sameTime = [];
//         let total = 0;

//             for (let i=0; i<checkboxesOfActivities.length; i++) {
//                 const newActivity = checkboxesOfActivities[i];  
//                 const newActivityTime = newActivity.getAttribute('data-day-and-time');
//                 const newActivityCost = newActivity.getAttribute('data-cost');
                
//                 if (checked) {
//                     total += parseInt(newActivityCost);

//                     if (newActivity!==activity && newActivityTime === activityTime) {                    
//                         sameTime.push(newActivity);
//                     }
                
//                 sameTime.forEach(sameTimeActivity => {
//                     sameTimeActivity.disabled = true;
//                     sameTimeActivity.parentElement.className = 'disabled';
//                 });
//             }

//         }
                          
//             //updating text content of Total to new amount
//             totalCostElement.textContent = `Total: $${total}`;

/**************Checkbox validator*****************/
/*****Checks if at least one of the activities was checked.***/

function validationOfActivities() {
    let counter = 0;
    checkboxesOfActivities.forEach(activity => {
        const checkedCheckboxes =[];
        const checked = activity.checked;

        if (checked) {
            checkedCheckboxes.push(checkedCheckboxes); 
            counter+=checkedCheckboxes.length; 
        }   
        if (counter === 0) {
            activitiesFieldset.classList.remove('valid');
            activitiesFieldset.classList.add('not-valid');
            return false;
        }
         else if (counter > 0) {
            activitiesFieldset.classList.remove('not-valid');
            activitiesFieldset.classList.add('valid');
            return true;
        }
    })
};


 activitiesFieldset.addEventListener('change', () =>  console.log(validationOfActivities()));


/*** Event listener to hide payment methods other than selected ***/

selectPayment.addEventListener('change', () => {
    if (selectPayment.value === 'paypal') {
        paypal.style.display = 'block';
        bitcoin.style.display = 'none';
        creditCardInfo.style.display = 'none';
    } else if (selectPayment.value === 'bitcoin') {
        bitcoin.style.display = 'block';
        paypal.style.display = 'none';
        creditCardInfo.style.display = 'none';
    } else if (selectPayment.value === 'credit-card') {
        creditCardInfo.style.display = 'block';
        bitcoin.style.display = 'none';
        paypal.style.display = 'none';        
    }

});

/**************************************************/
/**************** Form Validation *****************/
/**************************************************/





/***********Text input validation**************** */
/*** Declared variables for validation part of the project. 
 * Some variables are assigned new text content and some assigned text content from HTML code. 
 * It was done because we needed to create custome error messages depending on whether the input field was left empty 
 * or was incorrect. For example, name field has a default error message "Name field cannot be blank"(empty input error),
 * but email field has "Email address must be formatted correctly". Since we're not allowed to change HTML code, I assigned
 * new text content to some input fields.  
 * ***/
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

//created a span that will show an error message if submitted form
//is incorrect or incomplete.
function createErrorElement (errorText) {
    const invalidFormError = document.createElement('span');
    invalidFormError.className = 'invalid-form';
    invalidFormError.textContent = errorText;
    invalidFormError.style.fontSize = '20px';
    invalidFormError.style.color = 'red';
    invalidFormError.style.marginLeft = '20px';
    invalidFormError.style.marginBottom = '20px';
    invalidFormError.style.display = 'none';

    return invalidFormError;
}
//1.inserting newly created element above the 'Sumbit' button, this error will be shown
//  if *any* field is incorrect or left empty.
//2. Above the 'Activities" section, in case a user didn't check any activities at all. 

document.querySelector('button').insertAdjacentElement("beforebegin", createErrorElement ("Please make sure that the form is filled correctly"));
activitiesFieldset.querySelector(':first-child').insertAdjacentElement("beforeend", createErrorElement ("Please check at least one activity"));

//assigning both error messages to the variables
const errorMessagesForActivities = document.querySelectorAll('.invalid-form')[0];
const errorMessagesForForm = document.querySelectorAll('.invalid-form')[1];



/*** Created a function that will accept the value of the input
 * and a regular expression.There are three return values created
 * to provide a custom error messages****/
        
function textInputValidator (inputField, regex) {
    
    const input = inputField.value;
    const validation = regex.test(input);
    
    if (validation) {
        inputField.parentElement.className = 'valid';
        return 'validInput';
    } else if (input === '') {
        inputField.parentElement.className = 'not-valid';
        return 'emptyInput';
    } else if (!validation) {
        inputField.parentElement.className = 'not-valid';
        return 'invalidInput';
    }
}



//showCustomError function will show custom error messages depending
//on the values returned by textInputValidator function
function showCustomError (inputField, regex, tooltip, emptyFieldError, invalidInputError) {
     
    if (textInputValidator(inputField, regex) === 'validInput') {
        tooltip.style.display = 'none';
        
    } else if (textInputValidator(inputField, regex) === 'emptyInput') {
        tooltip.style.display = 'block';
        tooltip.textContent = emptyFieldError;
        
    } else if (textInputValidator(inputField, regex) === 'invalidInput') {
        tooltip.style.display = 'block';
        tooltip.textContent = invalidInputError;
    }
}
    

/******Event listeners which will run validation and show error messages 
*"invalid input/empty input" for all text input fields as soon as a user starts typing*******/
//I chose "input" event instead of the "keyup" for the following reason - since the Name input field
//is in focus as soon the page loads, it triggers the "keyup" event, and a user would immediately see
//an "empty field" error before starting to type, which may be annoying. To avoid it, "input" event was chosen, 
//in this case the errors will only be shown after a user starts typing and *IF* the input is incorrect.

nameInputField.addEventListener('input', (e) => showCustomError(nameInputField, regexName, nameError, emptyName, invalidName));
emailInputField.addEventListener('input', (e) => showCustomError(emailInputField, regexEmail, emailError, emptyEmail, invalidEmail));
ccNumberInput.addEventListener('input', (e) => showCustomError(ccNumberInput, regexCreditCard, creditCardError, emptyCC, invalidCC));
zipInput.addEventListener('input', (e) => showCustomError(zipInput, regexZipCode, zipError, emptyZip, invalidZip));
cvvInput.addEventListener('input', (e) => showCustomError(cvvInput, regexCVV, cvvError, emptyCVV, invalidCVV));


/****Form submition validator*******/
form.addEventListener('submit', (e) => {
    e.submitter = document.querySelector('button');

    const name = textInputValidator(nameInputField, regexName);
    const email = textInputValidator(emailInputField, regexEmail);
    const creditCard = textInputValidator(ccNumberInput, regexCreditCard);
    const zip = textInputValidator(zipInput, regexZipCode);
    const CVV = textInputValidator(cvvInput, regexCVV);

    
    if (name === 'emptyInput' || name === 'invalidInput') {
        e.preventDefault();
        errorMessagesForForm.style.display = 'block';
        showCustomError(nameInputField, regexName, nameError, emptyName, invalidName);
    }
    if (email === 'emptyInput' || email === 'invalidInput') {
        e.preventDefault();
        errorMessagesForForm.style.display = 'block';
        showCustomError(emailInputField, regexEmail, emailError, emptyEmail, invalidEmail);
    }
    if (selectPayment.value === 'credit-card'){

            if (creditCard === 'emptyInput' || creditCard === 'invalidInput') {
                e.preventDefault();
                errorMessagesForForm.style.display = 'block';  
                showCustomError(ccNumberInput, regexCreditCard, creditCardError, emptyCC, invalidCC);
            }
    
            if (zip === 'emptyInput' || zip === 'invalidINput') {
                e.preventDefault();
                errorMessagesForForm.style.display = 'block';
                showCustomError(zipInput, regexZipCode, zipError, emptyZip, invalidZip);
            }
        
            if (CVV === 'emptyInput' ||  CVV === 'invalidINput') {
                e.preventDefault();
                errorMessagesForForm.style.display = 'block';
                showCustomError(cvvInput, regexCVV, cvvError, emptyCVV, invalidCVV);
            }
    }
        
     if (!validationOfActivities()) {
        e.preventDefault();
        activitiesFieldset.classList.add('not-valid');
        errorMessagesForForm.style.display = 'block';
        errorMessagesForActivities.style.display = 'block';
    } 
});



