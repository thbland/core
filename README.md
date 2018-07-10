## &lt;rhi-core-isncsci-algorithm&gt;

TypeScript version of the ISNCSCI algorithm.

### What is ISNCSCI?
The International Standards for Neurological Classification of Spinal Cord Injury (ISNCSCI) is an examination used to score the motor and sensory impairment and severity of a spinal cord injury. The [American Spinal Injury Association (ASIA)](http://www.asia-spinalinjury.org/).

_[Demo and documentation](https://www.isncscialgorithm.com/SourceCode)_

We recommend the use of the `usecases.CalculateTotalsUseCase` class when performing calculations.
Just pass your exam data to the `usecases.CalculateTotalsUseCase.execute` method.
The data must follow implement the interface  `usecases.iIsncsciExamModel`.

```html
<script>
    import { iIsncsciAppStoreProvider } from 'rhi-core-isncsci-algorithm.boundaries';
    import { IsncsciTotals } from 'rhi-core-isncsci-algorithm.domain';
    import { CalculateTotalsUseCase, iIsncsciExamModel } from 'rhi-core-isncsci-algorithm.usecases';

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
</script>
```

#### Installation:
Download the component using npm:

&nbsp;&nbsp;&nbsp;_npm install --save rhi-core-isncsci-algorithm_

or [download as a zip file](https://github.com/rick-hansen-institute/rhi-core-isncsci-algorithm/archive/master.zip).

Visit our [UI project](https://github.com/rick-hansen-institute/rhi-ui-isncsci) where we
have interface elements which will allow you incorporate the algorithm to your
web and hybrid application projects.

#### Run the unit tests
1. Run: npm install
2. On:
* Mac and Linux:   *./node_modules/.bin/karma start*
* Windows: *node_modules\.bin\karma start*

#### Demo
1. `cd demo`
2. `tsc`
3. `cd ..`
4. `npm start`
5. Open the [demo page](http://127.0.0.1:8081/demo/) on your browser.