import ActivityContainer from "./Activity/ActivityContainer";
import ParentContainer2 from "./ParentContainer2";
import MutableArrayDataProvider = require('ojs/ojmutablearraydataprovider');
import * as storeData from 'text!./store_data.json';

type Activity = {
    id: number;
    name: string;
    short_desc: string;
};

const activityDataProvider = new MutableArrayDataProvider<Activity['id'], Activity>(
    JSON.parse(storeData),
    {
        keyAttributes: 'id',
    }
);

const ParentContainer1 = () => {
    return (
        <div id="parentContainer1" class="oj-flex oj-flex-init oj-panel oj-bg-warning-20">
            <ActivityContainer data={activityDataProvider} />
            <ParentContainer2 />
        </div>
    );
};

export default ParentContainer1;