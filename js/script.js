document.querySelector('input[id="name"]').focus();
document.querySelector('input[id="other-job-role"]').style.display = 'none';
document.querySelector('select[id="color"]').disabled = true;
document.querySelector('div[id="paypal"]').style.display = 'none';
document.querySelector('div[id="bitcoin"]').style.display = 'none';
document.querySelector('option[value="credit-card"]').selected = true;


const selectDesign = document.querySelector('select[id="design"]');
const jobRole = document.querySelector('select[id="title"]');
const selectColor = document.querySelector('select[id="color"]');
const colorOptions = selectColor.querySelectorAll('option[data-theme]');
const activitiesFieldset = document.querySelector('fieldset[id="activities"]');
const checkboxesOfActivities = activitiesFieldset.querySelectorAll('input[type="checkbox"]');
const selectPayment = document.querySelector('select[id="payment"]');
const creditCardInfo = document.querySelector('div[id="credit-card"]');



//event listener to hide/reveal "other job" field 
jobRole.addEventListener('change', e => {
    if (e.target.value === "other") {
        document.querySelector('input[id="other-job-role"]').style.display = 'inline-block';
    }
});

//event listener to reflect only the colors available for the selected t-shirt theme  ****NOT FINISHED****
selectDesign.addEventListener('change', e => {
    selectColor.disabled = false;
    let color = e.target.value;
    
    for (let i=0; i<colorOptions.length; i++) {
        if (color === colorOptions[i].getAttribute('data-theme')) {
            colorOptions[i].hidden = false;
        } else if (color !== colorOptions[i].getAttribute('data-theme'))
            colorOptions[i].hidden = true;
    }
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