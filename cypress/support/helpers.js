import Random from "./Random";

export function round(amount, fractionDigits = 2) {
    return Number(amount).toFixed(fractionDigits)
};

export function getItemTextTrim(text) {
    const invokedText = text.text().trim();
    return invokedText
};

export function selectRandomElement(elementSelector) {
    cy.get(elementSelector).then(($elements) => {
        const randomOption = Math.floor(Math.random() * $elements.length);
        cy.contains(`${$elements[randomOption].innerText}`).click();
        cy.log(`random element selected is ${$elements[randomOption].innerText}}`);
    });
    return cy.wrap(elements[randomOption].innerText)
};

export function BAD_REQUEST(response) {
    expect(response.status).to.eql(ErrorsApi.STATUS_CODES.BAD_REQUEST);
    expect(response.body.errors[0].code).to.eql(ErrorsApi.ERROR_CODES.INVALID_QUERY_PARAMETER);
    return this
};

export function getDefaultRestHeaders() {
    const headers = {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "X-Request-Id": Random.UUID,
    };
    return headers;
};

export function generateEmail() {
    const randomString = Math.random().toString(36).substr(2, 10);
    const domain = "example.com";
    return randomString + "@" + domain;
};

/**
 * 
 * @param {*} chooseDate available one of [today, tomorrow, yesterday, lastDayInYear]
 * @returns 
 */
export function getDate(chooseDate) {
    let finalDate;
    const currentDate = new Date(Date.now())

    switch (chooseDate) {
        case 'today':
            finalDate = currentDate
            break;

        case 'yesterday':
            const yesterday = new Date(Date.now())
            yesterday.setDate(yesterday.getDate() - 1)
            finalDate = yesterday
            break;

        case 'tomorrow':
            const tomorrow = new Date(Date.now())
            tomorrow.setDate(tomorrow.getDate() + 1)
            finalDate = tomorrow
            break;

        case 'lastDayInYear':
            const lastDayInYear = new Date(Date.now())
            lastDayInYear.setDate(31)
            lastDayInYear.setMonth(11)
            finalDate = lastDayInYear
            // finalDate = "2024-12-30T00:00:00.000Z"
            break;
    }

    // this example if need send date in format 12/12/2024
    // const date = new Date(Date.now()).toISOString()
    // switch (chooseDate) {
    //     case 'today':
    //         finalDate = `${("0" + (new Date(date).getDate() + 1)).slice(-2)}/${("0" + (new Date(date).getMonth() + 1)).slice(-2)}/${new Date(date).getFullYear()}`
    //         break;
    //     case 'yesterday':
    //         finalDate = `${("0" + (new Date(date).getDate() - 1)).slice(-2)}/${("0" + (new Date(date).getMonth() + 1)).slice(-2)}/${new Date(date).getFullYear()}`
    //         break;
    //     case 'tomorrow':
    //         finalDate = `${("0" + (new Date(date).getDate() + 1)).slice(-2)}/${("0" + (new Date(date).getMonth() + 1)).slice(-2)}/${new Date(date).getFullYear()}`
    //         break;
    //     case 'lastDayInYear':
    //         finalDate = `31/12/${new Date(date).getFullYear()}`
    //         break;
    // }

    return finalDate
}

// return new filtered array with match objects
export function filterListByKeyValue(response, key, value) {
    const list = response.body.data.filter(el => el[key] === value)
    cy.wrap(list, { log: false }).as('list')
    return cy.get('@list', { log: false })
}

// // if import then we can use this method to get query string
// // or need to create custom method for this https://linuxhint.com/convert-object-to-query-string-javascript/#:~:text=In%20JavaScript%2C%20for%20the%20conversion,join()%E2%80%9D%20method%20are%20used.
// convertObjectToQueryString(object) {
//     const objString = '?' + new URLSearchParams(object).toString();
// };

// not working after import in any file, need to investigate with devs why
// export function CATCH_NOTIFICATION_ERROR() {
//     cy.get('simple-notifications').within(el => {
//         if (el.find('.sn-title').text().includes('Error')) {
//             throw new Error('Error on the page bottom right')
//         }
//     });
//     return this
// };

/*
// Try this to json schema validation instead of chai because it collects all inconsistencies
// it should show each row where the error comes in logs I hope
const tv4 = require("tv4");
function jsonValidate(data, schema) {
    const validate = tv4.validate(data, schema);
    const error = {};
    if (!validate) {
        error.message = tv4.error.message
        error.path = tv4.error.dataPath
        throw new Error(`${JSON.stringify(error)}`)
    }
}
const errors = [];
try {
    jsonValidate(response, schema);
} catch (error) {
    errors.push(`Error : ${response} - ${error}`)
}
if (errors.length > 0) {
    throw new Error(`Validation errors:\n${errors.join('\n')}`);
}
expect(errors.length = 0).to.be.false(`Validation errors:\n${errors.join('\n')}`);
*/

export const UID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;
export const BALANCE_REGEX = /\d.\d{2}/;
export const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
const alphaNumericRegexString = "^[a-zA-Z0-9]+$"
const alphaNumericWithSpaceRegexString = "^[a-zA-Z0-9 ]+$"
const numericRegexString = "^[-+]?[0-9]+(?:\\.[0-9]+)?$"
const decimalRegexString = "^-?\\d+(\\.\\d+)?$"