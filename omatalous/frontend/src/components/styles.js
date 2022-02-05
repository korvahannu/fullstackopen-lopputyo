import { makeStyles } from '@mui/styles';
const useStyle = makeStyles((theme) => ({
    dialog: {
        position: 'absolute',
        top:'-64px',
    },
    temp: {
        backgroundColor: theme.palette.background.paper,
    },
    loadingBar: {
        width:' 100%'
    },
    viewContainer: {
        paddingRight:'5%',
        paddingLeft:'16px',
        paddingTop:'16px',
        flexGrow:1,
    },
    sidebarContainer: {
        minWidth:'300px',
        borderRight:'1px solid',
        borderRightColor:theme.palette.secondary.main,
        height:'81vh'
    },
    sidebarSelected: {
        color:'#01579b',
        backgroundColor:'#eee',
    },
    sidebarSelectedText: {
        fontWeight: 600
    },
    accountInfoContainer: {
        padding:'32px',
        minWidth:'256px',
        minHeight:'256px',
        marginTop:'16px',
        marginRight:'16px',
        marginBottom:'16px'
    },
    topBarHeader: {
        color:'error',
        display : 'flex',
        paddingTop:4
    },
    basicFormLayout: {
        marginBottom: '1em',
        display:'flex',
    }
}));

export default useStyle;