import { faker } from "@faker-js/faker";

const mount = (el) => {
    const cartText = `<div>You have ${faker.number.int({
        min: 2,
        max: 50,
    })} items in your cart.</div>`;
    el.innerHTML = cartText;
};

if (process.env.NODE_ENV === "development") {
    const elem = document.querySelector("#dev-cart");
    if (elem) {
        // Probable running in development in isolation
        mount(elem);
    }
}

export { mount };