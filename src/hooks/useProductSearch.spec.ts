import { renderHook, act } from "@testing-library/react-hooks";
import { useLocation, useNavigate } from "react-router-dom";
import useProductSearch from "./useProductSearch";

jest.mock("react-router-dom", () => ({
  useLocation: jest.fn(),
  useNavigate: jest.fn()
}));

describe("useProductSearch", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should update search query and navigate to the updated URL", () => {
    // Given
    const mockNavigate = jest.fn();
    const mockUseLocation = jest.fn(() => ({
      search: "?query=initial"
    }));
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
    (useLocation as jest.Mock).mockReturnValue(mockUseLocation);

    const handleSearchQuery = jest.fn();

    // When
    const { result } = renderHook(() => useProductSearch(handleSearchQuery));
    const { updateSearchQuery } = result.current;

    act(() => {
      updateSearchQuery("updated");
    });

    // Then
    expect(useLocation).toHaveBeenCalledTimes(1);
    expect(useNavigate).toHaveBeenCalledTimes(1);
    expect(mockNavigate).toHaveBeenCalledWith({ search: "query=updated" });
  });

  it("should invoke handleSearchQuery with the search query from URL", () => {
    // Given
    const mockLocation = {
      search: "?query=initial"
    };
    const handleSearchQuery = jest.fn();

    // Mock useLocation
    (useLocation as jest.Mock).mockReturnValue(mockLocation);

    // When
    renderHook(() => useProductSearch(handleSearchQuery));

    // Then
    expect(useLocation).toHaveBeenCalledTimes(1);
    expect(handleSearchQuery).toHaveBeenCalledWith("initial");
  });  
});
