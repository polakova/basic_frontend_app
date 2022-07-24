import { Button, Dialog, DialogTitle, DialogContent, Box, FormControl, DialogActions, FormLabel, FormGroup, FormControlLabel, Checkbox } from '@mui/material';
import { useEffect, useState } from 'react';
import { PERNAMENT, CHECKED, NOTCHECKED, ATTRIBUTES } from './Constants';

function SelectColumnsButton({ 
    checkedAttributes 
}:{ 
    checkedAttributes: number[]
}) {

    const [open, setOpen] = useState(false);
    const [checkedState, setCheckedState] = useState(new Array(ATTRIBUTES.length).fill(0));

    useEffect(() => {
        setCheckedState(checkedAttributes);
    }, [checkedAttributes]);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (event: React.SyntheticEvent<unknown>, reason?: string) => {
        if (reason !== 'backdropClick') {
          setOpen(false);
        }
    };

    const handleChange = (position: number) => {
        const updatedCheckedState = checkedState.map((item, index) =>
            index === position ? 
                item === CHECKED ? 
                    NOTCHECKED : 
                    CHECKED : 
                item
        );
        setCheckedState(updatedCheckedState);
    };

    return (
        <>
        <Button onClick={handleClickOpen}>Select columns</Button>
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Select columns to show</DialogTitle>
            <DialogContent>
                <Box component="form" sx={{ display: 'flex', flexWrap: 'wrap' }}>
                    <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
                        <FormLabel component="legend">Assign responsibility</FormLabel>
                        <FormGroup>
                            {ATTRIBUTES.map((attribute: string, index: number) => (                       
                                checkedState[index] === PERNAMENT ? 
                                    <FormControlLabel disabled
                                        control={
                                            <Checkbox checked={true} onChange={() => handleChange(index)} name={attribute} />
                                        }
                                        label={"t(" + attribute + ")"}
                                    /> : 
                                    checkedState[index] === CHECKED ?
                                        <FormControlLabel
                                            control={
                                                <Checkbox checked={true} onChange={() => handleChange(index)} name={attribute} />
                                            }
                                            label={"t(" + attribute + ")"}
                                        /> :
                                        <FormControlLabel
                                            control={
                                                <Checkbox checked={false} onChange={() => handleChange(index)} name={attribute} />
                                            }
                                            label={"t(" + attribute + ")"}
                                        />
                                )
                            )}
                        </FormGroup>
                    </FormControl>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleClose}>Ok</Button>
            </DialogActions>
        </Dialog>
        </>
    );
}

export default SelectColumnsButton;