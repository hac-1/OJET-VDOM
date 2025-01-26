import { useMemo, useRef, useState } from "preact/hooks";
import ActivityContainer from "./Activity/ActivityContainer";
import ParentContainer2 from "./ParentContainer2";
import MutableArrayDataProvider = require('ojs/ojmutablearraydataprovider');
import * as storeData from 'text!./store_data.json';
import { RESTDataProvider } from "ojs/ojrestdataprovider";

type Activity = {
    id: number;
    name: string;
    short_desc: string;
};

// const activityDataProvider = new MutableArrayDataProvider<Activity['id'], Activity>(
//     JSON.parse(storeData),
//     {
//         keyAttributes: 'id',
//     }
// );

const restServerURLActivities: string = 'https://apex.oracle.com/pls/apex/oraclejet/lp/activities/';

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

    const [fetchStatus, setFetchStatus] = useState(true);
    const fetchError = useRef<string>();

    const fetchErrorHandler = (errorDetail: RESTDataProvider.FetchErrorDetail<number, Activity> |
        RESTDataProvider.FetchResponseErrorDetail<number, Activity>) => {
        setFetchStatus(false);
        if (errorDetail.hasOwnProperty('response')) {
            fetchError.current = `${(errorDetail as RESTDataProvider.FetchResponseErrorDetail<number, Activity>).response.status}`;
        }
        else {
            fetchError.current = (errorDetail as RESTDataProvider.FetchErrorDetail<number, Activity>).error.message;
        }
    }

    const activityDataProvider = useMemo(() => new RESTDataProvider<Activity["id"], Activity>({
        keyAttributes: "id",
        url: restServerURLActivities,
        error: fetchErrorHandler,
        transforms: {
            fetchFirst: {
                //tells how to make request
                request: async (options) => {
                    const url = new URL(options.url);
                    const { size, offset } = options.fetchParameters;
                    url.searchParams.set("limit", String(size));
                    url.searchParams.set("offset", String(offset));
                    return new Request(url.href);
                },
                //tells how to handle response
                response: async ({ body }) => {
                    //parse body json top level 
                    const { items, totalSize, hasMore } = body;
                    return { data: items, totalSize, hasMore };
                },
                // The response function above that extracts data and other properties from the endpoint response body must return an object with a data property. 
                // Given that the endpoint we work with returns an items property, we assign this latter property to data in the response function
            }
        }
    }), []);


    return (
        <div>
            {fetchStatus ? (
                <div id="parentContainer1" class="oj-flex oj-flex-init">
                    <ActivityContainer data={activityDataProvider} onActivityChanged={activityChangedHandler} />
                    {showActivityItems() && (<ParentContainer2 activity={selectedActivity} />)}
                    {!showActivityItems() && (<h4 class="oj-typography-subheading-sm">Select activity to view items</h4>)}
                </div>) :
                (<p>Sorry that we couldn't get your product information right now. Please contact your system administrator.</p>
                )}
        </div>
    );
};

export default ParentContainer1;