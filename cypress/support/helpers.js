import Random from "./Random";

export function selectRandomElement(elementSelector) {
    cy.get(elementSelector).then(($elements) => {
        const randomOption = Math.floor(Math.random() * $elements.length);
        cy.contains(`${$elements[randomOption].innerText}`).click();
        cy.log(`random element selected is ${$elements[randomOption].innerText}}`);
    });
    return cy.wrap(elements[randomOption].innerText)
};

export function getDefaultRestHeaders() {
    const headers = {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "X-Request-Id": Random.UUID,
    };
    return headers;
};

/**
 * 
 * @param {*} chooseDate one of [today, tomorrow, yesterday, lastDayInYear]
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
            break;
    }

    return finalDate
}

// return new filtered array with match objects
export function filterListByKeyValue(response, key, value) {
    const list = response.body.data.filter(el => el[key] === value)
    cy.wrap(list, { log: false }).as('array')
 
    return cy.get('@array', { log: false })
}