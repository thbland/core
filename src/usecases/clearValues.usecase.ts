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

/**
 * 'ClearValuesUseCase' contains the business logic to
 * set all raw values and totals back to blank.
 * Steps:
 * 1. The clinician presses the 'delete' (recycling bin) control.
 * 2. The system updates the application state with the empty values.
 */

/**
 * 1. The clinician presses the 'delete' (recycling bin) control.
 * @param {IIsncsciAppStoreProvider} appStoreProvider Allows the system to update the application's state.
 */
export function clearValues(appStoreProvider: IIsncsciAppStoreProvider): void {
    // 2. The system updates the application state with the empty values.
    appStoreProvider.clearValues();
}
