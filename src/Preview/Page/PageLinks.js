import React from "react"
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import PageLinksCard from "./PageLinksCard"

const useStyles = makeStyles(theme => ({
    linkSection: {
        margin: theme.spacing(2),
    },
    links: {
        display: "flex"
    }
}));

const PageLinks = ({title = "Innhold", links = [], language}) => {
    const classes = useStyles()



    const renderLink = (link, index) => {

        return (
            <PageLinksCard {...link} language={language} key={index} />
        )

    }

    return (
        <section className={classes.linkSection}>
            <header>
                <Typography>{title}</Typography>
            </header>

            <div className={classes.links}>
                { links && links.map(renderLink)}
            </div>
        </section>
    )

}

export default PageLinks