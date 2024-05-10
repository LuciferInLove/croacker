import "./App.css";
import { useState, useEffect } from "react";
import { TonConnectButton } from "@tonconnect/ui-react";
import { useMainContract, PostProps, BatchOfCroaks } from "./hooks/useMainContract";
import { useTonConnect } from "./hooks/useTonConnect";
import CreatePostButton from './components/CreatePostButton';
import CroakDialog from './components/CroakDialog';
import { makeStyles } from '@material-ui/core/styles';
import { Network } from '@orbs-network/ton-access';
import WebApp from "@twa-dev/sdk";
import { Sender } from "ton-core";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import Image from './assets/croacker.png';

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles({
  container: {
    position: 'relative',
    width: '100%',
    height: '150px',
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    marginLeft: '5px',
    marginRight: '5px',
  },
  header: {
    position: 'absolute',
    bottom: '-30px',
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
  },
  tonConnectButton: {
    marginLeft: '10px !important',
  },
  tonNetworkButton: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100px',
    height: '41px',
    borderRadius: '50%/100%',
    backgroundColor: '#5cb85c',
  },
  croaks: {
    marginTop: '40px',
    maxWidth: '100%',
    margin: 'auto'
  },
});

const Post: React.FC<
    PostProps & {
      handleEditClick: (croak: string, userid: string, seqno: bigint) => void,
      sender: Sender
    }> = ({
    croak,
    username,
    avatarUrl,
    owner,
    handleEditClick,
    sender,
    seqno
  }) => (
    <div style={{ borderBottom: '1px solid #0a9169', padding: '10px', width: '100%' }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <img src={avatarUrl} alt={`${username}'s avatar`} style={{ width: '25px', borderRadius: '50%', marginRight: '10px' }} />
        <p style={{ color: '#09805c' }}><strong>@{username}</strong> wrote:</p>
        {owner && sender && sender.address && owner.toString() === sender.address.toString() && (
          <button onClick={() => {handleEditClick(croak, username, seqno)}} style={{ marginLeft: 'auto', padding: '6px', color: '#09805c' }}>✏️</button>
        )}
      </div>
      <div style={{ width: '290px', whiteSpace: 'pre-wrap', overflowWrap: 'break-word' }}>
        <p>{croak}</p>
      </div>
    </div>
);


function App() {
  const [network, setNetwork] = useState<Network>(() => {
    return (localStorage.getItem("network") as Network) || "testnet";
  });
  const {
    mainContract,
    createCroak,
    editCroak,
    loadBatchOfCroaks,
    initError
  } = useMainContract(network);
  const { sender, tonConnectUI } = useTonConnect()
  const [connected, setConnected] = useState(false);
  const classes = useStyles();
  const [posts, setPosts] = useState<PostProps[]>([]);
  const [isNextPageLoading, setIsNextPageLoading] = useState<boolean>(false);
  const [isLoadNextPage, setIsLoadNextPage] = useState<boolean>(false);
  const [nextCroakNumberCall, setNextCroakNumberCall] = useState<number | undefined>(undefined);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const loadNextPage = async () => {
    setIsNextPageLoading(true);
    const batchOfCroaks: BatchOfCroaks = await loadBatchOfCroaks(nextCroakNumberCall) as BatchOfCroaks;
    if (batchOfCroaks && Array.isArray(batchOfCroaks.croaks)) {
      setPosts(prev => [...prev, ...batchOfCroaks.croaks]);
      setNextCroakNumberCall(batchOfCroaks.nextCroakNumber);
    }
    setIsLoadNextPage(batchOfCroaks.isLastCroak)
    setIsNextPageLoading(false);
  };

  // Expand window on mobile version
  useEffect(() => {
    if (["android", "android_x", "ios"].includes(WebApp.platform) && !WebApp.isExpanded) {
      WebApp.expand();
    }
  }, []);

  // Check wallet connection status to show or hide Croak button
  useEffect(() => {
    const checkConnectionStatus = async () => {
      const isConnected = tonConnectUI.connected;
      setConnected(isConnected);
    };

    // Check the connection status immediately
    checkConnectionStatus();

    // Check the connection status every 500ms
    const intervalId = setInterval(checkConnectionStatus, 500);

    // Clear the interval when the component is unmounted
    return () => clearInterval(intervalId);
  }, [tonConnectUI]);

  // Load croaks only if mainContract is loaded
  useEffect(() => {
    if (mainContract && !isLoadNextPage) {
      loadNextPage();
    }
  }, [mainContract]);

  // Handle errors
  useEffect(() => {
    if (initError) {
      setErrorMessage(initError.message + ". Please refresh the page.");
    }
  }, [initError]);

  // Listen for scroll events
  useEffect(() => {
    const handleScroll = () => {
      // Load more items when user is at the bottom of the page
      if (window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight) {
        loadNextPage();
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editText, setEditText] = useState('');
  const [userid, setUserid] = useState('');
  const [seqno, setSeqno] = useState(BigInt(0));

  const handleEditClick = (croak: string, userid: string, seqno: bigint) => {
    setUserid(userid);
    setEditText(croak);
    setSeqno(seqno);
    setEditDialogOpen(true);
  };

  const handleEditClose = () => {
    setEditDialogOpen(false);
  };

  const handleEditPost = () => {
    editCroak(editText, seqno)
    setEditText('');
    handleEditClose();
  };

  return (
    <div>
      <div className={classes.container}>
        <img src={Image} alt="head" className={classes.image} />
        <header className={classes.header}>
          <button
            className={classes.tonNetworkButton}
            onClick={() => {
              const newNetwork = network === "testnet" ? "mainnet" : "testnet";
              setNetwork(newNetwork);
              localStorage.setItem("network", newNetwork);
              tonConnectUI.disconnect()
              window.location.reload();
            }}
          >
            <b>{network}</b>
          </button>
          <TonConnectButton className={classes.tonConnectButton} />
        </header>
        <div className={classes.croaks}>
          {posts.map((post, index) => (
            <Post
              key={index}
              croak={post.croak}
              username={post.username}
              avatarUrl={post.avatarUrl}
              handleEditClick={handleEditClick}
              sender={sender}
              owner={post.owner}
              seqno={post.seqno}
            />
          ))}
          {isNextPageLoading && <div>Fetching croaks...</div>}
        </div>
      </div>
      <div>
        {connected && (
          <CreatePostButton createCroak={createCroak} />
        )}
      </div>
      <CroakDialog
        open={editDialogOpen}
        handleClose={handleEditClose}
        handlePost={handleEditPost}
        text={editText}
        setText={setEditText}
        userid={userid}
      />
      <Snackbar open={errorMessage !== null} autoHideDuration={6000} onClose={() => setErrorMessage(null)}>
        <Alert onClose={() => setErrorMessage(null)} severity="error">
          {errorMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default App;
