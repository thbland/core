/*
@license
Copyright (c) 2015 Rick Hansen Institute. All rights reserved.
This code may only be used under the modified Apache license found at https://raw.githubusercontent.com/rick-hansen-institute/rhi-core-isncsci-algorithm/master/LICENSE
Author: RhiTech <tech@rickhanseninstitute.org>
*/
'use strict';
  
export class BinaryObservation {
    public static get is():string { return 'rhi-core-isncsci.BinaryObservation'; }
    public static get none():number { return 0; }
    public static get yes():number { return 1; }
    public static get no():number { return 2; }
    public static get nt():number { return 4; }
}
