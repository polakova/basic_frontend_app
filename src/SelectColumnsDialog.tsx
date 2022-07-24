import { Button, Dialog, DialogTitle, DialogContent, Box, FormControl, DialogActions, FormLabel, FormGroup, FormControlLabel, Checkbox } from '@mui/material';
import { useEffect, useState } from 'react';
import { PERNAMENT, CHECKED, NOTCHECKED, ATTRIBUTES } from './Constants';

function SelectColumnsButton({
    isOpen,
    checkedAttributes,
    onSubmit,
    onClose
}:{ 
    isOpen: boolean,
    checkedAttributes: number[],
    onSubmit: (updatedCheckedState: number[]) => void,
    onClose: () => void
}) {

    const [open, setOpen] = useState(false);
    const [checkedState, setCheckedState] = useState(new Array(ATTRIBUTES.length).fill(0));

    useEffect(() => {
        setCheckedState(checkedAttributes);
    }, [checkedAttributes]);

    useEffect(() => {
        setOpen(isOpen);
    }, [isOpen]);

    const handleClose = (event: React.SyntheticEvent<unknown>) => {
        setOpen(false);
        onClose();
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

    const handleSubmit = (event: React.SyntheticEvent<unknown>) => {
        onSubmit(checkedState);
    }

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Select columns to show</DialogTitle>
            <DialogContent>
                <Box component="form" sx={{ display: 'flex', flexWrap: 'wrap' }}>
                    <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
                        <FormLabel component="legend">Assign responsibility</FormLabel>
                        <FormGroup>
                            {ATTRIBUTES.map((attribute: string, index: number) => (                       
                                checkedState[index] === PERNAMENT ? 
                                    <FormControlLabel key={attribute} disabled
                                        control={
                                            <Checkbox checked={true} onChange={() => handleChange(index)} name={attribute} />
                                        }
                                        label={"t(" + attribute + ")"}
                                    /> : 
                                    checkedState[index] === CHECKED ?
                                        <FormControlLabel key={attribute}
                                            control={
                                                <Checkbox checked={true} onChange={() => handleChange(index)} name={attribute} />
                                            }
                                            label={"t(" + attribute + ")"}
                                        /> :
                                        <FormControlLabel key={attribute}
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
                <Button onClick={handleSubmit}>Ok</Button>
            </DialogActions>
        </Dialog>
    );
}

export default SelectColumnsButton;