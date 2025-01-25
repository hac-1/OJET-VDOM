import { ojListView } from "ojs/ojlistview";
import MutableArrayDataProvider = require("ojs/ojmutablearraydataprovider");
import { h, ComponentProps } from "preact";

type Activity = {
    id: number;
    name: string;
    short_desc: string;
};

type Props = {
    data: MutableArrayDataProvider<Activity['id'], Activity>
    value?: String
}

const listItemRenderer = (item: ojListView.ItemTemplateContext) => {
    let image = item.data.image.replace('css', 'styles');
    return (
        <div class="oj-flex no-wrap">
            <span
                class="demo-thumbnail oj-flex-item"
                style={'background-image:url(' + image + ')'}></span>
            <div class="demo-content oj-flex-item">
                <div>
                    <strong>{item.data.name}</strong>
                </div>
                <span class="demo-metadata">{item.data.short_desc}</span>
            </div>
        </div>
    );
}

type ListViewProps = ComponentProps<'oj-list-view'>
const gridlinesItemVisible: ListViewProps['gridlines'] = { item: 'visible' };
const scrollPolicyOpts: ListViewProps['scrollPolicyOptions'] = { fetchSize: 5 };

const ActivityContainer = (props: Props) => {
    return (
        <div id="activitiesContainer" class="oj-flex-item oj-bg-info-30 oj-sm-only-text-align-end oj-sm-padding-4x-start oj-md-4 oj-sm-12">
            <h3 id="activitiesHeader">Activities</h3>
            {/* <div id="activitiesItems" class="item-display no-wrap">
                <ul>
                    <li class="li-item">Baseball</li>
                    <li class="li-item">Bicycling</li>
                    <li class="li-item">Skiing</li>
                    <li class="li-item">Soccer</li>
                </ul>
            </div> */}

            <oj-list-view id="activitiesList" class="item-display" aria-labelledby="activitiesHeader"
                data={props.data}
                selectionMode={"single"}
                scrollPolicy={"loadMoreOnScroll"}
                gridlines={gridlinesItemVisible}
                scrollPolicyOptions={scrollPolicyOpts}
            >
                <template slot={"itemTemplate"} render={listItemRenderer}></template>
            </oj-list-view>

        </div>
    );
};

export default ActivityContainer;