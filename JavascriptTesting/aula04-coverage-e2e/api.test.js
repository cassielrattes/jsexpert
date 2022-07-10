const { deepStrictEqual } = require("assert")
const { describe, it } = require("mocha")
const supertest = require("supertest")
const app = require("./api")

describe('Api Suite test', () => {
    describe('/contact', () => {
        it('Should request the contact page and return HTTP Status 200', async () => {
            const response = await supertest(app)
                .get('/contact')
                .expect(200)

            deepStrictEqual(response.text, 'contact us page')
        })
    })

    describe('/hello', () => {
        it('Should request an inexistent route /hi and redirect to /hello', async () => {
            const response = await supertest(app)
                .get('/hi')
                .expect(200)

            deepStrictEqual(response.text, 'Hello World!')
        })
    })

    describe('/login', () => {
        it('Should login successfully on the login route and return HTTP Status 200', async () => {
            const response = await supertest(app)
                .post('/login')
                .send({ username: "cassielrattes", password: "123" })
                .expect(200)

            deepStrictEqual(response.text, 'Logging has succeeded!')
        })

        it('Should unauthorize a request when requesting it using wrong credentials and return HTTP Status 401', async () => {
            const response = await supertest(app)
                .post('/login')
                .send({ username: "cassiel", password: "123" })
                .expect(401)

            deepStrictEqual(response.text, 'Logging failed!')
        })
    })
})