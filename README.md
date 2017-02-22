## &lt;rhi-core-isncsci-algorithm&gt; v1.0

JavaScript version of the ISNCSCI algorithm written with Google Polymer.


_[Demo and documentation](http://isncscialgorithm.azurewebsites.net/SourceCode)_



The `rhi-core-isncsci-algorithm` element can receive an `rhi-core-isncsci-exam element`,
with ASIA raw values, and return an `rhi-core-isncsci-totals` element.

```html
<body>
<rhi-core-isncsci-algorithm id="isncsciAlgorithm"></rhi-core-isncsci-algorithm>
<script>
    var isncsciAlgorithm = document.getElementById('isncsciAlgorithm');
    var isncsciExam = document.createElement('rhi-core-isncsci-exam');
    var totals = isncsciAlgorithm.getTotalsFor(isncsciExam);
</script>
</body>
```

#### Installation:
Download the component using bower:

&nbsp;&nbsp;&nbsp;_bower install --save rhi-core-isncsci-algorithm_

or [download as a zip file](https://github.com/EddieMachete/rhi-core-isncsci-algorithm/archive/master.zip).


If you download the project as a zip file, make sure to also get the
[Google Polymer library v1.1](https://github.com/Polymer/polymer/archive/v1.1.0.zip)
and make sure that the algorithm component can reference Polymer.


Visit our [UI project](https://github.com/EddieMachete/rhi-ui-isncsci) where I
have interface elements which will allow you incorporate the algorithm to your
web and hybrid application projects.