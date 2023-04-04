import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import { MdIosShare } from 'react-icons/md';
import theme from '../../assets/theme/Theme';
import Typography from '../Typography/Typography';
import { Toast } from '../Toast/Toast';

const Container = styled.div`
  width: 114px;
  height: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const LikeWrapper = styled.div`
  cursor: pointer;
  width: 78px;
  height: 30px;
  border-radius: 50px;
  margin-left: 3px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  text-align: center;
  background-color: ${theme.colors.veryLightBlue};
  p {
    color: ${theme.colors.blue};
  }
`;

const Like = styled.div`
  padding-top: 3px;
  ${theme.flex.flexCenter};
  height: 24px;
  border-radius: 50px;
  width: 24px;
  background-color: ${theme.colors.white};
`;

const ShareWrapper = styled.div`
  ${theme.flex.flexCenter};
  cursor: pointer;
  height: 30px;
  border-radius: 50px;
  width: 30px;
  background-color: ${theme.colors.veryLightBlue};
`;

const LikeAndShare = ({ like, setLike }) => {
  const location = useLocation();

  const handleCopyClipBoard = async (text) => {
    await navigator.clipboard.writeText(text);
    Toast('클립보드에 링크가 복사되었어요.');
  };

  return (
    <Container onClick={() => handleCopyClipBoard(`${process.env.REACT_APP_BASEURL}${location.pathname}`)}>
      <LikeWrapper>
        <Typography sideContentSmall style={{ width: '100%' }}>
          공유하기
        </Typography>
      </LikeWrapper>
      <ShareWrapper>
        <MdIosShare size='16' color={theme.colors.blue} style={{ marginBottom: '2px' }} />
      </ShareWrapper>
    </Container>
  );
};

/*
      <LikeWrapper onClick={setLike}>
        {like ? <Like>🦁</Like> : <Like>🐾</Like>}
        <Typography sideContentSmall>324</Typography>
      </LikeWrapper>
*/
export default LikeAndShare;
