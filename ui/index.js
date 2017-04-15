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

//DAY 1
// import React, { Component } from 'react'
// import { render } from 'react-dom'
// import styles from '../styles/styles.scss';
//
// export default class HelloWorld extends Component {
//   render() {
//     return (
//       <div>
//         <h1 className={styles.greeting}>Hello World</h1>
//         </div>
//     )
//   }
// }
//
// render(<HelloWorld />, document.getElementById('app'))

//DAY 2
import React, { Component } from 'react'
import { render } from 'react-dom'
import routes from './routes'

render(routes(), document.getElementById('app'))
