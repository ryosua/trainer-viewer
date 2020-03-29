import React from 'react'
import T from 'prop-types'
import { KeyboardDateTimePicker as MaterialUIDateTimePicker } from '@material-ui/pickers'

const DateTimePicker = ({ handleDateChange, value }) => (
    <MaterialUIDateTimePicker
        label="DateTimePicker"
        inputVariant="outlined"
        value={value}
        onChange={handleDateChange}
    />
)

DateTimePicker.propTypes = {
    handleDateChange: T.func.isRequired,
    value: T.instanceOf(Date).isRequired
}

export default DateTimePicker
