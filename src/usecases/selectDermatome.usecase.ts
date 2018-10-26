/*
@license
Copyright (c) 2015 Rick Hansen Institute. All rights reserved.
This code may only be used under the modified Apache license found at https://raw.githubusercontent.com/rick-hansen-institute/rhi-core-isncsci-algorithm/master/LICENSE
Author: RhiTech <tech@rickhanseninstitute.org>
*/
'use strict';

import { iIsncsciAppStoreProvider } from '../boundaries.js';
import { validateDermatomeName } from './helpers.js';

/**
 * 'SelectDermatomeUseCase' contains the business logic to
 * select the dermatome specified.
 * Steps:
 * 1. The clinician requests for a specific dermatome to be selected.
 * 2. The system validates the request.
 * 3. The system updates the application state with the selection.
 */

/**
 * 1. The clinician requests for a specific dermatome to be selected.
 * @param {string} dermatomeName
 * @param {iIsncsciAppStoreProvider} appStoreProvider Allow's the system to update the application's state.
 */
export function selectDermatome(dermatomeName: string, appStoreProvider: iIsncsciAppStoreProvider): void {
    // 2. The system validates the request.
    const validationMessage = validateDermatomeName(dermatomeName);

    if (validationMessage) {
        console.log(`${dermatomeName} :: ${validationMessage}`);
        throw `SelectDermatomeUseCase :: ${validationMessage}`;
    }

    // 3. The system updates the application state with the selection.
    appStoreProvider.selectDermatome(dermatomeName);
}
