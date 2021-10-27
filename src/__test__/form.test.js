import React from 'react';
import { render, screen } from '@testing-library/react';
import SignInForm from '../components/form';

describe('Form', () => {

    beforeEach(() => {
        render(<SignInForm /> )
    });

    it('Should dispaly image', () => {
        const imgEl = screen.getByAltText(/logo/i)
        expect(imgEl).toBeInTheDocument()
    } )
    it('Should display form title', () => {
        const titleEl = screen.getByText(/Sign Up with email/i);
        expect(titleEl).toBeInTheDocument();
    })
})