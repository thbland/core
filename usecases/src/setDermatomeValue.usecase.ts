/*
@license
Copyright (c) 2015 Rick Hansen Institute. All rights reserved.
This code may only be used under the modified Apache license found at https://raw.githubusercontent.com/rick-hansen-institute/rhi-core-isncsci-algorithm/master/LICENSE
Author: RhiTech <tech@rickhanseninstitute.org>
*/
'use strict';

import { iIsncsciAppStoreProvider } from '../../boundaries';
import {
    validMotorNameRegExp,
    validMotorValueRegExp,
    validSensoryNameRegExp,
    validSensoryValueRegExp
} from './regularExpressions';

/**
* 'SetDermatomeValueUseCase' contains the business logic to
* set the value for the dermatome specified.
* Steps:
* 1. The clinician enters a new meassurement in the system.
* 2. the system validates the entry.
*    Valid sensory values: '', '0', '0!', '1', '1!', '2', 'NT', 'NT!', 'NT*'.
*    Valid motor values: '', '0', '0!', '1', '1!', '2!', '3', '3!', '4', '4!', '5', '5*', 'NT', 'NT!', 'NT*'.
* 3. The system updates the application state with the new value.
*/
export class SetDermatomeValueUseCase {
    static get is(): string { return "rhi-core-isncsci-usecases.SetDermatomeValueUseCase"; }

    /**
    * @param {iIsncsciAppStoreProvider} appStoreProvider Allow's the system to update the application's state.
    */
    public constructor(private appStoreProvider: iIsncsciAppStoreProvider) {}

    /**
    * 1. The clinician enters a new meassurement in the system.
    * @param {string} dermatomeName
    * @param {string} value
    */
    public execute(dermatomeName: string, value: string): void {
        // 2. the system validates the entry.
        const validationMessage = SetDermatomeValueUseCase.validate(dermatomeName, value);

        if (validationMessage) {
            console.log(`${dermatomeName} :: ${value} :: ${validationMessage}`);
            throw `${SetDermatomeValueUseCase.is} :: ${validationMessage}`;
        }

        // 3. The system updates the application state with the new value.
        this.appStoreProvider.setDermatomeValue(dermatomeName, value);
    }

    /**
     * Checks that both, the dermatomeName and value, are within the valid ranges.
     * Valid sensory values: '', '0', '0!', '1', '1!', '2', 'NT', 'NT!', 'NT*'.
     * Valid motor values: '', '0', '0!', '1', '1!', '2!', '3', '3!', '4', '4!', '5', '5*', 'NT', 'NT!', 'NT*'.
     * @param {string} dermatomeName
     * @param {string} value
     * @returns {string} An empty string when the combination is valid, or one of the following values when the combination is invalid: ['invalid-motor-name', 'invalid-motor-value', 'invalid-sensory-name', 'invalid-sensory-value']
     */
    private static validate(dermatomeName: string, value: string): string {
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
}