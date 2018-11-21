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

import { clearDermatomeSelection } from '../../src/usecases/clearDermatomeSelection.usecase';

describe('Clear dermatome selection use case', () => {
    // beforeAll((done) => { });
    // beforeEach((done) => { done(); });

    it('clears the dermatome selection', (done) => {
        // Arrange
        //#region AppStoreProvider
        const appStoreProvider = jasmine.createSpyObj('IIsncsciAppStoreProvider', ['clearDermatomeSelection']);

        appStoreProvider.clearDermatomeSelection.and.callFake(
            () => {
                runAsserts();

                return Promise.resolve();
        });
        //#endregion

        // Act
        clearDermatomeSelection(appStoreProvider);

        // Assert
        function runAsserts() {
            expect(appStoreProvider.clearDermatomeSelection).toHaveBeenCalled();
            done();
        }
    });
});
