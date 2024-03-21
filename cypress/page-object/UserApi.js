import { endpoints } from "../support/endpoints";
import { getDefaultRestHeaders } from "../support/helpers";
const API_URL = Cypress.env('API_URL');

class UserApi {
    login(username, password) {
        const headers = getDefaultRestHeaders()
        cy.request({
            method: "Get",
            failOnStatusCode: false,
            headers: headers,
            url: API_URL + endpoints.user.login,
            qs: {
                username: username,
                password: password
            }
        }).then((response) => {
            expect(response.status).to.eql(200);
            const token = response.body.message.slice(-13);
            cy.wrap(token, { log: false }).as('token');
        });

        return cy.get('@token', { log: false });
    }
    
    login1(username, password) {
        const headers = getDefaultRestHeaders()
        cy.request({
            method: "Get",
            failOnStatusCode: false,
            headers: headers,
            url: API_URL + endpoints.user.login,
            qs: {
                username: username,
                password: password
            }
        }).then((response) => {
            cy.wrap(response, { log: false }).as('response');
        });

        return cy.get('@response', { log: false });
    }

    getByUsername(authToken, username) {
        const headers = getDefaultRestHeaders()
        headers['Authorization'] = "Bearer " + authToken
        cy.request({
            method: "Get",
            failOnStatusCode: false,
            url: API_URL + endpoints.user.byUsername(username),
            headers: headers
        }).then((response) => {
            cy.wrap(response, { log: false }).as('response');
        });

        return cy.get('@response', { log: false });
    }

    create(authToken, body) {
        const headers = getDefaultRestHeaders()
        headers['Authorization'] = "Bearer " + authToken
        cy.request({
            method: "Post",
            failOnStatusCode: false,
            url: API_URL + endpoints.user.create,
            headers: headers,
            body: body
        }).then((response) => {
            cy.wrap(response, { log: false }).as('response');
        });

        return cy.get('@response', { log: false });
    }

    update(authToken, username, body) {
        const headers = getDefaultRestHeaders()
        headers['Authorization'] = "Bearer " + authToken
        cy.request({
            method: "Put",
            failOnStatusCode: false,
            url: API_URL + endpoints.user.byUsername(username),
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

    delete(authToken, username) {
        const headers = getDefaultRestHeaders()
        headers['Authorization'] = "Bearer " + authToken
        cy.request({
            method: "Delete",
            failOnStatusCode: false,
            url: API_URL + endpoints.user.byUsername(username),
            headers: headers,
        }).then((response) => {
            cy.wrap(response, { log: false }).as('response');
        });

        return cy.get('@response', { log: false });
    }
  
    logout(authToken) {
        const headers = getDefaultRestHeaders()
        headers['Authorization'] = "Bearer " + authToken
        cy.request({
            method: "Delete",
            failOnStatusCode: false,
            url: API_URL + endpoints.user.logout,
            headers: headers,
        }).then((response) => {
            cy.wrap(response, { log: false }).as('response');
        });

        return cy.get('@response', { log: false });
    }
}

export default new UserApi()