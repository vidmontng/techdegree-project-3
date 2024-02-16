document.querySelector('input[id="name"]').focus();
document.querySelector('input[id="other-job-role"]').style.display = 'none';

const jobRole = document.querySelector('select[id="title"]');

jobRole.addEventListener('change', e => {
    if (e.target.value === "other") {
        document.querySelector('input[id="other-job-role"]').style.display = 'inline-block';
    }

});
