const { faker } = require('@faker-js/faker')

class Random {
    firstName = faker.person.firstName()
    lastName = faker.person.lastName()
    username = faker.person.firstName() + faker.person.lastName()
    email = '0' + faker.internet.email()
    phone = '+' + faker.string.numeric(8)
    location = faker.location.latitude() + " " + faker.location.longitude()
    address = faker.location.streetAddress()
    city = faker.location.city()
    zip = faker.location.zipCode('#####')
    text = faker.lorem.word(3)
    UUID = faker.string.uuid()
    transferAmount = faker.finance.amount({ min: 0, max: 2, dec: 2 })
    number = faker.number.int()
    string256 = "THIS STRING IS 256 CHARACTERS xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"

/**
 * 
 * @param {*} length number of symbols
 * @returns 
 */
    string(length) {
        const string = faker.string.alpha(length)
        return string
    }

    /**
     * 
     * @param {*} array returns random el value or object from array
     * @returns 
     */
    elFromArr(array) {
        const el = array[Math.floor(Math.random() * array.length)]
        return el
    }
}

export default new Random()