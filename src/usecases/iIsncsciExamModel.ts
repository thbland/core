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

export interface IIsncsciExamModel {
    analContraction: string;
    analSensation: string;
    rightLowestNonKeyMuscleWithMotorFunction: string;
    leftLowestNonKeyMuscleWithMotorFunction: string;
    comments: string;
    totals: any;

    //#region C2
    c2RightTouch: string;
    c2LeftTouch: string;
    c2RightPrick: string;
    c2LeftPrick: string;
    //#endregion
    //#region C3
    c3RightTouch: string;
    c3LeftTouch: string;
    c3RightPrick: string;
    c3LeftPrick: string;
    //#endregion
    //#region C4
    c4RightTouch: string;
    c4LeftTouch: string;
    c4RightPrick: string;
    c4LeftPrick: string;
    //#endregion
    //#region C5
    c5RightTouch: string;
    c5LeftTouch: string;
    c5RightPrick: string;
    c5LeftPrick: string;
    c5RightMotor: string;
    c5LeftMotor: string;
    //#endregion
    //#region C6
    c6RightTouch: string;
    c6LeftTouch: string;
    c6RightPrick: string;
    c6LeftPrick: string;
    c6RightMotor: string;
    c6LeftMotor: string;
    //#endregion
    //#region C7
    c7RightTouch: string;
    c7LeftTouch: string;
    c7RightPrick: string;
    c7LeftPrick: string;
    c7RightMotor: string;
    c7LeftMotor: string;
    //#endregion
    //#region C8
    c8RightTouch: string;
    c8LeftTouch: string;
    c8RightPrick: string;
    c8LeftPrick: string;
    c8RightMotor: string;
    c8LeftMotor: string;
    //#endregion
    //#region T1
    t1RightTouch: string;
    t1LeftTouch: string;
    t1RightPrick: string;
    t1LeftPrick: string;
    t1RightMotor: string;
    t1LeftMotor: string;
    //#endregion
    //#region T2
    t2RightTouch: string;
    t2LeftTouch: string;
    t2RightPrick: string;
    t2LeftPrick: string;
    //#endregion
    //#region T3
    t3RightTouch: string;
    t3LeftTouch: string;
    t3RightPrick: string;
    t3LeftPrick: string;
    //#endregion
    //#region T4
    t4RightTouch: string;
    t4LeftTouch: string;
    t4RightPrick: string;
    t4LeftPrick: string;
    //#endregion
    //#region T5
    t5RightTouch: string;
    t5LeftTouch: string;
    t5RightPrick: string;
    t5LeftPrick: string;
    //#endregion
    //#region T6
    t6RightTouch: string;
    t6LeftTouch: string;
    t6RightPrick: string;
    t6LeftPrick: string;
    //#endregion
    //#region T7
    t7RightTouch: string;
    t7LeftTouch: string;
    t7RightPrick: string;
    t7LeftPrick: string;
    //#endregion
    //#region T8
    t8RightTouch: string;
    t8LeftTouch: string;
    t8RightPrick: string;
    t8LeftPrick: string;
    //#endregion
    //#region T9
    t9RightTouch: string;
    t9LeftTouch: string;
    t9RightPrick: string;
    t9LeftPrick: string;
    //#endregion
    //#region T10
    t10RightTouch: string;
    t10LeftTouch: string;
    t10RightPrick: string;
    t10LeftPrick: string;
    //#endregion
    //#region T11
    t11RightTouch: string;
    t11LeftTouch: string;
    t11RightPrick: string;
    t11LeftPrick: string;
    //#endregion
    //#region T12
    t12RightTouch: string;
    t12LeftTouch: string;
    t12RightPrick: string;
    t12LeftPrick: string;
    //#endregion
    //#region L1
    l1RightTouch: string;
    l1LeftTouch: string;
    l1RightPrick: string;
    l1LeftPrick: string;
    //#endregion
    //#region L2
    l2RightTouch: string;
    l2LeftTouch: string;
    l2RightPrick: string;
    l2LeftPrick: string;
    l2RightMotor: string;
    l2LeftMotor: string;
    //#endregion
    //#region L3
    l3RightTouch: string;
    l3LeftTouch: string;
    l3RightPrick: string;
    l3LeftPrick: string;
    l3RightMotor: string;
    l3LeftMotor: string;
    //#endregion
    //#region L4
    l4RightTouch: string;
    l4LeftTouch: string;
    l4RightPrick: string;
    l4LeftPrick: string;
    l4RightMotor: string;
    l4LeftMotor: string;
    //#endregion
    //#region L5
    l5RightTouch: string;
    l5LeftTouch: string;
    l5RightPrick: string;
    l5LeftPrick: string;
    l5RightMotor: string;
    l5LeftMotor: string;
    //#endregion
    //#region S1
    s1RightTouch: string;
    s1LeftTouch: string;
    s1RightPrick: string;
    s1LeftPrick: string;
    s1RightMotor: string;
    s1LeftMotor: string;
    //#endregion
    //#region S2
    s2RightTouch: string;
    s2LeftTouch: string;
    s2RightPrick: string;
    s2LeftPrick: string;
    //#endregion
    //#region S3
    s3RightTouch: string;
    s3LeftTouch: string;
    s3RightPrick: string;
    s3LeftPrick: string;
    //#endregion
    //#region S4_5
    s4_5RightTouch: string;
    s4_5LeftTouch: string;
    s4_5RightPrick: string;
    s4_5LeftPrick: string;
    //#endregion
}
