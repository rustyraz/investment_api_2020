const request = require('supertest');
const expect = require('chai').expect;
const knex = require('../db/knex');
const app = require('../app');

const fixtures = require('./fixtures');

describe('CRUD users', () => {
    before((done)=>{
        //run migration 
        knex.migrate.latest()
            .then(()=>{
                return knex.seed.run();
            }).then(() => done());
        //run seeds
    });

    it('Lists all Records', (done) => {
        request(app)
        .get('/api/v1/users')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .then((response)=>{
            expect(response.body).to.be.a('array');
            expect(response.body).to.be.lengthOf(fixtures.users.length);
            //expect(response.body).to.deep.equal(fixtures.users); // when we are able to rollback the database. 
            done();
        });
    });
    

    it('Lists a user record by ID', (done) => {
        request(app)
        .get('/api/v1/users/1')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .then((response)=>{
            //expect(response.body).to.be.a('array');
            //expect(response.body).to.be.lengthOf(fixtures.users.length);
            //expect(response.body).to.deep.equal(fixtures.users); // when we are able to rollback the database. 
            done();
        });
    });

});