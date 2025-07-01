'use client';
import styles from './page.module.css';
import Image from 'next/image';
import Minari from '@/assets/logo-black.svg';
import TextInput from '@/components/TextInput';
import {useState} from 'react';
import Button from '@/components/Button';
import {useRouter} from 'next/navigation';
import {setCookie} from '@/utils/cookies';

const LoginPage = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');

  const router = useRouter();
  const onClickLogin = async () => {
    await setCookie('token', '🍪', {httpOnly: false});
    router.push('/');
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <Image src={Minari} alt="" />
        <div className={styles['input-section']}>
          <TextInput value={id} setValue={setId} label="아이디" />
          <TextInput value={password} setValue={setPassword} label="패스워드" />
          <Button onClick={onClickLogin}>어서오세요</Button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
