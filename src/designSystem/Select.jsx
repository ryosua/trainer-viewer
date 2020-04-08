import React from 'react'
import T from 'prop-types'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import MUISelect from '@material-ui/core/Select'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
    root: {
        margin: theme.spacing(1),
        width: 200
    }
}))

const Select = ({ options, handleChange, value }) => {
    const classes = useStyles()
    return (
        <FormControl variant="outlined" classes={classes}>
            <InputLabel id="demo-simple-select-outlined-label">Workout Category</InputLabel>
            <MUISelect
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={value}
                onChange={handleChange}
                label="Workout Category">
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
    classes: T.any,
    options: T.shape({ id: T.number.isRequired, title: T.string.isRequired }),
    handleChange: T.func.isRequired,
    value: T.number.isRequired
}

export default Select
