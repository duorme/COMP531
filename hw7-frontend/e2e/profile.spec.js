import { expect } from 'chai'
import { go, sleep, findId, findCSS,findElements,By,driver } from './selenium'
describe('End-to-End Test: Profile Page', () => {

    before('should update email and verify', (done) => {
    	findId('Profile').click()
    	.then(sleep(200))
    	.then(done)
    })

    it('should update the email and verify', (done) =>{
    	var newemail = 'tz1333@rice.edu'
    	sleep(200)
    	.then(findId('profileEmail').sendKeys(newemail))
        .then(sleep(300))
    	.then(findId('submitProfile').click())
        .then(sleep(300))
    	.then(findId('profileEmail').getAttribute('placeholder')
    		.then(text => {
    			expect(text).to.equal(newemail)
    		})
    	.then(done))
    })

    it('should update the zipcode and verify', (done) =>{
    	var newzipcode = '12345'
    	sleep(200)
    	.then(findId('profileZipcode').sendKeys(newzipcode))
        .then(sleep(300))
    	.then(findId('submitProfile').click())
        .then(sleep(300))
    	.then(findId('profileZipcode').getAttribute('placeholder')
    		.then(text => {
    			expect(text).to.equal(newzipcode)
    		})
    	.then(done))
    })

    it('should update the password and verify a "will not change" '+
    	'message is returned', (done) =>{
    	var password = '12345'
    	var passConfirm = '12345'
    	sleep(200)
    	.then(findId('profilePassword').sendKeys(password))
    	.then(findId('profilePassConfirm').sendKeys(passConfirm))
        .then(sleep(200))
    	.then(findId('submitProfile').click())
        .then(sleep(300))
    	.then(findCSS('.alert.alert-info').getText()
    		.then(text => {
    			expect(text).to.equal('password will not persist on server')
    		})
    	.then(done))
    })
})