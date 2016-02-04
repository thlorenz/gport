# gport [![build status](https://secure.travis-ci.org/thlorenz/gport.png)](http://travis-ci.org/thlorenz/gport)

Gets the next available port on your localhost starting from the given port number.

```js
const getPort = require('../')
const http = require('http')
const PORT = 6000

// our port is busy now
const s1 = http.createServer().listen(PORT)

getPort(PORT, check)
function check(port) {
  console.log(port) // 6001
  s1.close()
}
```

## Installation

    npm install gport

## API

<!-- START docme generated API please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN docme TO UPDATE -->

<div>
<div class="jsdoc-githubify">
<section>
<article>
<div class="container-overview">
<dl class="details">
</dl>
</div>
<dl>
<dt>
<h4 class="name" id="getPort"><span class="type-signature"></span>getPort<span class="signature">(port, cb)</span><span class="type-signature"></span></h4>
</dt>
<dd>
<div class="description">
<p>Quick and dirty way to find an open port number.
Super small as it doesn't include any huge dependencies like other port finder libs.
Inspired by https://gist.github.com/mikeal/1840641</p>
</div>
<h5>Parameters:</h5>
<table class="params">
<thead>
<tr>
<th>Name</th>
<th>Type</th>
<th class="last">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td class="name"><code>port</code></td>
<td class="type">
<span class="param-type">Number</span>
</td>
<td class="description last"><p>start port, will be increased until an open one is found</p></td>
</tr>
<tr>
<td class="name"><code>cb</code></td>
<td class="type">
<span class="param-type">function</span>
</td>
<td class="description last"><p>called back with the open port</p></td>
</tr>
</tbody>
</table>
<dl class="details">
<dt class="tag-source">Source:</dt>
<dd class="tag-source"><ul class="dummy">
<li>
<a href="https://github.com/thlorenz/gport/blob/master/gport.js">gport.js</a>
<span>, </span>
<a href="https://github.com/thlorenz/gport/blob/master/gport.js#L5">lineno 5</a>
</li>
</ul></dd>
</dl>
</dd>
</dl>
</article>
</section>
</div>

*generated with [docme](https://github.com/thlorenz/docme)*
</div>
<!-- END docme generated API please keep comment here to allow auto update -->

## License

MIT
