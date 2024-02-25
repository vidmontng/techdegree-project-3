document.querySelector('input[id="name"]').focus();
document.querySelector('input[id="other-job-role"]').style.display = 'none';
document.querySelector('select[id="color"]').disabled = true;
document.querySelector('div[id="paypal"]').style.display = 'none';
document.querySelector('div[id="bitcoin"]').style.display = 'none';
document.querySelector('option[value="credit-card"]').selected = true;


const jobRole = document.querySelector('select[id="title"]');
const selectDesign = document.querySelector('select[id="design"]');
const selectColor = document.querySelector('select[id="color"]');
const colorOptions = selectColor.querySelectorAll('option[data-theme]');
const activitiesFieldset = document.querySelector('fieldset[id="activities"]');
const checkboxesOfActivities = activitiesFieldset.querySelectorAll('input[type="checkbox"]');
const selectPayment = document.querySelector('select[id="payment"]');
const creditCardInfo = document.querySelector('div[id="credit-card"]');
const nameInputField = document.querySelector('#name');
const emailInputField = document.querySelector('#email');



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
    const colors = Array.from(colorOptions);
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


/**************** Form Validation *****************/

function nameValidation () {
    return /^[a-zA-Z]+$/.test(nameInputField.value);
}

function emailValidation () {
    return /^[^@]+@[^@.]+\.[a-z]+$/i.test(emailInputField.value);
}

nameInputField.addEventListener('keyup', () => {
    
    const nameError = document.querySelector('#name-hint');
    
    if (!nameValidation() && nameInputField.value!=='') {        
        nameError.style.display = 'block';
        nameError.textContent = 'Name must contain only letters';
    } else if (nameValidation() || nameInputField.value ==='') {
        nameError.style.display = 'none';
    }
});


emailInputField.addEventListener('keyup', (e) => {

    const verification = /^[^@]+@[^@.]+\.[a-z]+$/i.test(emailInputField.value);
    const emailError = document.querySelector('span[id="email-hint"]');

    if (!verification && emailInputField.value!=='') {        
        emailError.style.display = 'block';
        
    } else if (verification || emailInputField.value ==='') {
        emailError.style.display = 'none';
    }
});






