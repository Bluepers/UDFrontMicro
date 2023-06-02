import { faker } from "@faker-js/faker";

const mount = (el) => {
    let products = "";

    for (let i = 0; i < 5; i++) {
        const name = faker.commerce.productName();

        products += `<div>${name}</div>`;
    }

    el.innerHTML = products;
};

if (process.env.NODE_ENV === "development") {
    const elem = document.querySelector("#dev-products");
    if (elem) {
        // Probably running in development in isolation
        mount(elem);
    }
}

export { mount };
