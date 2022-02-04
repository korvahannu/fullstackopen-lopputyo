import React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute',
  top: '25%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  borderRadius:'5px',
  boxShadow: '5px 5px 15px 5px rgba(0,0,0,0.54)',
  p: 4,
};

const Alert = ({
                open,               // REQUIRED: Bool: Represents the state. True = show alert
                setOpen,            // REQUIRED: Function to control state of open
                onAccept,           // Function to perform on clicking accept-button
                onCancel,           // Function to perform on clicking cancel-button
                dontCloseOnAccept,  // Boolean to stop closing window when clicking accept-button
                dontCloseOnCancel,  // Boolean to stop closing window when clicking cancel-button

                titleText,          // String, title of alert window
                bodyText,           // String, main text of alert window

                appendStyle,        // Object of CSS elements, appends current style
                sx,                 // Object of CSS elements, completely overrides current style if set
                className,          // If you want you can set className of the window using this

                acceptButtonText,   // String, what text should the accept-button have?
                cancelButtonText,   // String, what text should the cancel-button have?
                acceptButtonVariant,// String, what MUI variant should accept-button be?
                cancelButtonVariant,// String, what MUI variant should cancel-button be?
              }) => {

  if(!onCancel)
    onCancel = () => setOpen(false);
  if(!onAccept)
    onAccept = () => setOpen(false);

  const accept = () => {
    if(!dontCloseOnAccept)
      setOpen(false);

    onAccept();
  };

  const cancel = () => {
    if(!dontCloseOnCancel)
      setOpen(false);

    onCancel();
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={onCancel}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={sx || {...style, ...appendStyle}} className={className}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {titleText || 'Are you sure you want to continue with this action?'}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {bodyText || 'This action is permanent.'}
          </Typography>
          <Box sx={{mt:3, display:'flex'}}>
            <Button onClick={cancel} variant={cancelButtonVariant ||'contained'}>{cancelButtonText ||'Cancel'}</Button>
            <Box sx={{flexGrow:1}}/>
            <Button onClick={accept} variant={acceptButtonVariant ||'contained'}>{acceptButtonText ||'Continue'}</Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

Alert.propTypes = {
  appendStyle: PropTypes.object,
  dontCloseOnAccept: PropTypes.bool,
  dontCloseOnCancel: PropTypes.bool,
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  sx: PropTypes.object,
  className: PropTypes.object,
  titleText: PropTypes.string,
  bodyText: PropTypes.string,
  onAccept: PropTypes.func,
  onCancel: PropTypes.func,
  acceptButtonText: PropTypes.string,
  cancelButtonText: PropTypes.string,
  acceptButtonVariant: PropTypes.string,
  cancelButtonVariant: PropTypes.string,
};

export default Alert;