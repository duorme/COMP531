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
        
exports register=()=>
    sleep(500)
        .then(findId('registerName')).clear())
        .then(findId('register'))


