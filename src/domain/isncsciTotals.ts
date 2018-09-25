/*
@license
Copyright (c) 2015 Rick Hansen Institute. All rights reserved.
This code may only be used under the modified Apache license found at https://raw.githubusercontent.com/rick-hansen-institute/rhi-core-isncsci-algorithm/master/LICENSE
Author: RhiTech <tech@rickhanseninstitute.org>
*/
'use strict';

import { NeuroLevel } from "./neuroLevel.js";

/**
* The 'rhi-core-isncsci-totals' contains the raw results from running an ISNCSCI Examination through the ISNCSCI Algorithm.
* @demo demo/index.html
*/
export class IsncsciTotals {
    /***********************************************/
    /* ***** Private, static properties ********** */
    /***********************************************/
    private static get is() { return 'rhi-core-isncsci.Totals'; }
    static notDeterminable:string = 'UTD';

    /***********************************************/
    /* ***** Public properties ********** */
    /***********************************************/
    private asiaImpairmentScaleValues:string[] = [];
    public hasLeftCollins:boolean = false;
    public hasRightCollins:boolean = false;
    public leftLowerMotorContainsNt:boolean = false;
    public leftLowerMotorTotal:number = 0;
    public leftLowerMotorTotalHasImpairmentNotDueToSci:boolean = false;
    public leftMotorHasOnlySoftValues:boolean = true;
    private leftMotorValues:NeuroLevel[] = [];
    public leftMotorZppHasOnlySoftValues:boolean = true;
    private leftMotorZppValues:NeuroLevel[] = [];
    public leftPrickContainsNt:boolean = false;
    public leftPrickTotal:number = 0;
    public leftPrickTotalHasImpairmentNotDueToSci:boolean = false;
    public leftSensoryHasOnlySoftValues:boolean = true;
    private leftSensoryValues:NeuroLevel[] = [];
    public leftSensoryZppHasOnlySoftValues:boolean = true;
    private leftSensoryZppValues:NeuroLevel[] = [];
    public leftTouchContainsNt:boolean = false;
    public leftTouchTotal:number = 0;
    public leftTouchTotalHasImpairmentNotDueToSci:boolean = false;
    public leftUpperMotorContainsNt:boolean = false;
    public leftUpperMotorTotal:number = 0;
    public leftUpperMotorTotalHasImpairmentNotDueToSci:boolean = false;
    public mostCaudalLeftLevelWithMotorFunction:NeuroLevel = null;
    public mostCaudalLeftMotor:NeuroLevel = null;
    public mostCaudalNeurologicalLevelOfInjury:NeuroLevel = null;
    public mostCaudalRightLevelWithMotorFunction:NeuroLevel = null;
    public mostCaudalRightMotor:NeuroLevel = null;
    public mostRostralLeftLevelWithMotorFunction:NeuroLevel = null;
    public mostRostralLeftMotor:NeuroLevel = null;
    public mostRostralNeurologicalLevelOfInjury:NeuroLevel = null;
    public mostRostralRightLevelWithMotorFunction:NeuroLevel = null;
    public mostRostralRightMotor:NeuroLevel = null;
    public neurologicalLevelOfInjuryHasOnlySoftValues:boolean = true;
    private neurologicalLevelsOfInjury:NeuroLevel[] = [];
    public rightLowerMotorContainsNt:boolean = false;
    public rightLowerMotorTotal:number = 0;
    public rightLowerMotorTotalHasImpairmentNotDueToSci:boolean = false;
    public rightMotorHasOnlySoftValues:boolean = true;
    private rightMotorValues:NeuroLevel[] = [];
    public rightMotorZppHasOnlySoftValues:boolean = true;
    private rightMotorZppValues:NeuroLevel[] = [];
    public rightPrickContainsNt:boolean = false;
    public rightPrickTotal:number = 0;
    public rightPrickTotalHasImpairmentNotDueToSci:boolean = false;
    public rightSensoryHasOnlySoftValues:boolean = true;
    private rightSensoryValues:NeuroLevel[] = [];
    public rightSensoryZppHasOnlySoftValues:boolean = true;
    private rightSensoryZppValues:NeuroLevel[] = [];
    public rightTouchContainsNt:boolean = false;
    public rightTouchTotal:number = 0;
    public rightTouchTotalHasImpairmentNotDueToSci:boolean = false;
    public rightUpperMotorContainsNt:boolean = false;
    public rightUpperMotorTotal:number = 0;
    public rightUpperMotorTotalHasImpairmentNotDueToSci:boolean = false;

