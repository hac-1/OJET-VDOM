import { h, ComponentProps } from "preact";
import "ojs/ojlistview";
import { ojListView } from "ojs/ojlistview";
import { useState, useCallback } from "preact/hooks";
import { RESTDataProvider } from "ojs/ojrestdataprovider";
import ItemActionsContainer from "./ItemActionsContainer";
import CreateNewItemDialog from "./CreateNewItemDialog";
import "ojs/ojformlayout";
import "ojs/ojinputtext";
import { ojDialog } from "ojs/ojdialog";
import { MutableRef } from "preact/hooks";

type Props = {
  data?: RESTDataProvider<ActivityItem["id"], ActivityItem>;
  selectedActivity: Item | null;
  onItemChanged: (item: Item) => void;
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

const DEFAULT_ACTIVITY_ITEM_STATE: Partial<Item> = {};

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

  const activityItemDataProvider = props.data;
  const restServerURLItems = "https://apex.oracle.com/pls/apex/oraclejet/lp/activities/" + props.selectedActivity?.id + "/items/";

  const [isCreateOpened, setIsCreateOpened] = useState<boolean>(false);
  const [isEditOpened, setIsEditOpened] = useState<boolean>(false);
  const [itemData, setItemData] = useState<Item>(props.selectedActivity!);

  const openCreateDialog = () => {
    console.log("CreateNewItemDialog called");
    setIsCreateOpened(true);
  };

  const [activityItemValue, setActivityItemValue] = useState(
    DEFAULT_ACTIVITY_ITEM_STATE
  );


  const selectedActivityItemChanged = useCallback(
    (event: ojListView.firstSelectedItemChanged<Item["id"], Item>) => {
      let tempItem = event.detail.value.data;
      props.onItemChanged(tempItem);
      setActivityItemValue(tempItem);
      setItemData(tempItem);
    },
    [activityItemValue]
  );

  const handleDialogClose = (ref: MutableRef<ojDialog>, type: string) => {
    type === "create" ? setIsCreateOpened(false) : setIsEditOpened(false);
    ref.current.close();
  };

  const createItem = async (data: Partial<Item>, createDialogRef: MutableRef<ojDialog>) => {
    //process create command and close dialog on success
    if (data?.name) {
      let quantity = Number(data.quantity_instock) + Number(data.quantity_shipped);
      const row = {
        name: data.name,
        short_desc: data.short_desc,
        price: data.price,
        quantity_instock: data.quantity_instock,
        quantity_shipped: data.quantity_shipped,
        quantity: quantity,
        activity_id: props.selectedActivity?.id,
        image: "css/images/product_images/jet_logo_256.png",
      };

      // Create and send request to REST service to add row
      const request = new Request(restServerURLItems, {
        headers: new Headers({
          "Content-type": "application/json; charset=UTF-8",
        }),
        body: JSON.stringify(row),
        method: "POST",
      });

      const response = await fetch(request);
      const addedRow = await response.json();

      activityItemDataProvider?.refresh();
      // Close dialog
      console.log("Created new item");
      createDialogRef.current.close();
    }
  };

  return (
    <div
      id="activityItemsContainer"
      class="oj-flex-item oj-sm-padding-4x-start oj-md-6 oj-sm-12">
      <div id="container">
        <h3>Activity Items</h3>
        <ItemActionsContainer create={openCreateDialog} />
        <CreateNewItemDialog isOpened={isCreateOpened} createNewItem={createItem} closeDialog={handleDialogClose} />
        <oj-list-view
          id="itemsList"
          class="item-display"
          aria-labelledby="activitiesHeader"
          data={activityItemDataProvider}
          gridlines={gridlinesItemVisible}
          selectionMode="single"
          onfirstSelectedItemChanged={selectedActivityItemChanged}
          scrollPolicy="loadMoreOnScroll"
          scrollPolicyOptions={scrollPolicyOpts}>
          <template slot="itemTemplate" render={listItemRenderer}></template>
        </oj-list-view>
      </div>
    </div>
  );
};

export default ActivityItemContainer;