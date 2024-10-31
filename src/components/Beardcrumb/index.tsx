import React from 'react';
import CustomLink from '@components/CustomLink';
import style from './index.module.scss';

interface Breadcrumb {
  name: string;
  path: string;
  active?: boolean;
}

const Breadcrumb = (props: { routeSegments: Breadcrumb[]; color?: string }) => {
  const { routeSegments, color } = props;
  return (
    <div className={style.breadcrumb}>
      <div className={style.breadcrumbList}>
        {routeSegments
          ? routeSegments.map((route: Breadcrumb, index: number) => {
              return index !== routeSegments.length - 1 ? (
                <CustomLink key={index} href={route.path}>
                  <div className={style.hrefCrumb} style={{ color }}>
                    <span className={route.active ? style.hrefCrumb__active : ''}>
                      <span>{route.name}</span>
                    </span>{' '}
                    {'>>'}
                  </div>
                </CustomLink>
              ) : (
                <div key={index} className={style.hrefCrumb}>
                  <span className={route.active ? style.hrefCrumb__active : ''}>
                    <span>{route.name}</span>
                  </span>
                </div>
              );
            })
          : null}
      </div>
    </div>
  );
};

export default Breadcrumb;
