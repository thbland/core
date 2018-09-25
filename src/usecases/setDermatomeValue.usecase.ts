/*
@license
Copyright (c) 2015 Rick Hansen Institute. All rights reserved.
This code may only be used under the modified Apache license found at https://raw.githubusercontent.com/rick-hansen-institute/rhi-core-isncsci-algorithm/master/LICENSE
Author: RhiTech <tech@rickhanseninstitute.org>
*/
'use strict';

import { iIsncsciAppStoreProvider } from '../boundaries.js';
import { validateDermatomeNameAndValue } from './helpers.js';

/**
* 'SetDermatomeValueUseCase' contains the business logic to
* set the value for the dermatome specified.
* Steps:
* 1. The clinician enters a new meassurement in the system.
* 2. The system validates the entry.
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
        const validationMessage = validateDermatomeNameAndValue(dermatomeName, value);

        if (validationMessage) {
            console.log(`${dermatomeName} :: ${value} :: ${validationMessage}`);
            throw `${SetDermatomeValueUseCase.is} :: ${validationMessage}`;
        }

        // 3. The system updates the application state with the new value.
        this.appStoreProvider.setDermatomeValue(dermatomeName, value);
    }
}