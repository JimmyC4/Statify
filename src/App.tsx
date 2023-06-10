import "./App.css";
import HorizontalScroll from "react-scroll-horizontal";

export default function App() {
  return (
    <div className="App">
      <HorizontalScroll>
        <div className="child landing-page" id="landing">
          <h1>Heading 1</h1>
          <h2>Heading 2</h2>
          <h3>Heading 3</h3>
          <p>Paragraph</p>
          <a href="#module-1">Link</a>
        </div>
        <div className="child module-page" id="module-1">
          <p>Hello 2</p>
        </div>

        <div className="child" id="module-2">
          <p>Hello 3</p>
        </div>
      </HorizontalScroll>
    </div>
  );
}
