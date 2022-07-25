import { 
    useEffect, 
    useState
} from 'react';
import { useTranslation } from 'react-i18next';
import { 
    Button, 
    Dialog, 
    DialogTitle, 
    DialogContent, 
    Box, 
    FormControl, 
    DialogActions, 
    FormGroup, 
    FormControlLabel, 
    Checkbox 
} from '@mui/material';
import {
    MISSION_METADATA 
} from '../Definitions/Constants';
import { MissionMetadata } from '../Definitions/MissionInterface';


function SelectColumnsButton({
    isOpen,
    missionMetadata,
    onSubmit,
    onClose
}:{ 
    isOpen: boolean,
    missionMetadata: MissionMetadata,
    onSubmit: (updatedMetadata: MissionMetadata) => void,
    onClose: () => void
}) {

    const { t } = useTranslation();

    const [ open, setOpen ] = useState(false);
    const [ metadata, setMetadata ] = useState(MISSION_METADATA);

    useEffect(() => {
        setMetadata(missionMetadata);
    }, [missionMetadata]);

    useEffect(() => {
        setOpen(isOpen);
    }, [isOpen]);

    const handleClose = (event: React.SyntheticEvent<unknown>) => {
        onClose();
    };

    const handleChange = (key: string) => {
        var updatedMetadata = {
            ...metadata,
            [key]: {
                ...metadata[key as keyof typeof metadata],
                ...{
                    "isShown": !metadata[key as keyof typeof metadata].isShown
                }
            }
        }

        setMetadata(updatedMetadata);
    };

    const handleSubmit = (event: React.SyntheticEvent<unknown>) => {
        onSubmit(metadata);
    }

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>{t("select_columns.dialog.name")}</DialogTitle>
            <DialogContent>
                <Box component="form" sx={{ display: 'flex', flexWrap: 'wrap' }}>
                    <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
                        <FormGroup>
                            
                            {Object.keys(metadata).map((key: string) => (
                                
                                (metadata[key as keyof typeof metadata].showable && 
                                    
                                    <FormControlLabel key={key}
                                        control={
                                            <Checkbox disabled={metadata[key as keyof typeof metadata].disabled} checked={metadata[key as keyof typeof metadata].isShown} onChange={() => handleChange(key)} name={key} />
                                        }
                                        label={t("mission_info." + key)}
                                    />
                                )

                            ))}

                            </FormGroup>
                    </FormControl>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>{t("select_columns.dialog.cancel")}</Button>
                <Button onClick={handleSubmit}>{t("select_columns.dialog.ok")}</Button>
            </DialogActions>
        </Dialog>
    );
}

export default SelectColumnsButton;