    /***********************************************/
    /* ***** Private, static methods ************* */
    /***********************************************/
    /**
    * Returns true if the specified levelName belongs to a level already contained in the values array provided.
    *
    * @param {NeuroLevel[]} values (required) The value array where we are trying to find a match.
    * @param {string} levelName (required) The name of the ISNCSCI Level name we are searching for.
    * @returns {boolean} True if a match for levelName is found in the value array, false otherwise.
    */
    private static containsLevelWithName(values:NeuroLevel[], levelName:string) {
        const key:string = levelName.toUpperCase();

        return values.find((level:NeuroLevel) => level.name === key) !== undefined;
    }

    /**
    * Produces a string containing the values in the provided array, ordered by ordinal, and separated by commas.
    *
    * @param {NeuroLevel[]} values (required) The value array to be converted to a string.
    * @returns {string} Comma separated list.
    */
    private static getValuesString(values:NeuroLevel[]):string {
        if (!values)
            throw new Error(`${IsncsciTotals.is} : getValuesString : Missing required parameter values:NeuroLevel[]`);
                            
        let result:string = '';
        const sortedList:NeuroLevel[] = values.sort((a:NeuroLevel,b:NeuroLevel) => { return a.ordinal - b.ordinal; });
        const sortedListLength:number = sortedList.length;
        
        for (var i=0; i<sortedListLength; i++)
            result += i > 0 ? ',' + sortedList[i].name : sortedList[i].name;
        
        return result;
    }

    /**
    * Formats a total value depending on the specified flags.
    *
    * @param {number} total Raw total value.
    * @param {boolean} hasImpairmentNotDueToSci Flag indicating if any value used in the calculation of this total presents impairment not due to a spinal cord injury.
    * @param {boolean} containsNt Flag indicating if any value used in the calculation of this total is set to Not Testable.
    *
    * @returns {string} The value, followed by an exclamation mark if the hasImpairmentNotDueToSci is set to true or UTD (Unable to determine) if the containsNt flag is set to true.
    */
    private static getSummaryStringFor(total:number, hasImpairmentNotDueToSci:boolean, containsNt:boolean):string {
        if (containsNt)
            return IsncsciTotals.notDeterminable;
        
        return hasImpairmentNotDueToSci ? (total.toString() + '!') : total.toString();
    }

    /**
     * Checks if there the totals currently have no possible right sensory values.
    *
    * @returns {boolean} True if there are no recorded possible right sensory values.
    */
    public isRightSensoryEmpty():boolean {
        return this.rightSensoryValues.length === 0;
    }
    
    /**
     * Adds a neurological level to the list of possible right sensory values.
    *
    * @param {NeuroLevel} level (required) The neurological level to be added to the right sensory values.
    */
    public addRightSensoryValue(level:NeuroLevel):void {
        if (!level)
            throw new Error(`${IsncsciTotals.is} : addRightSensoryValue : Missing expected argument level:NeuroLevel`);
        
        if (IsncsciTotals.containsLevelWithName(this.rightSensoryValues, level.name))
            return;
        
        this.rightSensoryValues.push(level);
    }

    /**
     * Produces a list of possible right sensory values.
    *
    * @returns {NeuroLevel[]} List possible right sensory values.
    */
    public getRightSensoryValues():NeuroLevel[] {
        return this.rightSensoryValues.slice(0);
    }
    
    /**
     * Produces an ordered list of all possible right sensory values, separated by commas.
    *
    * @returns {string} Comma separated list of possible right sensory values.
    */
    public getRightSensoryLongValueString():string {
        return IsncsciTotals.getValuesString(this.rightSensoryValues);
    }

