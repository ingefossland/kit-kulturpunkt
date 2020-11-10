
const getVisibilityOptions = (props) => {
    const { hideable, hidden, deletable, deleted, restorable, restored, removable } = props
    const { onHide, onUnhide, onDelete, onRestore, onRemove } = props

    // hideable

    let options = []
    
    if (hideable) {
        
        options.push({
            name: "hidden",
            icon: "visibility",
            title: "Visible",
            onClick: onUnhide
        })

        options.push({
            name: "hidden",
            icon: "visibility_off",
            title: "Hidden",
            onClick: onHide
        })
        
    }
    
    // deletable && restorable
    
    if (deletable && restorable) {
        
        if (deleted) {
            options.push({
                type: "button",
                variant: "outlined",
                name: "restore",
                title: "Restore",
                onClick: onRestore
            })            
        } else {
            options.push({
                type: "button",
                variant: "outlined",
                name: "delete",
                title: "Delete",
                onClick: onDelete
            })            
        }

    // deletable
        
    } else if (deletable && onDelete) {

        options.push({
            type: "button",
            variant: "outlined",
            name: "delete",
            title: "Delete",
            onClick: onDelete
        })            

    // removable

    } else if (removable) {

        options.push({
            type: "button",
            variant: "outlined",
            name: "remove",
            title: "Remove",
            onClick: onRemove
        })            

    }
    
    // set icon

    let icon;

    if (deleted && restorable) {
        icon = "restore"
    } else if (deleted) {
        icon = "delete"
    } else if (hidden) {
        icon = "visibility_off"
    } else {
        icon = "visibility"
    }
    
    return {
        name: "visibility",
        icon: icon,
        options: options
    }
    
}

const getVisibilityToolbar = (props, toolbar) => {
    const { hideable, hidden, deletable, deleted, restorable, restored, erasable, erased, addable, removable } = props
    const { onHide, onUnhide, onDelete, onRestore, onErase, onRemove } = props

    // deleted

    if (deleted) {
            
        toolbar = [];

        if (restorable) {
            toolbar.push({
                name: "restore",
                icon: "restore",
                onClick: onRestore
            });
        }

        if (erasable) {
            toolbar.push({
                name: "erase",
                icon: "delete_forever",
                onClick: onErase
            });
        }

        if (!toolbar.length) {
            toolbar.push({
                name: "deleted",
                icon: "delete",
                disabled: true
            });
        }

        
        return toolbar;

    // hideable => visibility options
    
    } else if (hideable && (deletable || restorable)) {

        let visibility = getVisibilityOptions(props)
        toolbar.push(visibility)

    // hideable

    } else if (hideable && hidden) {

        toolbar.push({
            name: "hidden",
            icon: "visibility_off",
            onClick: onUnhide
        })

    } else if (hideable) {

        toolbar.push({
            name: "hidden",
            icon: "visibility",
            onClick: onHide
        })
       
    // deletable

    } else if (deletable) {
        toolbar.push({
            name: "remove",
            icon: "delete",
            onClick: onDelete
        })

    // removable
        
    } else if (removable) {
        toolbar.push({
            name: "remove",
            icon: "remove_circle",
            onClick: onRemove
        })
        
    }

    return toolbar

}


const getEditableToolbar = (props, toolbar) => {
    const { editable, editing } = props
    const { onEdit, onSave } = props

    if (editable && editing) {
        toolbar.unshift({
            label: "Save",
            onClick: onSave
        })
    } else if (editable) {
        toolbar.unshift({
            icon: "edit",
            onClick: onEdit
        })
    }

    return toolbar

}

export const getToolbar = (props) => {

    let toolbar = []

    toolbar = getEditableToolbar(props, toolbar)
    toolbar = getVisibilityToolbar(props, toolbar)
    
    return toolbar;    
  
}

export default getToolbar