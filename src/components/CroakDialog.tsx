import { gravatarUrl } from "../helpers/helpers";
import { Button, Dialog, DialogActions, DialogContent, TextField, Avatar, makeStyles } from '@material-ui/core';
import { MuiThemeProvider, createTheme } from '@material-ui/core/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#0dd6a7'
    },
    secondary: {
      main: '#09805c'
    }
  },
});

const useStyles = makeStyles({
  dialog: {
    padding: '20px',
  },
  dialogPaper: {
    width: '80%',
  },
  content: {
    paddingTop: '0',
    paddingBottom: '8px',
  },
  aboveActions: {
    paddingTop: '8px',
    display: 'flex',
    justifyContent: 'space-between',
  },
  bottomActions: {
    paddingTop: '0',
  },
  textField: {
    '& .MuiInput-underline:before': {
      border: 'none',
    },
    '& .MuiInput-underline:after': {
      border: 'none',
    },
    '& .MuiInput-underline:hover:not($disabled):not($focused):not($error):before': {
      border: 'none',
      borderBottom: '1px solid #0a9169',
    },
  },
  line: {
    width: '100%',
    borderBottom: '1px solid #0a9169',
    marginBottom: '8px',
  },
  username: {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    maxWidth: '150px',
    marginLeft: '5px',
    color: '#09805c',
  },
});

interface CroakDialogProps {
  open: boolean;
  handleClose: () => void;
  handlePost: () => void;
  text: string;
  setText: (text: string) => void;
  userid: string;
}

const CroakDialog: React.FC<CroakDialogProps> = ({ open, handleClose, handlePost, text, setText, userid }) => {
  const classes = useStyles();

  return (
    <MuiThemeProvider theme={theme}>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" classes={{ paper: classes.dialogPaper }} className={classes.dialog}>
        <DialogActions className={classes.aboveActions}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Avatar
              src={gravatarUrl(userid)}
              style={{
                width: '25px',
                height: '25px',
                objectFit: 'cover',
                borderRadius: '50%',
              }}
            />
            <span className={classes.username}>@{userid}</span><span style={{ color: '#09805c' }}>'s croak:</span>
          </div>
          <Button onClick={handleClose} color="secondary">
            X
          </Button>
        </DialogActions>
        <div className={classes.line} />
        <DialogContent className={classes.content}>
          <TextField className={classes.textField}
            autoFocus
            margin="dense"
            id="name"
            type="text"
            color="secondary"
            fullWidth
            multiline
            minRows={5}
            value={text}
            onChange={(e) => setText(e.target.value)}
            inputProps={{ maxLength: 500 }}
            helperText={`${text.length}/500`}
            size="medium"
          />
        </DialogContent>
        <div className={classes.line} />
        <DialogActions className={classes.bottomActions}>
          <Button onClick={handlePost} color="secondary" disabled={text.length > 500}>
            Croak!
          </Button>
        </DialogActions>
      </Dialog>
    </MuiThemeProvider>
  );
};

export default CroakDialog;
