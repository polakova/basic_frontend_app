import { useState } from 'react';
import { useTranslation } from "react-i18next";
import { 
    ToggleButtonGroup,
    ToggleButton
} from '@mui/material';


function LanguageButtons() {

    const { i18n } = useTranslation();

    const [ language, setLanguage ] = useState<string>(i18n.language);


    const changeLanguage = (
        event: React.MouseEvent<HTMLElement>,
        newLanguage: string,
    ) => {
        setLanguage(newLanguage);
        i18n.changeLanguage(newLanguage);
    };

    return (
        <ToggleButtonGroup
            value={language}
            exclusive
            onChange={changeLanguage}
            aria-label="text alignment"
            >
            <ToggleButton value="en">
                EN
            </ToggleButton>
            <ToggleButton value="sk">
                SK
            </ToggleButton>
        </ToggleButtonGroup>
    );
}

export default LanguageButtons;