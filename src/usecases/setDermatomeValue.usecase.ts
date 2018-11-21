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
import { Region } from '../domain.js';
import { validateDermatomeNameAndValue } from './helpers.js';

/**
 * 'SetDermatomeValueUseCase' contains the business logic to
 * set the value for the dermatome specified.
 * Steps:
 * 1. The clinician enters a new measurement in the system.
 * 2. The system validates the entry.
 *    Valid sensory values: '', '0', '0!', '1', '1!', '2', 'NT', 'NT!', 'NT*'.
 *    Valid motor values: '', '0', '0!', '1', '1!', '2!', '3', '3!', '4', '4!', '5', '5*', 'NT', 'NT!', 'NT*'.
 * 3. If the value set does not imply impairment not due to SCI, the system picks the next dermatome to be selected.
 * 4. The system updates the application state with the new value and new dermatome selection.
 */

/**
 * 1. The clinician enters a new measurement in the system.
 * @param {string} dermatomeName
 * @param {string} value
 * @param {string} region Body region currently being tested. Used to determine the next dermatome to be selected.
 *                        Options: upper, lower.
 * @param {IIsncsciAppStoreProvider} appStoreProvider Allows the system to update the application's state.
 */
export function setDermatomeValue(
    dermatomeName: string, value: string, region: Region, appStoreProvider: IIsncsciAppStoreProvider): void {
    // 2. the system validates the entry.
    const validationMessage = validateDermatomeNameAndValue(dermatomeName, value);

    if (validationMessage) {
        // console.log(`${dermatomeName} :: ${value} :: ${validationMessage}`);
        throw new Error(`SetDermatomeValueUseCase :: ${validationMessage}`);
    }

    // 3. If the value set does not imply impairment not due to SCI, the system picks the next dermatome to be selected.
    const nextDermatomeName: string =
        /(\*|\!)$/.test(dermatomeName) ? dermatomeName : getNextDermatomeName(dermatomeName, region);

    // 4. The system updates the application state with the new value and new dermatome selection.
    appStoreProvider.setDermatomeValue(dermatomeName, value, nextDermatomeName);
}

function getNextDermatomeName(currentDermatomeName: string, region: Region): string {
    const isMotor: boolean = /motor/i.test(currentDermatomeName);
    const levelRegion: string = currentDermatomeName.substring(0, 1).toLowerCase();
    const levelPosition: number = parseInt(/[0-9]+/i.exec(currentDermatomeName)![0], 10);
    const levelName: string = levelRegion + levelPosition;
    const suffix: string = currentDermatomeName.substring(levelName.length);

    if (levelRegion === 'c' && levelPosition < 8) {
        return `c${levelPosition + 1}${suffix}`;
    }

    if (levelName === 't1' && isMotor) {
        return region === Region.Upper ? currentDermatomeName : `l2${suffix}`;
    }

    if (levelName === 's1' && isMotor) {
        return currentDermatomeName;
    }

    if (levelName === 'c8') {
        return `t1${currentDermatomeName.substring(levelName.length)}`;
    }

    if (levelName === 't12') {
        return `l1${currentDermatomeName.substring(levelName.length)}`;
    }

    if (levelName === 'l5') {
        return `s1${currentDermatomeName.substring(levelName.length)}`;
    }

    if (levelName === 's3') {
        return `s4_5${currentDermatomeName.substring(levelName.length)}`;
    }

    if (levelName === 's4') {
        return currentDermatomeName;
    }

    return `${levelRegion}${levelPosition + 1}${suffix}`;
}
