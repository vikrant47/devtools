import React, { useState } from 'react';
import { List, Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { ThemeService } from '@/services/system/ui/theme.service';

export const ListboxWrapper = ({ children }: { children: React.ReactNode }) => (
  <div className="w-full border px-1 py-2 border-gray-300 dark:border-gray-700">{children}</div>
);

export interface SearchResult {
  title: string;
  description: string;
  href: string;
  icon?: string;
}

export interface SearchBarProps {
  searchText: string;
  onSearch: (searchText: string) => void;
  results: SearchResult[];
}

export function SearchBar({ searchText, onSearch, results }: SearchBarProps) {
  const filteredResults = results.filter((item) =>
    item.title.toLowerCase().includes(searchText.toLowerCase())
  );
  const [showResults, setShowResults] = useState(false);
  return (
    <div
      className=""
      onFocus={() => setShowResults(true)}
      onBlur={() => setTimeout(() => setShowResults(false), 500)}>
      <Input
        prefix={<SearchOutlined />}
        placeholder="Search Here"
        value={searchText}
        onChange={(e) => onSearch(e.target.value)}
      />
      {showResults && filteredResults.length === 0 && (
        <ListboxWrapper>
          <span className="text-sm text-gray-500">No results found</span>
        </ListboxWrapper>
      )}
      {showResults && filteredResults.length > 0 && (
        <div
          className="relative w-full"
          style={{
            maxHeight: '300px',
            overflowY: 'auto',
            position: 'absolute',
            width: '400px',
            zIndex: 1000,
            backgroundColor: ThemeService.instance().getTheme().token.backgroundColor
          }}>
          <List
            bordered
            dataSource={filteredResults}
            renderItem={(item: SearchResult) => (
              <List.Item
                key={item.href}
                onClick={() => {
                  window.location.href = item.href;
                }}
                className="cursor-pointer">
                <div className="flex justify-between items-center w-full">
                  <div className="flex gap-2 items-center">
                    <div className="flex flex-col">
                      <span className="text-sm">{item.title}</span>
                      <span className="text-xs text-gray-500">{item.description}</span>
                    </div>
                  </div>
                </div>
              </List.Item>
            )}
          />
        </div>
      )}
    </div>
  );
}
