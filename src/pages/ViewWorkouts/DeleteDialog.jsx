import React from 'react'
import T from 'prop-types'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import DialogTitle from '@material-ui/core/DialogTitle'
import Dialog from '@material-ui/core/Dialog'
import Typography from '@material-ui/core/Typography'

const ReportDialog = ({ onDeleteWorkout, open }) => (
    <Dialog open={open}>
        <DialogTitle>Delete Workout?</DialogTitle>
        <Box p={3} display="flex" flex={1} flexDirection="column">
            <Box mb={1}>
                <Typography>
                    Are you sure you want to permanently delete this workout? It can not be recovered.
                </Typography>
            </Box>
            <Box mt={1}>
                <Button onClick={() => onDeleteWorkout()} variant="outlined">
                    Delete
                </Button>
            </Box>
        </Box>
    </Dialog>
)

ReportDialog.propTypes = {
    onDeleteWorkout: T.func.isRequired,
    open: T.bool.isRequired
}

export default ReportDialog
