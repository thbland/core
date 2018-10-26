/*
@license
Copyright (c) 2015 Rick Hansen Institute. All rights reserved.
This code may only be used under the modified Apache license found at https://raw.githubusercontent.com/rick-hansen-institute/rhi-core-isncsci-algorithm/master/LICENSE
Author: RhiTech <tech@rickhanseninstitute.org>
*/
'use strict';

import { iIsncsciAppStoreProvider } from '../boundaries.js';

/**
 * 'ClearDermatomeSelectionUseCase' contains the business logic to
 * clear the dermatome selection.
 * Steps:
 * 1. The clinician requests for the dermatome selection to be cleared.
 * 2. The system updates the application state.
 */

/**
 * 1. The clinician requests for the dermatome selection to be cleared.
 * @param {iIsncsciAppStoreProvider} appStoreProvider Allow's the system to update the application's state.
 */
export function clearDermatomeSelection(appStoreProvider: iIsncsciAppStoreProvider): void {
    // 2. The system updates the application state with the new value.
    appStoreProvider.clearDermatomeSelection();
}
