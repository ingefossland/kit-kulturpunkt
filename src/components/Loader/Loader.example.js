import React, { useState } from 'react';
import Loader from "./Loader"

const ExampleLoader = (props) => {
    const [isLoading, setIsLoading] = useState(props.isLoading || true)

    return (
        <React.Fragment>
            <Loader {...props} isLoading={isLoading}>
                App loaded

            </Loader>
            <button style={{position: "fixed", zIndex: 2001, bottom: 0, right: 0}} onClick={() => setIsLoading(!isLoading)}>Toggle</button>
        </React.Fragment>
    )

}


export default ExampleLoader
