/*
@license
Copyright (c) 2015 Rick Hansen Institute. All rights reserved.
This code may only be used under the modified Apache license found at https://raw.githubusercontent.com/EddieMachete/rhi-core-isncsci-algorithm/master/LICENSE
Author: RhiTech <tech@rickhanseninstitute.org>
*/

'use strict';

import { BinaryObservation } from "./binaryObservation";
import { NeuroLevel } from "./neuroLevel";

/**
* 'rhi-core-isncsci-exam' contains the raw values from a ISNCSCI Examination.
* Instances of this class can be passed to the Algorithm methods to obtain totals.
* @demo demo/index.html
*/
export class IsncsciExam {
    /***********************************************/
    /* ***** Private, static properties ********** */
    /***********************************************/
    public static get is():string { return 'rhi-core-isncsci-exam'; }

    static ntRegex:RegExp = /\bNT\b/i;
    static nonSciImpairmentRegex:RegExp = /.+[!]/;
    static nonSciImpairmentFlagsRegex:RegExp = /[\\*!]/;
    static normalMotorValue:number = 5;
    static normalSensoryValue:number = 2;

    private levels:NeuroLevel[];

    /***********************************************/
    /* ***** Public properties ********** */
    /***********************************************/
    public analContraction: BinaryObservation = null;
    public analSensation: BinaryObservation = null;
    public rightLowestNonKeyMuscleWithMotorFunction: NeuroLevel = null;
    public leftLowestNonKeyMuscleWithMotorFunction: NeuroLevel = null;

    public constructor() {
        this.levels = IsncsciExam.getIsncsciExamLevels();
    }

    /***********************************************/
    /* ***** Private, static methods ************* */
    /***********************************************/
    /**
    * Creates an array with all the neurological levels required in a ISNCSCI form
    *
    * @return {NeuroLevel[]}
    */
    private static getIsncsciExamLevels():NeuroLevel[] {
        let levels:NeuroLevel[] = [];
        let c1:NeuroLevel = new NeuroLevel();
        c1.name = 'C1';
        c1.previous = null;
        c1.setValues(0, false, false,
            '2', 2, false, '2', 2, false,
            '2', 2, false, '2', 2, false,
            '5', 5, false, '5', 5, false);
        
        levels.push(c1);
        
        var previousLevel:NeuroLevel = c1;
        const levelNames:string[] = ['C2', 'C3', 'C4', 'C5', 'C6', 'C7', 'C8',
                                    'T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'T8', 'T9', 'T10', 'T11', 'T12',
                                    'L1', 'L2', 'L3', 'L4', 'L5', 'S1', 'S2', 'S3', 'S4_5'];
        
        const keyMuscles:object = {'C5':true, 'C6':true, 'C7':true, 'C8':true, 'T1':true,
                                  'L2':true, 'L3':true, 'L4':true, 'L5':true, 'S1':true};
        
        for (var i:number = 0; i < levelNames.length; i++) {
            var name:string = levelNames[i];
        
            var currentLevel =  new NeuroLevel();
            currentLevel.isKeyMuscle = keyMuscles[name] == true;
            currentLevel.isLowerMuscle = (i >= 20 && i <= 24);
            currentLevel.name = name;
            currentLevel.ordinal = i + 1;
            currentLevel.previous = previousLevel;
            
            previousLevel.next = currentLevel;
            previousLevel = currentLevel;
            levels.push(currentLevel);
        }
        
        return levels;
    }

    /**
    * Provides the numeric value appropriate for an entry.
    * It takes into consideration specific elements like asteriks, exclamation signs, or the use of NT.
    *
    * @param {string} text (required) The text with the raw entry.
    * @param {number} normalValue (required) The numeric value considered 'normal' for that type of neurological level.
    * @return {number} The numeric value for a neurology level entry.
    */
    private static getDermatomeValue(text:string, normalValue:number):number
    {
            
        if (text.toUpperCase() == 'NT*')
            return normalValue;

        var value = parseInt(text.replace(IsncsciExam.nonSciImpairmentFlagsRegex, ''));
        
        return isNaN(value) ? 0 : value;
    }

