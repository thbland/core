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

import { setGeneralComments } from '../../src/usecases/setGeneralComments.usecase';

describe('Set GeneralComments usecase', () => {

    it('Set GeneralComments', (done) => {
        //#region AppStoreProvider
        const appStoreProvider = jasmine.createSpyObj('IIsncsciAppStoreProvider', ['setGeneralComments']);

        appStoreProvider.setGeneralComments.and
            .callFake((comment: string) => Promise.resolve());
        //#endregion

        // Act
        setGeneralComments('some comment', appStoreProvider);
        runAsserts();

        // Assert
        function runAsserts() {
            expect(appStoreProvider.setGeneralComments).toHaveBeenCalled();
            expect(appStoreProvider.setGeneralComments).not.toThrowError();
            done();
        }
    });
});
