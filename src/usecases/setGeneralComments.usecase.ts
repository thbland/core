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
 * 'SetGeneralCommentsUseCase' contains the business logic to
 * set the GeneralComment .
 * Steps:
 * 1. The clinician enters a new general comment in the system.
 * 2. The system updates the application state with the general comment.
 */

/**
 * 1. The clinician enters a new general comment in the system.
 * @param {string} comment
 * @param {IIsncsciAppStoreProvider} appStoreProvider Allows the system to update the application's state.
 */
export function setGeneralComments(comment: string, appStoreProvider: IIsncsciAppStoreProvider): void {
    // 2. The system updates the application state with the general comment.
    appStoreProvider.setGeneralComments(comment);
}
