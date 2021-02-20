import React, { useEffect, useState } from 'react';

const ViewModel = ({
    item, 
    itemsById,
    children,
    ...props
}) => {

    const { source, sourceId } = item;

    const uniqueId = item.uniqueId || source + "/" + sourceId
    const uniqueItem = itemsById && itemsById[uniqueId] || {  }

    item = {
        ...item,
        ...uniqueItem,
        uniqueId: uniqueId
    }

    const childrenWithProps = React.Children.map(children, (child, index) => {
        // checking isValidElement is the safe way and avoids a typescript error too
        if (React.isValidElement(child)) {
            return React.cloneElement(child, { 
                ...item,
                ...props
            });
        }
        return child;
    });

    return (
        <>
            {childrenWithProps}
        </>
    )

}

export default ViewModel