import '@/styles/globals.css'
import { wrapper, store } from "../store/store";
import { Provider } from "react-redux";
import "@fortawesome/fontawesome-svg-core/styles.css"; 
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;

// function App({ Component, pageProps }) {
//   return (
//     <Provider store={store}>
//       <Component {...pageProps} />
//     </Provider>
//   ) 
// }

// export default wrapper.withRedux(App);

export default function App({ Component, pageProps }) {
  return (
      <Component {...pageProps} />
  ) 
}