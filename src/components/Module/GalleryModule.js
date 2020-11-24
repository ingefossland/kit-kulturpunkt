import React from 'react';
import GridModule from "./GridModule"

const GalleryModule = (model) => {
    
    return (
        <GridModule {...model} mediaLayout="cover" maxWidth="100%" />
    )


}

export default GalleryModule