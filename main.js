//  input reference ...
const form = document.getElementById('form');
const firstName = document.getElementById('first-name');
const lastName = document.getElementById('last-name');
const dob = document.getElementById('date');
const radio_msg = document.getElementById('radio_msg');
const username = document.getElementById('username');
const number = document.getElementById('number');
const email = document.getElementById('email');
const password = document.getElementById('password');
const confirmpass = document.getElementById('confirm_password');

// success/welcome message pop-up type message ...
const overlay_div = document.querySelector('.overlay');
const chang_form = document.querySelector('.main_form');

//  refrence buttons ...
const submitbtn = document.querySelector('.btn');

// stop to submit the form forcefully and call main function ...
form.addEventListener('submit', (e) => {
  e.preventDefault();
  isformvalid();
});

//  checked all inputs are valid one by one ... 
// checking step 1 ...
const isInputschecked = (y, firstnameval) => {
  let inputclassName = document.getElementsByClassName('input_class');

  let count = inputclassName.length - 1;
  for (var i = 0; i < inputclassName.length; i++) {
    if (inputclassName[i].className === 'input_class success') {
      sendData(count, i, y, firstnameval);
      // console.log(i + ' its a array');
      //console.log(count + ' its count');
    } else {
      return false;
    };
  };
};

//  check is input fields and valid input fields are equally valid ? 
// checking step 2 ...
function sendData(count, i, y, firstnameval) {
  if (count === i && y == 1) {
    updateform(firstnameval);
  };
};

function updateform(firstnameval) {
  chang_form.classList.add('deactive');
  overlay_div.classList.add('active');
  
  // take User/Guest data i.e, user's Name to show welcome message ...
  let guestData = document.getElementById('guest_name');
  guestData.innerText = firstnameval;

  setTimeout((delay) => {
    form.reset();
    chang_form.classList.remove('deactive');
    overlay_div.classList.remove('active');
  }, 5000);
};

// main validation function ...
function isformvalid() {

  //  trim all inputs ...
  const firstnameval = firstName.value.trim();
  const lastnameval = lastName.value.trim();
  const dobval = dob.value.trim();
  const numberval = number.value.trim();
  const emailval = email.value.trim();
  const passwordval = password.value.trim();
  const confirmpassval = confirmpass.value.trim();

  //  first name validation ...
  let regName = /^[a-zA-Z]+$/;
  if (firstnameval === "") {
    seterror(firstName, 'Please enter your first name');
  } else if (!regName.test(firstnameval)) {
    seterror(firstName, 'Name dose not contain Numbers & Special Characters.');
  } else if (firstnameval.length == 1) {
    seterror(firstName, 'First name is too small');
  } else {
    setsuccess(firstName);
  };

  //  last name validation  ...
  if (lastnameval === "") {
    seterror(lastName, 'Please enter your last name');
  } else if (!regName.test(lastnameval)) {
    seterror(lastName, 'Name dose not contain Numbers & Special Characters.');
  } else if (lastnameval.length <= 2) {
    seterror(lastName, 'Last name is small');
  } else {
    setsuccess(lastName);
  };

  //  date of birth area validation ...
  if (dobval === '') {
    seterror(dob, 'Date of birth is required');
  } else {
    setsuccess(dob);
  };

  // Validating radio button.
  const radio_check = form.gender;
  for (var i = 0; i < radio_check.length; i++) {
    if (radio_check[i].checked == true) {
      radio_msg.innerText = '';
      var y = 1;
      break;
    } else {
      var y = 0;
      radio_msg.innerText = 'Please select your gender.';
    };
  };

  // validation number ...
  if (numberval === '' || numberval == undefined) {
    seterror(number, 'Your number is required!');
  } else if (numberval.length < 10 || numberval.length >= 11) {
    seterror(number, 'Please enter your correct number.');
  } else {
    setsuccess(number);
  };

  // validity mail is valid and correct or not ? ...
  //check validity through Regex language ...
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (emailval === '' || emailval == undefined) {
    seterror(email, 'Email is required!');
  } else if (!re.test(emailval)) {
    seterror(email, "You have entered an invalid email address!");
  } else {
    setsuccess(email);
  };

  //  password validation ...
  if (passwordval === '' || passwordval == undefined) {
    seterror(password, 'Please enter password');
  } else if (passwordval.length < 8) {
    seterror(password, 'Password should be 8 characters.');
  } else {
    setsuccess(password);
  };

  if (confirmpassval === '' || confirmpassval == undefined) {
    seterror(confirmpass, 'Please enter confirm password');
  } else if (confirmpassval !== passwordval || confirmpassval.length !== passwordval.length) {
    seterror(confirmpass, 'Confirm password dose not match.');
  } else {
    setsuccess(confirmpass);
  };

  //  error message handler ...
  function seterror(input, message) {
    const inputfield = input.parentElement;
    const msg = inputfield.querySelector('#message');
    msg.innerText = message;
    input.style.border = '1px solid red';
  };

  //  success message handler ...
  function setsuccess(input) {
    const inputfield = input.parentElement;
    const msg = inputfield.querySelector('#message');
    msg.innerText = '';
    input.style.border = '1px solid #3E4590';
    input.classList.add('success');
  };

  isInputschecked(y, firstnameval); // check all inputs are  validate ? ...
};
//  main function end ...
//***************----------****************

// password hide and show function...
const passToggleBtn = document.getElementById('pass-toggleBtn');
const conf_passToggleBtn = document.getElementById('conf-pass-toggleBtn');

passToggleBtn.addEventListener('click', () => {
  if (password.type === 'password') {
    password.type = "text";
  } else if (password.type === 'text') {
    password.type = 'password';
  };
});

conf_passToggleBtn.addEventListener('click', () => {
  if (confirmpass.type === 'password') {
    confirmpass.type = "text";
  } else if (confirmpass.type === 'text') {
    confirmpass.type = 'password';
  }
});