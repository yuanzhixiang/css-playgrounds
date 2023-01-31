const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const password2 = document.getElementById("password2");

// Show input error message
function showError(input, message) {
  const formControl = input.parentElement;
  const small = formControl.querySelector("small");
  small.innerText = message;
  formControl.className = "form-control error";
}

// Show success outline
function showSuccess(input) {
  const formControl = input.parentElement;
  formControl.className = "form-control success";
}

// Check email is valid
function checkEmail(input) {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(input.value.trim())) {
    showSuccess(input);
    return true;
  } else {
    showError(input, "Email is not valid");
    return false;
  }
}

// Check input length
function checkLength(input, min, max) {
  if (input.value.length < min) {
    showError(
      input,
      `${getFieldName(input)} must be at least ${min} characters`
    );
    return false;
  } else if (input.value.length > max) {
    showError(
      input,
      `${getFieldName(input)} must be less than ${max} characters`
    );
    return false;
  } else {
    showSuccess(input);
    return true;
  }
}

// Check passwords match
function checkPasswordsMatch(input1, input2) {
  if (input1.value !== input2.value) {
    showError(input2, "Passwords do not match");
    return false;
  } else {
    return true;
  }
}

// Get fieldname
function getFieldName(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

// Check required fields
function hasValue(input) {
  let isRequired = true;

  if (input.value.trim() === "") {
    showError(input, `${getFieldName(input)} is required`);
    isRequired = false;
  } else {
    showSuccess(input);
  }

  return isRequired;
}

function clearValue(inputArray) {
  inputArray.forEach((input) => {
    input.value = "";
    input.parentElement.className = "form-control";
  });
}

form.addEventListener("submit", function (e) {
  e.preventDefault();

  let submit = true;

  const hasUsername = hasValue(username);
  submit &= hasUsername;
  if (hasUsername) {
    submit &= checkLength(username, 3, 15);
  }

  const hasEmail = hasValue(email);
  submit &= hasEmail;
  if (hasEmail) {
    submit &= checkEmail(email);
  }

  const hasPassword = hasValue(password);
  submit &= hasPassword;
  if (hasPassword) {
    submit &= checkLength(password, 6, 25);
  }

  const hasPassword2 = hasValue(password2);
  submit &= hasPassword2;
  if (hasPassword2) {
    submit &= checkPasswordsMatch(password, password2);
  }

  if (submit) {
    clearValue([username, email, password, password2]);
    alert("Congratulations on successful registration");
  }
});
