import React from 'react';

interface TableOfContentProps {
  items: any[];
  activeItemId: string;
  onItemClick: (event: React.MouseEvent, id: string) => void;
}

const TableOfContent = ({
  items,
  activeItemId,
  onItemClick
}: TableOfContentProps) => {
  return (
    <>
      <div className='text-lg mb-2 font-bold'>On this page</div>
      <ul className=''>
        {items.map((item) => (
          <li key={item.id} className=''>
            <a
              href={`#${item.id}`}
              className={`text-sm block h-full py-1.5 font-medium ${activeItemId === item.id ? 'font-bold text-blue-600' : ''}`}
              onClick={(e) => onItemClick(e, item.id)}
              style={{
                paddingLeft: (item.level - 2) * 16
              }}
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </>
  );
};

export default TableOfContent;
