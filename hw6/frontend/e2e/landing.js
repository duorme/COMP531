import { expect } from 'chai'
import { findId, sleep } from './selenium'

// TODO add your test user credentials here!
exports.creds = {
    username: 'tz13',
    password: 'wrapped-feed-scientific',

}
exports.registerInfo = {
    username: 'tongtong',
    email: 'tz13@rice.edu',
    dob: '07/30/1994',
    zipcode: '12345',
    password: '123',
    confirmation: '123'
}


exports.login = () =>
    sleep(500)
        .then(findId('loginusername').clear())
        .then(findId('loginpassword').clear())
        .then(findId('loginusername').sendKeys(exports.creds.username))
        .then(findId('loginpassword').sendKeys(exports.creds.password))
        .then(findId('Login').click())
        .then(sleep(2000))



exports.register=()=>
    sleep(500)
    .then(findId('registerName').clear())
    .then(findId('emailAddress').clear())
    .then(findId('registerZipcode').clear())
    .then(findId('registerPassword').clear())
    .then(findId('registerConfirmation').clear())
    .then(findId('registerName').sendKeys(exports.registerInfo.username))
    .then(findId('emailAddress').sendKeys(exports.registerInfo.email))
    .then(findId('registerdob').sendKeys(exports.registerInfo.dob))
    .then(findId('registerZipcode').sendKeys(exports.registerInfo.zipcode))
    .then(findId('registerPassword').sendKeys(exports.registerInfo.password))
    .then(findId('registerConfirmation').sendKeys(exports.registerInfo.confirmation))
    .then(findId('submitBtn').click())
    .then(sleep(2000))