    /**
    * Sets the right names and numeric values for the specified neurology level based on the text based entries provided.
    *
    * @param {NeuroLevel} level (required) The neurological level to be updated.
    * @param {string} rightTouch (required)
    * @param {string} leftTouch (required)
    * @param {string} rightPrick (required)
    * @param {string} leftPrick (required)
    * @param {string} rightMotor (required)
    * @param {string} leftMotor (required)
    */
    private static updateLevel(level:NeuroLevel, rightTouch:string, leftTouch:string,
        rightPrick:string, leftPrick:string, rightMotor:string, leftMotor:string):void {
        // Right Touch
        level.rightTouch = rightTouch;
        level.rightTouchValue = IsncsciExam.getDermatomeValue(rightTouch, IsncsciExam.normalSensoryValue);
        level.rightTouchImpairmentNotDueToSci = IsncsciExam.nonSciImpairmentRegex.test(rightTouch);

        // Left Touch
        level.leftTouch = leftTouch;
        level.leftTouchValue = IsncsciExam.getDermatomeValue(leftTouch, IsncsciExam.normalSensoryValue);
        level.leftTouchImpairmentNotDueToSci = IsncsciExam.nonSciImpairmentRegex.test(leftTouch);

        // Right Prick
        level.rightPrick = rightPrick;
        level.rightPrickValue = IsncsciExam.getDermatomeValue(rightPrick, IsncsciExam.normalSensoryValue);
        level.rightPrickImpairmentNotDueToSci = IsncsciExam.nonSciImpairmentRegex.test(rightPrick);

        // Left Prick
        level.leftPrick = leftPrick;
        level.leftPrickValue = IsncsciExam.getDermatomeValue(leftPrick, IsncsciExam.normalSensoryValue);
        level.leftPrickImpairmentNotDueToSci = IsncsciExam.nonSciImpairmentRegex.test(leftPrick);

        // Right Motor
        level.rightMotor = rightMotor;
        level.rightMotorValue = IsncsciExam.getDermatomeValue(rightMotor, IsncsciExam.normalMotorValue);
        level.rightMotorImpairmentNotDueToSci = IsncsciExam.nonSciImpairmentRegex.test(rightMotor);

        // Left Motor
        level.leftMotor = leftMotor;
        level.leftMotorValue = IsncsciExam.getDermatomeValue(leftMotor, IsncsciExam.normalMotorValue);
        level.leftMotorImpairmentNotDueToSci = IsncsciExam.nonSciImpairmentRegex.test(leftMotor);

        if (level.isKeyMuscle)
            return;
            
        if ((level.rightTouchValue == 2 || level.rightTouchImpairmentNotDueToSci)
            && (level.rightPrickValue == 2 || level.rightPrickImpairmentNotDueToSci)) {
            level.rightMotor = '5';
            level.rightMotorValue = 5;
        } else {
            level.rightMotor = (IsncsciExam.ntRegex.test(level.rightTouch) || level.rightTouchValue == 2)
                               && (IsncsciExam.ntRegex.test(level.rightPrick) || level.rightPrickValue == 2) ? 'NT' : '0';
            level.rightMotorValue = 0;
        }

        if ((level.leftTouchValue == 2 || level.leftTouchImpairmentNotDueToSci)
            && (level.leftPrickValue == 2 || level.leftPrickImpairmentNotDueToSci)) {
            level.leftMotor = '5';
            level.leftMotorValue = 5;
        } else {
            level.leftMotor = (IsncsciExam.ntRegex.test(level.leftTouch) || level.leftTouchValue == 2)
                              && (IsncsciExam.ntRegex.test(level.leftPrick) || level.leftPrickValue == 2) ? 'NT' : '0';
            level.leftMotorValue = 0;
        }
    }

    // There is also created which fires earlier
    //ready: function() { },
    /**
    * Use this method to find neurological level in the exam based on a level name.  E.g. C2,C3,C4...S1,S2,S3,S4_5
    *
    * @param {string} levelName The level name being searched.
    * @return {NeuroLevel} The neurology level that matches the specified level name.
    */
    public getLevelWithName(levelName:string):NeuroLevel {
        const levelNameUpper:string = levelName.toUpperCase()
        return this.levels.find((level:NeuroLevel) => level.name === levelNameUpper);
    }

