import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import SignInForm from '../components/form';

describe('Form', () => {

    beforeEach(() => { render(<SignInForm /> ) });

    it('Should dispaly image', () => {
        const imgEl = screen.getByAltText(/logo/i)
        expect(imgEl).toBeInTheDocument()
    } );

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
        fireEvent.change(emailEl, {target: { value : 'charsbeaty@gmail.com'}});
        expect(emailEl.value).toBe('charsbeaty@gmail.com')
    });

    it('Should render password  input', () => {
        const passwordEl = screen.getByTestId('password');
        expect(passwordEl).toBeInTheDocument();
        fireEvent.click(passwordEl, {target : {value : 'Password'}});
        expect(passwordEl.value).toBe('Password')

    });

    it('Should render confirm password input', () => {
        const confirmPassEl = screen.getByLabelText(/Confirm Password/);
        expect(confirmPassEl).toBeInTheDocument()
        fireEvent.click(confirmPassEl, {target : {value : 'Password'}})
        expect(confirmPassEl.value).toBe('Password')

    });

})