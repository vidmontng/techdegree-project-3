# techdegree-project-3
 Interactive Form
According to the task #2 for the Exceeds Expactations grade we were supposed to provide form validation error indications at the moment they occur to better serve our user. 
That's how I resolved it. I programmed all text input fields so that as soon as a user starts typing, they get an error message IF the entered value or symbol is invalid. First of all, I chose to listen for the "input" event instead of "keyup" event, because the "keyup" event would be immediately triggered as soon as a text input field got in focus, even before a user starts typing) and would give an "empty error" message, which I think can cause pretty annoying experience. 
In my case, I selected <span> elements for name, email, credit card number, zip code and CVV input fields, and assigned them a specific text content depending on a type of error. For example, if a user started typing but the input was incorrect and was deleted completely - a user will get an "empty input" error. If a user usued an incorrect symbol (a digit in the name input field), they will get an "invalid input" error. 
Since we are not allowed to change the HTML source file, I had to assign new text content to some <span> elements, and assign old text to the others. 
1. I created all regular expressions for validation and assigned the text content to the cusomized error messages.

2. Then I created a textInputValidator((inputField, regex) function that is used to validate each input field (name, email, credit card, zip, CVV). It accepts the value entered by a user and there are three options for return: "validation was successful", "validation failed because the input was incorrect" and validation failed because the input was empty".

3. Function showCustomError(inputField, regex, tooltip, emptyFieldError, invalidInputError) accepts user input, a regular expression for this field, an <span> element (tooltip) that will be shown as an error message, and the text of an error message for an empty input and incorrect input. Depending on the value returned by textInputValidator(inputField, regex) function, a proper error message will be returned.

4. And finally, I created event lisneters for every input field. They listen for "input" event and run showCustomError(inputField, regex, tooltip, emptyFieldError, invalidInputError) function.

I also created a new <span> element for the form submission. I inserted it at the top of the "Activities" section and assigned the proper text content. Also, inserted it above the "Submit" button and assigned a different text content. 
In case ANY of the required fields didn't pass validation, user won't be ablel to submit the form. Pressing "Submit" button will trigger error messages for all fields that were incorrectly filled.
