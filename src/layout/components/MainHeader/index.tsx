import React, { useEffect, useState } from 'react';
import style from './header.module.scss';
import cls from 'classnames';
import { useRouter } from 'next/router';
import { ROUTE_PATH } from '@utils/common';
import { useAuth } from '@store/auth/useAuth';
import { useProfile } from '@store/profile/useProfile';
import { useLogout } from './service';
import { ENV } from '../../../utils/env';

interface IsMenu {
  id: number;
  name: string;
  path: string;
  menus?: IsMenu[];
  path_child?: string;
}

const LIST_MENU = [
  {
    id: 1,
    name: 'trưởng nhóm',
    path: '/TN',
    menus: [
      {
        id: 10,
        name: 'Danh sách trưởng nhóm',
        path: '/LIST_GROUP',
        path_child: '/TN',
      },
      {
        id: 11,
        name: 'Danh sách thiết bị',
        path: '/LIST_MEMBER',
        path_child: '/TN',
      },
      {
        id: 12,
        name: 'Kiểm tra logs',
        path: '/CHECK_LOG',
        path_child: '/TN',
      },
    ],
  },
  {
    id: 2,
    name: 'marketing',
    path: '/MKT',
    menus: [
      {
        id: 14,
        name: 'Tạo mới chiến dịch',
        path: '/CREATE_CAMPAIGN',
        path_child: '/MKT',
      },
      {
        id: 15,
        name: 'Danh sách chiến dịch',
        path: '/LIST_CAMPAIGN',
        path_child: '/MKT',
      },
      {
        id: 16,
        name: 'Báo cáo người dùng',
        path: '/REPORT_USER',
        path_child: '/MKT',
      },
    ],
  },
  {
    id: 3,
    name: 'Giám sát hệ thống',
    path: '/MONITOR_SYSTEM',
  },
  {
    id: 4,
    name: 'Thiết lập',
    path: '/SETTING',
  },
];

function Header() {
  const router = useRouter();
  const { onLogout } = useAuth();
  const { profile } = useProfile();
  const [path, setPath] = useState<string>(ROUTE_PATH.SETTING);

  const handleActiveItem = (menu: IsMenu) => {
    setPath(menu.path);
    if (!menu.menus?.length) router.push(menu.path.toLowerCase());
  };

  const handleActiveChildItem = (val: IsMenu) => {
    router.push(val.path.toLowerCase());
  };

  const getPath = (data: any) => {
    if (!data?.menus) {
      const currentPath = window.location.href;
      const pathParts = currentPath.split('/');
      return (
        `${pathParts[0]}//${pathParts[2]}${(data?.path).toLowerCase()}` ||
        `${pathParts[0]}//${pathParts[2]}`
      );
    }
  };

  const getPathMenuItem = (data: any) => {
    const currentPath = window.location.href;
    const pathParts = currentPath.split('/');
    const port = ENV.PORT || 3005;
    const appEnv = ENV.NODE_ENV || 'production';

    let pathHost = '';
    const hostRedirect = pathParts[2].split(':');
    if (hostRedirect.includes(`${port}`) && appEnv === 'production') {
      pathHost = hostRedirect[0];
    } else {
      pathHost = pathParts[2];
    }

    return (
      `${pathParts[0]}//${pathHost}${(data?.path).toLowerCase()}` || `${pathParts[0]}//${pathHost}`
    );
  };

  useEffect(() => {
    const findItemActive = LIST_MENU.find((x) => router.pathname.includes(x.path.toLowerCase()));
    let findItemActiveChild: IsMenu = {} as IsMenu;
    if (!!findItemActive) {
      setPath(findItemActive.path);
    } else {
      LIST_MENU.forEach((menu: IsMenu) => {
        if (menu.menus?.length) {
          const findItem = menu.menus?.find((item: IsMenu) =>
            router.pathname.includes(item.path.toLowerCase()),
          ) as IsMenu;
          if (!!findItem) {
            findItemActiveChild = findItem;
          }
        }
      });
      if (findItemActiveChild.path_child) setPath(findItemActiveChild.path_child);
    }
  }, [router.pathname]);

  const handleLogout = () => {
    logout.run();
  };
  const logout = useLogout({
    onSuccess: (resp) => {
      if (resp.status) {
        onLogout();
      }
    },
    onError: () => {
      console.log('error');
    },
  });

  return (
    <div className={style.header}>
      <div className={style.header__logo}>
        <img src={'/static/images/mobifone_logo.png'} alt={'logo-mobi'} width={269} height={151} />
      </div>
      <div className={style.header__menu}>
        {LIST_MENU.map((menu: IsMenu) => {
          return (
            <div
              className={cls(style.header__menu__item, {
                [style.header__menu__item_active]: menu.path === path,
              })}
              key={menu.id}
              onClick={() => handleActiveItem(menu)}
            >
              <a
                href={getPath(menu)}
                target='_blank'
                rel='noreferrer'
                onClick={(e) => {
                  e.preventDefault();
                }}
                className={style.custom_link}
              >
                {menu.name}
              </a>
              {menu.menus && (
                <div className={style.header__menu__item_list}>
                  {menu.menus.map((val: IsMenu) => (
                    <div key={val.id} onClick={() => handleActiveChildItem(val)}>
                      {router.pathname.includes(val.path.toLowerCase()) ? (
                        <a
                          className={style.a1}
                          href={getPathMenuItem(val)}
                          target='_blank'
                          rel='noreferrer'
                          onClick={(e) => {
                            e.preventDefault();
                          }}
                        >
                          {val.name}
                        </a>
                      ) : (
                        <a
                          className={style.a2}
                          href={getPathMenuItem(val)}
                          target='_blank'
                          rel='noreferrer'
                          onClick={(e) => {
                            e.preventDefault();
                          }}
                        >
                          {val.name}
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
      <div className={style.header__user}>
        <div className={style.header__user_logo}>
          <div
            style={{
              backgroundColor: 'white',
              display: 'flex',
              alignItems: 'center',
              width: '25px',
              height: '25px',
              justifyContent: 'center',
              borderRadius: '8px ',
            }}
          >
            <img src={'/static/images/Vector.png'} alt={'icon-user'} width={17} height={17} />
          </div>
          <a className={style.name_admin}>{profile?.first_name}</a>
        </div>
        <div className={style.header__user_list}>
          <div onClick={() => router.push(ROUTE_PATH.UPDATE_PASSWORD)}>Đặt lại mật khẩu</div>
          <div onClick={handleLogout}>Đăng xuất</div>
        </div>
      </div>
    </div>
  );
}

export default Header;
