import { expect } from 'chai'
import { findId, sleep } from './selenium'

// TODO add your test user credentials here!
exports.creds = {
    username: 'tz13',
    password: 'wrapped-feed-scientific',

}


exports.login = () =>
    sleep(500)
        .then(findId('loginusername').clear())
        .then(findId('loginpassword').clear())
        .then(findId('loginusername').sendKeys(exports.creds.username))
        .then(findId('loginpassword').sendKeys(exports.creds.password))
        .then(findId('Login').click())
        .then(sleep(2000))

exports.logout = () =>
    sleep(500)
        .then(findId('logout').click())
        .then(sleep(2000))
        .then(findId('message').getText()
            .then(text=>{
                expect(text).to.equal("You have logged out")
            })
        )
        .then(sleep(500))
        
exports.register=()=>
    sleep(500)
    .then(findId('registerName').clear())
    .then(findId('registerEmail').clear())
    .then(findId('registerdob').clear())
    .then(findId('registerZipcode').clear())
    .then(findId('registerPassword').clear())
    .then(findId('registerConfirmation').clear())
    .then(findId('registerName').sendKeys(exports.registerInfo.username))
    .then(findId('registerEmail').sendKeys(exports.registerInfo.email))
    .then(findId('registerdob').sendKeys(exports.registerInfo.dob))
    .then(findId('registerZipcode').sendKeys(exports.registerInfo.zipcode))
    .then(findId('registerPassword').sendKeys(exports.registerInfo.password))
    .then(findId('registerConfirmation').sendKeys(exports.registerInfo.confirmation))
    .then(findId('indexSubmit').click())
    .then(sleep(2000))


