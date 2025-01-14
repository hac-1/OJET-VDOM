import ActivityContainer from "./Activity/ActivityContainer";
import ParentContainer2 from "./ParentContainer2";


const ParentContainer1 = () => {
    return (
        <div id="parentContainer1" class="oj-flex oj-flex-init oj-panel oj-bg-warning-20">
            <ActivityContainer />
            <ParentContainer2 />
        </div>
    );
};

export default ParentContainer1;