import "./App.css";
import FeedbackList from "./components/FeedbackList.jsx";
import Header from "./components/Header";
import FeedbackStats from "./components/FeedbackStats.jsx";

import FeedbackForm from "./components/FeedbackForm.jsx";
import AboutPage from "./components/AboutPage.jsx";
import { FeedbackProvider } from "./context/FeedbackContext.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import AboutPageIcon from "./components/AboutPageIcon.jsx";

function App() {
  return (
    <FeedbackProvider>
      <BrowserRouter>
        <Header />
        <div className='container'>
          <Routes>
            <Route
              path='/'
              element={
                <>
                  <FeedbackForm />

                  <FeedbackStats />

                  <FeedbackList />
                </>
              }
            />

            <Route path='/about' element={<AboutPage />} />
          </Routes>

          <AboutPageIcon />
        </div>
      </BrowserRouter>
    </FeedbackProvider>

    // <FeedbackProvider>
    //   <Router>
    //     <Header />
    //     <div className='container'>
    //       <Routes>
    //         <Route
    //           path='/'
    //           element={
    //             <>
    //               <FeedbackForm />
    //               <FeedbackStats />
    //               <FeedbackList />
    //             </>
    //           }
    //         />
    //         <Route path='/about' element={<AboutPage />} />
    //       </Routes>

    //       <AboutPageIcon />
    //     </div>
    //   </Router>
    // </FeedbackProvider>
  );
}

export default App;
