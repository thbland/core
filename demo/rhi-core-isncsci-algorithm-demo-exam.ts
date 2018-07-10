/*
@license
Copyright (c) 2015 Rick Hansen Institute. All rights reserved.
This code may only be used under the modified Apache license found at https://raw.githubusercontent.com/rick-hansen-institute/rhi-core-isncsci-algorithm/master/LICENSE
*/
'use strict';

import { html, LitElement } from '@polymer/lit-element';
import { TemplateResult } from 'lit-html';
import { IsncsciExam, IsncsciTotals } from '../domain';
import { iIsncsciExamModel, motorLevelNameRegExp } from '../usecases';

export class RhiCoreIsncsciAlgorithmDemoExam extends LitElement {
    public _render(props: any): TemplateResult {
        return html`
            <style>
                /* local styles go here */
                :host {
                    display: block;
                    @apply(--paper-font-body1);
                }
                
                .font-title {
                    @apply(--paper-font-title);
                }
                
                table.raw-values {
                    margin-right: 24px;
                    max-width: 440px;
                }
                
                table.raw-values th {
                    color: #666;
                    font-weight: normal;
                    padding: 0 8px;
                }
                
                table.raw-values td {
                    text-align: center;
                }
            
                .color-dark-medium {
                    color: #666;
                }
                
                .display-flex {
                    display: flex;
                }
                
                .comments {
                    margin: 24px 0;
                    max-width: 540px;
                }
                
                .comments .label {
                    margin-right: 16px;
                }
                
                .totals .value {
                    margin-top: 16px;
                }
                
                .totals .label {
                    color: #666;
                    margin-right: 8px;
                    width: 110px;
                }
            </style>
            <!-- shadow DOM for your element -->
            <div class="comments display-flex">
                <div class="label">Comments:</div>
                <div class="color-dark-medium">${props.comments}</div>
            </div>
            <div class="display-flex">
                <div>
                    <table class="raw-values">
                    <thead>
                        <tr>
                        <th colspan="4">Right</th>
                        <th colspan="4">Left</th>
                        </tr>
                        <tr>
                        <th>&nbsp;</th>
                        <th>Motor</th>
                        <th>Light Touch</th>
                        <th>Pin Prick</th>
                        <th>Light Touch</th>
                        <th>Pin Prick</th>
                        <th>Motor</th>
                        <th>&nbsp;</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th>C2</th>
                            <td>&nbsp;</td>
                            <td>${props.c2RightTouch}</td>
                            <td>${props.c2RightPrick}</td>
                            <td>${props.c2LeftTouch}</td>
                            <td>${props.c2LeftPrick}</td>
                            <td>&nbsp;</td>
                            <th>C2</th>
                        </tr>
                        <tr>
                            <th>C3</th>
                            <td>&nbsp;</td>
                            <td>${props.c3RightTouch}</td>
                            <td>${props.c3RightPrick}</td>
                            <td>${props.c3LeftTouch}</td>
                            <td>${props.c3LeftPrick}</td>
                            <td>&nbsp;</td>
                            <th>C3</th>
                        </tr>
                        <tr>
                            <th>C4</th>
                            <td>&nbsp;</td>
                            <td>${props.c4RightTouch}</td>
                            <td>${props.c4RightPrick}</td>
                            <td>${props.c4LeftTouch}</td>
                            <td>${props.c4LeftPrick}</td>
                            <td>&nbsp;</td>
                            <th>C4</th>
                        </tr>
                        <tr>
                            <th>C5</th>
                            <td>${props.c5RightMotor}</td>
                            <td>${props.c5RightTouch}</td>
                            <td>${props.c5RightPrick}</td>
                            <td>${props.c5LeftTouch}</td>
                            <td>${props.c5LeftPrick}</td>
                            <td>${props.c5LeftMotor}</td>
                            <th>C5</th>
                        </tr>
                        <tr>
                            <th>C6</th>
                            <td>${props.c6RightMotor}</td>
                            <td>${props.c6RightTouch}</td>
                            <td>${props.c6RightPrick}</td>
                            <td>${props.c6LeftTouch}</td>
                            <td>${props.c6LeftPrick}</td>
                            <td>${props.c6LeftMotor}</td>
                            <th>C6</th>
                        </tr>
                        <tr>
                            <th>C7</th>
                            <td>${props.c7RightMotor}</td>
                            <td>${props.c7RightTouch}</td>
                            <td>${props.c7RightPrick}</td>
                            <td>${props.c7LeftTouch}</td>
                            <td>${props.c7LeftPrick}</td>
                            <td>${props.c7LeftMotor}</td>
                            <th>C7</th>
                        </tr>
                        <tr>
                            <th>C8</th>
                            <td>${props.c8RightMotor}</td>
                            <td>${props.c8RightTouch}</td>
                            <td>${props.c8RightPrick}</td>
                            <td>${props.c8LeftTouch}</td>
                            <td>${props.c8LeftPrick}</td>
                            <td>${props.c8LeftMotor}</td>
                            <th>C8</th>
                        </tr>
                        <tr>
                            <th>T1</th>
                            <td>${props.t1RightMotor}</td>
                            <td>${props.t1RightTouch}</td>
                            <td>${props.t1RightPrick}</td>
                            <td>${props.t1LeftTouch}</td>
                            <td>${props.t1LeftPrick}</td>
                            <td>${props.t1LeftMotor}</td>
                            <th>T1</th>
                        </tr>
                        <tr>
                            <th>T2</th>
                            <td>&nbsp;</td>
                            <td>${props.t2RightTouch}</td>
                            <td>${props.t2RightPrick}</td>
                            <td>${props.t2LeftTouch}</td>
                            <td>${props.t2LeftPrick}</td>
                            <td>&nbsp;</td>
                            <th>T2</th>
                        </tr>
                        <tr>
                            <th>T3</th>
                            <td>&nbsp;</td>
                            <td>${props.t3RightTouch}</td>
                            <td>${props.t3RightPrick}</td>
                            <td>${props.t3LeftTouch}</td>
                            <td>${props.t3LeftPrick}</td>
                            <td>&nbsp;</td>
                            <th>T3</th>
                        </tr>
                        <tr>
                            <th>T4</th>
                            <td>&nbsp;</td>
                            <td>${props.t4RightTouch}</td>
                            <td>${props.t4RightPrick}</td>
                            <td>${props.t4LeftTouch}</td>
                            <td>${props.t4LeftPrick}</td>
                            <td>&nbsp;</td>
                            <th>T4</th>
                        </tr>
                        <tr>
                            <th>T5</th>
                            <td>&nbsp;</td>
                            <td>${props.t5RightTouch}</td>
                            <td>${props.t5RightPrick}</td>
                            <td>${props.t5LeftTouch}</td>
                            <td>${props.t5LeftPrick}</td>
                            <td>&nbsp;</td>
                            <th>T5</th>
                        </tr>
                        <tr>
                            <th>T6</th>
                            <td>&nbsp;</td>
                            <td>${props.t6RightTouch}</td>
                            <td>${props.t6RightPrick}</td>
                            <td>${props.t6LeftTouch}</td>
                            <td>${props.t6LeftPrick}</td>
                            <td>&nbsp;</td>
                            <th>T6</th>
                        </tr>
                        <tr>
                            <th>T7</th>
                            <td>&nbsp;</td>
                            <td>${props.t7RightTouch}</td>
                            <td>${props.t7RightPrick}</td>
                            <td>${props.t7LeftTouch}</td>
                            <td>${props.t7LeftPrick}</td>
                            <td>&nbsp;</td>
                            <th>T7</th>
                        </tr>
                        <tr>
                            <th>T8</th>
                            <td>&nbsp;</td>
                            <td>${props.t8RightTouch}</td>
                            <td>${props.t8RightPrick}</td>
                            <td>${props.t8LeftTouch}</td>
                            <td>${props.t8LeftPrick}</td>
                            <td>&nbsp;</td>
                            <th>T8</th>
                        </tr>
                        <tr>
                            <th>T9</th>
                            <td>&nbsp;</td>
                            <td>${props.t9RightTouch}</td>
                            <td>${props.t9RightPrick}</td>
                            <td>${props.t9LeftTouch}</td>
                            <td>${props.t9LeftPrick}</td>
                            <td>&nbsp;</td>
                            <th>T9</th>
                        </tr>
                        <tr>
                            <th>T10</th>
                            <td>&nbsp;</td>
                            <td>${props.t10RightTouch}</td>
                            <td>${props.t10RightPrick}</td>
                            <td>${props.t10LeftTouch}</td>
                            <td>${props.t10LeftPrick}</td>
                            <td>&nbsp;</td>
                            <th>T10</th>
                        </tr>
                        <tr>
                            <th>T11</th>
                            <td>&nbsp;</td>
                            <td>${props.t11RightTouch}</td>
                            <td>${props.t11RightPrick}</td>
                            <td>${props.t11LeftTouch}</td>
                            <td>${props.t11LeftPrick}</td>
                            <td>&nbsp;</td>
                            <th>T11</th>
                        </tr>
                        <tr>
                            <th>T12</th>
                            <td>&nbsp;</td>
                            <td>${props.t12RightTouch}</td>
                            <td>${props.t12RightPrick}</td>
                            <td>${props.t12LeftTouch}</td>
                            <td>${props.t12LeftPrick}</td>
                            <td>&nbsp;</td>
                            <th>T12</th>
                        </tr>
                        <tr>
                            <th>L1</th>
                            <td>&nbsp;</td>
                            <td>${props.l1RightTouch}</td>
                            <td>${props.l1RightPrick}</td>
                            <td>${props.l1LeftTouch}</td>
                            <td>${props.l1LeftPrick}</td>
                            <td>&nbsp;</td>
                            <th>L1</th>
                        </tr>
                        <tr>
                            <th>L2</th>
                            <td>${props.l2RightMotor}</td>
                            <td>${props.l2RightTouch}</td>
                            <td>${props.l2RightPrick}</td>
                            <td>${props.l2LeftTouch}</td>
                            <td>${props.l2LeftPrick}</td>
                            <td>${props.l2LeftMotor}</td>
                            <th>L2</th>
                        </tr>
                        <tr>
                            <th>L3</th>
                            <td>${props.l3RightMotor}</td>
                            <td>${props.l3RightTouch}</td>
                            <td>${props.l3RightPrick}</td>
                            <td>${props.l3LeftTouch}</td>
                            <td>${props.l3LeftPrick}</td>
                            <td>${props.l3LeftMotor}</td>
                            <th>L3</th>
                        </tr>
                        <tr>
                            <th>L4</th>
                            <td>${props.l4RightMotor}</td>
                            <td>${props.l4RightTouch}</td>
                            <td>${props.l4RightPrick}</td>
                            <td>${props.l4LeftTouch}</td>
                            <td>${props.l4LeftPrick}</td>
                            <td>${props.l4LeftMotor}</td>
                            <th>L4</th>
                        </tr>
                        <tr>
                            <th>L5</th>
                            <td>${props.l5RightMotor}</td>
                            <td>${props.l5RightTouch}</td>
                            <td>${props.l5RightPrick}</td>
                            <td>${props.l5LeftTouch}</td>
                            <td>${props.l5LeftPrick}</td>
                            <td>${props.l5LeftMotor}</td>
                            <th>L5</th>
                        </tr>
                        <tr>
                            <th>S1</th>
                            <td>${props.s1RightMotor}</td>
                            <td>${props.s1RightTouch}</td>
                            <td>${props.s1RightPrick}</td>
                            <td>${props.s1LeftTouch}</td>
                            <td>${props.s1LeftPrick}</td>
                            <td>${props.s1LeftMotor}</td>
                            <th>S1</th>
                        </tr>
                        <tr>
                            <th>S2</th>
                            <td>&nbsp;</td>
                            <td>${props.s2RightTouch}</td>
                            <td>${props.s2RightPrick}</td>
                            <td>${props.s2LeftTouch}</td>
                            <td>${props.s2LeftPrick}</td>
                            <td>&nbsp;</td>
                            <th>S2</th>
                        </tr>
                        <tr>
                            <th>S3</th>
                            <td>&nbsp;</td>
                            <td>${props.s3RightTouch}</td>
                            <td>${props.s3RightPrick}</td>
                            <td>${props.s3LeftTouch}</td>
                            <td>${props.s3LeftPrick}</td>
                            <td>&nbsp;</td>
                            <th>S3</th>
                        </tr>
                        <tr>
                            <th>S4_5</th>
                            <td>&nbsp;</td>
                            <td>${props.s4_5RightTouch}</td>
                            <td>${props.s4_5RightPrick}</td>
                            <td>${props.s4_5LeftTouch}</td>
                            <td>${props.s4_5LeftPrick}</td>
                            <td>&nbsp;</td>
                            <th>S4_5</th>
                        </tr>
                    </tbody>
                    </table>
                </div>
                <div class="totals">
                    <div class="font-title">Totals:</div>
                    <div class="value display-flex">
                        <div class="label">Right Sensory:</div>
                        <div>${props.rightSensory}</div>
                    </div>
                    <div class="value display-flex">
                        <div class="label">Left Sensory:</div>
                        <div>${props.leftSensory}</div>
                    </div>
                    <div class="value display-flex">
                        <div class="label">Right Motor:</div>
                        <div>${props.rightMotor}</div>
                    </div>
                    <div class="value display-flex">
                        <div class="label">Left Motor:</div>
                        <div>${props.leftMotor}</div>
                    </div>
                    <div class="value display-flex">
                        <div class="label">NLI:</div>
                        <div>${props.nli}</div>
                    </div>
                    <div class="value display-flex">
                        <div class="label">AIS:</div>
                        <div>${props.ais}</div>
                    </div>
                    <div class="value display-flex">
                        <div class="label">Right Sensory ZPP:</div>
                        <div>${props.rightSensoryZpp}</div>
                    </div>
                    <div class="value display-flex">
                        <div class="label">Left Sensory ZPP:</div>
                        <div>${props.leftSensoryZpp}</div>
                    </div>
                    <div class="value display-flex">
                        <div class="label">Right Motor ZPP:</div>
                        <div>${props.rightMotorZpp}</div>
                    </div>
                    <div class="value display-flex">
                        <div class="label">Left Motor ZPP:</div>
                        <div>${props.leftMotorZpp}</div>
                    </div>
                </div>
            </div>
        `;
    }
    
