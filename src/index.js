// import React from 'react';
// import { render } from 'react-dom';
// import { AppContainer } from 'react-hot-loader';
// import App from './app.jsx';
//
// render( <AppContainer><App/></AppContainer>, document.querySelector("#app"));
//
// if (module && module.hot) {
//   module.hot.accept('./app.jsx', () => {
//     const App = require('./app.jsx').default;
//     render(
//       <AppContainer>
//         <App/>
//       </AppContainer>,
//       document.querySelector("#app")
//     );
//   });
// }

import React, { Component } from 'react'
import { render } from 'react-dom'

export default class HelloWorld extends Component {
  render() {
    return (
      <h1>Hello World</h1>
    )
  }
}

render(<HelloWorld />, document.getElementById('app'))
