import React from 'react';
import { withTranslate } from 'react-redux-multilingual';

/** Material UI */
import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';

/** Styled Components */
import DialogContents from '../styled_components/shared/DialogContents';

const Transition = props => <Slide direction="up" {...props} />;

const CustomDialog = ({
  translate,
  open,
  onClose,
  title,
  message,
  variant = 'alert', // alert, confirm
}) => {
  return (
    <Dialog
      open={open}
      onClose={() => { onClose(false) }}
      TransitionComponent={Transition}
      keepMounted
    > 
      <DialogContents>
        <DialogContents.Title>{title}</DialogContents.Title>
        <DialogContents.Message>{message}</DialogContents.Message>
        <DialogContents.ButtonGroup>
          {variant === 'confirm' && (
            <DialogContents.Button onClick={() => onClose(false)} cancel>
              {translate('cancel')}
            </DialogContents.Button>
          )}
          <DialogContents.Button onClick={() => onClose(true)}>
            {translate('confirm')}
          </DialogContents.Button>
        </DialogContents.ButtonGroup>
      </DialogContents>
    </Dialog>
  )
}

export default withTranslate(CustomDialog);