    public static get is() { return 'rhi-core-isncsci-algorithm-demo-exam'; }
            
    // Properties for the element's public API
    public static get properties() {
        return {
            c2RightTouch: String,
            c2RightPrick: String,
            c2LeftTouch: String,
            c2LeftPrick: String,
            c3RightTouch: String,
            c3RightPrick: String,
            c3LeftTouch: String,
            c3LeftPrick: String,
            c4RightTouch: String,
            c4RightPrick: String,
            c4LeftTouch: String,
            c4LeftPrick: String,
            c5RightMotor: String,
            c5RightTouch: String,
            c5RightPrick: String,
            c5LeftTouch: String,
            c5LeftPrick: String,
            c5LeftMotor: String,
            c6RightMotor: String,
            c6RightTouch: String,
            c6RightPrick: String,
            c6LeftTouch: String,
            c6LeftPrick: String,
            c6LeftMotor: String,
            c7RightMotor: String,
            c7RightTouch: String,
            c7RightPrick: String,
            c7LeftTouch: String,
            c7LeftPrick: String,
            c7LeftMotor: String,
            c8RightMotor: String,
            c8RightTouch: String,
            c8RightPrick: String,
            c8LeftTouch: String,
            c8LeftPrick: String,
            c8LeftMotor: String,
            t1RightMotor: String,
            t1RightTouch: String,
            t1RightPrick: String,
            t1LeftTouch: String,
            t1LeftPrick: String,
            t1LeftMotor: String,
            t2RightTouch: String,
            t2RightPrick: String,
            t2LeftTouch: String,
            t2LeftPrick: String,
            t3RightTouch: String,
            t3RightPrick: String,
            t3LeftTouch: String,
            t3LeftPrick: String,
            t4RightTouch: String,
            t4RightPrick: String,
            t4LeftTouch: String,
            t4LeftPrick: String,
            t5RightTouch: String,
            t5RightPrick: String,
            t5LeftTouch: String,
            t5LeftPrick: String,
            t6RightTouch: String,
            t6RightPrick: String,
            t6LeftTouch: String,
            t6LeftPrick: String,
            t7RightTouch: String,
            t7RightPrick: String,
            t7LeftTouch: String,
            t7LeftPrick: String,
            t8RightTouch: String,
            t8RightPrick: String,
            t8LeftTouch: String,
            t8LeftPrick: String,
            t9RightTouch: String,
            t9RightPrick: String,
            t9LeftTouch: String,
            t9LeftPrick: String,
            t10RightTouch: String,
            t10RightPrick: String,
            t10LeftTouch: String,
            t10LeftPrick: String,
            t11RightTouch: String,
            t11RightPrick: String,
            t11LeftTouch: String,
            t11LeftPrick: String,
            t12RightTouch: String,
            t12RightPrick: String,
            t12LeftTouch: String,
            t12LeftPrick: String,
            l1RightTouch: String,
            l1RightPrick: String,
            l1LeftTouch: String,
            l1LeftPrick: String,
            l2RightMotor: String,
            l2RightTouch: String,
            l2RightPrick: String,
            l2LeftTouch: String,
            l2LeftPrick: String,
            l2LeftMotor: String,
            l3RightMotor: String,
            l3RightTouch: String,
            l3RightPrick: String,
            l3LeftTouch: String,
            l3LeftPrick: String,
            l3LeftMotor: String,
            l4RightMotor: String,
            l4RightTouch: String,
            l4RightPrick: String,
            l4LeftTouch: String,
            l4LeftPrick: String,
            l4LeftMotor: String,
            l5RightMotor: String,
            l5RightTouch: String,
            l5RightPrick: String,
            l5LeftTouch: String,
            l5LeftPrick: String,
            l5LeftMotor: String,
            s1RightMotor: String,
            s1RightTouch: String,
            s1RightPrick: String,
            s1LeftTouch: String,
            s1LeftPrick: String,
            s1LeftMotor: String,
            s2RightTouch: String,
            s2RightPrick: String,
            s2LeftTouch: String,
            s2LeftPrick: String,
            s3RightTouch: String,
            s3RightPrick: String,
            s3LeftTouch: String,
            s3LeftPrick: String,
            s4_5RightTouch: String,
            s4_5RightPrick: String,
            s4_5LeftTouch: String,
            s4_5LeftPrick: String,
            leftSensory: {
                type: String,
                value: ''
            },
            rightSensory: {
                type: String,
                value: ''
            },
            leftMotor: {
                type: String,
                value: ''
            },
            rightMotor: {
                type: String,
                value: ''
            },
            nli: {
                type: String,
                value: ''
            },
            ais: {
                type: String,
                value: ''
            },
            leftSensoryZpp: {
                type: String,
                value: ''
            },
            rightSensoryZpp: {
                type: String,
                value: ''
            },
            leftMotorZpp: {
                type: String,
                value: ''
            },
            rightMotorZpp: {
                type: String,
                value: ''
            }
        };
    }

