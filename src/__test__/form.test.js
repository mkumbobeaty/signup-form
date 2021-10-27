import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import SignInForm from '../components/form';

describe('Form', () => {

    let payload = {
        email: "charsbeaty@gmail.com",
        password: 'password',
        confirm: 'password',
        gender: 'male'

    }
    const onFinish = jest.fn()
        .mockReturnValueOnce(payload)
    const handleGenderClick = jest.fn()

    const signUp = (email, password, confirm) => {
        fireEvent.click(screen.getByTestId('male'));
        fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: email } });
        fireEvent.change(screen.getByTestId('password'), { target: { value: password } });
        fireEvent.change(screen.getByLabelText(/Confirm Password/), { target: { value: confirm } });
        fireEvent.submit(screen.getByTestId('submit'));

    }
    beforeEach(() => {
        render(
            <SignInForm
                handleSubmit={onFinish}
                setGenderSelected={handleGenderClick}
                genderSelected="male" />
        )
    });

    it('Should dispaly image', () => {
        const imgEl = screen.getByAltText(/logo/i)
        expect(imgEl).toBeInTheDocument()
    });

    it('Should display form title', () => {
        const titleEl = screen.getByText(/Sign Up with email/i);
        expect(titleEl).toBeInTheDocument();
    });

    it('Should check if alteast one gender button is rendered', () => {
        const genderLabel = screen.getByTestId(/gender/i);
        const buttonsEl = screen.getByTestId('female');
        expect(genderLabel).toContainElement(buttonsEl)
    });

    it('Should render email input', () => {
        const emailEl = screen.getByLabelText(/Email/i);
        expect(emailEl).toBeInTheDocument()
        fireEvent.change(emailEl, { target: { value: 'charsbeaty@gmail.com' } });
        expect(emailEl.value).toBe('charsbeaty@gmail.com')
    });

    it('Should render password  input', () => {
        const passwordEl = screen.getByTestId('password');
        expect(passwordEl).toBeInTheDocument();
        fireEvent.change(passwordEl, { target: { value: 'Password' } });
        expect(passwordEl.value).toBe('Password')

    });

    it('Should render confirm password input', () => {
        const confirmPassEl = screen.getByLabelText(/Confirm Password/);
        expect(confirmPassEl).toBeInTheDocument()
        fireEvent.change(confirmPassEl, { target: { value: 'Password' } })
        expect(confirmPassEl.value).toBe('Password')

    });

    it('Should called correct number of times', () => {
        const emailEl = screen.getByLabelText(/Email/i);
        const passwordEl = screen.getByTestId('password');
        const confirmPassEl = screen.getByLabelText(/Confirm Password/);
        signUp('charsbeaty@gmail.com', 'password', 'password');

        expect(emailEl).toHaveValue("charsbeaty@gmail.com");
        expect(passwordEl).toHaveValue("password");
        expect(confirmPassEl).toHaveValue("password");
        waitFor(() => {
            expect(onFinish).toBeCalled();
            expect(onFinish).toHaveBeenCalledTimes(1);
            expect(onFinish.mock.calls.length).toBeGreaterThanOrEqual(1)
            expect(onFinish).toHaveBeenNthCalledWith(1, payload);
        });

    });

})