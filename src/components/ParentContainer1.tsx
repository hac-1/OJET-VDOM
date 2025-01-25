import { useState } from "preact/hooks";
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

type Item = {
    id: number;
    name: string;
    short_desc?: string;
    price?: number;
    quantity?: number;
    quantity_shipped?: number;
    quantity_instock?: number;
    activity_id?: number;
    image?: string;
};

let INIT_SELECTEDACTIVITY: Item | null = null;

const ParentContainer1 = () => {
    const [selectedActivity, setSelectedActivity] = useState<Item | null>(
        INIT_SELECTEDACTIVITY
    );

    const showActivityItems = () => {
        return selectedActivity != null;
    };

    const activityChangedHandler = (value: Item) => {
        setSelectedActivity(value);
    };

    return (
        <div id="parentContainer1" class="oj-flex oj-flex-init">
            <ActivityContainer data={activityDataProvider} onActivityChanged={activityChangedHandler} />
            {showActivityItems() && (
                <ParentContainer2 activity={selectedActivity} />
            )}
            {!showActivityItems() && (
                <h4 class="oj-typography-subheading-sm">
                    Select activity to view items
                </h4>
            )}
        </div>
    );
};

export default ParentContainer1;