    public ready(): void {
        super.ready();

        this.isncsciExam = new IsncsciExam();
        this.c2 = this.isncsciExam.getLevelWithName('C2');
    }
    
    public setExam(examData: iIsncsciExamModel, comments: string): void {
        this.comments = comments;
        
        const keyMap: { prefix: string, start: number, end: number }[] = [
            { prefix: 'c', start: 2, end: 8},
            { prefix: 't', start: 1, end: 12},
            { prefix: 'l', start: 1, end: 5},
            { prefix: 's', start: 1, end: 3},
            { prefix: 's4_', start: 5, end: 5}
        ];

        keyMap.forEach(
            (key: { prefix: string, start: number, end: number }) => {
                for (let i:number = key.start; i<=key.end; i++) {
                    this[`${key.prefix}${i}RightTouch`] = examData[`${key.prefix}${i}RightTouch`];
                    this[`${key.prefix}${i}RightPrick`] = examData[`${key.prefix}${i}RightPrick`];
                    this[`${key.prefix}${i}LeftTouch`] = examData[`${key.prefix}${i}LeftTouch`];
                    this[`${key.prefix}${i}LeftPrick`] = examData[`${key.prefix}${i}LeftPrick`];

                    if (motorLevelNameRegExp.test(`${key.prefix}${i}`)) {
                        this[`${key.prefix}${i}RightMotor`] = examData[`${key.prefix}${i}RightMotor`];
                        this[`${key.prefix}${i}LeftMotor`] = examData[`${key.prefix}${i}LeftMotor`];
                    }
                }
            }
        );
    }

