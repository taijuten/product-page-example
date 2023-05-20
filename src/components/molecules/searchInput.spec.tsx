import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import SearchInput from "./searchInput";
import { BrowserRouter } from "react-router-dom"; 

describe("SearchInput", () => {
    it("should call the onChange function with the input value", () => {
        // Given
        const onChangeMock = jest.fn();
        const searchQuery = "example";
        const inputValue = "test";

        // When
        render(
            <BrowserRouter>
                <SearchInput onChange={onChangeMock} searchQuery={searchQuery} />
            </BrowserRouter>            
        );
        const searchInput = screen.getByLabelText("Search");
        fireEvent.change(searchInput, { target: { value: inputValue } });

        // Then
        expect(onChangeMock).toHaveBeenCalledWith(inputValue);
    });

    it("should display the correct search query value", () => {
        // Given
        const onChangeMock = jest.fn();
        const searchQuery = "example";

        // When
        render(
            <BrowserRouter>
                <SearchInput onChange={onChangeMock} searchQuery={searchQuery} />
            </BrowserRouter>
        );
        const searchInput = screen.getByLabelText("Search");

        // Then
        expect(searchInput.getAttribute("value")).toBe(searchQuery);
    });
});
