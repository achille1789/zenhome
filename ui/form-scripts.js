const form = document.getElementsByTagName('form')[0];
const emailBlock = document.getElementById('email-block');
const email = document.getElementById('email');
const pwdBlock = document.getElementById('pwd-block');
const pwd = document.getElementById('pwd');
const newPwdBlock = document.getElementById('newpwd-block');
const newPwd = document.getElementById('new-pwd');
const deviceBlock = document.getElementById('device-block');
const device = document.getElementById('device');
const submit = document.getElementById('submit');

export const setEvents = () => {
    document.getElementById('btn-login').addEventListener('click', () => formFields('login'));
    document.getElementById('btn-create').addEventListener('click', () => formFields('create'));
    document.getElementById('btn-update').addEventListener('click', () => formFields('update'));
    document.getElementById('btn-reset').addEventListener('click', () => formFields('reset'));
    document.getElementById('btn-delete').addEventListener('click', () => formFields('delete'));
    email.addEventListener('blur', () => checkEmail(email, emailBlock));
    pwd.addEventListener('blur', () => checkPwd(pwd, pwdBlock));
    newPwd.addEventListener('blur', () => checkPwd(newPwd, newPwdBlock));
    device.addEventListener('blur', () => checkDevice(device, deviceBlock));
    submit.addEventListener('click', () => checkFields());
};

export const formFields = (btn) => {
    form.className = form.className.replace('d-none', '');
    switch (btn) {
        case 'login':
            pwdBlock.className = pwdBlock.className.replace('d-none', '');
            newPwdBlock.className = newPwdBlock.className.includes('d-none') ? newPwdBlock.className : `${newPwdBlock.className} d-none`;
            deviceBlock.className = deviceBlock.className.includes('d-none') ? deviceBlock.className : `${deviceBlock.className} d-none`;
            break;
        case 'create':
            pwdBlock.className = pwdBlock.className.replace('d-none', '');
            deviceBlock.className = deviceBlock.className.replace('d-none', '');
            newPwdBlock.className = newPwdBlock.className.includes('d-none') ? newPwdBlock.className : `${newPwdBlock.className} d-none`;
            break;
        case 'update':
            pwdBlock.className = pwdBlock.className.replace('d-none', '');
            newPwdBlock.className = newPwdBlock.className.replace('d-none', '');
            deviceBlock.className = deviceBlock.className.includes('d-none') ? deviceBlock.className : `${deviceBlock.className} d-none`;
            break;
        case 'reset':
            pwdBlock.className = pwdBlock.className.includes('d-none') ? pwdBlock.className : `${pwdBlock.className} d-none`;
            newPwdBlock.className = newPwdBlock.className.includes('d-none') ? newPwdBlock.className : `${newPwdBlock.className} d-none`;
            deviceBlock.className = deviceBlock.className.includes('d-none') ? deviceBlock.className : `${deviceBlock.className} d-none`;
            break;
        case 'delete':
            pwdBlock.className = pwdBlock.className.replace('d-none', '');
            newPwdBlock.className = newPwdBlock.className.includes('d-none') ? newPwdBlock.className : `${newPwdBlock.className} d-none`;
            deviceBlock.className = deviceBlock.className.includes('d-none') ? deviceBlock.className : `${deviceBlock.className} d-none`;
            break;
    }
};

export const validationUI = (input, block, valid, msg) => {
    const errorNode = block.getElementsByClassName('invalid-feedback')[0];
    if (valid) {
        input.className = `${input.className.replace('is-invalid', '')} is-valid`;
        errorNode && block.removeChild(errorNode);
    } else if (!valid && !errorNode) {
        const error = document.createElement('div');
        error.className = 'invalid-feedback';
        error.textContent = msg;
        block.appendChild(error);
        input.className = `${input.className} is-invalid`;
    } else if (!valid && errorNode.textContent === 'Field is required') {
        errorNode.textContent = msg;
    }
};

export const checkEmail = (input, block) => {
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    const valid = emailRegex.test(input.value);
    validationUI(input, block, valid, 'Wrong email format');
};

export const checkPwd = (input, block) => {
    const pwdRegex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    const valid = pwdRegex.test(input.value);
    validationUI(input, block, valid, 'Password must contain at least 8 characters, including letters lower/upper case, numbers and special characters');
};

export const checkDevice = (input, block) => {
    const deviceRegex = /^[0-9]{8}$/;
    const valid = deviceRegex.test(input.value);
    validationUI(input, block, valid, 'Device ID must contain 8 digits');
};

export const checkFields = () => {
    const emailValid = email.className.includes('is-valid');
    const pwdValid = pwd.className.includes('is-valid') || pwdBlock.className.includes('d-none');
    const newPwdValid = newPwd.className.includes('is-valid') || newPwdBlock.className.includes('d-none');
    const deviceValid = device.className.includes('is-valid') || deviceBlock.className.includes('d-none');
    if (emailValid && pwdValid && newPwdValid && deviceValid) {
        form.className = 'd-none';
        document.getElementById('buttons').className = 'd-none';
        document.getElementById('submitted-msg').className = '';
    } else {
        !emailValid && validationUI(email, emailBlock, false, 'Field is required');
        !pwdValid && validationUI(pwd, pwdBlock, false, 'Field is required');
        !newPwdValid && validationUI(newPwd, newPwdBlock, false, 'Field is required');
        !deviceValid && validationUI(device, deviceBlock, false, 'Field is required');
    }
};

window.addEventListener('load', setEvents);