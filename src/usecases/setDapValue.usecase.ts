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
 * 'SetDapValueUseCase' contains the business logic to
 * set the DAP value.
 * Steps:
 * 1. The clinician enters a new value in the system for DAP.
 * 2. The system validates the request.
 * 3. The system updates the application state with the selection.
 */

/**
 * 1. The clinician enters a new value in the system for DAP.
 * @param {string} dapValue
 * @param {IIsncsciAppStoreProvider} appStoreProvider Allows the system to update the application's state.
 */
export function setDapValue(dapValue: string, appStoreProvider: IIsncsciAppStoreProvider): void {
    // 2. The system validates the request.
    const validationMessage = validateBinaryObservation(dapValue);

    if (validationMessage) {
        // console.log(`${dapValue} :: ${validationMessage}`);
        throw new Error(`SetDapValueUseCase :: ${validationMessage}`);
    }

    // 3. The system updates the application state with the selection.
    appStoreProvider.setDapValue(dapValue);
}
