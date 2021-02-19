import { 
    generateRowId, 
    generateKeyedFormData, 
    keyedToPlainFormData
 } from "."

export const getEventsProps = ({formData, formContext, onChange}) => {

    const { onCurrentId } = formContext

    let keyedEvents = generateKeyedFormData(formData.content.events || [])

    const _onEventsChange = (events = []) => {

        onChange({
            ...formData,
            content: {
                ...formData.content,
                events: events,
            }
        })


    }

    const _onEventAdd = (item) => {

        console.log('add event', item)

        const newIndex = keyedEvents.length

        const neyKeyedRow = {
            key: generateRowId(),
            item: {
            },
        };

        keyedEvents = [...keyedEvents, neyKeyedRow];
        _onEventsChange(keyedToPlainFormData(keyedEvents))


    }

    return {
        _onEventAdd: (item) => _onEventAdd(item)
    }


}