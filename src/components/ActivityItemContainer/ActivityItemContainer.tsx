import { h, ComponentProps } from "preact";

const ActivityItemContainer = () => {
  return (
    <div id="activityItemsContainer" class="oj-flex-item oj-bg-success-20 oj-sm-padding-4x-start  oj-md-6 oj-sm-12">
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
  );
};

export default ActivityItemContainer;