    /**
     * Returns true if the specified levelName belongs to right sensory values list.
    *
    * @param {string} levelName (required) The name of the ISNCSCI Level name we are searching for.
    * @returns {boolean} True if a match for levelName is found in the right sensory value list, false otherwise.
    */
    public rightSensoryContains(levelName:string):boolean {
        if (!levelName)
            throw new Error(`${IsncsciTotals.is} : rightSensoryContains : Invalid arguments passed. Expected levelName:String`);
                            
        return IsncsciTotals.containsLevelWithName(this.rightSensoryValues, levelName);
    }
    
    /**
     * Checks if there the totals currently have no possible leftSensory values.
    *
    * @returns {boolean} True if there are no recorded possible left sensory values.
    */
    public isLeftSensoryEmpty():boolean {
        return this.leftSensoryValues.length === 0;
    }

    /**
     * Adds a neurological level to the list of possible left sensory values.
    *
    * @param {NeuroLevel} level (required) The neurological level to be added to the left sensory values.
    */
    public addLeftSensoryValue(level:NeuroLevel):void {
        if (!level)
            throw new Error(`${IsncsciTotals.is} : addLeftSensoryValue : Invalid arguments passed. Expected level:NeuroLevel`);
        
        if (IsncsciTotals.containsLevelWithName(this.leftSensoryValues, level.name))
            return;
        
        this.leftSensoryValues.push(level);
    }
    
    /**
     * Produces a list of possible left sensory values.
    *
    * @returns {NeuroLevel[]} List possible left sensory values.
    */
    public getLeftSensoryValues():NeuroLevel[] {
        return this.leftSensoryValues.slice(0);
    }
    
    /**
     * Produces an ordered list of all possible left sensory values, separated by commas.
    *
    * @returns {string} Comma separated list of possible left sensory values.
    */
    public getLeftSensoryLongValueString():string {
        return IsncsciTotals.getValuesString(this.leftSensoryValues);
    }

    /**
     * Returns true if the specified levelName belongs to left sensory values list.
    *
    * @param {string} levelName (required) The name of the ISNCSCI Level name we are searching for.
    * @returns {boolean} True if a match for levelName is found in the left sensory value list, false otherwise.
    */
    public leftSensoryContains(levelName:string):boolean {
        if (!levelName)
            throw new Error(`${IsncsciTotals.is} : leftSensoryContains : Invalid arguments passed. Expected levelName:String`);
                            
        return IsncsciTotals.containsLevelWithName(this.leftSensoryValues, levelName);
    }
    
    /**
     * Checks if there the totals currently have no possible right motor values.
    *
    * @returns {boolean} True if there are no recorded possible right motor values.
    */
    public isRightMotorEmpty():boolean {
        return this.rightMotorValues.length === 0;
    }

    /**
     * Adds a neurological level to the list of possible right motor values.
    *
    * @param {NeuroLevel} level (required) The neurological level to be added to the right motor values.
    */
    public addRightMotorValue(level:NeuroLevel):void {
        if (!level)
            throw new Error(`${IsncsciTotals.is} : addRightMotorValue : Invalid arguments passed. Expected level:NeuroLevel`);
        
        if (IsncsciTotals.containsLevelWithName(this.rightMotorValues, level.name))
            return;
        
        if (this.mostRostralRightMotor == null || level.ordinal < this.mostRostralRightMotor.ordinal)
            this.mostRostralRightMotor = level;
        
        if (this.mostCaudalRightMotor == null || level.ordinal > this.mostCaudalRightMotor.ordinal)
            this.mostCaudalRightMotor = level;
        
        this.rightMotorValues.push(level);
    }
    
    /**
     * Produces a list of possible right motor values.
    *
    * @returns {NeuroLevel[]} List possible right motor values.
    */
    public getRightMotorValues():NeuroLevel[] {
        return this.rightMotorValues.slice(0);
    }
    
