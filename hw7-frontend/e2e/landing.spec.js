import { expect } from 'chai'
import { go, sleep, findId, findCSS, By } from './selenium'
import landing from './landing'

describe('Landing Page', () => {

    const preamble = 'you are logged in as'

    before('should register a new user', (done) => {
        go().then(landing.register).then(done)
    })
    it('should register new user and display the success message',(done)=>{
        var username=landing.registerInfo.username
        sleep(200)
        .then(findCSS('.alert.alert-info').getText()
         .then(text => {
                expect(text).to.equal(`Success! You have regstered as ${username}`)
            })
            .then(done))
    })
     it('should login as test user', (done) => {
        var loginname = landing.creds.username;
        sleep(200)
        .then(landing.login)
        .then(findId('main_username').getText()
            .then(text => {
                expect(text).to.equal(loginname)
            })
            .then(done))
    })

})
