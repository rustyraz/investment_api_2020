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
                //run seeds
                return knex.seed.run();
            }).then(() => done());        
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
            expect(response.body).to.deep.equal(fixtures.users); // when we are able to rollback the database. 
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
            expect(response.body).to.be.a('array');
            expect(response.body).to.be.lengthOf(1);
            expect(response.body[0]).to.deep.equal(fixtures.users[0]); // when we are able to rollback the database. 
            done();
        });
    });

    it('Creates a new user record', (done) => {
        request(app)
        .post('/api/v1/register')
        .send(fixtures.new_user)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .then((response)=>{
            expect(response.body).to.be.a('object');
            fixtures.new_user.id = response.body.id;
            expect(response.body).to.deep.equal(fixtures.new_user); // when we are able to rollback the database. 
            done();
        });
    });

    it('Updates a user record', (done) => {
        fixtures.new_user.name = "Test Updated"
        request(app)
        .put('/api/v1/users/4')
        .send(fixtures.new_user)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .then((response)=>{
            expect(response.body).to.be.a('object');
            fixtures.new_user.id = response.body.id;
            expect(response.body).to.deep.equal(fixtures.new_user); // when we are able to rollback the database. 
            done();
        });
    });

    it('Deletes user record', (done) => {
        request(app)
        .delete('/api/v1/users/4')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .then((response)=>{
            expect(response.body).to.be.a('object');
            expect(response.body).to.deep.equal({
                success: true,
                message: "Deleted successfully!"
            }); 
            done();
        });
    });

    after((done)=>{
        //rollback the migration
        knex.migrate.rollback().then(() => done());
    });

});