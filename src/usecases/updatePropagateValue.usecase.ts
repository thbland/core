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

import { IIsncsciAppSettingProvider, IIsncsciAppStoreProvider } from '../boundaries.js';

/**
 * 'UpdatePropagateValueUseCase' contains the business logic to
 * change the ‘propagateValue’ flag.
 * Steps:
 * 1. The clinician switches the ‘propagate values down’ control.
 * 2. The system updates the application settings so that the change gets picked on application re-start.
 * 3. The system updates the application state with the new value.
 */

/**
 * 1. The clinician switches the ‘propagate values down’ control.
 * @param {boolean} value
 * @param {IIsncsciAppStoreProvider} appStoreProvider Allows the system to update the application's state.
 * @param {IIsncsciAppSettingProvider} appSettingProvider Allows the system to update the application's storage.
 */
export function updatePropagateValue(
    value: boolean, appStoreProvider: IIsncsciAppStoreProvider, appSettingProvider: IIsncsciAppSettingProvider): void {
    // 2. The system updates the application settings so that the change gets picked on application re-start.
    appSettingProvider.updatePropagateValue(value)
    // 3. The system updates the application state with the new value.
    .then(() => appStoreProvider.updatePropagateValue(value))
    .catch((error: Error) => {
        // Handle the error, if necessary
        appStoreProvider.logError(`updatePropagateValueUseCase :: ${error.message}`);
    });
}
