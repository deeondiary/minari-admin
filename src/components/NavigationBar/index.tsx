'use client';
import styles from './NavigationBar.module.css';
import {useRouter} from 'next/navigation';
import Minari from '@/assets/minari-black.svg';
import NavigationButton from '@/components/NavigationButton';
import useBars from '@/hooks/useBars';

const NavigationBar = () => {
  const {menus, hide} = useBars();
  const barStyle = hide ? styles['container-hide'] : styles.container;

  const router = useRouter();
  const onClickMenu = (link: string) => {
    router.push(link);
  };

  return (
    <div className={barStyle}>
      <div className={styles['buttons__wrap']}>
        {menus.map((item) => (
          <div key={item.title}>
            <NavigationButton iconLeft={Minari} onClick={() => onClickMenu(item.link)}>
              {item.title}
            </NavigationButton>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NavigationBar;
