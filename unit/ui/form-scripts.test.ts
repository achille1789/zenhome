import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest';

import { FormValidation } from '../../ui/form-scripts';

describe('Form Scripts tests', () => {
    const btnLogin= document.createElement('button');
    const btnCreate= document.createElement('button');
    const btnUpdate= document.createElement('button');
    const btnReset= document.createElement('button');
    const btnDelete= document.createElement('button');
    const email = document.createElement('input');
    const pwd = document.createElement('input');
    const newPwd = document.createElement('input');
    const device = document.createElement('input');
    const submit = document.createElement('input');
    btnLogin.id = 'btn-login';
    btnCreate.id = 'btn-create';
    btnUpdate.id = 'btn-update';
    btnReset.id = 'btn-reset';
    btnDelete.id = 'btn-delete';
    email.id = 'email';
    pwd.id = 'pwd';
    newPwd.id = 'new-pwd';
    device.id = 'device';
    submit.id = 'submit';
    
    beforeEach(() => {
        document.body.appendChild(btnLogin);
        document.body.appendChild(btnCreate);
        document.body.appendChild(btnUpdate);
        document.body.appendChild(btnReset);
        document.body.appendChild(btnDelete);
        document.body.appendChild(email);
        document.body.appendChild(pwd);
        document.body.appendChild(newPwd);
        document.body.appendChild(device);
        document.body.appendChild(submit);
    });
    
    afterEach(() => {
        document.body.replaceChildren();
    });
    
    describe('Set Event API tests', () => {
        it('should attach all the needed listeners when the class is instantiated', () => {
            // arrange
            const btnLoginMock = vi.fn();
            const btnCreateMock = vi.fn();
            const btnUpdateMock = vi.fn();
            const btnResetMock = vi.fn();
            const btnDeleteMock = vi.fn();
            const emailMock = vi.fn();
            const pwdMock = vi.fn();
            const newPwdMock = vi.fn();
            const deviceMock = vi.fn();
            const submitMock = vi.fn();
            btnLogin.addEventListener = btnLoginMock;
            btnCreate.addEventListener = btnCreateMock;
            btnUpdate.addEventListener = btnUpdateMock;
            btnReset.addEventListener = btnResetMock;
            btnDelete.addEventListener = btnDeleteMock;
            email.addEventListener = emailMock;
            pwd.addEventListener = pwdMock;
            newPwd.addEventListener = newPwdMock;
            device.addEventListener = deviceMock;
            submit.addEventListener = submitMock;

            // action
            new FormValidation();

            // assert
            expect(btnLogin.addEventListener).toBeDefined();
            expect(btnCreate.addEventListener).toBeDefined();
            expect(btnUpdate.addEventListener).toBeDefined();
            expect(btnReset.addEventListener).toBeDefined();
            expect(btnDelete.addEventListener).toBeDefined();
            expect(email.addEventListener).toBeDefined();
            expect(pwd.addEventListener).toBeDefined();
            expect(newPwd.addEventListener).toBeDefined();
            expect(device.addEventListener).toBeDefined();
            expect(submit.addEventListener).toBeDefined();
            expect(btnLoginMock).toHaveBeenCalledWith('click', expect.any(Function));
            expect(btnCreateMock).toHaveBeenCalledWith('click', expect.any(Function));
            expect(btnUpdateMock).toHaveBeenCalledWith('click', expect.any(Function));
            expect(btnResetMock).toHaveBeenCalledWith('click', expect.any(Function));
            expect(btnDeleteMock).toHaveBeenCalledWith('click', expect.any(Function));
            expect(emailMock).toHaveBeenCalledWith('blur', expect.any(Function));
            expect(pwdMock).toHaveBeenCalledWith('blur', expect.any(Function));
            expect(newPwdMock).toHaveBeenCalledWith('blur', expect.any(Function));
            expect(deviceMock).toHaveBeenCalledWith('blur', expect.any(Function));
            expect(submitMock).toHaveBeenCalledWith('click', expect.any(Function));
        });
    });
    
    describe('Check Email tests', () => {
        it('should show email error message on UI when the input value has not 8 digits', () => {
            // arrange
            const spyValidationUI = vi.spyOn(FormValidation.prototype, 'validationUI').mockImplementation(() => {});
            const email = document.createElement('input');
            const emailBlock = document.createElement('div');
            email.value = 'asdfghy3434';
            emailBlock.appendChild(email);

            // action
            new FormValidation().checkEmail(email, emailBlock);

            // assert
            expect(spyValidationUI).toBeCalledWith(email, emailBlock, false, 'Wrong email format');
        });

        it('should do not show email error message on UI when the input value has 8 digits', () => {
            // arrange
            const spyValidationUI = vi.spyOn(FormValidation.prototype, 'validationUI').mockImplementation(() => {});
            const email = document.createElement('input');
            const emailBlock = document.createElement('div');
            email.value = 'hello@gmail.com';
            emailBlock.appendChild(email);

            // action
            new FormValidation().checkEmail(email, emailBlock);

            // assert
            expect(spyValidationUI).toBeCalledWith(email, emailBlock, true, 'Wrong email format');
        });
    });
    
    describe('Check Password API tests', () => {
        it('should show password error message on UI when the input value has only numbers', () => {
            // arrange
            const spyValidationUI = vi.spyOn(FormValidation.prototype, 'validationUI').mockImplementation(() => {});
            const pwd = document.createElement('input');
            const pwdBlock = document.createElement('div');
            pwd.value = '12345678';
            pwdBlock.appendChild(pwd);

            // action
            new FormValidation().checkPwd(pwd, pwdBlock);

            // assert
            expect(spyValidationUI).toBeCalledWith(pwd, pwdBlock, false, 'Password must contain at least 8 characters, including letters lower/upper case, numbers and special characters');
        });

        it('should show password error message on UI when the input value has only lower case letters', () => {
            // arrange
            const spyValidationUI = vi.spyOn(FormValidation.prototype, 'validationUI').mockImplementation(() => {});
            const pwd = document.createElement('input');
            const pwdBlock = document.createElement('div');
            pwd.value = 'abcfhgkjtly';
            pwdBlock.appendChild(pwd);

            // action
            new FormValidation().checkPwd(pwd, pwdBlock);

            // assert
            expect(spyValidationUI).toBeCalledWith(pwd, pwdBlock, false, 'Password must contain at least 8 characters, including letters lower/upper case, numbers and special characters');
        });

        it('should show password error message on UI when the input value has only upper case letters', () => {
            // arrange
            const spyValidationUI = vi.spyOn(FormValidation.prototype, 'validationUI').mockImplementation(() => {});
            const pwd = document.createElement('input');
            const pwdBlock = document.createElement('div');
            pwd.value = 'SDFGHJKILJJ';
            pwdBlock.appendChild(pwd);

            // action
            new FormValidation().checkPwd(pwd, pwdBlock);

            // assert
            expect(spyValidationUI).toBeCalledWith(pwd, pwdBlock, false, 'Password must contain at least 8 characters, including letters lower/upper case, numbers and special characters');
        });

        it('should do not show password error message on UI when the input value has all expected values', () => {
            // arrange
            const spyValidationUI = vi.spyOn(FormValidation.prototype, 'validationUI').mockImplementation(() => {});
            const pwd = document.createElement('input');
            const pwdBlock = document.createElement('div');
            pwd.value = 'P@ssword1';
            pwdBlock.appendChild(pwd);

            // action
            new FormValidation().checkPwd(pwd, pwdBlock);

            // assert
            expect(spyValidationUI).toBeCalledWith(pwd, pwdBlock, true, 'Password must contain at least 8 characters, including letters lower/upper case, numbers and special characters');
        });
    });
    
    describe('Check Device API tests', () => {
        it('should show device ID error message on UI when the input value has not 8 digits', () => {
            // arrange
            const spyValidationUI = vi.spyOn(FormValidation.prototype, 'validationUI').mockImplementation(() => {});
            const device = document.createElement('input');
            const deviceBlock = document.createElement('div');
            device.value = 'asdfghy3434'
            deviceBlock.appendChild(device);

            // action
            new FormValidation().checkDevice(device, deviceBlock);

            // assert
            expect(spyValidationUI).toHaveBeenCalledWith(device, deviceBlock, false, 'Device ID must contain 8 digits');
        });

        it('should do not show device ID error message on UI when the input value has 8 digits', () => {
            // arrange
            const spyValidationUI = vi.spyOn(FormValidation.prototype, 'validationUI').mockImplementation(() => {});
            const device = document.createElement('input');
            const deviceBlock = document.createElement('div');
            device.value = '12345678';
            deviceBlock.appendChild(device);

            // action
            new FormValidation().checkDevice(device, deviceBlock);

            // assert
            expect(spyValidationUI).toHaveBeenCalledWith(device, deviceBlock, true, 'Device ID must contain 8 digits');
        });
    });
});
