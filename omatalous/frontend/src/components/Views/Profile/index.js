import React, {useEffect, useState} from 'react';
import { Box, Typography, TextField, Button, Divider, Avatar } from '@mui/material';
import useStyle from '../../styles';
import { useSelector, useDispatch } from 'react-redux';
import { editUserInfo } from '../../../reducers/userReducer';
import useField from '../../../hooks/useField';
import Alert from '../../Alert';
import { testPassword } from '../../../services/user';
import { setNotification } from '../../../reducers/notificationReducer';

const Profile = () => {

    const user = useSelector(state => state.user);
    const classes = useStyle();
    const dispatch = useDispatch();

    const avatar = useField('text', 'avatar');
    const name = useField('text', 'name');
    const username = useField('text', 'username');
    const email = useField('text', 'email');
    const currentPassword = useField('text', 'currentPassword');
    const newPassword = useField('text', 'newPassword');
    const newPasswordCheck = useField('text', 'newPasswordCheck');
    const [confirmWindow, setConfirmWindow] = useState(false);
    const [passwordMatchError, setPasswordMatchError] = useState(false);
    const [passwordErrorText, setPasswordErrorText] = useState('Passwords do not match!');
    const [currentPasswordError, setCurrentPasswordError] = useState(false);
    const notification = useSelector(state => state.notification);

    useEffect(() => {
        if(user) {
            resetFields();
        }
    }, [user]);

    useEffect(()=>{
        if(user) {
            resetFields();
        }
    }, []);

    if (!user)
        return null;

    
    const handleSubmit = async () => {
        if(newPassword.value == newPasswordCheck.value) {
            if(newPassword.length < 5 && newPassword.value !== '') {
                setPasswordErrorText('Password must be at least 5 characters long!');
                setPasswordMatchError(true);
            }
            else {

                try {
                    if(newPassword.value !== '') {
                        await testPassword(currentPassword.value);
                        setConfirmWindow(true);
                    }
                    else
                        setConfirmWindow(true);
                }
                catch(error) {
                    setCurrentPasswordError(true);
                    return null;
                }
            }
        }
        else {
            setPasswordErrorText('Passwords do not match!');
            setPasswordMatchError(true);
        }
    };

    const acceptEdit = async () => {
        await dispatch(
            editUserInfo(
                {
                    name: name.value !== '' && name.value !== ' '
                    ? name.value
                    : null,
                    avatar: avatar.value,
                    password: newPassword.value !== '' && newPassword.value.length >= 5
                    ? newPassword.value
                    : null
                }
            )
        );

        currentPassword.setValue('');
        newPassword.setValue('');
        newPasswordCheck.setValue('');

        await dispatch(setNotification('update-successful', 'Profile updated successfully!', 5));
    };

    const resetFields = () => {
        avatar.setValue(user.avatar ||'Using default avatar');
        name.setValue(user.name);
        username.setValue(user.username);
        email.setValue(user.email);
        currentPassword.setValue('');
        newPassword.setValue('');
        newPasswordCheck.setValue('');
    };
    

    return (
        <Box className={classes.viewContainer}>
            {
                notification.enabled
                ? <Typography variant='overline' sx={{color:'green'}}>{notification.message}</Typography>
                : null
            }
            
            <Box sx={{ width: '600px' }}>
                <Typography variant='h4' paragraph>Edit your profile</Typography>

                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <Avatar sx={{ width: '150px', height: '150px', mb: 2 }}
                    src={user.avatar ||null} />
                    <TextField value={avatar.value} onChange={avatar.onChange} size='small' sx={{ width: '100%', mb: 2 }} />
                </Box>

                <Divider sx={{ mb: 2}} />

                <Box className={classes.basicFormLayout}>
                    <Typography variant='h6'>Name: </Typography>
                    <Box sx={{ flexGrow: 1 }} />
                    <TextField value={name.value} onChange={name.onChange}  size='small' sx={{width:'275px'}} />
                </Box>

                <Box className={classes.basicFormLayout}>
                    <Typography variant='h6'>Username: </Typography>
                    <Box sx={{ flexGrow: 1 }} />
                    <TextField disabled value={username.value} onChange={username.onChange}  size='small' sx={{width:'275px'}} />
                </Box>

                <Box className={classes.basicFormLayout}>
                    <Typography variant='h6'>Email: </Typography>
                    <Box sx={{ flexGrow: 1 }} />
                    <TextField disabled value={email.value} onChange={email.onChange} size='small' sx={{width:'275px'}} />
                </Box>

                <Divider sx={{ mb: 2}} />

                <Typography variant='h5' paragraph>Change your password</Typography>

                {
                    currentPasswordError
                    ? <Typography color='error'>Incorrect account password!</Typography>
                    : null
                }

                <Box className={classes.basicFormLayout}>
                    <Typography variant='h6'>Current password: </Typography>
                    <Box sx={{ flexGrow: 1 }} />
                    <TextField error={currentPasswordError} onFocus={()=>setCurrentPasswordError(false)} value={currentPassword.value} onChange={currentPassword.onChange}
                     type='password' size='small' autoComplete='new-password' sx={{width:'275px'}} />
                </Box>

                {
                    passwordMatchError
                    ? <Typography color='error'>{passwordErrorText}</Typography>
                    : null
                }

                <Box className={classes.basicFormLayout}>
                    <Typography variant='h6'>New password: </Typography>
                    <Box sx={{ flexGrow: 1 }} />
                    <TextField
                    value={newPassword.value} onChange={newPassword.onChange}
                    type='password' size='small' autoComplete='new-password' sx={{width:'275px'}}
                    error={passwordMatchError} onFocus={()=>setPasswordMatchError(false)} />
                </Box>

                <Box className={classes.basicFormLayout}>
                    <Typography variant='h6'>New password again: </Typography>
                    <Box sx={{ flexGrow: 1 }} />
                    <TextField value={newPasswordCheck.value} onChange={newPasswordCheck.onChange}
                    type='password' size='small' autoComplete='new-password' sx={{width:'275px'}}
                    error={passwordMatchError} onFocus={()=>setPasswordMatchError(false)}/>
                </Box>

                <Box className={classes.basicFormLayout}>
                    <Button variant='outlined' onClick={()=>resetFields()}>Cancel</Button>
                    <Box sx={{ flexGrow: 1 }} />
                    <Button variant='contained' onClick={handleSubmit}>Save changes</Button>
                </Box>
            </Box>
            <Alert open={confirmWindow} setOpen={setConfirmWindow} titleText='Are you sure?'
                bodyText='These changes can not be undone'
                onAccept={acceptEdit} />
        </Box>
    );
};

export default Profile;