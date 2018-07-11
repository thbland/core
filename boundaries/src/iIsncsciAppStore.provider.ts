/*
@license
Copyright (c) 2015 Rick Hansen Institute. All rights reserved.
This code may only be used under the modified Apache license found at https://raw.githubusercontent.com/rick-hansen-institute/rhi-core-isncsci-algorithm/master/LICENSE
Author: RhiTech <tech@rickhanseninstitute.org>
*/
'use strict';

import { IsncsciTotals } from "../../domain";

export interface iIsncsciAppStoreProvider {
    clearDermatomeSelection(): Promise<void>;
    selectDermatome(dermatomeName: string): Promise<void>;
    setDermatomeValue(dermatomeName: string, value: string): Promise<void>;
    setTotals(totals: IsncsciTotals): Promise<void>;
    updateDermatomesInRange(dermatomeNames: string[], value: string): Promise<void>;
}