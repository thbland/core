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

import { IsncsciTotals } from '../domain.js';

export interface IIsncsciAppStoreProvider {
    clearDermatomeSelection(): Promise<void>;
    clearValues(): Promise<void>;
    logError(errorMessage: string): Promise<void>;
    selectDermatome(dermatomeName: string): Promise<void>;
    setDapValue(value: string): Promise<void>;
    setDermatomeValue(dermatomeName: string, value: string, nextDermatomeName: string): Promise<void>;
    setGeneralComments(value: string): Promise<void>;
    setPartialTotals(partialTotals: IsncsciTotals): Promise<void>;
    setTotals(totals: IsncsciTotals): Promise<void>;
    setVacValue(value: string): Promise<void>;
    updateDermatomesInRange(dermatomeNames: string[], value: string): Promise<void>;
    updatePropagateValue(value: boolean): Promise<void>;
}
