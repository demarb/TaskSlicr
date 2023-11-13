import Home from "../Home";
import "@testing-library/jest-dom";
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter,  HashRouter, useLocation, Routes, Route, useNavigate } from "react-router-dom";
import { describe, it, vi } from "vitest"
import { axe, toHaveNoViolations } from "jest-axe";

test('Home component renders without error', ()=>{
    const {container} = render(
        <MemoryRouter>
            <Home/>
        </MemoryRouter>
    )
    expect(container).toBeInTheDocument()
})

describe("Key Elements", ()=>{
    it('Sign-in button in Nav bar renders', ()=>{
        render(
            <MemoryRouter>
                <Home/>
            </MemoryRouter>
        )
    
        const signInBtnElement = screen.getAllByText("Sign In")
        expect(signInBtnElement[0]).toBeInTheDocument()
    })

    it('Sign-in button in Body renders', ()=>{
        render(
            <MemoryRouter>
                <Home/>
            </MemoryRouter>
        )
    
        const signInBtnElement = screen.getAllByText("Sign In")
        expect(signInBtnElement[1]).toBeInTheDocument()
    })
})

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
            <MemoryRouter initialEntries={["/"]}>
                <Home />
            </MemoryRouter>
        )

        const signInBtnElement = screen.getAllByText("Sign In")
        fireEvent.click(signInBtnElement[0])

        expect(navigateMock).toHaveBeenCalledTimes(1);
        expect(navigateMock).toHaveBeenCalledWith("app/login");
    })

    it('Sign-in Btn in body navigates to login page when click', ()=>{
        // Creates a new vi mock function named navigateMock to track calls and assertions in test.
        const navigateMock = vi.fn();
        // Configures useNavigate to use the navigateMock function when it is called
        useNavigate.mockImplementation(() => navigateMock);
    
        render(
            <MemoryRouter initialEntries={["/"]}>
                <Home />
            </MemoryRouter>
        )

        const signInBtnElement = screen.getAllByText("Sign In")
        fireEvent.click(signInBtnElement[1])

        expect(navigateMock).toHaveBeenCalledTimes(1);
        expect(navigateMock).toHaveBeenCalledWith("app/login");
    })
})

describe("Image Tests", ()=>{
    it("Each image is loaded correctly", async ()=>{
        const { container } = render(<Home />);
        const images = container.querySelectorAll('img');   

        await waitFor(() => {
            images.forEach(async (image) => {
                // Resolve when the onload event has been triggered signifying object
                await new Promise((resolve) => {
                    image.onload = resolve;
                });
                expect(img).toHaveProperty('complete', true)
                expect(image.naturalWidth).toBeGreaterThan(0); // Ensure the natural width is greater than 0
            });
          });
        
    })
})


test('Accessibility check', async()=>{
    //Extend toHaveNoViolations to become a part of our react testing library
    expect.extend(toHaveNoViolations)

    const {container} = render(
        // <MemoryRouter>
            <Home/>
        // </MemoryRouter>
    )

    const results = await axe(container)
    expect(results).toHaveNoViolations()
})