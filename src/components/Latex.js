import React, { useEffect } from 'react';
import waitForGlobal from '../../static/waitForGlobal'
import Helmet from 'react-helmet'
function Latex(props) {
  let node = React.createRef();
  useEffect(() => {
    renderMath();
  });
  const renderMath = () => {
    waitForGlobal('MathJax').then(() => {
      window.MathJax.Hub.Config({
        tex2jax: {
          inlineMath: [['$$$', '$$$'], ['\\(','\\)'],['$','$']],
          displayMath: [['$$$$$$','$$$$$$']],
          processEscapes: true,
          processEnvironments: true,
          skipTags: ['script', 'noscript', 'style', 'textarea', 'pre'],
          TeX: {
            equationNumbers: { autoNumber: 'AMS' },
            extensions: ['AMSmath.js', 'AMSsymbols.js'],
          },
        },
      })
      // renderMath()
    })
    if (window.MathJax != null) {
      window.MathJax.Hub.Queue(['Typeset', window.MathJax.Hub])
    }
  }  
  return (
    <div ref={node} >
             
        <Helmet>
     <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.5/MathJax.js?config=TeX-MML-AM_CHTML"></script>
        </Helmet>
      {props.children}
    </div>
  );
}
export default Latex;