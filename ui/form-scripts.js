export class FormValidation {
    constructor() {
        this._form = document.getElementsByTagName('form')[0];
        this._emailBlock = document.getElementById('email-block');
        this._email = document.getElementById('email');
        this._pwdBlock = document.getElementById('pwd-block');
        this._pwd = document.getElementById('pwd');
        this._newPwdBlock = document.getElementById('newpwd-block');
        this._newPwd = document.getElementById('new-pwd');
        this._deviceBlock = document.getElementById('device-block');
        this._device = document.getElementById('device');
        this._submit = document.getElementById('submit');
        document.getElementById('btn-login').addEventListener('click', () => this.formFields('login'));
        document.getElementById('btn-create').addEventListener('click', () => this.formFields('create'));
        document.getElementById('btn-update').addEventListener('click', () => this.formFields('update'));
        document.getElementById('btn-reset').addEventListener('click', () => this.formFields('reset'));
        document.getElementById('btn-delete').addEventListener('click', () => this.formFields('delete'));
        this._email.addEventListener('blur', () => this.checkEmail(this._email, this._emailBlock));
        this._pwd.addEventListener('blur', () => this.checkPwd(this._pwd, this._pwdBlock));
        this._newPwd.addEventListener('blur', () => this.checkPwd(this._newPwd, this._newPwdBlock));
        this._device.addEventListener('blur', () => this.checkDevice(this._device, this._deviceBlock));
        this._submit.addEventListener('click', () => this.checkFields());
    }
    formFields(btn) {
        this._form.className = this._form.className.replace('d-none', '');
        switch (btn) {
            case 'login':
                this._pwdBlock.className = this._pwdBlock.className.replace('d-none', '');
                this._newPwdBlock.className = this._newPwdBlock.className.includes('d-none') ? this._newPwdBlock.className : `${this._newPwdBlock.className} d-none`;
                this._deviceBlock.className = this._deviceBlock.className.includes('d-none') ? this._deviceBlock.className : `${this._deviceBlock.className} d-none`;
                break;
            case 'create':
                this._pwdBlock.className = this._pwdBlock.className.replace('d-none', '');
                this._deviceBlock.className = this._deviceBlock.className.replace('d-none', '');
                this._newPwdBlock.className = this._newPwdBlock.className.includes('d-none') ? this._newPwdBlock.className : `${this._newPwdBlock.className} d-none`;
                break;
            case 'update':
                this._pwdBlock.className = this._pwdBlock.className.replace('d-none', '');
                this._newPwdBlock.className = this._newPwdBlock.className.replace('d-none', '');
                this._deviceBlock.className = this._deviceBlock.className.includes('d-none') ? this._deviceBlock.className : `${this._deviceBlock.className} d-none`;
                break;
            case 'reset':
                this._pwdBlock.className = this._pwdBlock.className.includes('d-none') ? this._pwdBlock.className : `${this._pwdBlock.className} d-none`;
                this._newPwdBlock.className = this._newPwdBlock.className.includes('d-none') ? this._newPwdBlock.className : `${this._newPwdBlock.className} d-none`;
                this._deviceBlock.className = this._deviceBlock.className.includes('d-none') ? this._deviceBlock.className : `${this._deviceBlock.className} d-none`;
                break;
            case 'delete':
                this._pwdBlock.className = this._pwdBlock.className.replace('d-none', '');
                this._newPwdBlock.className = this._newPwdBlock.className.includes('d-none') ? this._newPwdBlock.className : `${this._newPwdBlock.className} d-none`;
                this._deviceBlock.className = this._deviceBlock.className.includes('d-none') ? this._deviceBlock.className : `${this._deviceBlock.className} d-none`;
                break;
        }
    }
    validationUI(input, block, valid, msg) {
        const errorNode = block.getElementsByClassName('invalid-feedback')[0];
        if (valid) {
            input.className = `${input.className.replace('is-invalid', '')} is-valid`;
            errorNode && block.removeChild(errorNode);
        }
        else if (!valid && !errorNode) {
            const error = document.createElement('div');
            error.className = 'invalid-feedback';
            error.textContent = msg;
            block.appendChild(error);
            input.className = `${input.className} is-invalid`;
        }
        else if (!valid && errorNode.textContent === 'Field is required') {
            errorNode.textContent = msg;
        }
    }
    checkEmail(input, block) {
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        const valid = emailRegex.test(input.value);
        this.validationUI(input, block, valid, 'Wrong email format');
    }
    checkPwd(input, block) {
        const pwdRegex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
        const valid = pwdRegex.test(input.value);
        this.validationUI(input, block, valid, 'Password must contain at least 8 characters, including letters lower/upper case, numbers and special characters');
    }
    checkDevice(input, block) {
        const deviceRegex = /^[0-9]{8}$/;
        const valid = deviceRegex.test(input.value);
        this.validationUI(input, block, valid, 'Device ID must contain 8 digits');
    }
    checkFields() {
        const emailValid = this._email.className.includes('is-valid');
        const pwdValid = this._pwd.className.includes('is-valid') || this._pwdBlock.className.includes('d-none');
        const newPwdValid = this._newPwd.className.includes('is-valid') || this._newPwdBlock.className.includes('d-none');
        const deviceValid = this._device.className.includes('is-valid') || this._deviceBlock.className.includes('d-none');
        if (emailValid && pwdValid && newPwdValid && deviceValid) {
            this._form.className = 'd-none';
            document.getElementById('buttons').className = 'd-none';
            document.getElementById('submitted-msg').className = '';
        }
        else {
            !emailValid && this.validationUI(this._email, this._emailBlock, false, 'Field is required');
            !pwdValid && this.validationUI(this._pwd, this._pwdBlock, false, 'Field is required');
            !newPwdValid && this.validationUI(this._newPwd, this._newPwdBlock, false, 'Field is required');
            !deviceValid && this.validationUI(this._device, this._deviceBlock, false, 'Field is required');
        }
    }
}