    public setTotals(totals: IsncsciTotals): void {
        this.rightSensory = totals.getRightSensoryLongValueString().replace(/,/g, ', ');
        this.leftSensory = totals.getRightSensoryLongValueString().replace(/,/g, ', ');
        this.rightMotor = totals.getRightMotorLongValueString().replace(/,/g, ', ');
        this.leftMotor = totals.getLeftMotorLongValueString().replace(/,/g, ', ');
        this.nli = totals.getNeurologicalLevelsOfInjuryLongValueString().replace(/,/g, ', ');
        this.ais = totals.getAsiaImpairmentScaleValues().replace(/,/g, ', ');

        let isComplete = this.ais.indexOf('A') !== -1;

        this.rightSensoryZpp = isComplete ? totals.getRightSensoryZppLongValueString().replace(/,/g, ', ') : '';
        this.leftSensoryZpp = isComplete ? totals.getLeftSensoryZppLongValueString().replace(/,/g, ', ') : '';
        this.rightMotorZpp = isComplete ? totals.getRightMotorZppLongValueString().replace(/,/g, ', ') : '';
        this.leftMotorZpp = isComplete ? totals.getLeftMotorZppLongValueString().replace(/,/g, ', ') : '';
    }
}
    
customElements.define(RhiCoreIsncsciAlgorithmDemoExam.is, RhiCoreIsncsciAlgorithmDemoExam);