    /**
     * Produces an ordered list of all possible right motor values, separated by commas.
    *
    * @returns {string} Comma separated list of possible right motor values.
    */
    public getRightMotorLongValueString():string {
        return IsncsciTotals.getValuesString(this.rightMotorValues);
    }
    
    /**
     * Returns true if the specified levelName belongs to right motor values list.
    *
    * @param {string} levelName (required) The name of the ISNCSCI Level name we are searching for.
    * @returns {boolean} True if a match for levelName is found in the right motor value list, false otherwise.
    */
    public rightMotorContains(levelName:string):boolean {
        if (!levelName)
            throw new Error(`${IsncsciTotals.is} : rightMotorContains : Invalid arguments passed. Expected levelName:String`);
                            
        return IsncsciTotals.containsLevelWithName(this.rightMotorValues, levelName);
    }
    
    /**
     * Checks if there the totals currently have no possible left motor values.
    *
    * @returns {boolean} True if there are no recorded possible left motor values.
    */
    public isLeftMotorEmpty():boolean {
        return this.leftMotorValues.length === 0;
    }
    
    /**
     * Adds a neurological level to the list of possible left motor values.
    *
    * @param {NeuroLevel} level (required) The neurological level to be added to the left motor values.
    */
    public addLeftMotorValue(level:NeuroLevel):void {
        if (!level)
            throw new Error(`${IsncsciTotals.is} : addLeftMotorValue : Invalid arguments passed. Expected level:NeuroLevel`);
        
        if (IsncsciTotals.containsLevelWithName(this.leftMotorValues, level.name))
            return;
        
        if (this.mostRostralLeftMotor == null || level.ordinal < this.mostRostralLeftMotor.ordinal)
            this.mostRostralLeftMotor = level;
        
        if (this.mostCaudalLeftMotor == null || level.ordinal > this.mostCaudalLeftMotor.ordinal)
            this.mostCaudalLeftMotor = level;
        
        this.leftMotorValues.push(level);
    }

    /**
     * Produces a list of possible left motor values.
    *
    * @returns {NeuroLevel[]} List possible left motor values.
    */
    public getLeftMotorValues():NeuroLevel[] {
        return this.leftMotorValues.slice(0);
    }
    
    /**
     * Produces an ordered list of all possible left motor values, separated by commas.
    *
    * @returns {string} Comma separated list of possible left motor values.
    */
    public getLeftMotorLongValueString():string {
        return IsncsciTotals.getValuesString(this.leftMotorValues);
    }
    
    /**
     * Returns true if the specified levelName belongs to left motor values list.
    *
    * @param {string} levelName (required) The name of the ISNCSCI Level name we are searching for.
    * @returns {boolean} True if a match for levelName is found in the left motor value list, false otherwise.
    */
    public leftMotorContains(levelName:string):boolean {
        if (!levelName)
            throw new Error(`${IsncsciTotals.is} : leftMotorContains : Invalid arguments passed. Expected levelName:String`);
                            
        return IsncsciTotals.containsLevelWithName(this.leftMotorValues, levelName);
    }

    /**
     * Adds a neurological level to the list of possible neurological level of injury values.
    *
    * @param {NeuroLevel} level (required) The neurological level to be added to the neurological level of injury values.
    */
    public addNeurologicalLevelOfInjury(level:NeuroLevel):void {
        if (!level)
            throw new Error(`${IsncsciTotals.is} : addNeurologicalLevelOfInjury : Invalid arguments passed. Expected level:NeuroLevel`);
        
        if (IsncsciTotals.containsLevelWithName(this.neurologicalLevelsOfInjury, level.name))
            return;
        
        if (this.mostRostralNeurologicalLevelOfInjury == null || level.ordinal < this.mostRostralNeurologicalLevelOfInjury.ordinal)
            this.mostRostralNeurologicalLevelOfInjury = level;
        
        if (this.mostCaudalNeurologicalLevelOfInjury == null || level.ordinal > this.mostCaudalNeurologicalLevelOfInjury.ordinal)
            this.mostCaudalNeurologicalLevelOfInjury = level;
        
        this.neurologicalLevelsOfInjury.push(level);
    }
    
