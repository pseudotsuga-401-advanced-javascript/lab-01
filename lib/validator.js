'use strict';

let validator = module.exports = {};

/**
 * Based on a set of rules, is the input valid?
 * @param input
 * @param schema
 * @returns {boolean}
 */
validator.isValid = (schema, input) => {
  
  let valid = true;
  
  for( let fieldName in schema.fields) {

    let field = schema.fields[fieldName];

    //Am I required and set?
    let required = field.required ? validator.isTruthy(input[fieldName])
      : true;

    //Am I the right type?  
    let type = field.type ? validator.isCorrectType(input[fieldName],field) 
      : true;

    //if anything is false ...    
    if (!(required && type)){
      valid = false;
    }

  }
  return valid;
};



/**
 * Is this a string?
 * @param input
 * @returns {boolean}
 */
validator.isString = (input) => {
  return typeof input === 'string';
};

/**
 * Is this an Object?
 * @param input
 * @returns {boolean}
 */
validator.isObject = (input) => {
  return typeof input === 'object' && !(input instanceof Array) && input !== null;
};

/**
 * Is this an array, and do the data types match?
 * @param input
 * @returns {boolean}
 */
validator.isArray = (input, valueType) => {
  return Array.isArray(input) && (valueType? input.every(val => typeof val === valueType)
    : true);
};

/**
 * Is this a boolean value?
 * @param input
 * @returns {boolean}
 */
validator.isBoolean = (input) => {
  return typeof input === 'boolean';
}; 

/**
 * Is this a number?
 * @param input
 * @returns {boolean}
 */
validator.isNumber = (input) => {
  return typeof input ==='number';
};

/**
 * Is this a function?
 * @param input
 * @returns {boolean}
 */
validator.isFunction = (input) => {
  return typeof input === 'function';
};

/**
 * Is the value truthy? With handling for undefined values.
 * @param input
 * @returns {boolean}
 */
validator.isTruthy = (input) => {
  return !!input;
};

/**
 * Type Validation through accessing the schema's field and then the type for that field. This function then routes the input through the appropriate validator function. 
 * @params input, field
 * @returns {boolean}
 */
validator.isCorrectType = (input, field)  => {
   
  switch(field.type) {
  case 'string': return validator.isString(input);
  case 'number': return validator.isNumber(input);
  case 'array': return validator.isArray(input, field.valueType);
  case 'object': return validator.isObject(input);
  case 'boolean': return validator.isBoolean(input);
  default: return false;
  }

};
