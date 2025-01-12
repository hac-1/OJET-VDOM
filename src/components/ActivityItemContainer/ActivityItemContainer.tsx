import { h, ComponentProps } from "preact";

const ActivityItemContainer = () => {
    return (
        <div id="activityItemsContainer" class="oj-bg-success-20">
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