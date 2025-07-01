import styles from './LayoutWrapper.module.css';
import NavigationBar from '@/components/NavigationBar';
import Header from '@/components/Header';
import {SelectOptionProvider} from '@/contexts/SelectOptionProvider';
import {ModalClient} from '@/components/Modal/ModalClient';

const LayoutWrapper = ({children}: {children: React.ReactNode}) => {
  return (
    <SelectOptionProvider>
      <Header />
      <div className={styles.wrapper}>
        <NavigationBar />
        <div className={styles.contents}>{children}</div>
      </div>
      <ModalClient />
    </SelectOptionProvider>
  );
};

export default LayoutWrapper;
