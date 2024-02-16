document.querySelector('input[id="name"]').focus();
document.querySelector('input[id="other-job-role"]').style.display = 'none';
document.querySelector('select[id="color"]').disabled = true;

const selectDesign = document.querySelector('select[id="design"]');
const jobRole = document.querySelector('select[id="title"]');
const selectColor = document.querySelector('select[id="color"]');
const colorOptions = selectColor.querySelectorAll('option[data-theme]');

jobRole.addEventListener('change', e => {
    if (e.target.value === "other") {
        document.querySelector('input[id="other-job-role"]').style.display = 'inline-block';
    }
});


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