    /**
     * Produces a list of possible neurological levels of injury.
    *
    * @returns {NeuroLevel[]} List possible neurological levels of injury.
    */
    public getNeurologicalLevelsOfInjury():NeuroLevel[] {
        return this.neurologicalLevelsOfInjury.slice(0);
    }
    
    /**
     * Produces an alphabetically ordered list of all possible Neurological Levels of Injury, separated by commas.
    *
    * @returns {string} Comma separated list of possible Neurological Levels of Injury.
    */
    public getNeurologicalLevelsOfInjuryLongValueString():string {
        return IsncsciTotals.getValuesString(this.neurologicalLevelsOfInjury);
    }
    
    /**
     * Checks if there the totals currently have no possible right sensory ZPP values.
    *
    * @returns {boolean} True if there are no recorded possible right sensory ZPP values.
    */
    public isRightSensoryZppEmpty():boolean {
        return this.rightSensoryZppValues.length === 0;
    }
    
    /**
     * Adds a neurological level to the list of possible right sensory ZPP values.
    *
    * @param {NeuroLevel} level (required) The neuroligical level to be added to the possible right sensory ZPP values.
    */
    public addRightSensoryZppValue(level:NeuroLevel):void {
        if (!level)
            throw new Error(`${IsncsciTotals.is} : addRightSensoryZppValue : Invalid arguments passed. Expected level:NeuroLevel`);
        
        if (IsncsciTotals.containsLevelWithName(this.rightSensoryZppValues, level.name)
            || 'S4_5' === level.name)
            return;

        this.rightSensoryZppValues.push(level);
    }
    
    /**
     * Produces a list of possible right sensory ZPP values.
    *
    * @returns {NeuroLevel[]} List possible right sensory ZPP values
    */
    public getRightSensoryZppValues():NeuroLevel[] {
        return this.rightSensoryZppValues.slice(0);
    }
    
    /**
     * Produces an ordered list of all possible right sensory Zone of Partial Preservation values, separated by commas.
    *
    * @returns {string} Comma separated list of possible right sensory Zone of Partial Preservation values.
    */
    public getRightSensoryZppLongValueString():string {
        return IsncsciTotals.getValuesString(this.rightSensoryZppValues);
    }
    
    /**
     * Checks if there the totals currently have no possible left sensory ZPP values.
    *
    * @returns {boolean} True if there are no recorded possible left sensory ZPP values.
    */
    public isLeftSensoryZppEmpty():boolean {
        return this.leftSensoryZppValues.length === 0;
    }

    /**
     * Adds a neurological level to the list of possible left sensory ZPP values.
    *
    * @param {NeuroLevel} level (required) The neuroligical level to be added to the possible left sensory ZPP values.
    */
    public addLeftSensoryZppValue(level:NeuroLevel):void {
        if (!level)
            throw new Error(`${IsncsciTotals.is} : addLeftSensoryZppValue : Invalid arguments passed. Expected level:NeuroLevel`);
        
        if (IsncsciTotals.containsLevelWithName(this.leftSensoryZppValues, level.name)
            || 'S4_5' === level.name)
            return;

        this.leftSensoryZppValues.push(level);
    }

    /**
     * Produces a list of possible left sensory ZPP values.
    *
    * @returns {NeuroLevel[]} List possible left sensory ZPP values
    */
    public getLeftSensoryZppValues():NeuroLevel[] {
        return this.leftSensoryZppValues.slice(0);
    }
    
    /**
     * Produces an ordered list of all possible left sensory Zone of Partial Preservation values, separated by commas.
    *
    * @returns {string} Comma separated list of possible left sensory Zone of Partial Preservation values.
    */
    public getLeftSensoryZppLongValueString():string {
        return IsncsciTotals.getValuesString(this.leftSensoryZppValues);
    }
    
    /**
     * Checks if there the totals currently have no possible right motor ZPP values.
    *
    * @returns {boolean} True if there are no recorded possible right motor ZPP values.
    */
    public isRightMotorZppEmpty():boolean {
        return this.rightMotorZppValues.length === 0;
    }
    
