import { h } from "preact";
import { render } from "@testing-library/preact";
import ItemDetailContainer from "../ItemDetailContainer";

jest.mock("../../store_data.json", () => [
    { id: 1, name: "Baseball", short_desc: "A bat-and-ball game" },
    { id: 2, name: "Soccer", short_desc: "A football game" },
    { id: 3, name: "Bicycling", short_desc: "Equipment we carry for biking enthusiasts." },
]);

jest.mock("ojs/ojmutablearraydataprovider", () => {
    return jest.fn(() => ({
        containsKeys: jest.fn(),
        fetchByKeys: jest.fn(),
        fetchByOffset: jest.fn(),
        fetchFirst: jest.fn(() => ({
            [Symbol.asyncIterator]() {
                return {
                    next: () => Promise.resolve({ value: [], done: true }),
                };
            },
        })),
    }));
});

describe("Test suite for Content component", () => {

    test("Renders Product Information header with a H1 tag", () => {
        const { getByText } = render(<ItemDetailContainer />);
        const headerElement = getByText("Product Information");
        expect(headerElement.tagName).toBe("H1");
    });

})