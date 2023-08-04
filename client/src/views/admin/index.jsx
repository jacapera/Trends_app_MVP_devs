import {
  TabGroup,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Text,
  LineChart,
  DonutChart,
} from "@tremor/react";

export default function AdminPage() {
  const citiesDonutes = [
    {
      name: "New York",
      sales: 9800,
    },
    {
      name: "London",
      sales: 4567,
    },
    {
      name: "Hong Kong",
      sales: 3908,
    },
    {
      name: "San Francisco",
      sales: 2400,
    },
    {
      name: "Singapore",
      sales: 1908,
    },
    {
      name: "Zurich",
      sales: 1398,
    },
  ];

  const chartdata = [
    {
      year: 1970,
      "Export Growth Rate": 2.04,
      "Import Growth Rate": 1.53,
    },
    {
      year: 1971,
      "Export Growth Rate": 1.96,
      "Import Growth Rate": 1.58,
    },
    {
      year: 1972,
      "Export Growth Rate": 1.96,
      "Import Growth Rate": 1.61,
    },
    {
      year: 1973,
      "Export Growth Rate": 1.93,
      "Import Growth Rate": 1.61,
    },
    {
      year: 1974,
      "Export Growth Rate": 1.88,
      "Import Growth Rate": 1.67,
    },
  ];

  // const dataFormatter = (number) => `${Intl.NumberFormat("us").format(number).toString()}%`;

  return (
    <main>
      <header>
        <h1>Admin Dashboard</h1>
      </header>
      <TabGroup>
        <TabList>
          <Tab>All</Tab>
          <Tab>Students</Tab>
          <Tab>Professionals</Tab>
          <Tab>Companies</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Text>
              <h2>Total users</h2>
            </Text>
            <LineChart
              data={chartdata}
              index="year"
              categories={["Export Growth Rate", "Import Growth Rate"]}
              colors={["emerald", "gray"]}
              // valueFormatter={dataFormatter}
              yAxisWidth={40}
            />
          </TabPanel>
          <TabPanel>
            <Text>Students</Text>
          </TabPanel>
          <TabPanel>
            <Text>Professionals</Text>
          </TabPanel>
          <TabPanel>
            <Text>Companies</Text>
          </TabPanel>
        </TabPanels>
      </TabGroup>
      <div>
        <DonutChart
          variant="pie"
          data={citiesDonutes}
          category="sales"
          index="name"
          colors={["slate", "violet", "indigo", "rose", "cyan", "amber"]}
        />
      </div>
    </main>
  );
}