    /**
     * Adds a neurological level to the list of possible right motor ZPP values.
    *
    * @param {NeuroLevel} level (required) The neuroligical level to be added to the possible right motor ZPP values.
    */
    public addRightMotorZppValue(level:NeuroLevel):void {
        if (!level)
            throw new Error(`${IsncsciTotals.is} : addRightMotorZppValue : Invalid arguments passed. Expected level:NeuroLevel`);
        
        if (IsncsciTotals.containsLevelWithName(this.rightMotorZppValues, level.name)
            || 'S4_5' === level.name)
            return;

        this.rightMotorZppValues.push(level);
    }

    /**
     * Produces a list of possible right motor ZPP values.
    *
    * @returns {NeuroLevel[]} List possible right motor ZPP values
    */
    public getRightMotorZppValues():NeuroLevel[] {
        return this.rightMotorZppValues.slice(0);
    }
    
    /**
     * Produces an ordered list of all possible right motor Zone of Partial Preservation values, separated by commas.
    *
    * @returns {string} Comma separated list of possible right motor Zone of Partial Preservation values.
    */
    public getRightMotorZppLongValueString():string {
        return IsncsciTotals.getValuesString(this.rightMotorZppValues);
    }
    
    /**
     * Checks if there the totals currently have no possible left motor ZPP values.
    *
    * @returns {boolean} True if there are no recorded possible left motor ZPP values.
    */
    public isLeftMotorZppEmpty():boolean {
        return this.leftMotorZppValues.length === 0;
    }

    /**
     * Adds a neurological level to the list of possible left motor ZPP values.
    *
    * @param {NeuroLevel} level (required) The neuroligical level to be added to the possible left motor ZPP values.
    */
    public addLeftMotorZppValue(level:NeuroLevel):void {
        if (!level)
            throw new Error(`${IsncsciTotals.is} : addLeftMotorZppValue : Invalid arguments passed. Expected level:NeuroLevel`);
        
        if (IsncsciTotals.containsLevelWithName(this.leftMotorZppValues, level.name)
            || 'S4_5' === level.name)
            return;
            
        this.leftMotorZppValues.push(level);
    }
    
    /**
     * Produces a list of possible left motor ZPP values.
    *
    * @returns {NeuroLevel[]} List possible left motor ZPP values
    */
    public getLeftMotorZppValues():NeuroLevel[] {
        return this.leftMotorZppValues.slice(0);
    }
    
    /**
     * Produces an ordered list of all possible left motor Zone of Partial Preservation values, separated by commas.
    *
    * @returns {string} Comma separated list of possible left motor Zone of Partial Preservation values.
    */
    public getLeftMotorZppLongValueString():string {
        return IsncsciTotals.getValuesString(this.leftMotorZppValues);
    }
    
    /**
     * Adds an AIS value to the list of possible impairment values.
    *
    * @param {string} value (required) The AIS value to be recorded.
    */
    public addAsiaImpairmentScaleValue(value:string):void {
        if (!value)
            throw new Error(`${IsncsciTotals.is} : addAsiaImpairmentScaleValue : Invalid arguments passed. Expected value:String`);
        
        var valueToUpper = value.toUpperCase();
        
        // Do not enter the value twice if it is already contained in the list                
        if (this.asiaImpairmentScaleValues.indexOf(valueToUpper) != -1)
            return;
        
        this.asiaImpairmentScaleValues.push(valueToUpper);
    }
    
    /**
     * Produces a string of alphabetically sorted AIS values concatenated by commas.
    *
    * @returns {string} List of AIS values, sorted alphabetically, and concatenated by commas. E.g. 'A,C,E'
    */
    public getAsiaImpairmentScaleValues():string {
        return this.asiaImpairmentScaleValues.sort().join();
    }
    
