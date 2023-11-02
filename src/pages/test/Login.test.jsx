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