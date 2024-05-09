import React, { useState } from 'react';
import { Button, makeStyles } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import WebApp from "@twa-dev/sdk";
import CroakDialog from './CroakDialog';

const useStyles = makeStyles({
  button: {
    position: 'fixed',
    bottom: '20px',
    right: '20px',
    backgroundColor: '#5cb85c',
    color: '#fff',
    borderRadius: '50%',
    minWidth: '56px',
    height: '56px',
    padding: '0',
    '&:hover': {
      backgroundColor: '#4cae4c',
    },
  },
});

interface CreatePostButtonProps {
  createCroak: (croak: string, userid: string) => Promise<void> | undefined;
}

const CreatePostButton: React.FC<CreatePostButtonProps> = ({ createCroak }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [text, setText] = useState('');
  const userid = WebApp.initDataUnsafe.user?.username || "default_frog";

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handlePost = () => {
    createCroak(text, userid);
    setText('');
    handleClose();
  };

  return (
    <div>
      <Button variant="contained" className={classes.button} onClick={handleClickOpen}>
        <AddIcon />
      </Button>
      <CroakDialog
        open={open}
        handleClose={handleClose}
        handlePost={handlePost}
        text={text}
        setText={setText}
        userid={userid}
      />
    </div>
  );
};

export default CreatePostButton;
