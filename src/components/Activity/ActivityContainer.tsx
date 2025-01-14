import { h, ComponentProps } from "preact";

const ActivityContainer = () => {
    return (
        <div id="activitiesContainer" class="oj-flex-item oj-bg-info-30 oj-sm-only-text-align-end oj-sm-padding-4x-start oj-md-4 oj-sm-12">
            <h3 id="activitiesHeader">Activities</h3>
            <div id="activitiesItems" class="item-display no-wrap">
                <ul>
                    <li class="li-item">Baseball</li>
                    <li class="li-item">Bicycling</li>
                    <li class="li-item">Skiing</li>
                    <li class="li-item">Soccer</li>
                </ul>
            </div>
        </div>
    );
};

export default ActivityContainer;