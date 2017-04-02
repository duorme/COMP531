import { expect } from 'chai'
import { go, sleep, findId, findCSS, By } from './selenium'
import common from './common'

describe('Test Dummy Server Example Page', () => {

    const preamble = 'you are logged in as'

    before('should log in', (done) => {
        go().then(common.login).then(done)
    })



    it('should log in as the test user', (done) => {
        sleep(500)
            .then(findId('message').getText()
                .then(text => {
                    expect(text.indexOf(preamble)).to.equal(0)
                })
                .then(done))
    })

    // it("Update the headline and verify the change", (done) => {
    //     // IMPLEMENT ME
    //     // find the headline input
    //     // .sendKeys(new headline message)
    //     // verify the headline is updated
    //     // .sendKeys(the old headline message)
    //     // verify the headline is updated
    //     const newHeadline="this is new Headline"
    //     const oldHeadline="this is old Headline"

    //     sleep(500)
    //     findId("newHeadline").sendKeys(newHeadline)
    //     .then(sleep(500))
    //     .then(findId("headline").click())
    //     .then(sleep(500))
    //     .then(findId("message").getText()
    //         .then(text=>{
    //             expect(text).to.equal(`you are logged in as ${common.creds.username} "${newHeadline}"`)
    //     }))
    //     .then(findId("newHeadline").clear())
    //     .then(sleep(500))
    //     .then(findId("newHeadline").sendKeys(oldHeadline))
    //     .then(sleep(500))
    //     .then(findId("headline").click())
    //     .then(sleep(500))
    //     .then(findId("message").getText()
    //         .then(text=>{
    //             expect(text).to.equal(`you are logged in as ${common.creds.username} "${oldHeadline}"`)
    //     }))
    //     // .then(findId("headline").click())
    //     // .then(findId("message").getText()
    //     //     .then(text=>{
    //     //         expect(text.indexOf("hello")).to.larger.than(0)
    //     //     }))

    //     .then(done)
    // })

    after('should log out', (done) => {
        common.logout().then(done)
    })
})
