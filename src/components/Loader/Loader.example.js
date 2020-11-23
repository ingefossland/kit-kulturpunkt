import React, { useState } from 'react';
import AppLoader from "./AppLoader"

const AppLoaderExample = (props) => {
    const [isLoading, setIsLoading] = useState(props.isLoading || true)

    return (
        <React.Fragment>
            <AppLoader {...props} isLoading={isLoading}>
                App loaded

            </AppLoader>
            <button style={{position: "fixed", zIndex: 2001, bottom: 0, right: 0}} onClick={() => setIsLoading(!isLoading)}>Toggle</button>
        </React.Fragment>
    )

}


export default AppLoaderExample
