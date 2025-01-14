import { h, ComponentProps } from "preact";
import * as ResponsiveUtils from "ojs/ojresponsiveutils";
import { useRef, useState } from "preact/hooks";

// Display this content for medium and narrower screen widths
const sm_md_view =
  <div id="sm_md" class="oj-flex-item oj-sm-padding-4x-start oj-md-6 oj-sm-12"
    style="background-color:lightcyan; padding: 10px; font-size: 10px">
    <h3 id="activityDetailsHeader">Activity Details</h3>
    <div class="item-display no-wrap">
      <ul>
        <li class="li-item">SureCatch Baseball Glove</li>
        <li class="li-item">Western R16 Helmet</li>
        <li class="li-item">Western C1 Helmet</li>
        <li class="li-item">Western Bat</li>
      </ul>
    </div>
  </div>;


const ActivityItemContainer = () => {
  const mediaQueryRef = useRef<MediaQueryList>(window.matchMedia(ResponsiveUtils.getFrameworkQuery("md-down")!));

  const [isSmallMediumWidth, setIsSmallMediumWidth] = useState(mediaQueryRef.current.matches);

  function handleMediaQueryChange(e: MediaQueryListEvent) {
    setIsSmallMediumWidth(e.matches);
  }

  function getDisplayType() {
    return (isSmallMediumWidth ? false : true);
  };


  return (
    getDisplayType() ? <div id="activityItemsContainer" class="oj-flex-item oj-bg-success-20 oj-sm-padding-4x-start oj-md-6 oj-sm-12">
      <div id="container" class="item-display no-wrap">
        <h3>Activity Items</h3>
        <ul>
          <li class="li-item">Louisville Slugger Bat</li>
          <li class="li-item">SureCatch Baseball Glove</li>
          <li class="li-item">Baseball</li>
          <li class="li-item">Western R16 Helmet</li>
          <li class="li-item">Western C1 Helmet</li>
          <li class="li-item">Sure Fire Ball (Set of 4)</li>
        </ul>
      </div>
    </div>
      : sm_md_view
  );
};

export default ActivityItemContainer;