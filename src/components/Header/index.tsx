'use client';
import styles from './Header.module.css';
import Image from 'next/image';
import Logo from '@/assets/logo-black.svg';
import {useRouter} from 'next/navigation';
import {deleteCookie} from '@/utils/cookies';
import useBars from '@/hooks/useBars';

const Header = () => {
  const {hide} = useBars();
  const router = useRouter();
  const headerStyle = hide ? styles['container-hide'] : styles.container;

  const onClickLogout = async () => {
    await deleteCookie('token');
    router.push('/');
  };

  return (
    <div className={headerStyle}>
      <Image src={Logo} alt="logo" />
      <button onClick={onClickLogout}>로그아웃</button>
    </div>
  );
};

export default Header;
