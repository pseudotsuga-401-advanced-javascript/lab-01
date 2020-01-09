'use strict';

const validator = require('../lib/validator.js');
const faker = require('faker');

const schema =  {
  
  fields: {
    id: {type: 'string', required: true},
    name: {type: 'string', required: true},
    age: {type: 'number', required: true},
    children: { type: 'array', valueType: 'string' },
  },
};

let str = 'yes';
let num = 1;
let arr = ['a'];
let obj = {x:'y'};
let func = () => {};
let bool = false;

describe('validator module performs basic validation of', () => {

  // TODO: Make this series of tests less repetitive ... DRY it out

  it('strings', () => {


    expect(validator.isString(str)).toBeTruthy();
    expect(validator.isString(num)).toBeFalsy();
    expect(validator.isString(arr)).toBeFalsy();
    expect(validator.isString(obj)).toBeFalsy();
    expect(validator.isString(func)).toBeFalsy();
    expect(validator.isString(bool)).toBeFalsy();
  });

  it('numbers', () => {
    expect(validator.isNumber(str)).toBeFalsy();
    expect(validator.isNumber(num)).toBeTruthy();
    expect(validator.isNumber(arr)).toBeFalsy();
    expect(validator.isNumber(obj)).toBeFalsy();
    expect(validator.isNumber(func)).toBeFalsy();
    expect(validator.isNumber(bool)).toBeFalsy();
  });

  // it('arrays', () => {
  //   expect(true).toBeFalsy();
  // });

  // it('objects', () => {
  //   expect(true).toBeFalsy();
  // });

  // it('booleans', () => {
  //   expect(true).toBeFalsy();
  // });

  // it('functions', () => {
  //   expect(true).toBeFalsy();
  // });

});



describe('validates the basic schema', () => {

  it('isValid() function validates a good record.', () => {
    //go through the schema, and fill in perfect values for every field.
    let testRecord = {};

    for (let field in schema.fields) {
      switch ( schema.fields[field].type) {
      case 'boolean': 
        testRecord[field] = faker.random.boolean();
        break;
      case 'number':
        testRecord[field] = faker.random.number();
        break;
      case 'string':
        testRecord[field] = faker.random.word();
        break;
      case 'array':
        testRecord[field] = [];
        testRecord[field].push(faker.random.arrayElement());
        testRecord[field].push(faker.random.arrayElement());
        break;
      default:
        null;
      }
    }
    expect(validator.isValid(schema, testRecord)).toBeTruthy();
  });

  it('isValid() function returns undefined with missing requirements', () => {
    //go through the schema and fill in perfect values for every field
    let testRecord = {};
    for (let field in schema.fields) {
      if(schema.fields[field].required){
        testRecord[field]=null;
      }
    }
    expect(validator.isValid(schema, testRecord)).toBeFalsy();
  });

});


describe('validator module performs complex validations', () => {

  it('validates the presence of required object properties at any level', () => {
    // i.e. does person.hair.color exist and have a good value, not just person.hair
    expect(true).toBeFalsy();
  });


  it('validates the proper types of object properties', () => {
    // i.e. person.name must be a string, etc.
    expect(true).toBeFalsy();
  });

  it('validates the types of values contained in an array', () => {
    // i.e. an array of all strings or numbers
    expect(true).toBeFalsy();
  });

  it('validates a value array against an approved list', () => {
    // i.e. a string might only be allowed to be "yes" or "no"
    expect(true).toBeFalsy();
  });

  // TODO: Cover so, so many more cases

});

