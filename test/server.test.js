const {app} = require('./../server/server');
const expect = require('expect');
const request = require('supertest');

describe('POST /newcategory', ()=>{
    it('should add new category', (done)=>{
        request(app)
        .post('/newcategory')
        .send()
    })
})