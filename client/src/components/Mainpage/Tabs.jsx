import React, { useState, useMemo } from 'react';
import { useTable, useExpanded } from 'react-table';
import { Card, CardContent, CardHeader, CardTitle } from "../ui/Card";
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import useUserInfo from '../../lib/useUserInfo';

// EditableCell component
const EditableCell = ({
  value: initialValue,
  row: { index },
  column: { id },
  updateMyData,
}) => {
  const [value, setValue] = useState(initialValue);

  const onChange = e => {
    setValue(e.target.value);
  };

  const onBlur = () => {
    updateMyData(index, id, value);
  };

  React.useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  return <Input value={value} onChange={onChange} onBlur={onBlur} />;
};

// Table component
const Table = ({ columns, data, updateMyData, renderRowSubComponent }) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    visibleColumns,
  } = useTable(
    {
      columns,
      data,
      updateMyData,
    },
    useExpanded
  );

  return (
    <table {...getTableProps()} className="w-full border-collapse">
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps()} className="border p-2 bg-zinc-500">
                {column.render('Header')}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row);
          return (
            <React.Fragment key={row.getRowProps().key}>
              <tr>
                {row.cells.map(cell => {
                  return (
                    <td {...cell.getCellProps()} className="border p-2">
                      {cell.render('Cell')}
                    </td>
                  );
                })}
              </tr>
              {row.isExpanded ? (
                <tr>
                  <td colSpan={visibleColumns.length}>
                    {renderRowSubComponent({ row })}
                  </td>
                </tr>
              ) : null}
            </React.Fragment>
          );
        })}
      </tbody>
    </table>
  );
};

// CategoryTable component
const CategoryTable = ({ data, updateMyData, isAdmin }) => {
  const columns = useMemo(
    () => [
      {
        Header: 'ID',
        accessor: 'id',
      },
      {
        Header: 'Title',
        accessor: 'title',
        Cell: ({ value, row }) => (
          <a href={row.original.link} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
            {value}
          </a>
        ),
      },
      {
        Header: 'Difficulty',
        accessor: 'difficulty',
        Cell: ({ value, row, column: { id }, updateMyData }) =>
          isAdmin ? (
            <EditableCell value={value} row={row} column={{ id }} updateMyData={updateMyData} />
          ) : (
            <span>{value}</span>
          ),
      },
      {
        Header: 'Tags/Category',
        accessor: 'tags',
        Cell: ({ value, row }) => (value ? value.join(', ') : row.original.category),
      },
      {
        Header: 'Completed',
        accessor: 'completed',
        Cell: ({ value, row, column: { id }, updateMyData }) => (
          <Select
            value={value}
            onChange={e => updateMyData(row.index, id, e.target.value)}
          >
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </Select>
        ),
      },
    ],
    [isAdmin]
  );

  return (
    <div>
      {data.categories.map((category, categoryIndex) => (
        <div key={categoryIndex}>
          <h3 className="text-xl font-bold mt-4 mb-2">{category.name}</h3>
          <Table
            columns={columns}
            data={category.questions}
            updateMyData={(rowIndex, columnId, value) =>
              updateMyData(categoryIndex, rowIndex, columnId, value)
            }
          />
        </div>
      ))}
    </div>
  );
};

// Chip component
const Chip = ({ label, isSelected, onClick }) => (
  <button
    className={`m-1 px-3 py-1 rounded-full text-sm font-semibold ${
      isSelected ? 'bg-zinc-800 text-white' : 'bg-none text-zinc-400'
    }`}
    onClick={onClick}
  >
    {label}
  </button>
);

// MyTabs component
const MyTabs = () => {
  const { user } = useUserInfo();
  const isAdmin = user?.role === 'admin';

  const [tabs, setTabs] = useState([
    { id: 'leetquest', name: 'LeetQuest List' },
    { id: 'blind75', name: '75 Blind' },
  ]);
  const [selectedTab, setSelectedTab] = useState('leetquest');
  const [data, setData] = useState({
    leetquest: {
      categories: [
        {
          name: 'Array',
          questions: [
            { id: 1, title: 'Two Sum', difficulty: 'Easy', tags: ['Array', 'Hash Table'], completed: 'No', link: 'https://leetcode.com/problems/two-sum/' },
            { id: 2, title: 'Add Two Numbers', difficulty: 'Medium', tags: ['Linked List', 'Math'], completed: 'Yes', link: 'https://leetcode.com/problems/add-two-numbers/' },
          ]
        }
      ]
    },
    blind75: {
      categories: [
        {
          name: 'String',
          questions: [
            { id: 1, title: 'Valid Parentheses', difficulty: 'Easy', tags: ['Stack'], completed: 'No', link: 'https://leetcode.com/problems/valid-parentheses/' },
            { id: 2, title: 'Best Time to Buy and Sell Stock', difficulty: 'Easy', tags: ['Array'], completed: 'Yes', link: 'https://leetcode.com/problems/best-time-to-buy-and-sell-stock/' },
          ]
        }
      ]
    },
  });

  // Update function for table data
  const updateMyData = (categoryIndex, rowIndex, columnId, value) => {
    setData(oldData => {
      const newData = JSON.parse(JSON.stringify(oldData)); // Deep copy to avoid direct state mutation
      newData[selectedTab].categories[categoryIndex].questions[rowIndex][columnId] = value;
      return newData;
    });
  };

  // Function to add a new tab
  const addNewTab = () => {
    const tabName = prompt("Enter the name for the new tab:");
    if (tabName) {
      const newTabId = `tab${tabs.length + 1}`;
      setTabs([...tabs, { id: newTabId, name: tabName }]);
      setData({ ...data, [newTabId]: { categories: [] } });
      setSelectedTab(newTabId);
    }
  };

  // Function to add a new question
  const addNewQuestion = () => {
    const newQuestion = {
      id: data[selectedTab].categories[0].questions.length + 1,
      title: 'New Question',
      difficulty: 'Medium',
      tags: [],
      completed: 'No',
      link: '',
    };
    setData(oldData => {
      const newData = JSON.parse(JSON.stringify(oldData));
      newData[selectedTab].categories[0].questions.push(newQuestion);
      return newData;
    });
  };

  // Render row subcomponent
  const renderRowSubComponent = React.useCallback(
    ({ row }) => (
      <pre
        style={{
          fontSize: '10px',
        }}
      >
        <code>{JSON.stringify({ values: row.values }, null, 2)}</code>
      </pre>
    ),
    []
  );

  return (
    <div className="w-full p-4">
      <div className="flex flex-wrap mb-4">
        {tabs.map(tab => (
          <Chip
            key={tab.id}
            label={tab.name}
            isSelected={selectedTab === tab.id}
            onClick={() => setSelectedTab(tab.id)}
          />
        ))}
        {isAdmin && <Button onClick={addNewTab} className="ml-2">+</Button>}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{tabs.find(tab => tab.id === selectedTab)?.name}</CardTitle>
        </CardHeader>
        <CardContent className='w-full'>
          <CategoryTable
            data={data[selectedTab]}
            updateMyData={updateMyData}
            isAdmin={isAdmin}
          />
          {isAdmin && <Button onClick={addNewQuestion} className="mt-4">Add New Question</Button>}
        </CardContent>
      </Card>
    </div>
  );
};

export default MyTabs;
