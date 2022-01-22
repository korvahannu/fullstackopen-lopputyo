import { makeStyles } from '@mui/styles';
const useStyle = makeStyles((theme) => ({
    dialog: {
        position: 'absolute',
        top: '40%',
        left: '50%',
        transform: 'translate(-50%, -50%)'
    },
    temp: {
        backgroundColor: theme.palette.background.paper,
    }
}));

export default useStyle;