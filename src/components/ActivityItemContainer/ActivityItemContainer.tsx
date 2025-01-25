import { h, ComponentProps } from "preact";
import * as ResponsiveUtils from "ojs/ojresponsiveutils";
import "ojs/ojlistview";
import { ojListView } from "ojs/ojlistview";
import { useEffect, useRef, useState } from "preact/hooks";
import MutableArrayDataProvider = require("ojs/ojmutablearraydataprovider");

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


type Props = {
  data?: MutableArrayDataProvider<ActivityItem["id"], ActivityItem>;
  value?: string;
};

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
};

const listItemRenderer = (item: ojListView.ItemTemplateContext) => {
  const image = item.data.image.replace("css", "styles");
  return (
    <div class="oj-flex no-wrap">
      <span
        class="demo-thumbnail oj-flex-item"
        style={"background-image:url(" + image + ")"}></span>
      <div class="demo-content oj-flex-item">
        <div>
          <strong>{item.data.name}</strong>
        </div>
        <span class="demo-metadata">{item.data.short_desc}</span>
      </div>
    </div>
  );
};

type ListViewProps = ComponentProps<"oj-list-view">;
const gridlinesItemVisible: ListViewProps["gridlines"] = { item: "visible" };
const scrollPolicyOpts: ListViewProps["scrollPolicyOptions"] = { fetchSize: 5 };

const ActivityItemContainer = (props: Props) => {
  const mediaQueryRef = useRef<MediaQueryList>(window.matchMedia(ResponsiveUtils.getFrameworkQuery("md-down")!));

  const [isSmallMediumWidth, setIsSmallMediumWidth] = useState(mediaQueryRef.current.matches);

  function handleMediaQueryChange(e: MediaQueryListEvent) {
    setIsSmallMediumWidth(e.matches);
  }

  function getDisplayType() {
    return (isSmallMediumWidth ? false : true);
  };

  useEffect(() => {
    mediaQueryRef.current.addEventListener("change", handleMediaQueryChange);
    return (() => mediaQueryRef.current.removeEventListener("change", handleMediaQueryChange));
  }, [mediaQueryRef]);


  return (
    getDisplayType() ? <div id="activityItemsContainer" class="oj-flex-item oj-bg-success-20 oj-sm-padding-4x-start oj-md-6 oj-sm-12">
      <div id="container" class="item-display no-wrap">
        <h3>Activity Items</h3>
        {/* <ul>
          <li class="li-item">Louisville Slugger Bat</li>
          <li class="li-item">SureCatch Baseball Glove</li>
          <li class="li-item">Baseball</li>
          <li class="li-item">Western R16 Helmet</li>
          <li class="li-item">Western C1 Helmet</li>
          <li class="li-item">Sure Fire Ball (Set of 4)</li>
        </ul> */}
        <oj-list-view
          id="itemsList"
          class="item-display"
          aria-labelledby="activitiesHeader"
          data={props.data}
          gridlines={gridlinesItemVisible}
          selectionMode="single"
          scrollPolicy="loadMoreOnScroll"
          scrollPolicyOptions={scrollPolicyOpts}
        >
          <template slot="itemTemplate" render={listItemRenderer}></template>
        </oj-list-view>
      </div>
    </div>
      : sm_md_view
  );
};

export default ActivityItemContainer;