import React, { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../ui/Tabs';
import { Card, CardContent, CardHeader, CardTitle } from "../ui/Card";
import { Button } from '../ui/Button';

// Reusable Table Component
const Table = ({ columns, data }) => (
  <table>
    <thead>
      <tr>
        {columns.map((column, index) => (
          <th key={index}>{column.header}</th>
        ))}
      </tr>
    </thead>
    <tbody>
      {data.map((row, rowIndex) => (
        <tr key={rowIndex}>
          {columns.map((column, colIndex) => (
            <td key={colIndex}>{row[column.accessor]}</td>
          ))}
        </tr>
      ))}
    </tbody>
  </table>
);

// Reusable Tab Content Component
const TabContent = ({ title, columns, data }) => (
  <Card>
    <CardHeader>
      <CardTitle>{title}</CardTitle>
    </CardHeader>
    <CardContent>
      <Table columns={columns} data={data} />
    </CardContent>
  </Card>
);

const MyTabs = () => {
  const [tabs, setTabs] = useState([
    { id: 'leetquest', name: 'LeetQuest List' },
    { id: 'blind75', name: '75 Blind' },
  ]);
  const [selectedTab, setSelectedTab] = useState('leetquest');

  // Hard-coded data for LeetQuest List
  const leetQuestData = [
    { id: 1, title: 'Two Sum', difficulty: 'Easy', tags: ['Array', 'Hash Table'], completed: false },
    { id: 2, title: 'Add Two Numbers', difficulty: 'Medium', tags: ['Linked List', 'Math'], completed: true },
    { id: 3, title: 'Longest Substring Without Repeating Characters', difficulty: 'Medium', tags: ['Hash Table', 'String'], completed: false },
  ];

  const leetQuestColumns = [
    { header: 'ID', accessor: 'id' },
    { header: 'Title', accessor: 'title' },
    { header: 'Difficulty', accessor: 'difficulty' },
    { header: 'Tags', accessor: 'tags' },
    { header: 'Completed', accessor: 'completed' },
  ];

  // Hard-coded data for 75 Blind
  const blind75Data = [
    { id: 1, title: 'Valid Parentheses', difficulty: 'Easy', category: 'Stack' },
    { id: 2, title: 'Best Time to Buy and Sell Stock', difficulty: 'Easy', category: 'Array' },
    { id: 3, title: 'Merge Two Sorted Lists', difficulty: 'Easy', category: 'Linked List' },
  ];

  const blind75Columns = [
    { header: 'ID', accessor: 'id' },
    { header: 'Title', accessor: 'title' },
    { header: 'Difficulty', accessor: 'difficulty' },
    { header: 'Category', accessor: 'category' },
  ];

  const addNewTab = () => {
    const tabName = prompt("Enter the name for the new tab:");
    if (tabName) {
      const newTabId = `tab${tabs.length + 1}`;
      setTabs([...tabs, { id: newTabId, name: tabName }]);
      setSelectedTab(newTabId);
    }
  };

  return (
    <Tabs value={selectedTab} onValueChange={setSelectedTab}>
      <TabsList>
        {tabs.map(tab => (
          <TabsTrigger key={tab.id} value={tab.id}>
            {tab.name}
          </TabsTrigger>
        ))}
        <Button onClick={addNewTab}>+</Button>
      </TabsList>

      <TabsContent value="leetquest">
        <TabContent title="LeetQuest List" columns={leetQuestColumns} data={leetQuestData} />
      </TabsContent>

      <TabsContent value="blind75">
        <TabContent title="75 Blind" columns={blind75Columns} data={blind75Data} />
      </TabsContent>

      {tabs.slice(2).map(tab => (
        <TabsContent key={tab.id} value={tab.id}>
          <Card>
            <CardHeader>
              <CardTitle>{tab.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>This is a custom tab. You can add content here.</p>
            </CardContent>
          </Card>
        </TabsContent>
      ))}
    </Tabs>
  );
};

export default MyTabs;