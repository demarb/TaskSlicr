import Login from "../Login";
import "@testing-library/jest-dom";
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter,  HashRouter, useLocation, Routes, Route, useNavigate } from "react-router-dom";
import { describe, it, vi } from "vitest"
import { axe, toHaveNoViolations } from "jest-axe";

test('Login component renders without error', ()=>{
    const {container} = render(
        <MemoryRouter>
            <Login/>
        </MemoryRouter>
    )
    expect(container).toBeInTheDocument()
})

describe("Key Elements", ()=>{
    it('Email and password input renders inside form', ()=>{
        render(
            <MemoryRouter>
                <Login/>
            </MemoryRouter>
        )
    
        const emailInput = screen.getByPlaceholderText('Email...');
        const passwordInput = screen.getByPlaceholderText('Password...');
        expect(emailInput).toBeInTheDocument()
        expect(passwordInput).toBeInTheDocument()
    })

    it('Login and sign up button options renders inside form', ()=>{
        render(
            <MemoryRouter>
                <Login/>
            </MemoryRouter>
        )
    
        const loginButton = screen.getByText('Login');
        const signUpButton = screen.getByText('Sign Up');
        const googleSignInButton = screen.getByTestId("googleSignIn Button")
        expect(loginButton).toBeInTheDocument()
        expect(signUpButton).toBeInTheDocument()
        expect(googleSignInButton).toBeInTheDocument()

    })

})

// describe("Form Validation" ,()=>{
    // it("Displays error if all input fields are empty", async ()=>{
    //     render(
    //         <MemoryRouter>
    //             <Login/>
    //         </MemoryRouter>
    //     )

    //     await waitFor(()=>{
    //         const loginButton = screen.getByText('Login');
    //         fireEvent.click((loginButton))
    //         const errorAlert = screen.getByText('Invalid email entered');
    //         expect(errorAlert).toBeInTheDocument()
    //     })
    // })

    // it("Displays error if email input field is empty", async ()=>{
    //     render(
    //         <MemoryRouter>
    //             <Login/>
    //         </MemoryRouter>
    //     )

    //     const emailInput = screen.getByPlaceholderText('Email...');
    //     const passwordInput = screen.getByPlaceholderText('Password...');
    //     fireEvent.change(emailInput, { target: { value: '' } })
    //     fireEvent.change(passwordInput, { target: { value: 'password123' } })

    //     await waitFor(()=>{
    //         const loginButton = screen.getByText('Login');
    //         fireEvent.click((loginButton))
    //         const errorAlert = screen.getByText('Invalid email entered');
    //         expect(errorAlert).toBeInTheDocument()
    //     })
    // })

    // it("Displays error if password input field is empty", async ()=>{
    //     render(
    //         <MemoryRouter>
    //             <Login/>
    //         </MemoryRouter>
    //     )

    //     const emailInput = screen.getByPlaceholderText('Email...');
    //     const passwordInput = screen.getByPlaceholderText('Password...');
    //     fireEvent.change(emailInput, { target: { value: 'realemail@mail.com' } })
    //     fireEvent.change(passwordInput, { target: { value: '' } })

    //     await waitFor(()=>{
    //         const loginButton = screen.getByText('Login');
    //         fireEvent.click((loginButton))
    //         const errorAlert = screen.getByText('Password is required.');
    //         expect(errorAlert).toBeInTheDocument()
    //     })
    // })

    // it("Displays error if email is incorrectly formatted", async ()=>{
    //     render(
    //         <MemoryRouter>
    //             <Login/>
    //         </MemoryRouter>
    //     )

    //     const emailInput = screen.getByPlaceholderText('Email...');
    //     const passwordInput = screen.getByPlaceholderText('Password...');
    //     fireEvent.change(emailInput, { target: { value: 'realemail' } })
    //     fireEvent.change(passwordInput, { target: { value: 'password123' } })

    //     await waitFor(()=>{
    //         const loginButton = screen.getByText('Login');
    //         fireEvent.click((loginButton))
    //         const errorAlert = screen.getByText('Invalid email entered');
    //         expect(errorAlert).toBeInTheDocument()
    //     })
    // })

    // it("Displays error if email is incorrectly formatted", async ()=>{
    //     render(
    //         <MemoryRouter>
    //             <Login/>
    //         </MemoryRouter>
    //     )

    //     const emailInput = screen.getByPlaceholderText('Email...');
    //     const passwordInput = screen.getByPlaceholderText('Password...');
    //     fireEvent.change(emailInput, { target: { value: 'realemail' } })
    //     fireEvent.change(passwordInput, { target: { value: 'password123' } })

    //     await waitFor(()=>{
    //         const loginButton = screen.getByText('Login');
    //         fireEvent.click((loginButton))
    //         const errorAlert = screen.getByText('Invalid email entered');
    //         expect(errorAlert).toBeInTheDocument()
    //     })
    // })

    // it("Displays error if password is incorrect", async ()=>{
    //     render(
    //         <MemoryRouter>
    //             <Login/>
    //         </MemoryRouter>
    //     )

    //     const emailInput = screen.getByPlaceholderText('Email...');
    //     const passwordInput = screen.getByPlaceholderText('Password...');
    //     fireEvent.change(emailInput, { target: { value: 'tester1@mail.com' } })
    //     fireEvent.change(passwordInput, { target: { value: '122334444' } })

    //     await waitFor(()=>{
    //         const loginButton = screen.getByText('Login');
    //         fireEvent.click((loginButton))
    //         const errorAlert = screen.getByText('Incorrect email/password.');
    //         expect(errorAlert).toBeInTheDocument()
    //     })
    // })
// })

describe("Button Events", ()=>{
    // Replaces the real react-router-dom module with a mocked version
    vi.mock("react-router-dom", async () =>  {
        const actual = await vi.importActual("react-router-dom")
        return {
            ...actual,
            useNavigate: vi.fn(), 
        }
    })

    it('Sign-in Btn in navbar navigates to login page when click', ()=>{
        // Creates a new vi mock function named navigateMock to track calls and assertions in test.
        const navigateMock = vi.fn();
        // Configures useNavigate to use the navigateMock function when it is called
        useNavigate.mockImplementation(() => navigateMock);
    
        render(
            <MemoryRouter initialEntries={["/app/login"]}>
                <Login />
            </MemoryRouter>
        )

        const logoElement = screen.getByAltText("Clickable logo")
        fireEvent.click(logoElement)

        expect(navigateMock).toHaveBeenCalledTimes(1);
        expect(navigateMock).toHaveBeenCalledWith("/");
    })
})

test('Accessibility check', async()=>{
    //Extend toHaveNoViolations to become a part of our react testing library
    expect.extend(toHaveNoViolations)

    const {container} = render(
        // <MemoryRouter>
            <Login/>
        // </MemoryRouter>
    )

    const results = await axe(container)
    expect(results).toHaveNoViolations()
})