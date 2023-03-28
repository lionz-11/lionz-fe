import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import Header from '../../component/Header/Header';
import Layout from '../../component/Layout/Layout';
import Margin from '../../component/Margin/Margin';
import Typography from '../../component/Typography/Typography';
import Flex from '../../component/Flex/Flex';
import TagContainer from '../../component/TagContainer/TagContainer';
import LikeAndShare from '../../component/LikeAndShare/LikeAndShare';
import TextButton from '../../component/TextButton/TextButton';
import { Toast } from '../../component/Toast/Toast';
import PopupModal from '../../component/PopupModal/PopupModal';

const InnerWrapper = styled(Flex)`
  width: 100%;
  max-width: 852px;
  text-align: left;
  align-items: baseline;
  text-align: left;
`;

const NoticeInfo = () => {
  const { noticeIndex } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState('');
  const [category, setCategory] = useState('ALL');
  const [part, setPart] = useState({ user: '', selected: '' });
  const [noticeInfo, setNoticeInfo] = useState({
    date: '',
    deadline: '',
    explanation: '',
    id: -1,
    tag: [],
    target: '',
    title: '',
  });

  // 모달 확인창 관련 state
  const [modalActive, setModalActive] = useState(false);

  const onClickEdit = () => {
    navigate(`/notice/edit/${noticeIndex}`);
  };

  const onClickDelete = () => {
    setModalActive(true);
  };

  const deleteFunction = () => {
    axios
      .delete(`${process.env.REACT_APP_API}/notice/${noticeIndex}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      })
      .then((r) => {
        Toast('공지가 삭제되었습니다.');
        navigate('/notice-list');
      })
      .catch((e) => {
        navigate('/error');
      });
  };

  useEffect(() => {
    // 유저의 파트 정보 얻어오기
    axios
      .get(`${process.env.REACT_APP_API}/member/${localStorage.getItem('id')}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      })
      .then((r) => {
        setPart({ ...part, user: r.data.part });
        setUser(r.data.authority);
      })
      .catch((e) => {
        navigate('/error');
      });
    // 공지 내용 얻어오기
    axios
      .get(`${process.env.REACT_APP_API}/notice/${noticeIndex}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      })
      .then((r) => {
        console.log(r.data);
        setNoticeInfo(r.data);
      })
      .catch((e) => {
        navigate('/error');
      });
  }, []);

  return (
    <Layout style={{ textAlign: 'left' }}>
      <Header />
      <InnerWrapper flexCenter column>
        <Margin height='160' />
        <Flex flexCenter justify='space-between' style={{ width: '100%' }}>
          <Typography header style={{ width: 'calc(100% - 100px)', fontSize: '48px', letterSpacing: '0.04em', textWrap: 'break-word' }}>
            {noticeInfo.title}
          </Typography>
          {user === 'ROLE_ADMIN' && <TextButton haveDelete onClickEdit={onClickEdit} onClickDelete={onClickDelete} />}
        </Flex>
        <Margin height='30' />
        <Typography contentText color='darkGray'>{`${noticeInfo.target} • 게시일 : ${noticeInfo.date}`}</Typography>
        <Margin height='16' />
        <Flex flexCenter justify='space-between' style={{ width: '100%' }}>
          <TagContainer tag={noticeInfo.tag} />
          <LikeAndShare />
        </Flex>

        <Margin height='69' />
        <Typography contentText>{noticeInfo.explanation}</Typography>
      </InnerWrapper>
      <PopupModal
        modalActive={modalActive}
        setModalActive={() => setModalActive(false)}
        mainTitle='경고'
        subTitle='공지 삭제 시, 되돌릴 수 없습니다. 삭제를 진행하시겠습니까?'
        approve={deleteFunction}
        approveComment='삭제하기'
      />
    </Layout>
  );
};

export default NoticeInfo;
