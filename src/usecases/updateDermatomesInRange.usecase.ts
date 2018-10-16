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
 * 'SelectDermatomeUseCase' contains the business logic to
 * select the dermatome specified.
 * Steps:
 * 1. The clinician selects a dermatome.
 * 2. The clinician selects a dermatome range.
 * 3. The system validates the request.
 * 4. The system updates the dermatome range with the value from the dermatome marked as selected.
*/
export class UpdateDermatomesInRangeUseCase {
    static get is(): string { return "rhi-core-isncsci-usecases.UpdateDermatomesInRangeUseCase"; }

    /**
     * @param {iIsncsciAppStoreProvider} appStoreProvider Allow's the system to update the application's state.
    */
    public constructor(private appStoreProvider: iIsncsciAppStoreProvider) {}

    /**
     * 1. The clinician selects a dermatome.
     * 2. The clinician selects a dermatome range.
     * @param {string} dermatomeName
     * @param {string[]} dermatomeRange
    */
    public execute(dermatomeRange: string[], value: string): void {
        // 3. The system validates the request.
        let validationMessage: string = '';
        dermatomeRange.forEach((dermatomeName: string) => {
            const message = validateDermatomeNameAndValue(dermatomeName, value);

            if (message) {
                validationMessage += ` :: ${dermatomeName} - ${message}`;
            }
        });

        if (validationMessage) {
            console.log(value + validationMessage);
            throw UpdateDermatomesInRangeUseCase.is +validationMessage;
        }

        // 4. The system updates the dermatome range with the value from the dermatome marked as selected.
        this.appStoreProvider.updateDermatomesInRange(dermatomeRange, value);
    }
}