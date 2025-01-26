import { h } from "preact";
import { useRef, useEffect, useState, MutableRef } from "preact/hooks";
import "ojs/ojdialog";
import { ojDialog } from "ojs/ojdialog";

type Props = {
    isOpened: boolean;
    closeDialog: (ref: MutableRef<ojDialog>, type: string) => void;
    deleteItem: (data: Partial<Item>, ref: MutableRef<ojDialog>) => void;
    itemData: Partial<Item>;
};

type Item = {
    id: number;
    name: string | undefined;
    short_desc?: string;
    price?: number;
    quantity?: number;
    quantity_shipped?: number;
    quantity_instock?: number;
    activity_id?: number;
    image?: string;
};

const DeleteItemDialog = (props: Props) => {

    const deleteDialogRef = useRef<ojDialog>();
    const [deleteFormData, setdeleteFormData] = useState<Partial<Item>>({});

    const onChangeHandler = (event: any) => {
        if (event.detail.updatedFrom === "internal") {
            setdeleteFormData({
                ...deleteFormData,
                [event.currentTarget.id]: event.detail.value,
            });
        }
    };

    const closeDialog = () => {
        props.closeDialog(deleteDialogRef as MutableRef<ojDialog>, "delete");
    };

    const deleteItem = () => {
        console.log("data: " + JSON.stringify(deleteFormData));
        props.deleteItem(deleteFormData, deleteDialogRef as MutableRef<ojDialog>);
    };

    useEffect(() => {
        setdeleteFormData(props.itemData);
        props.isOpened ? deleteDialogRef.current?.open() : deleteDialogRef.current?.close();
    }, [props.isOpened]);

    return (
        <span>
            <oj-dialog id="deleteDialog" ref={deleteDialogRef as MutableRef<ojDialog>} dialogTitle="Delete Item Details" onojClose={closeDialog} cancelBehavior="icon">
                <div slot="body">
                    <oj-label-value labelEdge="inside">
                        <oj-label for="itemid" slot="label">
                            Are you sure you want to delete {deleteFormData.id}-{deleteFormData.name}?
                        </oj-label>
                    </oj-label-value>

                </div>
                <div slot="footer">
                    <oj-button id="submitBtn" onojAction={deleteItem}>
                        Yes
                    </oj-button>
                    <oj-button id="submitBtn" onojAction={closeDialog}>
                        No
                    </oj-button>
                </div>
            </oj-dialog>
        </span>
    );
};

export default DeleteItemDialog;