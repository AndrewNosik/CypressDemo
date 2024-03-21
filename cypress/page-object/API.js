import { endpoints } from "../support/endpoints";
import { getDefaultRestHeaders } from "../support/helpers";
const API_URL = Cypress.env('API_URL');

class API {
    get(authToken, qs) {
        const headers = getDefaultRestHeaders()
        headers['Authorization'] = "Bearer " + authToken
        cy.request({
            method: "Get",
            failOnStatusCode: false,
            url: API_URL + endpoints.path.child,
            headers: headers,
            qs: qs
        }).then((response) => {
            cy.wrap(response, { log: false }).as('response');
        });

        return cy.get('@response', { log: false });
    }

    post(authToken, body) {
        const headers = getDefaultRestHeaders()
        headers['Authorization'] = "Bearer " + authToken
        cy.request({
            method: "Post",
            failOnStatusCode: false,
            url: API_URL + endpoints.path.child,
            headers: headers,
            body: body
        }).then((response) => {
            cy.wrap(response, { log: false }).as('response');
        });

        return cy.get('@response', { log: false });
    }

    put(authToken, id, body) {
        const headers = getDefaultRestHeaders()
        headers['Authorization'] = "Bearer " + authToken
        cy.request({
            method: "Put",
            failOnStatusCode: false,
            url: API_URL + endpoints.path.child2(id),
            headers: headers,
            body: body
        }).then((response) => {
            cy.wrap(response, { log: false }).as('response');
        });

        return cy.get('@response', { log: false });
    }

    patch(authToken, id, qs) {
        const headers = getDefaultRestHeaders()
        headers['Authorization'] = "Bearer " + authToken
        cy.request({
            method: "Patch",
            failOnStatusCode: false,
            url: API_URL + endpoints.path.child2(id),
            headers: headers,
            body: {
                id: id,
                ...qs
            }
        }).then((response) => {
            cy.wrap(response, { log: false }).as('response');
        });

        return cy.get('@response', { log: false });
    }

    delete(authToken, id) {
        const headers = getDefaultRestHeaders()
        headers['Authorization'] = "Bearer " + authToken
        cy.request({
            method: "Delete",
            failOnStatusCode: false,
            url: API_URL + endpoints.path.child2(id),
            headers: headers,
        }).then((response) => {
            cy.wrap(response, { log: false }).as('response');
        });

        return cy.get('@response', { log: false });
    }
}

export default new API()