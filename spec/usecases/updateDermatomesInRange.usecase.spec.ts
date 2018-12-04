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

import { updateDermatomesInRange } from '../../src/usecases/updateDermatomesInRange.usecase';

describe('Update dermatomes in range use case', () => {
    // beforeAll((done) => { });
    // beforeEach((done) => { done(); });

    it('sets the value of 2 for the range [c5RightMotor,  c8RightPrick]', (done) => {
        // Arrange
        const dermatomeRange: string[] = [
            'c5RightMotor', 'c5RightTouch', 'c5RightPrick',
            'c6RightMotor', 'c6RightTouch', 'c6RightPrick',
            'c7RightMotor', 'c7RightTouch', 'c7RightPrick',
            'c8RightMotor', 'c8RightTouch', 'c8RightPrick'];

        //#region AppStoreProviders
        const appStoreProvider = jasmine.createSpyObj('IIsncsciAppStoreProvider', ['updateDermatomesInRange']);

        appStoreProvider.updateDermatomesInRange.and.callFake(
            (dRange: string[], value: string) => {
                runAsserts();

                return Promise.resolve();
        });
        //#endregion

        // Act
        updateDermatomesInRange(dermatomeRange, '2', appStoreProvider);

        // Assert
        function runAsserts() {
            expect(appStoreProvider.updateDermatomesInRange).toHaveBeenCalled();
            done();
        }
    });

    it('throws an exception when setting a value of 5 in a range containing sensory values', (done) => {
        // Arrange
        const dermatomeRange: string[] = [
            'c5RightMotor', 'c5RightTouch', 'c5RightPrick',
            'c6RightMotor', 'c6RightTouch', 'c6RightPrick'];

        //#region AppStoreProvider
        const appStoreProvider = jasmine.createSpyObj('IIsncsciAppStoreProvider', ['updateDermatomesInRange']);
        appStoreProvider.updateDermatomesInRange.and.returnValue(Promise.resolve());
        //#endregion

        // Act
        expect(() => updateDermatomesInRange(dermatomeRange, '5', appStoreProvider))
        // Assert
        // tslint:disable-next-line:max-line-length
        .toThrow(new Error('UpdateDermatomesInRangeUseCase :: c5RightTouch - invalid-sensory-value :: c5RightPrick - invalid-sensory-value :: c6RightTouch - invalid-sensory-value :: c6RightPrick - invalid-sensory-value'));
        done();
    });
});