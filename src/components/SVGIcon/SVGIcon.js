import React from 'react';

const getPath = name => {
  switch (name) {
    case 'boy':
      return (
        <g>
          <path fill="#ffffff" d="M294.4,51v57.8h55.9l-57.9,57.9c-25.5-17.4-56.4-27.4-89.7-26.8C118.9,141.4,51.1,210.3,51,294.2 c-0.1,85.4,69.4,154.9,154.8,154.8c83.9-0.1,152.8-67.9,154.3-151.8c0.6-33.2-9.4-64.2-26.8-89.7l57.9-57.9v55.9H449V51H294.4z M205.6,391.2c-54.6,0-98.8-45.5-96.7-100.6c1.9-50.2,42.6-90.9,92.8-92.9c55.1-2.1,100.6,42.1,100.6,96.7 C302.3,347.8,258.9,391.2,205.6,391.2z"/>
        </g>
      );

    case 'girl':
      return (
        <path d="M291.3,50c-87.5,0-158.7,71.2-158.7,158.7c0,33.1,10.2,63.8,27.5,89.2l-24.6,24.6L92,279l-42,42l43.6,43.6L50,408l42,42 l43.5-43.5L179,450l42-42l-43.5-43.5l24.6-24.6c25.4,17.4,56.2,27.5,89.2,27.5c87.5,0,158.7-71.2,158.7-158.7S378.8,50,291.3,50z M291.3,308.1c-54.8,0-99.4-44.6-99.4-99.4s44.6-99.4,99.4-99.4s99.4,44.6,99.4,99.4C390.6,263.5,346.1,308.1,291.3,308.1z"/>
      );

    case 'google':
      return (
        <g>
          <path className="bg" fill="#DD4B39" d="M250,0c137.5,0,250,112.5,250,250S387.5,500,250,500S0,387.5,0,250S112.5,0,250,0L250,0z"/>
          <g className="logo">
            <path fill="#ffffff" d="M376.6,207.8v28.1h28.1V264h-28.1v28.1h-28.1V264h-28.1v-28.1h28.1v-28.1L376.6,207.8L376.6,207.8z"/>
            <path fill="#ffffff" d="M123.4,320.3c-37.5-37.5-37.5-103.1,1.6-140.6c28.1-28.1,68.8-34.4,104.7-20.3l14.1,7.8l15.6,10.9l-25,25 l-9.4-6.3c-21.9-14.1-53.1-10.9-73.4,9.4c-23.4,23.4-25,65.6,0,90.6c23.4,25,65.6,25,87.5,0c6.3-6.3,12.5-15.6,14.1-25v-3.1H197 v-31.3h89.1l1.6,7.8v21.9c-1.6,20.3-9.4,40.6-23.4,54.7C226.6,357.8,160.9,357.8,123.4,320.3L123.4,320.3z"/>
          </g>
        </g>
      );

    case 'facebook':
      return (
        <g>
          <circle className="bg" fill="#4267B2" cx="250" cy="250" r="250.5"/>
          <path className="logo" d="M254.5,192.1v52.6h-61.4v71.5h61.4V499h22.9c17.6-1.9,34.6-5.6, 50.9-11V316.3h61.4l9.5-71.5h-70.9v-45.6 c0-20.6,5.8-34.7,35.4-34.7h37.5v-63.8c-18.3-2-36.6-2.9-55-2.8C291.8,97.8,254.5,130.9,254.5,192.1z"/>
        </g>
      );

    case 'kakao':
      return (
        <g>
        <circle className="bg" fill="#FFCD00" cx="250" cy="250" r="250"/>
          <g className="logo">
            <polygon points="209.7,252.7 227,252.7 218.3,228.2 	"/>
            <path d="M250,123.9c-82.7,0-149.7,52.8-149.7,118c0,42.1,28,79.1,70.2,100c-2.3,7.9-14.7,50.9-15.2,54.2c0,0-0.3,2.5,1.3,3.5
              s3.6,0.2,3.6,0.2c4.7-0.7,54.6-35.7,63.2-41.8c8.6,1.2,17.5,1.9,26.6,1.9c82.7,0,149.7-52.8,149.7-118S332.7,123.9,250,123.9z
              M175.9,274.8c0,4.5-3.9,8.2-8.6,8.2c-4.8,0-8.6-3.7-8.6-8.2v-51.3h-13.5c-4.7,0-8.5-3.8-8.5-8.5s3.8-8.5,8.5-8.5h44.2
              c4.7,0,8.5,3.8,8.5,8.5s-3.8,8.5-8.5,8.5h-13.5L175.9,274.8L175.9,274.8z M248.5,281.8c-1.7,0.8-3.6,1.2-5.5,1.2
              c-3.6,0-6.4-1.5-7.2-3.8l-4.3-11.2h-26.3l-4.3,11.2c-0.8,2.3-3.6,3.8-7.2,3.8c-1.9,0-3.8-0.4-5.5-1.2c-2.4-1.1-4.7-4.1-2-12.3
              l20.7-54.4c1.5-4.1,5.9-8.4,11.5-8.5c5.6,0.1,10.1,4.4,11.5,8.5l20.6,54.3C253.1,277.7,250.8,280.7,248.5,281.8z M292.1,281.8
              h-27.7c-4.6,0-8.3-3.6-8.3-7.9v-58.6c0-4.8,4-8.6,8.8-8.6c4.9,0,8.8,3.9,8.8,8.6V266h18.4c4.6,0,8.3,3.6,8.3,7.9
              C300.4,278.3,296.7,281.8,292.1,281.8z M359.7,275.3c-0.3,2.3-1.5,4.3-3.4,5.7c-1.5,1.1-3.3,1.7-5.2,1.7c-2.7,0-5.3-1.2-6.9-3.4
              L324,252.5l-3,3v18.8c0,4.8-3.9,8.6-8.6,8.6c-4.8,0-8.6-3.9-8.6-8.6v-59.1c0-4.8,3.9-8.6,8.6-8.6c4.8,0,8.6,3.9,8.6,8.6v18.6
              l24.1-24.1c1.2-1.2,2.9-1.9,4.8-1.9c2.2,0,4.3,0.9,5.9,2.6c1.5,1.5,2.4,3.5,2.5,5.5s-0.6,3.9-1.9,5.3l-19.7,19.7l21.3,28.2
              C359.4,270.8,360,273,359.7,275.3z"/>
          </g>
        </g>
      );

    case 'naver':
      return (
        <g>
          <circle className="bg" fill="#2DB400" cx="250" cy="250" r="250.5"/>
          <polygon className="logo" fill="#ffffff" points="297.6,112.9 297.6,251.2 202.8,112.9 100.4,112.9 100.4,387.1 202.5,387.1 202.5,248.8 297.2,387.1 399.6,387.1 399.6,112.9 "/>
        </g>
      )

    case 'breast_left':
    case 'breast_milk':
      return (
        <g>
          <path className="breast" d="M304.8,398.8c-1.2-5.4-6.5-8.8-11.9-7.6c-16.5, 3.7-74.1-1.4-107.3-23.6c-29.6-19.7-48.9-65.5-52.5-74.6v-1 c1.3-2.7,2-5.8,2-9.1c0-2.5-0.4-5-1.2-7.2c11.3-8.5,37.6-32.9,83.4-99.1C277.9,89.2,283.5,61.3,284,58.4l-19.8-3v-0.2 c-0.2,1.1-5.8,27-63.4,110c-55.4,79.9-80.4,95.6-82.2,96.7c-0.6,0.3-1.2,0.6-1.7,1c-9.9,0.1-17.9,9-17.9,20c0,10.4,7.2,19,16.4,19.9 c5.9,14.4,26.5,59.7,59.1,81.4c29.8,19.9,76,28,104.7,28c7.3,0,13.5-0.5,18-1.5C302.6,409.6,306,404.2,304.8,398.8z"/>
          <path className="drop" d="M109,366L109,366L109,366L109,366L109,366c0.6,0.5,27,25.3,26,52s-25.4,27-26,27l0,0l0,0l0,0l0,0 c-0.6,0-25-0.3-26-27S108.4,366.6,109,366z"/>
        </g>
      );
    
    case 'breast':
    case 'breast_right':
      return (
        <g>
          <path className="breast" d="M401,282c0-11-8.1-20-18-20l0, 0c-0.5-0.4-1-0.7-1.6-1c-0.2-0.1-24.2-13.2-82.1-96.7c-57.6-83-63.2-109-63.4-110 v0.2l-19.8,3c0.4,2.9,6.1,30.8,66.7,118.2c45.9,66.2,72.1,90.6,83.4,99.1c-0.8,2.2-1.2,4.7-1.2,7.2c0,3.3,0.7,6.4,2,9.1v1 c-3.6,9.1-22.9,54.8-52.5,74.6c-33.2,22.1-90.8,27.2-107.3,23.6c-5.4-1.2-10.7,2.2-11.9,7.6s2.2,10.7,7.6,11.9 c4.5,1,10.7,1.5,18,1.5c28.7,0,74.9-8.1,104.7-28c32.6-21.7,53.2-67,59.1-81.4C393.8,301,401,292.4,401,282z"/>
	        <path className="drop" d="M391,366L391,366L391,366L391,366L391,366c-0.6,0.5-27,25.3-26,52s25.4,27,26,27l0,0l0,0l0,0l0,0 c0.6,0,25-0.3,26-27S391.6,366.6,391,366z"/>
        </g>
      );
    
    case 'pump':
    case 'pump_left':
      return (
        <g>
          <path className="drop" d="M231,191L231,191C231,191,231,191,231,191C231,191,231,191,231,191L231,191c-0.6,0.5-27,25.3-26,52 c1,26.7,25.4,27,26,27v0c0,0,0,0,0,0s0,0,0,0v0c0.6,0,25-0.3,26-27C258,216.3,231.6,191.6,231,191z"/>
          <path className="milk" d="M145.3,376.1c30.5-22.6,70.1-23.7,89.6-15.8c17.5,7.1,53.2-9.4,66.1-16.7c12.9-7.4,35.9-21.2,35.9-21.2 l7.5,42.3c5.5,31.4-15.4,61.3-46.8,66.8l-81.4,14.3c-31.4,5.5-61.3-15.4-66.8-46.8L145.3,376.1z"/>
          <path className="bottle" d="M338.8,33.8l-33.5,5.9c-1,0.2-24.7,4.6-36.7,27.7c-2.5,4.9-4.3,9.7-5.4,14.2l-122.9,21.7 c-3.8,0.4-9,2.7-13,7.7c-6.7,8.4-8.5,22.3-5.1,41.2c7.9,45,31.1,42.2,33.8,41.8l13.5-2.4l4.5,25.6l-3.9,0.7 c-33.5,5.9-56,38-50.1,71.5l20.8,117.7c5.9,33.5,38,56,71.5,50.1l93.1-16.4c33.5-5.9,56-38,50.1-71.5l-20.8-117.7 c-5.9-33.5-38-56-71.5-50.1l-2.2,0.4l-4.5-25.6l22.4-4c2.8,4.2,6.2,8.4,10.6,12.4c19.2,17.6,43,13.7,44,13.5l33.5-5.9 c5.4-1,9.1-6.1,8.1-11.6L350.4,41.9C349.4,36.5,344.2,32.8,338.8,33.8z M314.9,255l20.8,117.7c4,22.7-11.2,44.3-33.8,48.3 l-93.1,16.4c-22.7,4-44.3-11.2-48.3-33.8l-0.6-3.2l42.3-7.5c5.4-1,9.1-6.1, 8.1-11.6c-1-5.4-6.1-9.1-11.6-8.1l-42.3,7.5l-5.2-29.5 l26.6-4.7c5.4-1,9.1-6.1,8.1-11.6c-1-5.4-6.1-9.1-11.6-8.1l-26.6,4.7l-5.3-30.2l42.3-7.5c5.4-1,9.1-6.1,8.1-11.6 c-1-5.4-6.1-9.1-11.6-8.1l-42.1,7.4c-1.5-21,13.2-40.2,34.4-44l93.1-16.4C289.2,217.2,310.9,232.4,314.9,255z M241.1,205.4 l-47.6,8.4l-4.5-25.6l47.6-8.4L241.1,205.4z M153.3,174.1c-0.3-0.1-0.8-0.3-1.5-0.9c-2-1.6-6.9-7.2-10-24.5 c-3.2-18.3,0.2-24.7,1.5-25.6c0,0,0.1,0,0.1,0L261,102.3c0.2,4.2,0.7,7.1,0.9,8.1l1.6,9l-62,10.9c-5.4,1-9.1,6.1-8.1,11.6 s6.1,9.1,11.6,8.1l62-10.9l1.3,7.4c0.1,0.9,0.6,3.5,1.6,7L153.3,174.1z M353.4,174.4l-23.6,4.2c-0.6,0.1-15.3,2.3-27-8.5 c-12.6-11.6-14.7-26.1-14.7-26.2c0-0.2,0-0.4-0.1-0.5l-6.4-36.4c0-0.2-0.1-0.3-0.1-0.5c0-0.1-3-14.5,4.9-29.7 c7.3-14,21.6-17.1,22.5-17.2l23.6-4.2L353.4,174.4z"/>
        </g>
      );
    case 'pump_right':
      return (
        <g>
	        <path className="drop" d="M266,195.1L266,195.1C266,195.1,266,195.1,266,195.1C266,195.1,266,195.1,266,195.1L266,195.1 c0.6,0.5,27,25.3,26,52c-1,26.7-25.4,27-26,27v0c0,0,0,0,0,0s0,0,0,0v0c-0.6, 0-25-0.3-26-27C239,220.4,265.4,195.7,266,195.1z"/>
		      <path className="milk" d="M351.7,380.2c-30.5-22.6-70.1-23.7-89.6-15.8c-17.5, 7.1-53.2-9.4-66.1-16.7c-12.9-7.4-35.9-21.2-35.9-21.2 l-7.5,42.3c-5.5,31.4,15.4,61.3,46.8,66.8l81.4,14.3c31.4,5.5,61.3-15.4,66.8-46.8L351.7,380.2z"/>
	        <path className="bottle" d="M146.6,46l-24.5,138.9c-1,5.4,2.7,10.6,8.1,11.6l33.5,5.9c1,0.2,24.8,4.1,44-13.5c4.4-4,7.8-8.3,10.6-12.4 l22.4,4l-4.5,25.6l-2.2-0.4c-33.5-5.9-65.6,16.5-71.5,50.1l-20.8,117.7c-5.9,33.5,16.5,65.6,50.1,71.5l93.1,16.4 c33.5,5.9,65.6-16.5,71.5-50.1l20.8-117.7C383,260,360.6,227.9,327,222l-3.9-0.7l4.5-25.6l13.5,2.4c2.6,0.5,25.8,3.2,33.8-41.8 c3.3-18.9,1.6-32.7-5.1-41.2c-4-5.1-9.2-7.3-13-7.7L233.8, 85.7c-1.2-4.5-2.9-9.4-5.4-14.2c-12-23.1-35.7-27.5-36.7-27.7l-33.5-5.9 C152.7,36.9,147.5,40.6,146.6,46z M230.4,225.3l93.1,16.4c21.2,3.7,35.8,23,34.4,44l-42.1-7.4c-5.4-1-10.6,2.7-11.6,8.1 c-1,5.4,2.7,10.6,8.1,11.6l42.3,7.5l-5.3,30.2l-26.6-4.7c-5.4-1-10.6,2.7-11.6,8.1c-1,5.4,2.7,10.6,8.1,11.6l26.6,4.7l-5.2,29.5 l-42.3-7.5c-5.4-1-10.6,2.7-11.6,8.1s2.7,10.6,8.1,11.6l42.3,7.5l-0.6,3.2c-4,22.7-25.7,37.8-48.3,33.8l-93.1-16.4 c-22.7-4-37.8-25.7-33.8-48.3l20.8-117.7C186.1,236.5,207.8,221.3,230.4,225.3z M260.4,183.9l47.6,8.4l-4.5,25.6l-47.6-8.4 L260.4,183.9z M227.1,157.7c1-3.5,1.5-6.1,1.6-7l1.3-7.4l62,10.9c5.4,1,10.6-2.7,11.6-8.1c1-5.4-2.7-10.6-8.1-11.6l-62-10.9l1.6-9 c0.2-1,0.7-3.9,0.9-8.1l117.7,20.7c0,0,0.1,0,0.1,0c1.3,1,4.7,7.3,1.5,25.6c-3,17.2-8,22.9-10,24.5c-0.7,0.6-1.2,0.8-1.5,0.9 L227.1,157.7z M164.5,59.3l23.6,4.2c0.9,0.2,15.2,3.2,22.5,17.2c7.9,15.2,4.9,29.6,4.9,29.7c0,0.2-0.1,0.3-0.1,0.5l-6.4,36.4 c0,0.2-0.1,0.4-0.1,0.5c0,0.1-2.1,14.6-14.7,26.2c-11.7,10.8-26.4,8.6-27,8.5l-23.6-4.2L164.5,59.3z"/>
        </g>
      );

    case 'bottle':
    case 'formula_milk':
      return (
        <g>
          <g className="bottle">
            <path d="M335.6,208.5c5.5-4.4,9-11.2,9.1-18.7c0,0,0-0.1,0-0.1v-25.3c0-13.4-10.9-24.3-24.3-24.3h-2.8
              c-0.9-8.4-3.7-19.9-11.3-27.6c-8.8-8.8-16.2-13.9-23.7-16.3c0.1-0.2,0.1-0.4,0.2-0.5c0.3-0.8,0.6-1.6,0.7-2.5
              c0.2-1.9,2.1-18.6-8.2-30.4c-4.1-4.7-11.9-10.4-25.3-10.4c-13.4,0-21.1,5.6-25.3,10.4c-10.3,11.8-8.4,28.5-8.2,30.4
              c0.1,0.9,0.3,1.6,0.7,2.4c0.1,0.2,0.1,0.4,0.2,0.6c-7.5,2.4-14.9,7.5-23.7,16.3c-7.7,7.7-10.4,19.2-11.3,27.6h-1.7
              c-13.4,0-24.3,10.9-24.3,24.3v25.3c0,7.4,3.3,14,8.5,18.4c-13.6,11.2-22.3,28.1-22.3,47l0,131.7c0,33.5,27.3,60.8,60.8,60.8l93.2,0
              c33.5,0,60.8-27.3,60.8-60.8l0-131.7C357.4,236.4,348.9,219.7,335.6,208.5z M207.7,126.4c9.7-9.7,14.6-11.5,18.1-12
              c4.4-0.6,8-3,10.1-6.8c3.5-6.2,1.6-13.9,0.1-18.1c-0.2-3,0.1-9.9,3.5-13.8c0.8-0.9,3.2-3.6,10.4-3.6c7.2,0,9.6,2.7,10.4,3.6
              c3.4,3.9,3.8,10.6,3.6,13.8c-1.5,4.2-3.4,11.9,0.1,18.1c2.1,3.7,5.7,6.2,10.1,6.8c3.5,0.5,8.4,2.3,18.1,12
              c3.1,3.1,4.6,8.6,5.4,13.6l-95.4,0C203.1,135,204.6,129.4,207.7,126.4z M180.7,194.3c-2.6,0-4.6-2.1-4.6-4.6l0-25.3
              c0-2.6,2.1-4.6,4.6-4.6l9.8,0c0.4,0.1,0.9,0.1,1.3,0.1l116.3,0c0.4,0,0.9,0,1.3-0.1l10.9,0c2.6,0,4.6,2.1,4.6,4.6l0,25.2
              c-0.1,2.6-2.2,4.7-4.7,4.7l-23.7,0l-93.2,0L180.7,194.3z M337.7,386.8c0,22.7-18.4,41.1-41.1,41.1l-93.2,0
              c-19.9,0-36.5-14.2-40.3-33l41.6,0c5.4,0,9.9-4.4,9.9-9.9c0-5.4-4.4-9.9-9.9-9.9l-42.4,0l0-44.3l26.6,0c5.4,0,9.9-4.4,9.9-9.9
              c0-5.4-4.4-9.9-9.9-9.9h-26.6l0-44.3l42.4,0c5.4,0,9.9-4.4,9.9-9.9c0-5.4-4.4-9.9-9.9-9.9l-41.6,0c3.8-18.8,20.4-33,40.3-33l93.2,0
              c22.7,0,41.1,18.4,41.1,41.1L337.7,386.8z"/>
            <g className="milk">
              <path d="M299.3,119.4c-9.9-9.9-16.8-13.8-23.7-14.8c-6.9-1-2-12.8-2-12.8s3.9-29.6-23.7-29.6s-23.7,29.6-23.7,29.6 s4.9,11.8-2,12.8c-6.9,1-13.8,4.9-23.7,14.8c-9.9,9.9-8.9,30.5-8.9,30.5l58.1,0l58.1,0C308.1,150,309.1,129.3,299.3,119.4z"/>
              <path d="M343.6,  398.7c-55.3-26.6-32.8-39.5-56.1-67.5c-26.3-33.3-50.1-22.5-63.6-35.3c-26.8-25.3-68.7-48.4-68.7-48.4 l1.3-13.5c8.4-22.7,21.4-27.9,52.8-27.9l81.4,0c31.4,0,56.9,25.4,56.9,56.9L343.6,398.7z"/>
            </g>
          </g>
          <path className="drop" d="M385.8,315.9L385.8,315.9C385.8,315.9,385.8,315.9,385.8,315.9C385.8,315.9,385.7,315.9,385.8,315.9
            L385.8,315.9c-0.6,0.5-27,25.3-26,52c1,26.7,25.4,27,26,27v0c0,0,0,0,0,0s0,0,0,0v0c0.6,0,25-0.3,26-27
            C412.7,341.1,386.3,316.4,385.8,315.9z"/>
        </g>
      );

    case 'babyfood':
      return (
        <g>
          <path d="M195.9,99c-83.3,0-151,67.7-151,151s67.7,151,151,151s151-67.7,151-151S279.2,99,195.9,99z M195.9,381
            c-72.2,0-131-58.8-131-131s58.8-131,131-131s131,58.8,131,131S268.1,381,195.9,381z"/>
          <path d="M195.9,151c-54.6,0-99,44.4-99,99s44.4,99,99,99s99-44.4,99-99S250.5,151,195.9,151z M195.9,329
            c-43.6,0-79-35.4-79-79s35.4-79,79-79s79,35.4,79,79S239.5,329,195.9,329z"/>
          <path d="M455.1,160.8c0-39.4-22.7-70.3-51.6-70.3s-51.6,30.9-51.6,70.3c0,22.2,8.5,50,24.4,62.6
            c0.6,8.8,1.7,27.8,1.7,42.1c0,7.8-1.1,26.3-2.2,46c-2.4,41.7-3.4,62-2.2,68.3c3.3,18,15.3,29.7,30.4,29.7c0.1,0,0.2,0,0.3,0
            c0.1,0,0.2,0,0.3,0c15.2,0,27.1-11.7,30.4-29.7c1.1-6.2,0-26.2-2.5-67c-1.3-20.2-2.5-39.4-2.5-47.3c0-14.6,2.1-34.4,3.1-42.6
            C448.2,210.4,455.1,182.9,455.1,160.8z M415.4,376.2c-0.2,1.4-2.7,13.3-10.8,13.3c-0.1,0-0.2,0-0.3,0c-0.1,0-0.2,0-0.3,0
            c-8.1,0-10.5-11.9-10.8-13.3c-0.8-5.4,1.2-40.4,2.5-63.6c1.1-20,2.2-38.8,2.2-47.2c0-16.5-1.3-38.3-1.8-45.8c0.7-3.9-1-8-4.5-10.2
            c-0.4-0.3-0.8-0.5-1.3-0.7c-10.9-6.3-18.5-30.1-18.5-48c0-27.7,14.2-50.3,31.6-50.3S435,133,435,160.7c0,24-8.6,43.6-16.6,47.9
            c-3.7,2-5.6,6.1-5.1,10.1c-0.9,7.2-3.4,29.7-3.4,46.7c0,8.6,1.2,28,2.5,48.5C414,336.7,416.1,370.9,415.4,376.2z"/>
        </g>
      );

    case 'diaper':
      return (
        <path d="M446,174h-9v-21c0-5.5-4.5-10-10-10H250H73c-5.5,0-10,4.5-10,10v21h-9c-5.5,0-10,4.5-10,10v58 c0,5.5,4.5,10,10,10h9v8.6c-0.5,7-3.3,71.4,62.6,126.1c58.7,48.8,107.7,52.4,120.8,52.4c1.9,0,3.1-0.1,3.3-0.1c0.1,0,0.2,0,0.2,0 c0.1,0,0.2,0,0.2,0c0.3,0,1.4,0.1,3.3,0.1c13.1,0,62.1-3.6,120.8-52.4c65.9-54.7,63.1-119.1,62.6-126.1V252h9c5.5,0,10-4.5,10-10 v-58C456,178.5,451.5,174,446,174z M436,232h-80.8c-1.2-0.1-6.7-0.8-11.8-3.5c-6.5-3.4-9.5-8.3-9.5-15.5s3-12.1,9.5-15.5 c5.2-2.7,10.6-3.4,11.8-3.5H436V232z M64,232v-38h80.8c1.2,0.1,6.7,0.8,11.8,3.5c6.5,3.4,9.5,8.3,9.5,15.5s-3,12.1-9.5,15.5 c-5.2,2.7-10.6,3.4-11.8,3.5H64z M89.5,302.7c3-3.6,12.5-11.7,36.5-11.7c33.7,0,59.3,26.7,66.7,45.6c7.1,18,4.1,52.9-1.6,68.3 c-15.3-7-33.3-17.5-52.7-33.6C114.7,351.7,98.3,328.6,89.5,302.7z M361.6,371.3c-19.4,16.1-37.5,26.7-52.7,33.6 c-5.7-15.4-8.6-50.3-1.6-68.3c7.4-19,33-45.6,66.7-45.6c24,0,33.5,8.1,36.5,11.7C401.7,328.6,385.3,351.7,361.6,371.3z M417,261.9 c0,0.1,0.6,7.6-1.2,19.3c-8.5-5.4-21.7-10.2-41.8-10.2c-40.6,0-74.2,30.1-85.3,58.4c-8.6,22.1-6.2,61.8,1.6,82.9 c-2.4,0.8-4.6,1.5-6.7,2.1c-19.5,5.5-31.8,4.7-31.8,4.7c-0.6,0-1.2,0-1.7,0c-0.6-0.1-1.2-0.1-1.8,0c-0.1,0-12.4,0.7-31.9-4.7 c-2.1-0.6-4.4-1.3-6.7-2.1c7.9-21.1,10.3-60.8,1.6-82.9C200.2,301.1,166.6,271,126,271c-20.1,0-33.3,4.8-41.8,10.2 C82.4,269.5,83,262,83,261.9c0-0.3,0-0.6,0-0.9v-9h62.2c0.2,0,0.4,0,0.6,0c1-0.1,10-0.8,19.2-5.4c13.5-6.8,20.9-18.7,20.9-33.6 s-7.4-26.8-20.9-33.6c-9.2-4.7-18.3-5.4-19.2-5.4c-0.2,0-0.4,0-0.6,0H83v-11h167h167v11h-62.2c-0.2,0-0.4,0-0.6,0 c-1,0.1-10,0.8-19.2,5.4c-13.5,6.8-20.9,18.7-20.9,33.6s7.4,26.8,20.9,33.6c9.2,4.7,18.3,5.4,19.2,5.4c0.2,0,0.4,0,0.6,0H417v9 C417,261.3,417,261.6,417,261.9z"/>
      );

    case 'sleep':
      return (
        <g>
          <path className="mouth" d="M230.5,384.7c-8.2,0-14.8-6.6-14.8-14.8s6.6-14.8,14.8-14.8s14.8,6.6,14.8,14.8S238.6,384.7,230.5,384.7z"/>
          <path className="zmark-small" d="M360,168h-28.1c-3.8,0-7.2-2.1-8.9-5.5s-1.4-7.4,0.9-10.4l16.3-22.1h-8.3c-5.5,0-10-4.5-10-10s4.5-10,10-10H360 c3.8,0,7.2,2.1,8.9,5.5s1.4,7.4-0.9,10.4L351.7,148h8.3c5.5,0,10,4.5,10,10S365.5,168,360,168z"/>
          <path className="zmark" d="M437.5,137h-46.6c-3.8,0-7.2-2.1-8.9-5.5s-1.4-7.4,0.9-10.4L417.7,74H391c-5.5,0-10-4.5-10-10s4.5-10,10-10 h46.6c3.8,0,7.2,2.1,8.9,5.5s1.4,7.4-0.9,10.4L410.7,117h26.7c5.5,0,10,4.5,10,10S443,137,437.5,137z"/>
          <path className="face" d="M373.7,256.9c-9.1-29.9-26.9-57.1-50.6-77.2c-27-22.8-59-34.9-92.6-34.9c-33.6,0-65.7,12.1-92.6,34.9 c-23.7,20-41.4,47.2-50.5,76.9c-18.6,3.3-33.8,21.5-33.8,42.1c0,18.2,12.4,32.3,30.4,35.9c14.7,65.3,73.9,110.3,146.6,110.3 s132-45.1,146.6-110.6c17.4-4,29.4-18,29.4-35.7C406.5,278.7,391.8,260.7,373.7,256.9z M368.2,315.7c-0.1,0-0.2,0-0.2,0 c-0.2,0-0.5,0-0.7,0.1c-0.1,0-0.2,0-0.3,0.1c-0.2,0-0.4,0.1-0.6,0.1c-0.1,0-0.3,0.1-0.4,0.1c-0.2,0-0.3,0.1-0.5,0.1 c-0.2,0.1-0.3,0.1-0.5,0.2c-0.1,0.1-0.3,0.1-0.4,0.2c-0.2,0.1-0.3,0.2-0.5,0.3c-0.1,0.1-0.2,0.1-0.3,0.2c-0.2,0.1-0.3,0.2-0.5,0.3 c-0.1,0.1-0.2,0.1-0.3,0.2c-0.1,0.1-0.3,0.2-0.4,0.3c-0.1,0.1-0.2,0.2-0.3,0.3s-0.2,0.2-0.4,0.3c-0.1,0.1-0.2,0.2-0.3,0.3 c-0.1,0.1-0.2,0.2-0.3,0.3c-0.1,0.1-0.2,0.3-0.3,0.4c-0.1,0.1-0.2,0.2-0.3,0.4c-0.1,0.1-0.2,0.3-0.3,0.4c-0.1,0.1-0.2,0.3-0.2,0.4 c-0.1,0.1-0.2,0.3-0.2,0.4c-0.1,0.2-0.1,0.3-0.2,0.5c-0.1,0.1-0.1,0.3-0.2,0.4c-0.1,0.2-0.1,0.4-0.2,0.6c0,0.1-0.1,0.2-0.1,0.3 c-0.1,0.2-0.1,0.5-0.2,0.7c0,0.1,0,0.2-0.1,0.2c-10.1,59.5-62.9,101.1-128.3,101.1s-118.2-41.6-128.3-101.1c0-0.3-0.1-0.6-0.2-0.8 c0-0.1,0-0.1,0-0.2c-0.1-0.3-0.2-0.5-0.2-0.7c0-0.1, 0-0.1-0.1-0.2c-0.1-0.2-0.1-0.3-0.2-0.5c-0.6-1.3-1.5-2.5-2.5-3.4 c-0.1-0.1-0.3-0.2-0.4-0.3c-0.1-0.1-0.2-0.2-0.3-0.3c0,0,0,0-0.1,0c-0.7-0.5-1.4-0.8-2.2-1.1c-0.1,0-0.2-0.1-0.3-0.1 c-0.1,0-0.2,0-0.2-0.1c-0.2-0.1-0.5-0.1-0.7-0.2h-0.1c-0.3-0.1-0.6-0.1-0.9-0.2h-0.1c-0.3,0-0.6-0.1-0.9-0.1 c-9.5-0.2-19-5.5-19-16.9c0-11.6,9.6-22.6,19.7-22.6c0.4,0,0.8,0,1.2,0c0.1,0,0.2,0,0.3,0c0.1,0,0.2,0,0.3,0c0.1,0,0.3,0,0.4,0H96 c3-0.1,5.7-1.6,7.5-3.9c0.2-0.2,0.3-0.5,0.5-0.7c0-0.1,0.1-0.1,0.1-0.2c0.1-0.2,0.2-0.4,0.3-0.6c0-0.1,0.1-0.2,0.1-0.3 c0.1-0.2,0.2-0.4,0.2-0.5c0-0.1,0.1-0.2,0.1-0.3c0.1-0.2,0.1-0.4,0.2-0.5c0-0.1,0.1-0.2,0.1-0.3c7.3-28.6,23.7-54.7,46.1-73.7 c14.4-12.2,30.4-20.8,47.4-25.7c-6.2,8.4-9.1,17.7-8.4,27.5c1.2,16.1,10.4,29.6,24.6,36.2c5.5,2.5,11.3,3.8,16.9,3.8 c7.7,0,15.1-2.3,21.3-6.7c11.1-8,16.8-19.2,15.6-30.7c-0.9-9.1-6.2-16.8-13.6-20.1c-5-2.2-11,0-13.2,5.1c-2.2,5,0,11,5.1,13.2 c0.4,0.2,1.6,1.6,1.8,4.1c0.3,4.2-2.3,8.5-7.5,12.3c-5,3.6-11.7,4-18.1,1c-7.6-3.5-12.5-10.8-13.1-19.6 c-1.4-18.3,24.3-29.3,24.6-29.4c0.7-0.3,1.3-0.6,1.9-1c26.8,1.3,52.2,11.6,74,30c22.4,19,38.8,45.1,46.1,73.7c0,0.2,0.1,0.4,0.2,0.6 c0,0.1,0,0.1,0.1,0.2c1.4,4.1,5.2,6.8,9.5,6.8h0.1h0.1h0.6c10.2,0,19.7,11,19.7,22.6C386.5,310.6,376.6,315.2,368.2,315.7z"/>
          <path className="eyes" d="M199.7,281c-5.1-2.1-11,0.3-13.1,5.4c0,0.1-4.2,9.6-13,10.1c-8.8-0.5-13-10-13-10.1c-2.1-5.1-7.9-7.5-13.1-5.4 c-5.1,2.1-7.5,7.9-5.4,13.1c3.4,8.2,13.8,22.1,31.5,22.5c17.7-0.4,28.1-14.2,31.5-22.5C207.3,288.9,204.8,283.1,199.7,281z"/>
          <path className="eyes" d="M311.7,281c-5.1-2.1-11,0.3-13.1,5.4c0,0.1-4.2,9.6-13,10.1c-8.8-0.5-13-10-13-10.1c-2.1-5.1-7.9-7.5-13.1-5.4 c-5.1,2.1-7.5,7.9-5.4,13.1c3.4,8.2,13.8,22.1,31.5,22.5c17.7-0.4,28.1-14.2,31.5-22.5C319.3,288.9,316.8,283.1,311.7,281z"/>
        </g>
      );

    case 'growth':
      return (
        <path d="M400.6,315.1l-75.5-75.5l76.9-76.9c9.5-9.7,9.5-25.3-0.1-34.9L372.1,98c-9.7-9.5-25.3-9.5-34.9,0.1L260.5,175 l-75.6-75.6c-11.6-11.6-30.5-11.6-42,0L99.3,143c-11.6,11.6-11.6,30.5,0,42l75.6,75.6L137.4,298c-1.9,1.9-2.9,4.2-3.1,6.6l-42.6,90 c-1.8,3.8-1,8.3,1.9,11.3c1.9,1.9,4.5,3,7.1,3c1.4,0,2.8-0.3,4.2-0.9l94-43c1.5-0.7,2.7-1.7,3.7-2.9l36.9-36.9l75.5,75.5 c5.8,5.8,13.4,8.7,21,8.7s15.2-2.9,21-8.7l43.7-43.7c5.7-5.7,8.7-13.2,8.7-21.2C409.4,328,406.3,320.6,400.6,315.1z M351.5,112.3 c1.8-1.8,4.8-1.8,6.7,0l29.7,29.7c1.8,1.8,1.8,4.8,0,6.7l-16.6,16.6l-36.4-36.4L351.5,112.3z M113.4,170.8c-3.8-3.8-3.8-10,0-13.8 l43.6-43.6c1.9-1.9,4.4-2.8,6.9-2.8s5,0.9,6.9,2.8l2.2,2.2l-5.2,5.2c-3.9,3.9-3.9,10.2,0,14.1c2,2,4.5,2.9,7.1,2.9s5.1-1,7.1-2.9 l5.2-5.2l11,11L178.9,160c-3.9,3.9-3.9,10.2,0,14.1c2,1.9,4.5,2.9,7.1,2.9s5.1-1,7.1-2.9l19.1-19.2l11,11l-5.2,5.2 c-3.9,3.9-3.9,10.2,0,14.1c2,2,4.5,2.9,7.1,2.9s5.1-1,7.1-2.9l5.2-5.2l9,9L189,246.5L113.4,170.8z M140.7,369.8l-10.2-10.2 l17.3-36.5l15.5,15.5l14.3,14.3L140.7,369.8z M194.7,341.8l-36.4-36.4L320.7,143l36.4,36.4L194.7,341.8z M386.6,342.9l-43.7,43.7 c-3.8,3.8-10,3.8-13.8,0l-75.5-75.5l57.3-57.4l9.7,9.7l-5.2,5.2c-3.9,3.9-3.9,10.2,0,14.1c2,2,4.5,2.9,7.1,2.9s5.1-1,7.1-2.9 l5.2-5.2l11,11l-19.2,19.1c-3.9,3.9-3.9,10.2,0,14.1c2,2,4.5,2.9,7.1,2.9s5.1-1,7.1-2.9l19.2-19.2l11,11l-5.2,5.2 c-3.9,3.9-3.9,10.2,0,14.1c2,2,4.5,2.9,7.1,2.9s5.1-1,7.1-2.9l5.2-5.2l1.4,1.4l0.1,0.1c1.8,1.8,2.8,4.1,2.8,6.7 C389.5,338.6,388.5,341.1,386.6,342.9z"/>
      );

    case 'pee':
      return (
        <g>
          <path d="M375.2,239.8c-23.7-19.5-103.3-1.5-140.3-11.6c-0.3,1.8-0.5,3.7-0.7,5.5c-0.7,5.6-5.5,9.8-11,9.8 c-0.4,0-0.9,0-1.4-0.1c-6.1-0.7-10.4-6.3-9.7-12.4c0.5-3.9,1-7.7,1.6-11.4c0.3-1.6,0.8-3,1.7-4.3l0,0 c-22.4-26.2-40.6-78.6-86.2-70.4c-49.8,8.9-76.4,90-62.6,127.9c13.8,37.8,33.7,121.8,79.7,145.7c46,23.9,55.5,22.7,77.9,14.1 c29.5-11.3,49.5-42,78.8-41s66.9,4.2,89.5-27C414.9,333.3,402.4,262.1,375.2,239.8z M221.3,299c-0.1,0-0.2,0-0.4,0 c-6,0-10.9-4.8-11.1-10.8c-0.1-3.8-0.2-7.7-0.2-11.4c0-6.1,4.9-11.2,11.1-11.2c0,0,0,0,0.1,0c6.1,0,11.1,4.9,11.1,11.1 c0,3.5,0.1,7.2,0.2,10.8C232.2,293.7,227.4,298.8,221.3,299z"/>
          <path d="M214.3,217.3c-0.1,0.3-0.2,0.6-0.3,1C214,218,214.1,217.7,214.3,217.3z"/>
          <path d="M213.9,218.5c-0.1,0.4-0.2,0.8-0.2,1.1C213.7,219.2,213.8,218.8,213.9,218.5z"/>
          <path d="M226.4,210.4c-5.3-0.8-10.2,2.1-12.1,6.9c0.3-0.7,0.6-1.4,1-2c2.1,2.4,4.1,4.6,6.3,6.5 c3.3,2.9,7.8,5,13.2,6.4l0,0c0.2-1.7,0.5-3.4,0.8-5.1C236.6,217.1,232.5,211.4,226.4,210.4z"/>
          <path d="M244.6,158c-5.6-2.5-12.2,0-14.7,5.6c-1.6,3.5-3.1,7.2-4.5,10.9c-2.2,5.7,0.7,12.2,6.5,14.3 c1.3,0.5,2.6,0.7,3.9,0.7c4.5,0,8.7-2.7,10.4-7.2c1.2-3.3,2.6-6.5,4-9.6C252.7,167.1,250.2,160.5,244.6,158z"/>
          <path d="M426,61.8c-3.9,0-7.7,0-11.4,0.1c-6.1,0.2-11,5.3-10.8,11.4c0.2,6,5.1,10.8,11.1,10.8c0.1,0,0.2,0,0.3,0 c3.5-0.1,7.2-0.1,10.8-0.1c6.1,0,11.1-5,11.1-11.1S432.2,61.8,426,61.8z"/>
          <path d="M368.9,66c-3.9,0.6-7.7,1.3-11.4,2.1c-6,1.2-9.9,7.1-8.7,13.1c1.1,5.3,5.7,8.9,10.9,8.9 c0.7,0,1.5-0.1,2.2-0.2c3.4-0.7,6.9-1.3,10.5-1.9c6.1-1,10.2-6.7,9.2-12.7C380.7,69.2,375,65,368.9,66z"/>
          <path d="M312.8,81.9c-3.6,1.6-7.2,3.3-10.7,5.1c-5.5,2.8-7.6,9.5-4.8,15c2,3.8,5.9,6,9.9,6c1.7,0,3.5-0.4,5.1-1.2 c3-1.6,6.2-3.1,9.4-4.5c5.6-2.5,8.2-9,5.7-14.6C325,82,318.5,79.4,312.8,81.9z"/>
          <path d="M263.5,114.7c-2.8,2.8-5.6,5.7-8.2,8.7c-4,4.6-3.5,11.7,1.1,15.7c2.1,1.8,4.7,2.7,7.3,2.7 c3.1,0,6.2-1.3,8.4-3.8c2.2-2.6,4.6-5.1,7-7.4c4.4-4.3,4.4-11.3,0.1-15.7C275,110.5,267.9,110.4,263.5,114.7z"/>
        </g>
      );

    case 'poo':
      return (
        <g>
          <path d="M405,282.1c-1.4-0.8-2.9-1.6-4.4-2.3c5.5-10.9,5.2-23.4, 5.1-25.3v-0.1c-2.1-36.6-30-51.1-53.1-56.8 c-4.5-1.1-9.1-2-13.8-2.7c15.5-15.3,19.1-32.9,19.1-55c0-11.1-3.5-28.5-13.2-44c-11.2-18-27.4-28.3-46.8-29.9 c-5.4-0.4-10.2,3.5-10.8,8.9c-0.2,1.6-4.6,39.6-37.8,45.2c-34.8,5.9-81.9,13.8-84.7,72.7c-20.1,4.1-35.3,13.2-46.3,21 c-10.4,7.4-16.9,20.1-18.5,35.9c-1,10.7,0.5,22,4.1,32c-0.3,0.1-0.6,0.3-0.9,0.4c-28.8,13.2-43.4,35-43.4,64.8 c0,27.7,9.8,50.7,28.4,66.4c15.7,13.3,36.9,20.6,59.6,20.6h160.8c46.1,0,75.7-5,96.2-16.1c24.2-13.2,36-35.4,36-67.9 C440.5,317.6,428.9,295.4,405,282.1z M394.9,400.3c-17.4,9.4-44.1,13.7-86.6,13.7H147.5c-17.9,0-34.5-5.6-46.6-15.9 c-14.2-12-21.4-29.2-21.4-51.1s10.1-36.7,31.8-46.7c21-9.6,52.3-14.3,95.5-14.3c5.5,0,10-4.5,10-10s-4.5-10-10-10 c-34.6,0-62.4,3-84.1,9c-6.2-17-3.4-37.4,7.1-44.9c16-11.3,38.8-23.7,73.5-18.3c5.5,0.8,10.6-2.9,11.4-8.3 c0.9-5.5-2.9-10.6-8.3-11.4c-7.7-1.2-14.9-1.6-21.7-1.5c3-36.9,28.2-44,67.9-50.7c20.2-3.4,36-15.5,45.8-35 c3.1-6.3,5.2-12.3,6.5-17.2c9.1,2.9,16.8,9.2,22.8,18.9c7.5,12,10.1,25.5,10.1,33.5c0,26-5.7,37.6-24.5,49.6c-1.3,0.8-2.4,2-3.2,3.2 c-12.6-0.2-24.4,0.3-34,0.7c-5.9,0.3-11,0.5-14.9,0.5c-5.5,0-10,4.5-10,10s4.5,10,10,10c4.3,0,9.6-0.2,15.8-0.5 c51.3-2.3,106.1-1.1,108.7,42c0.2,3.9-0.8,12.7-4.2,17.4c-17.7-4.7-40.2-6.9-69.5-6.9c-5.5,0-10,4.5-10,10s4.5,10,10,10 c40.1,0,66.6,4.3,83.3,13.6c17.4,9.7,25.2,25.2,25.2,50.4C420.5,375.2,412.6,390.7,394.9,400.3z"/>
        </g>
      );

    case 'peepoo':
      return (
        <g>
          <path d="M239.7,158c-14.3-11.8-62.5-0.9-84.9-7c-0.2,1.1-0.3,2.2-0.4,3.3c-0.4,3.4-3.3,5.9-6.7,5.9 c-0.3,0-0.5,0-0.8,0c-3.7-0.4-6.3-3.8-5.9-7.5c0.3-2.3,0.6-4.7,1-6.9c0.2-1,0.5-1.8,1-2.6l0,0c-13.5-15.8-24.6-47.5-52.1-42.6 C60.8,106,44.7,155.1,53,177.9c8.4,22.9,20.4,73.6,48.2,88.1s33.6,13.7,47.1,8.5c17.8-6.8,29.9-25.4,47.6-24.8 c17.7,0.6,40.4,2.6,54.1-16.3C263.7,214.6,256.1,171.5,239.7,158z M146.6,193.8c-0.1,0-0.1,0-0.2,0c-3.6,0-6.6-2.9-6.7-6.5 c-0.1-2.3-0.1-4.6-0.1-6.9c0-3.7,3-6.7,6.7-6.8l0,0c3.7,0,6.7,3,6.7,6.7c0,2.1,0.1,4.3,0.1,6.6 C153.3,190.6,150.3,193.7,146.6,193.8z"/>
          <path d="M142.4,144.5c-0.1,0.2-0.1,0.4-0.2,0.6C142.3,144.8,142.3,144.6,142.4,144.5z"/>
          <path d="M142.2,145.1c-0.1,0.2-0.1,0.5-0.2,0.7C142.1,145.6,142.1,145.3,142.2,145.1z"/>
          <path d="M149.7,140.3c-3.2-0.5-6.2,1.3-7.3,4.2c0.2-0.4,0.4-0.8,0.6-1.2c1.2,1.4,2.5,2.8,3.8,3.9c2,1.7,4.7,3,8,3.9 l0,0c0.1-1,0.3-2.1,0.5-3.1C155.9,144.3,153.4,140.8,149.7,140.3z"/>
          <path d="M160.8,108.6c-3.4-1.5-7.4,0-8.9,3.4c-1,2.1-1.9,4.3-2.7,6.6c-1.3,3.5,0.4,7.4,3.9,8.7 c0.8,0.3,1.6,0.4,2.4,0.4c2.7,0,5.3-1.7,6.3-4.4c0.8-2,1.6-3.9,2.4-5.8C165.7,114.1,164.1,110.1,160.8,108.6z"/>
          <path d="M270.5,50.4c-2.3,0-4.6,0-6.9,0.1c-3.7,0.1-6.6,3.2-6.5,6.9s3.1,6.5,6.7,6.5c0.1,0,0.1,0,0.2,0 c2.1-0.1,4.3-0.1,6.5-0.1c3.7,0,6.7-3,6.7-6.7C277.2,53.4,274.2,50.4,270.5,50.4z"/>
          <path d="M235.9,52.9c-2.3,0.4-4.6,0.8-6.9,1.2c-3.6,0.7-6,4.3-5.3,7.9c0.6,3.2,3.5,5.4,6.6,5.4c0.4,0,0.9,0,1.3-0.1 c2.1-0.4,4.2-0.8,6.3-1.1c3.7-0.6,6.2-4,5.6-7.7C243,54.9,239.6,52.4,235.9,52.9z"/>
          <path d="M202,62.5c-2.2,1-4.4,2-6.5,3.1c-3.3,1.7-4.6,5.8-2.9,9.1c1.2,2.3,3.5,3.6,6,3.6c1,0,2.1-0.2,3.1-0.8 c1.8-0.9,3.7-1.9,5.7-2.7c3.4-1.5,5-5.5,3.5-8.9C209.4,62.6,205.4,61.1,202,62.5z"/>
          <path d="M172.2,82.4c-1.7,1.7-3.4,3.5-5,5.3c-2.4,2.8-2.1,7.1,0.7,9.5c1.3,1.1,2.8,1.6,4.4,1.6 c1.9,0,3.8-0.8,5.1-2.3c1.3-1.6,2.8-3.1,4.2-4.5c2.6-2.6,2.7-6.9,0.1-9.5C179.1,79.8,174.8,79.8,172.2,82.4z"/>
          <path d="M425.4,347.4c2.4-6.7,2.2-13.3,2.2-14.5c-0.8-14-7.7-32.1-36.3-39.1c-0.9-0.2-1.8-0.4-2.6-0.6 c6.9-9.3,8.7-19.9,8.7-32.1c0-7.5-2.3-19.2-8.9-29.7c-7.6-12.2-19.1-19.5-32.3-20.6c-5.5-0.5-10.2,3.5-10.8,8.9 c-0.1,0.9-2.6,22.1-20.7,25.2c-21.4,3.6-52.9,8.9-56.3,46.3c-12,2.9-21.1,8.5-27.8,13.3c-7.4,5.3-12.1,14.2-13.1,25.3 c-0.6,6.2,0,12.6,1.8,18.6c-17.8,9-27.1,23.8-27.1,43c0,40.2,30.7,58.5,59.2,58.5h101.3c45.2,0,87-6.9,87-56.6 C449.5,371.8,441.4,356.4,425.4,347.4z M415.3,421.7c-10.2,5.6-27,8.2-52.8,8.2H261.2c-18.1,0-39.2-10.1-39.2-38.5 c0-16.2,8.7-34.7,76.5-34.7c5.5,0,10-4.5,10-10s-4.5-10-10-10c-20.3,0-37,1.6-50.5,4.9c-2.1-8.7-0.2-17.8,4.1-20.8 c6.6-4.7,15.2-9.7,26.8-11.2c0.3,0,0.7-0.1,1-0.1c4.8-0.5,10.1-0.5,15.9,0.4c5.4,0.9,10.6-2.9,11.4-8.3c0.9-5.5-2.9-10.6-8.3-11.4 c-3.5-0.5-6.9-0.9-10.1-1c2.9-16.5,15.4-20.6,39.2-24.6c20-3.4,30.3-18.6,34.7-31.4c11,6.1,14.6,21.6,14.6,27.9 c0,15.2-3,21.2-13.8,28.2c-0.6,0.4-1.2,0.8-1.7,1.3c-7.3-0.1-14.2,0.2-19.8,0.5c-3.7,0.2-6.8,0.3-9.2,0.3c-5.5,0-10,4.5-10,10 s4.5,10,10,10c2.8,0,6.2-0.1,10.1-0.3c37.9-1.7,63.4,1.6,64.7,22.9c0.1,2.2-0.3,4.7-0.9,6.5c-11-2.6-24.6-3.8-41.8-3.8 c-5.5,0-10,4.5-10,10s4.5,10,10,10c54.3,0,64.6,12.9,64.6,36.6C429.5,403.5,427.8,414.9,415.3,421.7z"/>
        </g>
      );

    default:
      return <path />
  }
}

const SVGIcon = ({
  id = '',
  style = {},
  fill = '#ffffff',
  name = '',
  isActive = false,
  className = '',
}) => {
  return (
    <svg 
      id={id}
      style={style}
      fill={fill}
      width="100%"
      height="100%"
      className={`svg-icon icon-${name} ${isActive ? 'active' : ''} ${className}`}
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 500 500"
    >
      {getPath(name)}
    </svg>
  )
}

export default SVGIcon;