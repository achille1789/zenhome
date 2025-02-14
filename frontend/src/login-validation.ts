type button = 'login' | 'create' | 'update' | 'reset' | 'delete';

export class FormValidation {
    private _form: HTMLFormElement = document.getElementsByTagName('form')[0];
    private _emailBlock: HTMLElement = document.getElementById('email-block')!;
    private _email: HTMLInputElement = document.getElementById('email')! as HTMLInputElement;
    private _pwdBlock: HTMLElement = document.getElementById('pwd-block')!;
    private _pwd: HTMLInputElement = document.getElementById('pwd') as HTMLInputElement;
    private _newPwdBlock: HTMLElement = document.getElementById('newpwd-block')!;
    private _newPwd: HTMLInputElement = document.getElementById('new-pwd') as HTMLInputElement;
    private _deviceBlock: HTMLElement = document.getElementById('device-block')!;
    private _device: HTMLInputElement = document.getElementById('device') as HTMLInputElement;
    private _submit: HTMLElement = document.getElementById('submit')!;
    
    constructor() {
        document.getElementById('btn-login')!.addEventListener('click', (): void => this.formFields('login'));
        document.getElementById('btn-create')!.addEventListener('click', (): void => this.formFields('create'));
        document.getElementById('btn-update')!.addEventListener('click', (): void => this.formFields('update'));
        document.getElementById('btn-reset')!.addEventListener('click', (): void => this.formFields('reset'));
        document.getElementById('btn-delete')!.addEventListener('click', (): void => this.formFields('delete'));
        this._email.addEventListener('blur', (): void => this.checkEmail(this._email, this._emailBlock));
        this._pwd.addEventListener('blur', (): void => this.checkPwd(this._pwd, this._pwdBlock));
        this._newPwd.addEventListener('blur', (): void => this.checkPwd(this._newPwd, this._newPwdBlock));
        this._device.addEventListener('blur', (): void => this.checkDevice(this._device, this._deviceBlock));
        this._submit.addEventListener('click', (): void => this.checkFields());
    }

     formFields(btn: button): void {
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
    
     validationUI(input: Element, block: Element, valid: boolean, msg: string): void {
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
    }
    
     checkEmail(input: HTMLInputElement, block: Element): void {
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        const valid = emailRegex.test(input.value);
        this.validationUI(input, block, valid, 'Wrong email format');
    }
    
     checkPwd(input: HTMLInputElement, block: Element): void {
        const pwdRegex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
        const valid = pwdRegex.test(input.value)
        this.validationUI(input, block, valid, 'Password must contain at least 8 characters, including letters lower/upper case, numbers and special characters');
    }
    
     checkDevice(input: HTMLInputElement, block: Element): void {
        const deviceRegex = /^[0-9]{8}$/;
        const valid = deviceRegex.test(input.value);
        this.validationUI(input, block, valid, 'Device ID must contain 8 digits');
    }
    
     checkFields(): void {
        const emailValid = this._email.className.includes('is-valid');
        const pwdValid = this._pwd.className.includes('is-valid') || this._pwdBlock.className.includes('d-none');
        const newPwdValid = this._newPwd.className.includes('is-valid') || this._newPwdBlock.className.includes('d-none');
        const deviceValid = this._device.className.includes('is-valid') || this._deviceBlock.className.includes('d-none');
        if (emailValid && pwdValid && newPwdValid && deviceValid) {
            this._form.className = 'd-none';
            document.getElementById('buttons')!.className = 'd-none';
            document.getElementById('submitted-msg')!.className = '';
        } else {
            !emailValid && this.validationUI(this._email, this._emailBlock, false, 'Field is required');
            !pwdValid && this.validationUI(this._pwd, this._pwdBlock, false, 'Field is required');
            !newPwdValid && this.validationUI(this._newPwd, this._newPwdBlock, false, 'Field is required');
            !deviceValid && this.validationUI(this._device, this._deviceBlock, false, 'Field is required');
        }
    }
}
