import { h, ComponentProps } from "preact";
import { useState, useCallback } from "preact/hooks";
import "ojs/ojselectsingle";
import "ojs/ojlabel";
import MutableArrayDataProvider = require("ojs/ojmutablearraydataprovider");
import "ojs/ojchart";
import { ojChart } from "ojs/ojchart";
import { ojSelectSingle } from "ojs/ojselectsingle";

type ChartType = {
    id: number;
    value: string;
    label: string;
};

const chartTypeData = [
    { value: "bar", label: "Bar" },
    { value: "pie", label: "Pie" },
    { value: "funnel", label: "Funnel" },//Added
];

const chartTypesDP: MutableArrayDataProvider<ChartType["value"], ChartType> = new MutableArrayDataProvider(chartTypeData, { keyAttributes: "value" });

type ChartItem = {
    id: number;
    series: string;
    group: string;
    value: number;
};

const chartData = [
    { id: 0, series: "Baseball", group: "Group A", value: 42 },
    { id: 1, series: "Baseball", group: "Group B", value: 34 },
    { id: 2, series: "Bicycling", group: "Group A", value: 55 },
    { id: 3, series: "Bicycling", group: "Group B", value: 30 },
    { id: 4, series: "Skiing", group: "Group A", value: 36 },
    { id: 5, series: "Skiing", group: "Group B", value: 50 },
    { id: 6, series: "Soccer", group: "Group A", value: 22 },
    { id: 7, series: "Soccer", group: "Group B", value: 46 },
];

const chartDataProvider: MutableArrayDataProvider<ChartItem["id"], ChartItem> = new MutableArrayDataProvider(chartData, { keyAttributes: "id" });
type ChartProps = ComponentProps<"oj-chart">;

export function Content() {
    const [val, setVal] = useState("bar" as ChartProps["type"]);

    const valChangeHandler = useCallback(
        (event: ojSelectSingle.valueChanged<ChartType["value"], ChartType>) => {
            setVal(event.detail.value as ChartProps["type"]);
        },
        [val, setVal]
    );

    const chartItem = (item: ojChart.ItemTemplateContext<ChartItem["id"], ChartItem>) => {
        return <oj-chart-item value={item.data.value} groupId={[item.data.group]} seriesId={item.data.series}></oj-chart-item>;
    };

    return (
        <div class="oj-web-applayout-max-width oj-web-applayout-content">
            <h1>Product Information</h1>
            <div id="itemDetailsContainer">
                <h3>Item Details</h3>
                <oj-label for="basicSelect">Select Chart:</oj-label>
                <oj-select-single id="basicSelect" value={val} onvalueChanged={valChangeHandler} class="selectSingleStyle" data={chartTypesDP}></oj-select-single>
                {/*<div style="width:135px;">*/}
                {/*Below changed styles='...values' to class and type={val} from type='funnel'*/}
                    <oj-chart id="barChart" type={val} data={chartDataProvider} animationOnDisplay="auto" animationOnDataChange="auto" hoverBehavior="dim" class="chartStyle">
                        <template slot="itemTemplate" render={chartItem}></template>
                    </oj-chart>
                {/*</div>*/}
            </div>
        </div>
    );
}
