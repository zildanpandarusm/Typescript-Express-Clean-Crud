"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userValidate = void 0;
function userValidate(data) {
    const errors = [];
    if (!data.name) {
        errors.push('Name is required');
    }
    if (!data.email) {
        errors.push('Email is required');
    }
    if (!data.address) {
        errors.push('Address is required');
    }
    if (errors.length === 0) {
        return { result: true, message: 'Data is valid' };
    }
    else {
        return { result: false, message: errors.join(', ') };
    }
}
exports.userValidate = userValidate;
