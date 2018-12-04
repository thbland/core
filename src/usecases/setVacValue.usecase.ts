/**
 * @license
 * Copyright (c) 2015 Rick Hansen Institute. All rights reserved.
 *
 * This code may only be used under the modified Apache license found at
 * https://raw.githubusercontent.com/rick-hansen-institute/rhi-core-isncsci-algorithm/master/LICENSE
 *
 * Author: RhiTech <tech@rickhanseninstitute.org>
 */
'use strict';

import { IIsncsciAppStoreProvider } from '../boundaries.js';
import { validateBinaryObservation } from './helpers.js';
/**
 * 'SetVacValueUseCase' contains the business logic to
 * set the VAC value.
 * Steps:
 * 1. The clinician enters a new value in the system for VAC.
 * 2. The system validates the request.
 * 3. The system updates the application state with the selection.
 */

/**
 * 1. The clinician enters a new value in the system for VAC.
 * @param {string} vacValue
 * @param {IIsncsciAppStoreProvider} appStoreProvider Allows the system to update the application's state.
 */
export function setVacValue(vacValue: string, appStoreProvider: IIsncsciAppStoreProvider): void {
    // 2. The system validates the request.
    const validationMessage = validateBinaryObservation(vacValue);

    if (validationMessage) {
        // console.log(`${VacValue} :: ${validationMessage}`);
        throw new Error(`SetVacValueUseCase :: ${validationMessage}`);
    }

    // 3. The system updates the application state with the selection.
    appStoreProvider.setVacValue(vacValue);
}