    /**
     * Total from adding all left lower motor values.
    *
    * @returns {string} The total produced by adding all left lower motor values.
    * An ! is added if any of the values involved has some type of impairment not due to an SCI.
    * UTD is returned if one of the values cannot be used to produce a total. The presence of NT is a typical case.
    */
    public getLeftLowerMotorTotal():string {
        return IsncsciTotals.getSummaryStringFor(this.leftLowerMotorTotal, this.leftLowerMotorTotalHasImpairmentNotDueToSci, this.leftLowerMotorContainsNt);
    }
    
    /**
     * Total from adding all left motor values.
    *
    * @returns {string} The total produced by adding all left motor values.
    * An ! is added if any of the values involved has some type of impairment not due to an SCI.
    * UTD is returned if one of the values cannot be used to produce a total. The presence of NT is a typical case.
    */
    public getLeftMotorTotal():string {
        return IsncsciTotals.getSummaryStringFor(this.leftUpperMotorTotal + this.leftLowerMotorTotal,
                    this.leftUpperMotorTotalHasImpairmentNotDueToSci || this.leftLowerMotorTotalHasImpairmentNotDueToSci,
                    this.leftUpperMotorContainsNt || this.leftLowerMotorContainsNt);
    }
    
    /**
     * Total from adding all left prick values.
    *
    * @returns {string} The total produced by adding all left prick values.
    * An ! is added if any of the values involved has some type of impairment not due to an SCI.
    * UTD is returned if one of the values cannot be used to produce a total. The presence of NT is a typical case.
    */
    public getLeftPrickTotal():string {
        return IsncsciTotals.getSummaryStringFor(this.leftPrickTotal, this.leftPrickTotalHasImpairmentNotDueToSci, this.leftPrickContainsNt);
    }
    
    /**
     * Total from adding all left touch values.
    *
    * @returns {string} The total produced by adding all left touch values.
    * An ! is added if any of the values involved has some type of impairment not due to an SCI.
    * UTD is returned if one of the values cannot be used to produce a total. The presence of NT is a typical case.
    */
    public getLeftTouchTotal():string {
        return IsncsciTotals.getSummaryStringFor(this.leftTouchTotal, this.leftTouchTotalHasImpairmentNotDueToSci, this.leftTouchContainsNt);
    }
    
    /**
     * Total from adding all left upper motor values.
    *
    * @returns {string} The total produced by adding all left upper motor values.
    * An ! is added if any of the values involved has some type of impairment not due to an SCI.
    * UTD is returned if one of the values cannot be used to produce a total. The presence of NT is a typical case.
    */
    public getLeftUpperMotorTotal():string {
        return IsncsciTotals.getSummaryStringFor(this.leftUpperMotorTotal, this.leftUpperMotorTotalHasImpairmentNotDueToSci, this.leftUpperMotorContainsNt);
    }
    
    /**
     * Total from adding all lower motor values.
    *
    * @returns {string} The total produced by adding all lower motor values.
    * An ! is added if any of the values involved has some type of impairment not due to an SCI.
    * UTD is returned if one of the values cannot be used to produce a total. The presence of NT is a typical case.
    */
    public getLowerMotorTotal():string {
        return IsncsciTotals.getSummaryStringFor(this.rightLowerMotorTotal + this.leftLowerMotorTotal,
                    this.rightLowerMotorTotalHasImpairmentNotDueToSci || this.leftLowerMotorTotalHasImpairmentNotDueToSci,
                    this.rightLowerMotorContainsNt || this.leftLowerMotorContainsNt);
    }
    
    /**
     * Total from adding all prick values.
    *
    * @returns {string} The total produced by adding all prick values.
    * An ! is added if any of the values involved has some type of impairment not due to an SCI.
    * UTD is returned if one of the values cannot be used to produce a total. The presence of NT is a typical case.
    */
    public getPrickTotal():string {
        return IsncsciTotals.getSummaryStringFor(this.rightPrickTotal + this.leftPrickTotal,
                    this.rightPrickTotalHasImpairmentNotDueToSci || this.leftPrickTotalHasImpairmentNotDueToSci,
                    this.rightPrickContainsNt || this.leftPrickContainsNt);
    }
    
