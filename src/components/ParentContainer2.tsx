import { h } from "preact";
import ItemDetailContainer from "./ItemDetail/ItemDetailContainer";
import ActivityItemContainer from "./ActivityItemContainer/ActivityItemContainer";
import MutableArrayDataProvider = require("ojs/ojmutablearraydataprovider");
import * as storeData from 'text!./store_data.json';
import { useCallback, useEffect, useState } from "preact/hooks";

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

type ActivityItem = {
    id: number;
    name: string;
    items: Array<Item>;
    short_desc: string;
    image: string;
}

type Props = {
    activity: Item | null;
};

const activityData = JSON.parse(storeData);
let activityItemsArray = activityData[0].items

// Create data provider instance for the array of activity items for the Baseball activity
const INIT_DATAPROVIDER = new MutableArrayDataProvider<ActivityItem["id"], ActivityItem>(activityItemsArray, {
    keyAttributes: "id",
});


const ParentContainer2 = (props: Props) => {
    const [selectedItemVal, setSelectedItemVal] = useState<Item | null>(null);
    const [activityItemDP, setactivityItemDP] = useState(INIT_DATAPROVIDER);

    const activityItemChangeHandler = useCallback(
        (item: Item) => {
            setSelectedItemVal(item);
        },
        [selectedItemVal]
    );

    const showItems = useCallback(() => {
        return selectedItemVal === null ? false : true;
    }, [selectedItemVal]);

    useEffect(() => {
        let actID = (props.activity!.id) - 1;
        let activityItemsArray = activityData[actID].items;
        setactivityItemDP(
            new MutableArrayDataProvider<ActivityItem["id"], ActivityItem>(activityItemsArray, {
                keyAttributes: "id",
            })
        );
    }, [props.activity]);

    return (
        <div id="parentContainer2" class="oj-flex oj-flex-item oj-panel oj-bg-danger-30 oj-lg-padding-6x-horizontal oj-md-8 oj-sm-12">
            <ActivityItemContainer selectedActivity={props.activity} data={activityItemDP} onItemChanged={activityItemChangeHandler} />
            {showItems() && (
                <ItemDetailContainer item={selectedItemVal} />
            )}
            {!showItems() && (
                <h4 class="oj-typography-subheading-sm">
                    Select activity item to see details
                </h4>
            )}
        </div>
    );
}

export default ParentContainer2;