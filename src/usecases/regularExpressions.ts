/*
@license
Copyright (c) 2015 Rick Hansen Institute. All rights reserved.
This code may only be used under the modified Apache license found at https://raw.githubusercontent.com/rick-hansen-institute/rhi-core-isncsci-algorithm/master/LICENSE
Author: RhiTech <tech@rickhanseninstitute.org>
*/
'use strict';

// 'c5', 'c6', 'c7', 'c8', 't1', 'l2', 'l3', 'l4', 'l5', 's1'
export const motorLevelNameRegExp: RegExp = /(^c[5-8]$)|^t1$|(^l[2-5]$)|^s1$/i;
// c5-c8, t1, l2-l5, s1
export const validMotorNameRegExp: RegExp = /^((c[5-8])|t1|(l[2-5])|s1)(Left|Right)(Motor)$/;
// '', '0', '0!', '1', '1!', '2!', '3', '3!', '4', '4!', '5', '5*', 'NT', 'NT!', 'NT*'
export const validMotorValueRegExp: RegExp = /([0-4]\!?)|(5\*?)|(NT\!?)|(NT\*?)/;
// c2-c8, t1-t12, l1-l5, s1-s3, s4_5
export const validSensoryNameRegExp: RegExp = /^((c[2-8])|(t[1-9])|(t1[0-2])|(l[1-5])|(s[1-3])|s4_5)(Left|Right)(Prick|Touch)$/;
// '', '0', '0!', '1', '1!', '2', 'NT', 'NT!', 'NT*'
export const validSensoryValueRegExp: RegExp = /([0-1]\!?)|2|(NT\!?)|(NT\*?)/;