    /**
     * Total from adding all right lower motor values.
    *
    * @returns {string} The total produced by adding all right lower motor values.
    * An ! is added if any of the values involved has some type of impairment not due to an SCI.
    * UTD is returned if one of the values cannot be used to produce a total. The presence of NT is a typical case.
    */
    public getRightLowerMotorTotal():string {
        return IsncsciTotals.getSummaryStringFor(this.rightLowerMotorTotal, this.rightLowerMotorTotalHasImpairmentNotDueToSci, this.rightLowerMotorContainsNt);
    }
    
    /**
     * Total from adding all right motor values.
    *
    * @returns {string} The total produced by adding all right motor values.
    * An ! is added if any of the values involved has some type of impairment not due to an SCI.
    * UTD is returned if one of the values cannot be used to produce a total. The presence of NT is a typical case.
    */
    public getRightMotorTotal():string {
        return IsncsciTotals.getSummaryStringFor(this.rightUpperMotorTotal + this.rightLowerMotorTotal,
                    this.rightUpperMotorTotalHasImpairmentNotDueToSci || this.rightLowerMotorTotalHasImpairmentNotDueToSci,
                    this.rightUpperMotorContainsNt || this.rightLowerMotorContainsNt);
    }
    
    /**
     * Total from adding all right prick values.
    *
    * @returns {string} The total produced by adding all right prick values.
    * An ! is added if any of the values involved has some type of impairment not due to an SCI.
    * UTD is returned if one of the values cannot be used to produce a total. The presence of NT is a typical case.
    */
    public getRightPrickTotal():string {
        return IsncsciTotals.getSummaryStringFor(this.rightPrickTotal, this.rightPrickTotalHasImpairmentNotDueToSci, this.rightPrickContainsNt);
    }
    
    /**
     * Total from adding all right touch values.
    *
    * @returns {string} The total produced by adding all right touch values.
    * An ! is added if any of the values involved has some type of impairment not due to an SCI.
    * UTD is returned if one of the values cannot be used to produce a total. The presence of NT is a typical case.
    */
    public getRightTouchTotal():string {
        return IsncsciTotals.getSummaryStringFor(this.rightTouchTotal, this.rightTouchTotalHasImpairmentNotDueToSci, this.rightTouchContainsNt);
    }
    
    /**
     * Total from adding all right upper motor values.
    *
    * @returns {string} The total produced by adding all right upper motor values.
    * An ! is added if any of the values involved has some type of impairment not due to an SCI.
    * UTD is returned if one of the values cannot be used to produce a total. The presence of NT is a typical case.
    */
    public getRightUpperMotorTotal():string {
        return IsncsciTotals.getSummaryStringFor(this.rightUpperMotorTotal, this.rightUpperMotorTotalHasImpairmentNotDueToSci, this.rightUpperMotorContainsNt);
    }
    
    /**
     * Total from adding all touch values.
    *
    * @returns {string} The total produced by adding all touch values.
    * An ! is added if any of the values involved has some type of impairment not due to an SCI.
    * UTD is returned if one of the values cannot be used to produce a total. The presence of NT is a typical case.
    */
    public getTouchTotal():string {
        return IsncsciTotals.getSummaryStringFor(this.rightTouchTotal + this.leftTouchTotal,
                    this.rightTouchTotalHasImpairmentNotDueToSci || this.leftTouchTotalHasImpairmentNotDueToSci,
                    this.rightTouchContainsNt || this.leftTouchContainsNt);
    }
    
    /**
     * Total from adding all upper motor values.
    *
    * @returns {string} The total produced by adding all upper motor values.
    * An ! is added if any of the values involved has some type of impairment not due to an SCI.
    * UTD is returned if one of the values cannot be used to produce a total. The presence of NT is a typical case.
    */
    public getUpperMotorTotal():string {
        return IsncsciTotals.getSummaryStringFor(this.rightUpperMotorTotal + this.leftUpperMotorTotal,
                    this.rightUpperMotorTotalHasImpairmentNotDueToSci || this.leftUpperMotorTotalHasImpairmentNotDueToSci,
                    this.rightUpperMotorContainsNt || this.leftUpperMotorContainsNt);
    }
}