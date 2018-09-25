<!-- Copyright (c) 2017 Rick Hansen Institute. All rights reserved.

This code should not be modified and/or distributed without explicit permission from the Rick Hansen Institute.
Author: RhiTech <tech@rickhanseninstitute.org>
==============================================================================-->

# rhi-core-isncsci-algorithm

ISNCSCI algorithm written in TypeScript

## What is ISNCSCI?
The International Standards for Neurological Classification of Spinal Cord Injury (ISNCSCI) is an examination used to score the motor and sensory impairment and severity of a spinal cord injury. The [American Spinal Injury Association (ASIA)](http://www.asia-spinalinjury.org/).

_[Demo and documentation](https://www.isncscialgorithm.com/SourceCode)_

We recommend the use of the `usecases.CalculateTotalsUseCase` class when performing calculations.
Just pass your exam data to the `usecases.CalculateTotalsUseCase.execute` method.
The data must follow implement the interface  `usecases.iIsncsciExamModel`.

```ts
import { iIsncsciAppStoreProvider, IsncsciTotals, CalculateTotalsUseCase, iIsncsciExamModel } from 'rhi-core-isncsci-algorithm';

// Set totals will be called when the calculation has been completed.
// We are following Clean Architecture principles in the implementation of our use cases:
// https://www.linkedin.com/pulse/designing-typescript-todo-list-application-following-clean-eduardo/?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_post_details%3Bo8kh9v7zTOuNHXWXrFhT9g%3D%3D
const appStoreProvider = {
    setDermatomeValue: (dermatomeName: string, value: string) => Promise.resolve(),
    setTotals: (totals: IsncsciTotals) => { console.log(`These are the totals produced by the algorithm: ${totals}`); };
};

// Set you exam's raw data in an object that implements the interface `iIsncsciExamModel`
const examData: iIsncsciExamModel = {
    c5RicghtTouch: '2',
    c5RightPrick: '2',
    // Fully implement the interface
};

new CalculateTotalsUseCase(<iIsncsciAppStoreProvider>appStoreProvider).execute(examData);
```

Visit our [UI project](https://github.com/rick-hansen-institute/rhi-ui-isncsci) where we
have interface elements which will allow you incorporate the algorithm to your
web and hybrid application projects.

## Installation:
Download the component using npm:
```
npm install --save rhi-core-isncsci-algorithm
```

## Demo and Development
To view a demo and contribute to this project you can download the project using git:
```
git clone https://github.com/rick-hansen-institute/rhi-core-isncsci-algorithm.git
```
or [download as a zip file](https://github.com/rick-hansen-institute/rhi-core-isncsci-algorithm/archive/master.zip).

## Run the unit tests
Install dependencies:
```
npm install
```
Run the test:
```
npm test
```

## Demo
### Node
Prepare the demo by building and linking package by running the command:
```
npm run prepare:demo
```
Then you can run the following command to run the node version of the demo.
```
npm run start:demo:node
```
You will see a randomly loaded exam and some of calculated data in the console.

### Web
Prepare the demo by building and linking package by running the command:
```
npm run prepare:demo
```
Then you can run the following command to start interacting with web version of demo.
```
npm run start:demo:web
```
This will open a browser where you can view the implemented code to load random exam and calculate the totals.
