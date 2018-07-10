/*
@license
Copyright (c) 2015 Rick Hansen Institute. All rights reserved.
This code may only be used under the modified Apache license found at https://raw.githubusercontent.com/rick-hansen-institute/rhi-core-isncsci-algorithm/master/LICENSE
Author: RhiTech <tech@rickhanseninstitute.org>
*/
'use strict';

import { html, LitElement } from '@polymer/lit-element';
import { TemplateResult } from 'lit-html';
import { IsncsciTotals } from '../domain';
import { CalculateTotalsUseCase } from '../usecases';

export class RhiCoreIsncsciAlgorithmDemo extends LitElement {
    static get is() { return 'rhi-core-isncsci-algorithm-demo'; }

    public _render(props: any): TemplateResult {
        return html`
            <style>
                .background-orange {
                    background-color: #F15A24;
                }
                
                .color-dark-medium {
                    color: #666;
                }
                
                .color-white {
                    color: #FFF;
                }
                
                .font-size-normal {
                    font-size: 13px;
                }
                
                .details {
                    margin: 24px 0;
                }

                .controls button {
                    padding: 8px 16px;
                }
            </style>
            <!-- shadow DOM for your element -->
            <div class="controls">
                <button class="background-orange color-white"
                        on-click="${e => this.handleLoadTestClick(e)}">Load new random test</paper-button>
            </div>
            <div class="details color-dark-medium font-body-1">
                Forms are loaded randomly from isncsci-validation-tests.ts
            </div>
            <rhi-core-isncsci-algorithm-tests-helpers id="testHelpers"></rhi-core-isncsci-algorithm-tests-helpers>
            <rhi-core-isncsci-algorithm-demo-exam id="demoExam"></rhi-core-isncsci-algorithm-demo-exam>
        `;
    }

    private demoExam: HTMLElement;

    public static get properties() {
        return {
            tests: {
                type: Object,
                value: []
            }
        };
    }

    public constructor() {
        super();
    }

    public ready(): void {
        super.ready();

        this.demoExam = this.shadowRoot.getElementById('demoExam');
    }

    public loadRandomTest():void {
        if (!this.tests || !this.tests.length)
            return;

        const randomTest = this.tests[Math.floor((Math.random() * this.tests.length))];
        this.demoExam['setExam'](randomTest, randomTest.comments);

        new CalculateTotalsUseCase({
            setDermatomeValue: (dermatomeName: string, value: string) => Promise.resolve(),
            setTotals: (totals: IsncsciTotals) => {
                this.demoExam['setTotals'](totals);
                return Promise.resolve();
            }
        }).execute(randomTest);
    }

    public handleLoadTestClick(e: MouseEvent): void {
        this.loadRandomTest();
    }
}
        
customElements.define(RhiCoreIsncsciAlgorithmDemo.is, RhiCoreIsncsciAlgorithmDemo);