import React from 'react'
import T from 'prop-types'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import MUISelect from '@material-ui/core/Select'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
    root: {
        width: 200
    }
}))

const Select = ({ handleChange, label, options, value, ...rest }) => {
    const classes = useStyles()
    return (
        <FormControl variant="outlined" classes={classes}>
            <InputLabel id="demo-simple-select-outlined-label">{label}</InputLabel>
            <MUISelect
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={value}
                onChange={handleChange}
                label={label}
                {...rest}>
                <MenuItem value="">
                    <em>None</em>
                </MenuItem>
                {options.map((option) => (
                    <MenuItem key={option.id} value={option.id}>
                        {option.title}
                    </MenuItem>
                ))}
            </MUISelect>
        </FormControl>
    )
}

Select.propTypes = {
    handleChange: T.func.isRequired,
    label: T.string.isRequired,
    options: T.arrayOf(T.shape({ id: T.number.isRequired, title: T.string.isRequired })),
    // Pass '' for nothing selected
    value: T.oneOfType([T.number.isRequired, T.string])
}

export default Select
