import React, { useState} from 'react';

import ButtonBase from "@material-ui/core/ButtonBase"
import InputAdornment from '@material-ui/core/InputAdornment';
import ColorTagsDropImage from "./ColorTagsDropImage"
import ColorDropIcon from "@material-ui/icons/CenterFocusStrong"

import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import Typography from "@material-ui/core/Typography"
import RemoveIcon from '@material-ui/icons/RemoveCircle';

import parse from 'autosuggest-highlight/parse';
import match from 'autosuggest-highlight/match';

import { makeStyles } from '@material-ui/core/styles';

import { 
    sortableContainer,
    sortableElement,
    sortableHandle,    
} from 'react-sortable-hoc';

import SortableIcon from '@material-ui/icons/DragHandle';
import arrayMove from "array-move"

const useStyles = makeStyles(theme => ({
    field: {
        "& .MuiAutocomplete-input": {
            flexGrow: 1,
            flexShrink: 0,
        },
        "& .MuiInputAdornment-positionEnd": {
        },
    },

    dropButton: {
        color: theme.palette.text.secondary,

        "&:hover": {
            color: theme.palette.text.primary
        }


    },
    dropIcon: {
        fontSize: 18,
        margin: theme.spacing(.5)
    },
    dropLabel: {
        fontFamily: "Akkurat, sans-serif",
        fontSize: 12,
    },

    tags: {
        width: "100%",
        display: "flex",
        flexDirection: "column",
    },
    tag: {
        display: "flex",
        justifyContent: "space-between",
        padding: 8,
        marginLeft: -8,
        marginRight: -12,
        borderBottom: "1px solid",
        borderBottomColor: theme.palette.divider,

    },
    sorthandle: {
        cursor: "pointer",
        opacity: .5,

        "&:hover": {
            opacity: 1,
        },
        marginRight: 4
    },
    remove: {
        cursor: "pointer",
        opacity: .5,

        "&:hover": {
            opacity: 1,
        }

    },

    option: {
        flexGrow: 1,
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",

        "& * + *": {
            marginLeft: theme.spacing(1)
        }

    },
    swatch: {
        backgroundColor: props => { return props.backgroundColor },
        width: 20,
        height: 20,
        borderRadius: 10
    },
    title: {
        fontFamily: "Akkurat, sans-serif",
        fontSize: 16,
    },
    description: {
        fontSize: 14,
        color: theme.palette.text.secondary,

        "&:before": {
            content: '"("'
        },
        "&:after": {
            content: '")"'
        }

    },

}));

const TagList = ({children}) => {
    const classes = useStyles()

    return (
        <div className={classes.tags}>
            {children}
        </div>
    )
}

const TagItem = ({value, label, onDelete }) => {
    const classes = useStyles()

    return (
        <div className={classes.tag}>
            <SortableHandle />
            <Option title={label} value={value} />
            <RemoveIcon onClick={onDelete} className={classes.remove} />
        </div>
    )

}

const Option = ({title, value, hex}) => {

    let backgroundColor

    if (value && value.startsWith('#')) {
        backgroundColor = value
    }

    const classes = useStyles({backgroundColor})

    return (
        <div className={classes.option}>
            <div className={classes.swatch}></div>
            <Typography className={classes.title}>{title}</Typography>
        </div>
    )

}

const SortableHandle = sortableHandle(() => {
    const classes = useStyles()

    return (
        <SortableIcon className={classes.sorthandle} />
    )

})

const SortableTagItem = sortableElement(({props, sortIndex, item}) => {
    return(
        <TagItem {...item} />
    )
})

const SortableTagList = sortableContainer(({items = [], ...props}) => {

    return (
        <TagList>
            {items.map((item, index) => (
                <SortableTagItem key={`item-${index}`} index={index} sortIndex={index} item={item} />
            ))}
        </TagList>
    )

})

