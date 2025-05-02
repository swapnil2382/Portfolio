import React from "react";
import Header from "./components/Header";
import Page1 from "./pages/Page1";
import Page2 from "./pages/Page2";
import Page3 from "./pages/Page3";
import Page4 from "./pages/Page4";
import Page5 from "./pages/Page5";
import Page6 from "./pages/Page6";
import CustomCursor from "./components/CustomCursor";

const App = () => {
  return (
    <div className="w-full relative">
      {/* Custom Cursor */}
      <CustomCursor />

      {/* Header */}
      <Header />

      {/* Pages */}
      <div className="w-full">
        
        <Page1 />
        <div id="page2">
          <Page2 />
        </div>
        <Page3 />
        <Page5 />
        <Page4 />
        <Page6 />
      </div>
    </div>
  );
};

export default App;
