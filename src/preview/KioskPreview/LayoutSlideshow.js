import React from "react"
import { makeStyles } from '@material-ui/core/styles';
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext, DotGroup } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';


const useStyles = makeStyles(theme => ({
    slideshow: {
        position: "relative",
        maxWidth: props => { return props.maxWidth },
        margin: "auto"
    },
    slider: {
        "& ul": {
//            margin: 0
        }
    },
    navigation: {
        position: "absolute",
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
    },
    dots: {
        position: "absolute",
        right: 0,
        left: 0,
        bottom: 0,
        display: "flex",
        justifyContent: "center",
    },
    backButton: {
        position: "absolute",
        top: 0,
        left: 0,
        bottom: 0,
    },
    nextButton: {
        position: "absolute",
        top: 0,
        right: 0,
        bottom: 0,

    }
}));


const LayoutSlideshow = ({className, spacing = 2, padding = 0, maxWidth = 720, mediaFormat = "2:1", children}) => {
    const classes = useStyles({spacing, padding, maxWidth})

    const totalSlides = children && children.length
    const format = mediaFormat.split(':')

    return (
        <CarouselProvider className={className || classes.slideshow}
            naturalSlideWidth={format[0]}
            naturalSlideHeight={format[1]}
            totalSlides={totalSlides}>
                <Slider className={classes.slider}>
                    {children.map((child, index) => {
                        const item = React.cloneElement(child, {
                            mediaFormat: mediaFormat
                        })
                        return (
                            <Slide index={index}>
                                { item }
                            </Slide>
                        )
                    })}
                </Slider>
                <nav className={classes.navigation}>
                    <DotGroup className={classes.dots} />
                    <ButtonBack className={classes.backButton}>Back</ButtonBack>
                    <ButtonNext className={classes.nextButton}>Next</ButtonNext>
                </nav>
        </CarouselProvider>
    )

}

export default LayoutSlideshow