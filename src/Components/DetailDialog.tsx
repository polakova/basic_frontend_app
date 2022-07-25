import { 
    useEffect, 
    useState
} from 'react';
import YouTube from 'react-youtube';
import _ from "lodash";
import { useTranslation } from 'react-i18next';
import { 
    Button, 
    Dialog, 
    DialogTitle, 
    DialogContent, 
    DialogContentText, 
    DialogActions, 
    Box,
} from '@mui/material';
import { Mission } from '../Definitions/MissionInterface';


function DetailDialog({
    isOpen,
    missionData,
    onClose
}:{ 
    isOpen: boolean,
    missionData: Mission,
    onClose: () => void
}) {

    const { t } = useTranslation();

    const [ open, setOpen ] = useState(false);
    const [ data, setData ] = useState<Mission>({});
    const [ videoId, setVideoId ] = useState<string>("");

    useEffect(() => {
        setData(missionData);
        setVideoId(_.get(missionData, "links.video_link").substring(17, 28));
    }, [missionData]);

    useEffect(() => {
        setOpen(isOpen);
    }, [isOpen]);

    const handleClose = (event: React.SyntheticEvent<unknown>) => {
        onClose();
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>{data["mission_name"]}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {data.details && data.details.toString()}
                </DialogContentText>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', pt: 4 }}>
                    <YouTube 
                        videoId={ videoId }
                        opts={{ height: '290', width: '490'}}
                    />
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>{t("detail.dialog.close")}</Button>
            </DialogActions>
        </Dialog>
    );
}

export default DetailDialog;