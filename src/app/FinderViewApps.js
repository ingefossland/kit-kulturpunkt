import React from 'react';
import { IconsView, IconsModule } from "../components/KpView"
import { useLocation, useHistory } from 'react-router-dom';
import icons from "../icons/"

const FinderViewApps = () => {

    const history = useHistory()

    const _onClick = ({url}) => {
        history.push(url)
    }

    const apps = [
        {
            title: "Kulturpunkt",
            url: "/kp",
            icon: icons["kpApp"]
        },
        {
            title: "Kiosk",
            url: "/kiosk",
            icon: icons["kioskApp"]
        }

    ]

    return (
        <IconsView>
            { apps.map((model, index) => {
                return (
                    <IconsModule {...model}
                        onClick={() => _onClick(model)}
                        key={index} />
                )
            })}
        </IconsView>
    )

}

export default FinderViewApps