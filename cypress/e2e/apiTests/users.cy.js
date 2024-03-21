import UserApi from "../../page-object/UserApi";
import ApiErrors from "../../support/ApiErrors";
import Random from "../../support/Random";
import { jsonSchema } from "../../support/jsonSchemas/jsonSchema";
const user = Cypress.env('user');
const message = ApiErrors.MESSAGE
let authToken

const body = {
    id: Random.number,
    username: Random.string(5),
    firstName: Random.firstName,
    lastName: Random.lastName,
    email: Random.email,
    password: Random.string(5),
    phone: Random.phone,
    userStatus: 0
}

describe('Users API tests', { tags: ['user'] }, () => {
    before('Login as user', () => {
        UserApi.login(user.username, user.password).then(token => {
            authToken = token
        });
    });

    it('Check that possible to create a user', { tags: ['smoke'] }, () => {
        UserApi.create(authToken, body).then(response => {
            expect(response.status).to.eql(200); // usually should be 201
            expect(response.body).to.be.jsonSchema(jsonSchema.create);
        });
    });

    it('Check that impossible to create a user with invalid body', () => {
        const body = "01"
        UserApi.create(authToken, body).then(response => {
            ApiErrors.expect(response, 400, message.BAD_INPUT);
        });
    });

    it('Check that impossible to create a user with invalid id format', () => {
        const newBody = Cypress._.cloneDeep(body);
        newBody[id] = '01f'
        UserApi.create(authToken, body).then(response => {
            ApiErrors.expect(response, 500, message.ERROR);
        });
    });

    it('Check that impossible to create a user with empty body', () => {
        UserApi.create(authToken, '').then(response => {
            ApiErrors.expect(response, 405, message.NO_DATA);
        });
    });

    const bodyInvalidFormat = Object.keys(body)
    bodyInvalidFormat.forEach(field => {
        const newBody = Cypress._.cloneDeep(body);
        newBody[field] = true
        it(`Check that impossible create user with invalid format for ${field}`, () => {
            UserApi.create(authToken, newBody).then(response => {
                ApiErrors.expect(response, 500, message.ERROR)
            });
        });
    });

    it('Check that possible to update user info', () => {
        const newBody = Cypress._.cloneDeep(body);
        newBody.firstName = "1" + body.firstName;;
        UserApi.update(authToken, body.username, newBody).then(response => {
            expect(response.status).to.eql(200);
            UserApi.getByUsername(authToken, newBody.username).then(response => {
                expect(response.body.firstName).to.eql(updatedName);
            });
        });
    });

    it('Check that impossible to update user info with one parameter in body', () => {
        const body = {
            updatedEmail: Random.email
        }
        UserApi.update(authToken, user.username, body).then(response => {
            ApiErrors.expect(response, 200, '0');
        });
    });

    it('Check that impossible to get info of not existing user by username', () => {
        UserApi.getByUsername(authToken, "asd").then(response => {
            ApiErrors.expect(response, 404, message.USER_NOT_FOUND);
        });
    });

    it('Check that possible to logout', () => {
        UserApi.login(user.username, user.password).then(token => {
            UserApi.logout(token, user.username).then(response => {
                expect(response.status).to.eql(200);
                UserApi.getByUsername(token, user.username).then(response => {
                    ApiErrors.expect(response, 401, message.NOT_AUTHORIZED);
                });
            });
        });
    });

    it('Check that possible to delete user', () => {
        const newBody = Cypress._.cloneDeep(body);
        newBody.username = 'deleted' + body.username;;
        UserApi.create(authToken, newBody).then(response => {
            expect(response.status).to.eql(200);
            UserApi.delete(authToken, newBody.username).then(response => {
                expect(response.status).to.eql(200);
                UserApi.login1(newBody.username, newBody.password).then(response => {
                    ApiErrors.expect(response, 404, message.USER_NOT_FOUND);
                });
            });
        });
    });
});