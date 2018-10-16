/*
@license
Copyright (c) 2015 Rick Hansen Institute. All rights reserved.
This code may only be used under the modified Apache license found at https://raw.githubusercontent.com/rick-hansen-institute/rhi-core-isncsci-algorithm/master/LICENSE
Author: RhiTech <tech@rickhanseninstitute.org>
*/
'use strict';

import {
    validMotorNameRegExp,
    validMotorValueRegExp,
    validSensoryNameRegExp,
    validSensoryValueRegExp
} from './regularExpressions.js';

/**
 * Checks that the dermatomeName is valid.
 * @param {string} dermatomeName
 * @returns {string} An empty string when the combination is valid, or 'invalid-dermatome-name' when the name is invalid.
*/
export function validateDermatomeName(dermatomeName: string): string {
    // motor: c5-c8, t1, l2-l5, s1
    // sensory: c2-c8, t1-t12, l1-l5, s1-s3, s4_5
    return validMotorNameRegExp.test(dermatomeName) || validSensoryNameRegExp.test(dermatomeName) ? '' : 'invalid-dermatome-name';
}

/**
 * Checks that both, the dermatomeName and value, are within the valid ranges.
 * Valid sensory values: '', '0', '0!', '1', '1!', '2', 'NT', 'NT!', 'NT*'.
 * Valid motor values: '', '0', '0!', '1', '1!', '2!', '3', '3!', '4', '4!', '5', '5*', 'NT', 'NT!', 'NT*'.
 * @param {string} dermatomeName
 * @param {string} value
 * @returns {string} An empty string when the combination is valid, or one of the following values when the combination is invalid: ['invalid-dermatome-name', 'invalid-motor-value', 'invalid-sensory-value']
 */
export function validateDermatomeNameAndValue(dermatomeName: string, value: string): string {
    // c5-c8, t1, l2-l5, s1
    const isValidMotorName: boolean = validMotorNameRegExp.test(dermatomeName);

    if (isValidMotorName) {
        // '', '0', '0!', '1', '1!', '2!', '3', '3!', '4', '4!', '5', '5*', 'NT', 'NT!', 'NT*'
        return value === '' || validMotorValueRegExp.test(value) ? '' : 'invalid-motor-value';
    }

    // c2-c8, t1-t12, l1-l5, s1-s3, s4_5
    const isValidSensoryName: boolean = validSensoryNameRegExp.test(dermatomeName);

    if (isValidSensoryName) {
        // '', '0', '0!', '1', '1!', '2', 'NT', 'NT!', 'NT*'
        return value === '' || validSensoryValueRegExp.test(value) ? '' : 'invalid-sensory-value';
    }

    // We reach this point when both, sensory and motor names, are invalid.
    // We return that as the error. 
    return 'invalid-dermatome-name';
}