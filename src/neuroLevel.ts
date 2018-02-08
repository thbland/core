/*
@license
Copyright (c) 2015 Rick Hansen Institute. All rights reserved.
This code may only be used under the modified Apache license found at https://raw.githubusercontent.com/EddieMachete/rhi-core-isncsci-algorithm/master/LICENSE
Author: RhiTech <tech@rickhanseninstitute.org>
*/

'use strict';

import { IsncsciExam } from "./isncsciExam";

/**
 * The 'rhi-core-isncsci-level' contains all the values for a specific neurological level required in the calculation of an ISNCSCI exam.
* @demo demo/index.html
*/
export class NeuroLevel {
    public static get is():string { return 'rhi-core-isncsci.NeuroLevel'; }
    
    public hasOtherLeftMotorFunction:boolean = false;
    public isKeyMuscle:boolean = false;
    public isLowerMuscle:boolean = false;
    public isncsciExam:IsncsciExam = null;
    public leftTouchImpairmentNotDueToSci:boolean = false;
    public leftTouch:string;
    public leftTouchValue:number = 0;
    public leftPrickImpairmentNotDueToSci:boolean = false;
    public leftPrick:string;
    public leftPrickValue:number = 0;
    public leftMotorImpairmentNotDueToSci:boolean = false;
    public leftMotor:string;
    public leftMotorValue:number = 0;
    public name:string;
    public next:NeuroLevel = null;
    public ordinal:number = 0;
    public previous: NeuroLevel = null;
    public rightTouchImpairmentNotDueToSci:boolean = false;
    public rightTouch:string;
    public rightTouchValue:number = 0;
    public rightPrickImpairmentNotDueToSci:boolean = false;
    public rightPrick:string;
    public rightPrickValue:number = 0;
    public rightMotorImpairmentNotDueToSci:boolean = false;
    public hasOtherRightMotorFunction: boolean = false;
    public rightMotor:string;
    public rightMotorValue:number = 0;

    /**
    * Updates all dermatome related values on the neurological level.
    *
    * @param {number} ordinal The position of the level on the human spine.
    * @param {boolean} isKeyMuscle
    * @param {boolean} isKowerMuscle
    * @param {string} rightTouch
    * @param {number} rightTouchValue
    * @param {boolean} rightTouchImpairmentNotDueToSci
    * @param {string} leftTouch
    * @param {number} leftTouchValue
    * @param {boolean} leftTouchImpairmentNotDueToSci
    * @param {string} rightPrick
    * @param {number} rightPrickValue
    * @param {boolean} rightPrickImpairmentNotDueToSci
    * @param {string} leftPrick
    * @param {number} leftPrickValue
    * @param {boolean} leftPrickImpairmentNotDueToSci
    * @param {string} rightMotor
    * @param {number} rightMotorValue
    * @param {boolean} rightMotorImpairmentNotDueToSci
    * @param {string} leftMotor
    * @param {number} leftMotorValue
    * @param {boolean} leftMotorImpairmentNotDueToSci
    * 
    * @return {NeuroLevel} Returns itself to allow chaining methods.
    */
    public setValues(ordinal:number, isKeyMuscle:boolean, isLowerMuscle:boolean,
            rightTouch:string, rightTouchValue:number, rightTouchImpairmentNotDueToSci:boolean,
            leftTouch:string, leftTouchValue:number, leftTouchImpairmentNotDueToSci:boolean,
            rightPrick:string, rightPrickValue:number, rightPrickImpairmentNotDueToSci:boolean,
            leftPrick:string, leftPrickValue:number, leftPrickImpairmentNotDueToSci:boolean,
            rightMotor:string, rightMotorValue:number, rightMotorImpairmentNotDueToSci:boolean,
            leftMotor:string, leftMotorValue:number, leftMotorImpairmentNotDueToSci:boolean):NeuroLevel {
        this.isKeyMuscle = isKeyMuscle;
        this.isLowerMuscle = isLowerMuscle;
        this.ordinal = ordinal;

        this.rightTouch = rightPrick;
        this.rightTouchValue = rightPrickValue;
        this.rightTouchImpairmentNotDueToSci = rightTouchImpairmentNotDueToSci;

        this.leftTouch = leftTouch;
        this.leftTouchValue = leftTouchValue;
        this.leftTouchImpairmentNotDueToSci = leftTouchImpairmentNotDueToSci;

        this.rightPrick = rightPrick;
        this.rightPrickValue = rightPrickValue;
        this.rightPrickImpairmentNotDueToSci = rightPrickImpairmentNotDueToSci;

        this.leftPrick = leftPrick;
        this.leftPrickValue = leftPrickValue;
        this.leftPrickImpairmentNotDueToSci = leftPrickImpairmentNotDueToSci;

        this.rightMotor = rightMotor;
        this.rightMotorValue = rightMotorValue;
        this.rightMotorImpairmentNotDueToSci = rightMotorImpairmentNotDueToSci;

        this.leftMotor = leftMotor;
        this.leftMotorValue = leftMotorValue;
        this.leftMotorImpairmentNotDueToSci = leftMotorImpairmentNotDueToSci;

        return this;
    }
}