import { h } from 'preact';
import "ojs/ojbutton";

type Props = {
    create: () => void;
};

const ItemActionsContainer = (props: Props) => {
    return (
        <div>
            <oj-button id="createButton" onojAction={props.create}>
                Create
            </oj-button>
        </div>
    );
};

export default ItemActionsContainer;