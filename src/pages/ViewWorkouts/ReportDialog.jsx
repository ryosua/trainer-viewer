import React from 'react'
import T from 'prop-types'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import DialogTitle from '@material-ui/core/DialogTitle'
import Dialog from '@material-ui/core/Dialog'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'

const ReportDialog = ({ buttonDisabled, onReasonChange, onReportWorkout, open }) => (
    <Dialog open={open}>
        <DialogTitle>Report Workout?</DialogTitle>
        <Box p={3} display="flex" flex={1} flexDirection="column">
            <Box mb={1}>
                <Typography>Why are you reporting this workout?</Typography>
            </Box>

            <TextField multiline rows={4} variant="outlined" onChange={onReasonChange} />
            <Box mt={1}>
                <Button onClick={() => onReportWorkout()} variant="outlined" disabled={buttonDisabled}>
                    Report
                </Button>
            </Box>
        </Box>
    </Dialog>
)

ReportDialog.propTypes = {
    buttonDisabled: T.bool.isRequired,
    onReasonChange: T.func.isRequired,
    onReportWorkout: T.func.isRequired,
    open: T.bool.isRequired
}

export default ReportDialog
