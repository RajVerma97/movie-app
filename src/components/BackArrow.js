import ArrowBack from '@mui/icons-material/ArrowBack';
import IconButton from '@mui/material/IconButton'
import { useNavigate} from "react-router-dom";

const BackArrow = () => {

  const navigate = useNavigate();

  return (
    <div style={{marginBottom: "1em"}}>
      <IconButton size="large"  label="go back" onClick={() => navigate(-1)}>
        <ArrowBack fontSize='large' />
      </IconButton>
    </div>
  );
};

export default BackArrow;
