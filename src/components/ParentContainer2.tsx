import { h } from "preact";
import ItemDetailContainer from "./ItemDetail/ItemDetailContainer";
import ActivityItemContainer from "./ActivityItemContainer/ActivityItemContainer";


const ParentContainer2 = () => {
    return (
        <div id="parentContainer2" class="oj-flex oj-flex-item oj-panel oj-bg-danger-30 oj-lg-padding-6x-horizontal oj-md-8 oj-sm-12">
            <ActivityItemContainer />
            <ItemDetailContainer />
        </div>
    );
}

export default ParentContainer2;