    /**
    * Use this method to find neurological level in the exam based on its ordinal position.
    *
    * @param {number} ordinal The ordinal position at which we are trying to find a neurological level.
    * The valid values are those between 1 and 28.
    * @return {NeuroLevel} The neurology level that matches the specified ordinal position.
    */
    public getLevelAt(ordinal):NeuroLevel {
        if (ordinal < 1 || ordinal >= this.levels.length)
            throw new Error(`${IsncsciExam.is} : getLevelAt : The ordinal must be a number between 1 and 28`);
        
        // Remember that we have C1 at index 0 and clinicians are not used to thinkig about it when calculating.
        return this.levels[ordinal];
    }

    /**
    * Specify a neurology level, on the right side of the patient's body.
    *
    * @param {string} levelName The name of the right non-key neurological level with motor function.
    */
    public setRightLowestNonKeyMuscleWithMotorFunction(levelName:string):void {
        const key:string = levelName.toUpperCase();
        const level:NeuroLevel = this.getLevelWithName(key);
    
        if (!level)
            throw new Error(`${IsncsciExam.is} : setRightLowestNonKeyMuscleWithMotorFunction : Could not find level with name ${levelName}`);
    
        if (this.rightLowestNonKeyMuscleWithMotorFunction)
            this.rightLowestNonKeyMuscleWithMotorFunction.hasOtherRightMotorFunction = false;
    
        this.rightLowestNonKeyMuscleWithMotorFunction = level;
        this.rightLowestNonKeyMuscleWithMotorFunction.hasOtherRightMotorFunction = true;
    }

    /**
    * Specify a neurology level, on the left side of the patient's body.
    *
    * @param {string} levelName The name of the left non-key neurological level with motor function.
    */
    public setLeftLowestNonKeyMuscleWithMotorFunction(levelName:string):void {
        const key:string = levelName.toUpperCase();
        const level:NeuroLevel = this.getLevelWithName(key);
    
        if (!level)
            throw new Error(`${IsncsciExam.is} : setLeftLowestNonKeyMuscleWithMotorFunction : Could not find level with name ${levelName}`);
    
        if (this.leftLowestNonKeyMuscleWithMotorFunction)
            this.leftLowestNonKeyMuscleWithMotorFunction.hasOtherLeftMotorFunction = false;
    
        this.leftLowestNonKeyMuscleWithMotorFunction = level;
        this.leftLowestNonKeyMuscleWithMotorFunction.hasOtherLeftMotorFunction = true;
    }

    /**
    * Updates the values of the neurology level with the specified name.
    * You can pass strings containing values between 0-2 for touch and prick and 0-5 for motor.
    * You can also use the exclamation mark and asterisk at the end of the string to indicate impairment not due to a spinal cord injury.
    * Finally, you can also pass NT to indicate that a value was not testable.
    *
    * @param {string} levelName Name of the respective neurology level.
    * @param {string} rightTouch Right touch
    * @param {string} leftTouch Left touch
    * @param {string} rightPrick Right Prick
    * @param {string} leftPrick Left prick
    * @param {string} rightMotor Right motor
    * @param {string} leftMotor Left motor
    * @return {IsncsciExam} This exam to allow chaining more requests.
    */
    public updateLevelByName(levelName:string, rightTouch:string, leftTouch:string,
            rightPrick:string, leftPrick:string, rightMotor:string, leftMotor:string):IsncsciExam {
        var level = this.getLevelWithName(levelName);
        
        if (!level)
            throw `${IsncsciExam.is} : updateLevelByName : Unable to find a neuro level with name ${levelName}`;
                            
        if (level.isKeyMuscle) {
            IsncsciExam.updateLevel(level, rightTouch, leftTouch, rightPrick, leftPrick, rightMotor, leftMotor);
        } else {
            IsncsciExam.updateLevel(level, rightTouch, leftTouch, rightPrick, leftPrick, '0', '0');
        }
        
        return this;
    }
}