[![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://www.webcomponents.org/element/rick-hansen-institute/rhi-core-isncsci-algorithm)

## &lt;rhi-core-isncsci-algorithm&gt;

JavaScript version of the ISNCSCI algorithm written for Google Polymer v2.

This library has been re-written using TypeScript.
The web components have been updated by exporting the TS code as ES6 classes.

### What is ISNCSCI?
The International Standards for Neurological Classification of Spinal Cord Injury (ISNCSCI) is an examination used to score the motor and sensory impairment and severity of a spinal cord injury. The [American Spinal Injury Association (ASIA)](http://www.asia-spinalinjury.org/).

_[Demo and documentation](http://isncscialgorithm.azurewebsites.net/SourceCode)_

The `rhi-core-isncsci-algorithm` element can receive an `rhi-core-isncsci-exam element`,
with ASIA raw values, and return an `rhi-core-isncsci-totals` element.

```html
<script>
    // The <rhi-core-isncsci-algorithm/> component has been re-written as an ES6 class.
    var isncsciExam = new IncsciExam();
    var totals = Algorithm.getTotalsFor(isncsciExam);
</script>
```

#### Installation:
Download the component using bower:

&nbsp;&nbsp;&nbsp;_bower install --save rhi-core-isncsci-algorithm_

or [download as a zip file](https://github.com/rick-hansen-institute/rhi-core-isncsci-algorithm/archive/master.zip).


If you download the project as a zip file, make sure to also get the
[Google Polymer library v2.3.0](https://github.com/Polymer/polymer/archive/v2.3.0.zip)
and make sure that the algorithm component can reference Polymer.


Visit our [UI project](https://github.com/rick-hansen-institute/rhi-ui-isncsci) where I
have interface elements which will allow you incorporate the algorithm to your
web and hybrid application projects.