const AutocompleteTagsField = ({
    id = "autocomplete", 
    label, 
    helperText,
    placeholder = "Legg til",
    variant = "filled", 
    formData = [], 
    options = [], 
    onChange, 
    onInputChange,
    ...props
}) => {

    const classes = useStyles()

    const _filterOptions = (options, params) => {

        if (props.filterOptions) {
            return props.filterOptions(options, params)
        }

        const filter = createFilterOptions({
            stringify: option => option.label,
        });

        const filtered = filter(options, params);

        /*

        // Suggest the creation of a new value
        if (params.inputValue !== '') {
            filtered.push({
                inputValue: params.inputValue,
                label: `Add "${params.inputValue}"`,
            });
        }

        */

        return filtered;
    }

    const _getOptionLabel = (option) => {

        // Value selected with enter, right from the input
        if (typeof option === 'string') {
            return option;
        }
        // Add "xxx" option created dynamically
        if (option.inputValue) {
            return option.inputValue;
        }

        // Regular option
        return option.value;

    }

    const _getOptionHighlight = (value, q) =>  {

        const matches = match(value, q);
        const parts = parse(value, matches);
    
        return parts.map((part, index) => {
            if (part.highlight) {
                return <b className={classes.suggestHighlight} key={index}>{part.text}</b>
            }
            return part.text
        })

    }

    const _renderOption = (option = {}, state) => {
        const { inputValue } = state
        const { label } = option

        // highlight

        const title = _getOptionHighlight(label, inputValue)

        return (
            <Option {...option} title={title} />
        )

    }

    const _onDropColors = (colors) => {

        const tags = [
            ...formData,
            ...colors
        ]

        const newFormData = _filterTags(tags)
        onChange && onChange(newFormData)

    }

    const [imageUrl, setImageUrl] = useState(null)

    const _onImageUrl = () => {
        props.imageUrl && setImageUrl(props.imageUrl)
    }

    const _renderInput = (params) => {

        const endAdornment = (
            <InputAdornment position="end">
                <ColorTagsDropImage imageUrl={imageUrl} onClick={!imageUrl && props.imageUrl && _onImageUrl} onChange={_onDropColors}>
                    <ButtonBase className={classes.dropButton} size="small">
                        <ColorDropIcon className={classes.dropIcon} />
                        <Typography className={classes.dropLabel}>Hent farger fra bilde</Typography>
                    </ButtonBase>
                </ColorTagsDropImage>
            </InputAdornment>
        )


        return (
            <TextField {...params}
                helperText={helperText}
                InputProps={{
                    ...params.InputProps,
                    endAdornment: endAdornment
                }}
                className={classes.field}
                variant="filled"
                label={label}
                placeholder={placeholder}
            />
        )
    }

    const _onSortEnd = ({oldIndex, newIndex}) => {
        const newFormData = arrayMove(formData, oldIndex, newIndex)
        onChange && onChange(newFormData)
    };

    const _renderTags = (tags, getTagProps) => {

        const items = tags.map((option, index) => {
            return {
                ...option,
                ...getTagProps({index})
            }
        })

        return <SortableTagList
            onSortEnd={_onSortEnd}
            helperClass="sortable-helper"
            useDragHandle={true}
            items={items} />

        return (
            <TagList>
                { tags.map((option, index) => (
                    <TagItem {...option} {...getTagProps({index})} />
                )) }
            </TagList>
        )


    }
    /*    
    const _renderTags = (tags, getTagProps) => {

        return (
            <TagList>
                { tags.map((option, index) => (
                    <TagItem {...option} {...getTagProps({index})} />
                )) }
            </TagList>
        )

    }*/

    const _filterTags = (tags) => {

        return tags.map(value => {

            if (typeof value === 'string') {
                value = {
                    value: value,
                }
            } else if (value && value.inputValue) {
                // Create a new value from the user input
                value = {
                    value: value.inputValue,
                }
            } else {
                value = value
            }

            return value

        })

    }

    const _onChange = (event, tags) => {
        const formData = _filterTags(tags)
        onChange && onChange(formData)
    }

    const _onInputChange = (value) => {
        onInputChange && onInputChange(value)
    }

    return (
        <Autocomplete
            multiple
            freeSolo
            value={formData}
            onChange={_onChange}
            onInputChange={_onInputChange}
            id={id + "-tags"}
            options={options}
            defaultValue={[]}
            disableClearable
            filterOptions={_filterOptions}
            getOptionLabel={_getOptionLabel}
            renderOption={_renderOption}
            renderTags={_renderTags}
            renderInput={_renderInput}
        />
    )

}

export default AutocompleteTagsField