import { h } from "preact";
import ItemDetailContainer from "./ItemDetail/ItemDetailContainer";
import ActivityItemContainer from "./ActivityItemContainer/ActivityItemContainer";


const ParentContainer2 = () => {
    return (
        <div id="parentContainer2" class="oj-panel oj-bg-danger-30">
            <ActivityItemContainer />
            <ItemDetailContainer />
        </div>
    );
}

export default ParentContainer2;