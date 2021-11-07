import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import qs from 'qs';
import { setUser } from '../../store/slices/userSlice';
import { useHistory } from 'react-router-dom';
import { getAccessToken } from '@api/auth';

function Auth(): JSX.Element {
  const dispatch = useDispatch();
  const history = useHistory();
  const getGithubToken = async () => {
    const query = qs.parse(location.search, {
      ignoreQueryPrefix: true,
    });
    const code = query.code as string;

    try {
      const data = await getAccessToken(code);
      console.log(data);
      const { githubId: id, githubName: name, avatarUrl: image } = data;
      dispatch(setUser({ id, name, image }));
      history.push('/');
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getGithubToken();
  }, []);

  return <div />;
}

export default Auth;
