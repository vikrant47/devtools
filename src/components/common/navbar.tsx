import { Button, Input, Menu } from 'antd';
import {
  HeartFilled,
  SearchOutlined,
  TwitterOutlined,
  GithubOutlined,
  DiscordOutlined
} from '@ant-design/icons';
import Link from 'next/link';
import { useState, useEffect, useContext } from 'react';
import { siteConfig } from '@/config/site';
import clsx from 'clsx';

import { ThemeSwitch } from '@/components/theme-switch';
import { Logo } from '@/components/icons';
import { SearchBar } from './search/searchbar';
import { ToolContext } from '@/contexts/tool-context';
import { subtitle, title } from '../primitives';

const { SubMenu } = Menu;

export const Navbar = () => {
  const [searchableTools, setSearchableTools] = useState<any>([]);
  const [searchText, setSearchText] = useState<string>('');
  const toolDefinition = useContext(ToolContext);
  useEffect(() => {
    import('@/config/tools.config').then((module) => {
      setSearchableTools(module.getToolsConfigAsArray({ active: true }));
    });
  }, []);

  return (
    <div className="menu flex items-center gap-3 ">
      <div className="flex items-center gap-3">
        <Logo />
        <h1 className={subtitle()} style={{ textWrap: 'nowrap' }}>
          {toolDefinition?.title || siteConfig.name}
        </h1>
      </div>
      <Menu
        mode="horizontal"
        style={{ width: '100%', borderBottom: 'none' }}
        className="pl-0 ml-0 pr-5">
        {siteConfig.navItems.map((item) => (
          <Menu.Item key={item.href}>
            <Link href={item.href}>{item.label}</Link>
          </Menu.Item>
        ))}
      </Menu>

      <div
        className="hidden sm:flex basis-1/5 sm:basis-full justify-end align-middle gap-2"
        style={{ position: 'absolute', right: '20px', top: '10px' }}>
        <div className="hidden sm:flex gap-2">
          <Link href={siteConfig.links.twitter} passHref>
            <Button type="link" icon={<TwitterOutlined className="text-default-500" />} />
          </Link>
          <Link href={siteConfig.links.discord} passHref>
            <Button type="link" icon={<DiscordOutlined className="text-default-500" />} />
          </Link>
          <Link href={siteConfig.links.github} passHref>
            <Button type="link" icon={<GithubOutlined className="text-default-500" />} />
          </Link>
          <ThemeSwitch />
        </div>
        <div className="hidden lg:flex">
          <SearchBar
            searchText={searchText}
            results={searchableTools}
            onSearch={(val) => {
              setSearchText(val);
            }}
          />
        </div>
        <div className="hidden md:flex">
          <Button
            href={siteConfig.links.sponsor}
            type="text"
            icon={<HeartFilled className="text-danger" />}
            className="text-sm font-normal text-default-600 bg-default-100">
            Sponsor
          </Button>
        </div>
      </div>
      <div className="sm:hidden pl-4 justify-end">
        <Link href={siteConfig.links.github} passHref>
          <GithubOutlined className="text-default-500" />
        </Link>
        <ThemeSwitch />
        <SearchOutlined />
      </div>
      {/* <Menu.Item style={{ padding: '0' }}>
    <Menu mode="inline" inlineCollapsed={true}>
      {siteConfig.navMenuItems.map((item, index) => (
        <Menu.Item key={`${item}-${index}`}>
          <Link href="#">
            <Button type="link">{item.label}</Button>
          </Link>
        </Menu.Item>
      ))}
    </Menu>
  </Menu.Item> */}
    </div>
  );
};
