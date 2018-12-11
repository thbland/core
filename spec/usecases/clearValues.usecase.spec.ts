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

import { clearValues } from '../../src/usecases/clearValues.usecase';

describe('Clear values value usecase ::', () => {

    it('set all raw values and totals back to blank', (done) => {
        // Arrange

        //#region AppStoreProvider
        const appStoreProvider = jasmine.createSpyObj('IIsncsciAppStoreProvider', ['clearValues']);

        appStoreProvider.clearValues.and
            .callFake(() => {
              runAsserts();
              return Promise.resolve();
            });
        //#endregion

        // Act
        clearValues(appStoreProvider);

        // Assert
        function runAsserts() {
            expect(appStoreProvider.clearValues).toHaveBeenCalled();
            done();
        }
    });
});
