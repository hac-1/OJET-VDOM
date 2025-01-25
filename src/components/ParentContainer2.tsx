import { h } from "preact";
import ItemDetailContainer from "./ItemDetail/ItemDetailContainer";
import ActivityItemContainer from "./ActivityItemContainer/ActivityItemContainer";
import MutableArrayDataProvider = require("ojs/ojmutablearraydataprovider");
import * as storeData from 'text!./store_data.json';

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

const activityData = JSON.parse(storeData);
let activityItemsArray = activityData[0].items

// Create data provider instance for the array of activity items for the Baseball activity
const activityItemDP = new MutableArrayDataProvider<ActivityItem["id"], ActivityItem>(activityItemsArray, {
    keyAttributes: "id",
});

const specificItem: Item = activityData[0].items[0]

const ParentContainer2 = () => {
    return (
        <div id="parentContainer2" class="oj-flex oj-flex-item oj-panel oj-bg-danger-30 oj-lg-padding-6x-horizontal oj-md-8 oj-sm-12">
            <ActivityItemContainer data={activityItemDP} />
            <ItemDetailContainer item={specificItem} />
        </div>
    );
}

export default ParentContainer2;