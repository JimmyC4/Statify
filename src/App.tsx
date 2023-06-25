  import "./App.css";
  import React, { useState, useEffect, useRef } from 'react';
  import ArrowSvg from "./assets/arrow.svg";
  // import LineGraphAnimation from "./LineGraphAnimation";
  import BarGraphAnimation from "./BarGraphAnimation";
  import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
  import { Doughnut } from 'react-chartjs-2';

  ChartJS.register(ArcElement, Tooltip, Legend);

  export default function App() {
    const maxId = 4; // Maximum module ID
    const minId = 1; // Minimum module ID

    const [moduleId, setModuleId] = useState(1);

    const data = {

      labels: ['Green', 'Yellow', 'Purple', 'Red', 'Blue'],
      datasets: [
        {
          label: '# of Votes',
          data: [12, 19, 3, 5, 2],
          backgroundColor: [
            '#81F9A3',
            '#E8F981',
            '#B681F9',
            '#F98181',
            '#81A3F9',
          ],
          borderColor: [
            '#1a1a1d',
            '#1a1a1d',
            '#1a1a1d',
            '#1a1a1d',
            '#1a1a1d',
          ],
          borderWidth: 5,
        },
      ],
    };

    const handleMoveLeft = () => {
      const newId = moduleId === minId ? maxId : moduleId - 1;
      setModuleId(newId);
      console.log("Hello1");
    };

    const handleMoveRight = () => {
      const newId = moduleId === maxId ? minId : moduleId + 1;
      setModuleId(newId);
      console.log("Hello2");
    };

    const [opacity, setOpacity] = useState(1);
    const divRef = useRef<HTMLDivElement>(null);

    const toggleOpacity = () => {
      setOpacity((prevOpacity) => (prevOpacity === 0 ? 1 : 0));
    };

    const handleKeyPress = (event: React.KeyboardEvent) => {
      if (event.code === 'Space') {
        toggleOpacity();
      }
    };

    useEffect(() => {
      if (divRef.current) {
        divRef.current.focus();
      }
    }, []);

    const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
    const cursorRef = useRef(null);
    const offset = { x: -8, y: -8 }; // Adjust the offset values as needed
    const delay = 150; // Delay in milliseconds
  
    const handleMouseMove = (event) => {
      const { clientX, clientY } = event.nativeEvent;
      setTimeout(() => {
        setCursorPosition({ x: clientX, y: clientY });
      }, delay);
    };
  
    useEffect(() => {
      if (cursorRef.current) {
        cursorRef.current.style.transition = 'width .2s ease-in-out, height .2s ease-in-out, opacity .2s ease-in-out, border-radius .2s ease-in-out, padding .2s ease-in-out';
        cursorRef.current.style.transform = `translate(${cursorPosition.x + offset.x}px, ${cursorPosition.y + offset.y}px)`;
      }
    }, [cursorPosition, offset]);

    return (
      <div className="App" ref={divRef} onKeyDown={handleKeyPress} tabIndex={0} onMouseMove={handleMouseMove}>
        <div
        className="cursor"
        ref={cursorRef}
        style={{
          width: '17px',
          height: '17px',
          borderRadius: '600px',
          mixBlendMode: 'difference'
        }} />
        <div className="UI-Overlay" style={{ opacity }} ref={divRef}>
          <div className="top-left">
            <svg
              className="palette"
              xmlns="http://www.w3.org/2000/svg"
              width="33"
              height="27"
              fill="none"
              viewBox="0 0 33 27"
            >
              <path
                fill="#fff"
                d="M4.938 6.897a1.736 1.736 0 0 0-2.386.217L.387 9.654a1.626 1.626 0 0 0 .222 2.32L13.98 22.769 7.527 8.985 4.938 6.897Zm6.5-5.47L8.351 2.795a1.677 1.677 0 0 0-.88.924c-.158.41-.143.862.041 1.26l7.204 15.385.362-15.144-1.394-2.976c-.39-.825-1.4-1.193-2.248-.817Zm12.201.337c.01-.437-.16-.86-.47-1.176-.31-.316-.736-.5-1.184-.512L18.595 0a1.726 1.726 0 0 0-1.208.458 1.635 1.635 0 0 0-.525 1.153l-.405 16.899 7.102-13.474.08-3.272Zm8.442 1.567-3.016-1.506a1.746 1.746 0 0 0-1.293-.1 1.692 1.692 0 0 0-.99.816l-10.834 20.55a1.62 1.62 0 0 0-.103 1.259c.138.416.44.763.839.963l3.015 1.507c.4.198.865.234 1.293.1.427-.133.783-.426.99-.815l10.833-20.55c.204-.39.24-.842.103-1.259a1.67 1.67 0 0 0-.837-.965Zm-10.836 20.55a1.657 1.657 0 0 1-.406.519 1.72 1.72 0 0 1-.58.325 1.738 1.738 0 0 1-1.31-.096c-.201-.1-.38-.238-.525-.406a1.608 1.608 0 0 1-.196-1.844c.21-.38.565-.666.989-.794.423-.129.881-.09 1.276.106.395.197.695.537.836.946.14.41.11.856-.084 1.244Z"
              />
            </svg>
            <svg onClick={toggleOpacity}
              xmlns="http://www.w3.org/2000/svg"
              width="29"
              height="20"
              fill="none"
              viewBox="0 0 29 20"
            >
              <path
                fill="#fff"
                d="M14.5 6a3.932 3.932 0 0 0-2.796 1.172A4.023 4.023 0 0 0 10.545 10c0 1.06.417 2.078 1.159 2.828A3.932 3.932 0 0 0 14.5 14a3.932 3.932 0 0 0 2.796-1.172A4.023 4.023 0 0 0 18.455 10c0-1.06-.417-2.078-1.159-2.828A3.932 3.932 0 0 0 14.5 6Zm0 10.667a6.553 6.553 0 0 1-4.66-1.953A6.706 6.706 0 0 1 7.91 10a6.7 6.7 0 0 1 1.93-4.714 6.553 6.553 0 0 1 4.66-1.953c1.748 0 3.424.703 4.66 1.953A6.706 6.706 0 0 1 21.09 10a6.706 6.706 0 0 1-1.93 4.714 6.553 6.553 0 0 1-4.66 1.953ZM14.5 0C7.91 0 2.28 4.147 0 10c2.28 5.853 7.91 10 14.5 10S26.72 15.853 29 10C26.72 4.147 21.09 0 14.5 0Z"
              />
            </svg>
          </div>
          <div className="top-right">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="35"
              height="35"
              fill="none"
              viewBox="0 0 40 40"
            >
              <path
                fill="#fff"
                fill-rule="evenodd"
                d="M7 31.63c0 .34.057.675.166.991A17.942 17.942 0 0 1 2 20c0-9.941 8.059-18 18-18s18 8.059 18 18a17.94 17.94 0 0 1-5.181 12.636 2.99 2.99 0 0 0-2.498-4.002c-7.758-.803-12.836-.88-20.632-.018A3.028 3.028 0 0 0 7 31.63ZM0 20c0 10.772 8.517 19.556 19.184 19.984.226.012.452.017.678.015L20 40c11.046 0 20-8.954 20-20S31.046 0 20 0 0 8.954 0 20Zm20 4a8 8 0 1 0 0-16.001A8 8 0 0 0 20 24Z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
        </div>
        <div className="move-buttons" style={{ opacity }}>
          <a
            className="move-left"
            href={`#module-${moduleId}`}
            onClick={handleMoveLeft}
            onDragStart={(e) => e.preventDefault()}
          >
            <img src={ArrowSvg} alt="Arrow" />
          </a>
          <a
            className="move-right"
            href={`#module-${moduleId}`}
            onClick={handleMoveRight}
            onDragStart={(e) => e.preventDefault()}
          >
            <img src={ArrowSvg} alt="Arrow" />
          </a>
        </div>

        <div className="container">
          <section id="module-1" className="module">
            <div className="bar-graph-container">
              <BarGraphAnimation barWidth={13} barHeight={60} waveSpeed={.15} numBars={35.5} peakHeight={12} />
            </div>
            <h1>Statify</h1>
            <ol>
              <li>Choose your chart</li>
              <li>Enter your stats</li>
              <li>Customize</li>
            </ol>
          </section>

          {/* <div className="line-graph-container">
            <LineGraphAnimation minViewHeight={150} maxViewHeight={550} />
          </div> */}

          <section id="module-2" className="module">
            <div className="scale-module">
              <h2>Choose a Chart</h2>
              <p>Hover the icons for suggestions.</p>
              <div className="icon-holder">
                <div className="icon-1 icon">
                  <div className="hover-expand">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="48"
                      height="48"
                      fill="none"
                      viewBox="0 0 48 48"
                    >
                      <path
                        fill="#000"
                        d="M0 42.667h48V48H0v-5.333Zm8-8c2.933 0 5.333-2.4 5.333-5.334 0-1.333-.533-2.666-1.333-3.466l3.467-7.2H16c1.333 0 2.667-.534 3.467-1.334l7.2 3.734v.266c0 2.934 2.4 5.334 5.333 5.334 2.933 0 5.333-2.4 5.333-5.334 0-1.333-.533-2.4-1.333-3.466l3.467-7.2H40c2.933 0 5.333-2.4 5.333-5.334C45.333 2.4 42.933 0 40 0c-2.933 0-5.333 2.4-5.333 5.333C34.667 6.667 35.2 8 36 8.8L32.533 16H32c-1.333 0-2.667.533-3.467 1.333l-7.2-3.466v-.534C21.333 10.4 18.933 8 16 8c-2.933 0-5.333 2.4-5.333 5.333 0 1.334.533 2.667 1.333 3.467L8.533 24H8c-2.933 0-5.333 2.4-5.333 5.333 0 2.934 2.4 5.334 5.333 5.334Z"
                      />
                    </svg>
                    <div className="circle" />
                  </div>
                  <h3>Line</h3>
                  <p className="icon-para">Stat progression</p>
                </div>
                <div className="icon-2 icon">
                  <div className="hover-expand">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="55"
                      height="55"
                      fill="none"
                      viewBox="0 0 55 55"
                    >
                      <path
                        fill="#000"
                        d="M0 27.441A27.5 27.5 0 0 1 25.667 0v14.74a12.833 12.833 0 1 0 9.518 22.98l10.421 10.42A27.5 27.5 0 0 1 0 27.44Z"
                      />
                      <path
                        fill="#000"
                        d="M48.199 45.547A27.393 27.393 0 0 0 55 27.441c0-3.791-.77-7.399-2.152-10.684L39.435 22.71a12.827 12.827 0 0 1-1.657 12.412l10.42 10.424Zm-18.865-30.81V0a27.496 27.496 0 0 1 21.864 13.479l-13.6 6.042a12.822 12.822 0 0 0-8.264-4.785Z"
                      />
                    </svg>
                    <div className="circle" />
                  </div>
                  <h3>Donut</h3>
                  <p className="icon-para">Categorical distribution</p>
                </div>
                <div className="icon-3 icon">
                  <div className="hover-expand">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="46"
                      height="46"
                      fill="none"
                      viewBox="0 0 46 46"
                    >
                      <path
                        fill="#000"
                        d="M10.454 25.09H2.091C.836 25.09 0 25.928 0 27.183V43.91C0 45.164.836 46 2.09 46h8.364c1.255 0 2.091-.836 2.091-2.09V27.181c0-1.255-.836-2.091-2.09-2.091Zm33.455-8.363h-8.364c-1.254 0-2.09.837-2.09 2.091V43.91c0 1.255.836 2.091 2.09 2.091h8.364C45.164 46 46 45.164 46 43.91V18.817c0-1.254-.836-2.09-2.09-2.09ZM27.182 0h-8.364c-1.254 0-2.09.836-2.09 2.09v41.82c0 1.254.836 2.09 2.09 2.09h8.364c1.254 0 2.09-.836 2.09-2.09V2.09c0-1.254-.836-2.09-2.09-2.09Z"
                      />
                    </svg>
                    <div className="circle" />
                  </div>
                  <h3>Bar</h3>
                  <p className="icon-para">Stat comparison</p>
                </div>
                <div className="icon-4 icon">
                  <div className="hover-expand">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="46"
                      height="52"
                      fill="none"
                      viewBox="0 0 46 52"
                    >
                      <path
                        fill="#000"
                        d="M8.846 23.636c2.346 0 4.596.934 6.255 2.597a8.872 8.872 0 0 1 0 12.534 8.837 8.837 0 0 1-12.51 0 8.872 8.872 0 0 1 0-12.535 8.837 8.837 0 0 1 6.255-2.596ZM20.641 0c2.346 0 4.596.934 6.255 2.596a8.872 8.872 0 0 1 0 12.535 8.838 8.838 0 0 1-12.51 0 8.873 8.873 0 0 1 0-12.535A8.837 8.837 0 0 1 20.64 0Zm16.513 34.273c4.865 0 8.846 3.959 8.846 8.863a8.873 8.873 0 0 1-2.591 6.268A8.837 8.837 0 0 1 37.154 52c-4.895 0-8.846-3.989-8.846-8.864 0-2.35.932-4.605 2.59-6.267a8.837 8.837 0 0 1 6.256-2.596Z"
                      />
                    </svg>
                    <div className="circle" />
                  </div>
                  <h3>Scatter</h3>
                  <p className="icon-para">Stat dispersion</p>
                </div>
                <div className="icon-5 icon">
                  <div className="hover-expand">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="48"
                      height="48"
                      fill="none"
                      viewBox="0 0 48 48"
                    >
                      <path
                        fill="#000"
                        d="M5.333 48c-1.466 0-2.722-.523-3.768-1.568C.52 45.387-.002 44.132 0 42.667V5.333c0-1.466.523-2.722 1.568-3.768C2.613.52 3.868-.002 5.333 0h37.334c1.466 0 2.722.523 3.768 1.568 1.045 1.045 1.567 2.3 1.565 3.765v37.334c0 1.466-.523 2.722-1.568 3.768-1.045 1.045-2.3 1.567-3.765 1.565H5.333ZM8 37.333h32L30 24l-8 10.667-6-8-8 10.666Z"
                      />
                    </svg>
                    <div className="circle" />
                  </div>
                  <h3>Image</h3>
                  <p className="icon-para">Personalized visuals</p>
                </div>
              </div>
            </div>
          </section>
          <section id="module-3" className="module">
            <h3>Donut Chart</h3>
            <div className="doughnut-chart"><Doughnut data={data} /></div>
          </section>
          <section id="module-4" className="module">
            <h1>Page Four</h1>
          </section>
        </div>
      </div>
    );
  }
