import {usePathname} from 'next/navigation';

const useBars = () => {
  const menus = [
    {title: '유저 조회', link: '/users'},
    {title: '리워드 지급', link: '/payments'},
  ];

  const pathname = usePathname();
  const noBarPages = ['/login', '/'];
  const hide = noBarPages.includes(pathname);

  return {
    menus,
    hide,
  };
};

export default useBars;
