import { h, ComponentProps } from "preact";
import { useState, useCallback } from "preact/hooks";
import "ojs/ojlabel";
import "ojs/ojselectsingle";
import { ojSelectSingle } from "ojs/ojselectsingle";
import MutableArrayDataProvider = require('ojs/ojmutablearraydataprovider');
import "ojs/ojchart";
import { ojChart } from "ojs/ojchart";
import * as storeData from "text!../store_data.json";
import "ojs/ojlistview";
import { ojListView } from "ojs/ojlistview";
import "ojs/ojlistitemlayout";
import "ojs/ojavatar";


type ChartType = {
  id: number;
  value: string;
  label: string;
};

const chartTypeData = [
  { value: "bar", label: "Bar" },
  { value: "pie", label: "Pie" }
];

const chartTypesDP: MutableArrayDataProvider<ChartType["value"], ChartType>
  = new MutableArrayDataProvider(chartTypeData, { keyAttributes: "value" });

type ChartItem = {
  id: number;
  series: string;
  group: string;
  value: number;
};

const chartData = [
  { "id": 0, "series": "Baseball", "group": "Group A", "value": 42 },
  { "id": 1, "series": "Baseball", "group": "Group B", "value": 34 },
  { "id": 2, "series": "Bicycling", "group": "Group A", "value": 55 },
  { "id": 3, "series": "Bicycling", "group": "Group B", "value": 30 },
  { "id": 4, "series": "Skiing", "group": "Group A", "value": 36 },
  { "id": 5, "series": "Skiing", "group": "Group B", "value": 50 },
  { "id": 6, "series": "Soccer", "group": "Group A", "value": 22 },
  { "id": 7, "series": "Soccer", "group": "Group B", "value": 46 }
]

const chartDataProvider: MutableArrayDataProvider<ChartItem["id"], ChartItem> =
  new MutableArrayDataProvider(chartData, { keyAttributes: "id" });

type ChartProps = ComponentProps<"oj-chart">;

type Activity = {
  id: number;
  name: string;
}

const parsedData = typeof storeData === "string" ? JSON.parse(storeData) : storeData;
const activityDataProvider = new MutableArrayDataProvider<Activity["id"], Activity>(
  parsedData,
  {
    keyAttributes: "id"
  }
);
type ListViewProps = ComponentProps<"oj-list-view">;
const gridlinesItemVisible: ListViewProps["gridlines"] = { item: "visible" };


type Props = {
  item?: Item | null;
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





const ItemDetailContainer = (props: Props) => {
  // const [val, setVal] = useState("bar" as ChartProps["type"]);

  // const valChangeHandler = useCallback(
  //   (event: ojSelectSingle.valueChanged<ChartType["value"], ChartType>) => {
  //     setVal(event.detail.value as ChartProps["type"]);
  //   },
  //   [val, setVal]
  // );

  // Function on how to render a chart item - will be used in template
  const chartItem = (
    item: ojChart.ItemTemplateContext<ChartItem["id"], ChartItem>
  ) => {
    return (
      <oj-chart-item
        value={item.data.value}
        groupId={[0]}
        seriesId={item.data.series}></oj-chart-item>
    );
  };


  // // Function on how to render a list item - will be used in template
  // const renderListItem =
  //   (item: ojListView.ItemTemplateContext<Activity["id"], Activity>
  //   ) => {
  //     return (
  //       <li>
  //         <oj-list-item-layout>
  //           <div class="oj-typography-body-md">
  //             {item.data.name}
  //           </div>
  //         </oj-list-item-layout>
  //       </li>
  //     );
  //   };

  const pieDataProvider: MutableArrayDataProvider<ChartItem["id"], ChartItem> = new MutableArrayDataProvider(
    [
      { series: "Quantity in Stock", value: props.item?.quantity_instock },
      { series: "Quantity shipped", value: props.item?.quantity_shipped },
    ],
    { keyAttributes: "id" }
  );

  return (
    <div class="oj-web-applayout-max-width oj-web-applayout-content">
      {/* <h1>Product Information</h1> */}


      {/* <div id="activitiesContainer">
        <oj-list-view id="activitiesList"
          aria-labelledby="activitiesHeader"
          data={activityDataProvider}
          gridlines={gridlinesItemVisible}
        >
          <template slot="itemTemplate" render={renderListItem}></template>
        </oj-list-view>
      </div> */}

      <div id="itemDetailsContainer" class="oj-flex-item oj-bg-neutral-30 oj-sm-padding-4x-start oj-md-6 oj-sm-12">
        <h3>Item Details</h3>
        {/*  Simple example of using components and using useState/useCallback to pass data in same page level*/}
        {/* 
        <oj-label for={"basicSelect"}>Select Chart</oj-label>
        <oj-select-single
          id={"basicSelect"}
          value={val}
          class={"selectSingleStyle"}
          data={chartTypesDP}
          onvalueChanged={valChangeHandler}
        ></oj-select-single> 

        
        <oj-chart id="barChart" type={val} data={chartDataProvider} animationOnDisplay="auto"
          animationOnDataChange="auto" hoverBehavior="dim" class="chartStyle">
          <template slot="itemTemplate" render={chartItem}></template>
        </oj-chart>
        */}
        <hr class="hr-margin" />
        <oj-avatar role="img" size="lg" aria-label={"product image for" + props.item?.name}
          src={props.item?.image?.replace("css", "styles")} class="float-right"></oj-avatar>
        <div id="itemName" class="data-name">{props.item?.name}</div>
        <div id="itemDesc" class="data-desc">{props.item?.short_desc}</div>
        <div id="itemPrice">{"Price: " + props.item?.price + " each"}</div>
        <div id="itemId">{"Item Id: " + props.item?.id}</div>

        <oj-chart id="pieChart" type="pie" data={pieDataProvider} animationOnDisplay="auto"
          animationOnDataChange="auto" hoverBehavior="dim" class="chartStyle">
          <template slot="itemTemplate" render={chartItem}></template>
        </oj-chart>

      </div>
    </div>
  );
}

export default ItemDetailContainer;
