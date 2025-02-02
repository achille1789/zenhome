import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest';

import { FormValidation } from '../../ui/form-scripts';

describe('Form Scripts tests', () => {
    const btnLogin= document.createElement('button');
    const btnCreate= document.createElement('button');
    const btnUpdate= document.createElement('button');
    const btnReset= document.createElement('button');
    const btnDelete= document.createElement('button');
    const form = document.createElement('form');
    const email = document.createElement('input');
    const pwd = document.createElement('input');
    const newPwd = document.createElement('input');
    const device = document.createElement('input');
    const submit = document.createElement('input');
    const pwdBlock = document.createElement('div');
    const newPwdBlock = document.createElement('div');
    const deviceBlock = document.createElement('div');
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
    pwdBlock.id = 'pwd-block';
    newPwdBlock.id = 'newpwd-block';
    deviceBlock.id = 'device-block';
    
    beforeEach(() => {
        document.body.appendChild(btnLogin);
        document.body.appendChild(btnCreate);
        document.body.appendChild(btnUpdate);
        document.body.appendChild(btnReset);
        document.body.appendChild(btnDelete);
        document.body.appendChild(form);
        document.body.appendChild(email);
        document.body.appendChild(pwd);
        document.body.appendChild(newPwd);
        document.body.appendChild(device);
        document.body.appendChild(submit);
        document.body.appendChild(pwdBlock);
        document.body.appendChild(newPwdBlock);
        document.body.appendChild(deviceBlock);
    });
    
    afterEach(() => {
        email.className = '';
        pwd.className = '';
        newPwd.className = '';
        device.className = '';
        submit.className = '';
        pwdBlock.className = '';
        newPwdBlock.className = '';
        deviceBlock.className = '';
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
    
    describe('Form Fields API tests', () => {
        it('should show the password block and hide the new password and device blocks when the login button is clicked', () => {
            // arrange
            form.className = 'form-class';
            pwdBlock.className = 'pwd-block-class d-none';
            newPwdBlock.className = 'new-pwd-block-class';
            deviceBlock.className = 'device-block-class';

            // action
            new FormValidation().formFields('login');

            // assert
            expect(form.className).toBe('form-class');
            expect(pwdBlock.className).toBe('pwd-block-class ');
            expect(newPwdBlock.className).toBe('new-pwd-block-class d-none');
            expect(deviceBlock.className).toBe('device-block-class d-none');
        });

        it('should show the password block and keep hidden the new password and device blocks when the login button is clicked', () => {
            // arrange
            form.className = 'form-class';
            pwdBlock.className = 'pwd-block-class d-none';
            newPwdBlock.className = 'new-pwd-block-class d-none';
            deviceBlock.className = 'device-block-class d-none';

            // action
            new FormValidation().formFields('login');

            // assert
            expect(form.className).toBe('form-class');
            expect(pwdBlock.className).toBe('pwd-block-class ');
            expect(newPwdBlock.className).toBe('new-pwd-block-class d-none');
            expect(deviceBlock.className).toBe('device-block-class d-none');
        });

        it('should show the password and device blocks and hide the new password block when the create button is clicked', () => {
            // arrange
            form.className = 'form-class';
            pwdBlock.className = 'pwd-block-class d-none';
            newPwdBlock.className = 'new-pwd-block-class';
            deviceBlock.className = 'device-block-class';

            // action
            new FormValidation().formFields('create');

            // assert
            expect(form.className).toBe('form-class');
            expect(pwdBlock.className).toBe('pwd-block-class ');
            expect(deviceBlock.className).toBe('device-block-class');
            expect(newPwdBlock.className).toBe('new-pwd-block-class d-none');
        });

        it('should show the password and device blocks and keep hidden the new password block when the create button is clicked', () => {
            // arrange
            form.className = 'form-class';
            pwdBlock.className = 'pwd-block-class d-none';
            newPwdBlock.className = 'new-pwd-block-class d-none';
            deviceBlock.className = 'device-block-class';

            // action
            new FormValidation().formFields('create');

            // assert
            expect(form.className).toBe('form-class');
            expect(pwdBlock.className).toBe('pwd-block-class ');
            expect(deviceBlock.className).toBe('device-block-class');
            expect(newPwdBlock.className).toBe('new-pwd-block-class d-none');
        });

        it('should show the password and new password blocks and hide the device block when the update button is clicked', () => {
            // arrange
            form.className = 'form-class';
            pwdBlock.className = 'pwd-block-class d-none';
            newPwdBlock.className = 'new-pwd-block-class';
            deviceBlock.className = 'device-block-class';

            // action
            new FormValidation().formFields('update');

            // assert
            expect(form.className).toBe('form-class');
            expect(pwdBlock.className).toBe('pwd-block-class ');
            expect(newPwdBlock.className).toBe('new-pwd-block-class');
            expect(deviceBlock.className).toBe('device-block-class d-none');
        });

        it('should show the password and new password blocks and keep hidden the device block when the update button is clicked', () => {
            // arrange
            form.className = 'form-class';
            pwdBlock.className = 'pwd-block-class d-none';
            newPwdBlock.className = 'new-pwd-block-class';
            deviceBlock.className = 'device-block-class d-none';

            // action
            new FormValidation().formFields('update');

            // assert
            expect(form.className).toBe('form-class');
            expect(pwdBlock.className).toBe('pwd-block-class ');
            expect(newPwdBlock.className).toBe('new-pwd-block-class');
            expect(deviceBlock.className).toBe('device-block-class d-none');
        });

        it('should hide the password, new password and hide the device blocks when the reset button is clicked', () => {
            // arrange
            form.className = 'form-class';
            pwdBlock.className = 'pwd-block-class';
            newPwdBlock.className = 'new-pwd-block-class';
            deviceBlock.className = 'device-block-class';

            // action
            new FormValidation().formFields('reset');

            // assert
            expect(form.className).toBe('form-class');
            expect(pwdBlock.className).toBe('pwd-block-class d-none');
            expect(newPwdBlock.className).toBe('new-pwd-block-class d-none');
            expect(deviceBlock.className).toBe('device-block-class d-none');
        });

        it('should hide the password, new password and keep hidden the device blocks when the reset button is clicked', () => {
            // arrange
            form.className = 'form-class';
            pwdBlock.className = 'pwd-block-class d-none';
            newPwdBlock.className = 'new-pwd-block-class d-none';
            deviceBlock.className = 'device-block-class d-none';

            // action
            new FormValidation().formFields('reset');

            // assert
            expect(form.className).toBe('form-class');
            expect(pwdBlock.className).toBe('pwd-block-class d-none');
            expect(newPwdBlock.className).toBe('new-pwd-block-class d-none');
            expect(deviceBlock.className).toBe('device-block-class d-none');
        });

        it('should show the password block and hide the new password and device blocks when the delete button is clicked', () => {
            // arrange
            form.className = 'form-class';
            pwdBlock.className = 'pwd-block-class d-none';
            newPwdBlock.className = 'new-pwd-block-class';
            deviceBlock.className = 'device-block-class';

            // action
            new FormValidation().formFields('delete');

            // assert
            expect(form.className).toBe('form-class');
            expect(pwdBlock.className).toBe('pwd-block-class ');
            expect(newPwdBlock.className).toBe('new-pwd-block-class d-none');
            expect(deviceBlock.className).toBe('device-block-class d-none');
        });

        it('should show the password block and keep hidden the new password and device blocks when the delete button is clicked', () => {
            // arrange
            form.className = 'form-class';
            pwdBlock.className = 'pwd-block-class d-none';
            newPwdBlock.className = 'new-pwd-block-class d-none';
            deviceBlock.className = 'device-block-class d-none';

            // action
            new FormValidation().formFields('delete');

            // assert
            expect(form.className).toBe('form-class');
            expect(pwdBlock.className).toBe('pwd-block-class ');
            expect(newPwdBlock.className).toBe('new-pwd-block-class d-none');
            expect(deviceBlock.className).toBe('device-block-class d-none');
        });
    });

    describe('Validation UI tests', () => {
        it('should show error message on UI when the input value is not valid and an error message is already visible', () => {
            // arrange
            const input = document.createElement('input');
            const block = document.createElement('div');
            const errorNode = document.createElement('div');
            input.className = 'input-class';
            block.className = 'block-class';
            errorNode.className = 'invalid-feedback';
            errorNode.textContent = 'Field is required';
            block.appendChild(input);
            block.appendChild(errorNode);

            // action
            new FormValidation().validationUI(input, block, false, 'Error message');

            // assert
            expect(input.className).toBe('input-class');
            expect(block.className).toBe('block-class');
            expect(errorNode.textContent).toBe('Error message');
        });

        it('should show error message on UI when the input value is not valid', () => {
            // arrange
            const input = document.createElement('input');
            const block = document.createElement('div');
            input.className = 'input-class';
            block.className = 'block-class';
            block.appendChild(input);

            // action
            new FormValidation().validationUI(input, block, false, 'Error message');

            // assert
            expect(input.className).toBe('input-class is-invalid');
            expect(block.className).toBe('block-class');
            expect(block.getElementsByClassName('invalid-feedback')[0].className).toBe('invalid-feedback');
            expect(block.getElementsByClassName('invalid-feedback')[0].textContent).toBe('Error message');
        });

        it('should not show error message on UI when the input value is valid', () => {
            // arrange
            const input = document.createElement('input');
            const block = document.createElement('div');
            const errorNode = document.createElement('div');
            input.className = 'input-class is-invalid';
            block.className = 'block-class';
            errorNode.className = 'invalid-feedback';
            errorNode.textContent = 'Field is required';
            block.appendChild(input);
            block.appendChild(errorNode);

            // action
            new FormValidation().validationUI(input, block, true, 'Error message');

            // assert
            expect(input.className).toBe('input-class  is-valid');
            expect(block.className).toBe('block-class');
            expect(block.getElementsByClassName('invalid-feedback')[0]).toBeUndefined();
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
    
    describe('Check Fields API tests', () => {
        it('should show error message on UI when the email field is not valid', () => {
            // arrange
            const spyValidationUI = vi.spyOn(FormValidation.prototype, 'validationUI').mockImplementation(() => {});
            const buttons = document.createElement('div');
            buttons.id = 'buttons';
            document.body.appendChild(buttons);
            const submittedMsg = document.createElement('div');
            submittedMsg.id = 'submitted-msg';
            submittedMsg.className = 'div-class';
            document.body.appendChild(submittedMsg);
            form.className = 'form-class';
            email.className = 'input-class';
            pwd.className = 'input-class';
            newPwd.className = 'input-class';
            device.className = 'input-class';

            // action
            new FormValidation().checkFields();

            // assert
            expect(form.className).toBe('form-class');
            expect(submittedMsg.className).toBe('div-class');
            expect(spyValidationUI).toHaveBeenCalled();
            spyValidationUI.mockRestore();
        });
        
        it('should hide the form when all inputs have been correctly filled', () => {
            // arrange
            const spyValidationUI = vi.spyOn(FormValidation.prototype, 'validationUI').mockImplementation(() => {});
            const buttons = document.createElement('div');
            buttons.id = 'buttons';
            document.body.appendChild(buttons);
            const submittedMsg = document.createElement('div');
            submittedMsg.id = 'submitted-msg';
            submittedMsg.className = 'div-class';
            document.body.appendChild(submittedMsg);
            form.className = 'form-class';
            email.className = 'input-class is-valid';
            pwd.className = 'input-class is-valid';
            newPwd.className = 'input-class is-valid';
            device.className = 'input-class is-valid';

            // action
            new FormValidation().checkFields();

            // assert
            expect(form.className).toBe('d-none');
            expect(buttons.className).toBe('d-none');
            expect(submittedMsg.className).toBe('');
            expect(spyValidationUI).not.toHaveBeenCalled();
        });

        it('should hide the form when input blocks are hidden', () => {
            // arrange
            const spyValidationUI = vi.spyOn(FormValidation.prototype, 'validationUI').mockImplementation(() => {});
            const buttons = document.createElement('div');
            buttons.id = 'buttons';
            document.body.appendChild(buttons);
            const submittedMsg = document.createElement('div');
            submittedMsg.id = 'submitted-msg';
            submittedMsg.className = 'div-class';
            document.body.appendChild(submittedMsg);
            form.className = 'form-class';
            email.className = 'input-class is-valid';
            pwdBlock.className = 'd-none';
            newPwdBlock.className = 'd-none';
            deviceBlock.className = 'd-none';

            // action
            new FormValidation().checkFields();

            // assert
            expect(form.className).toBe('d-none');
            expect(buttons.className).toBe('d-none');
            expect(submittedMsg.className).toBe('');
            expect(spyValidationUI).not.toHaveBeenCalled();
        });
    });
});
