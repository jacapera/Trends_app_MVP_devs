import {
  DonutChart,
  Flex,
  Legend,
  LineChart,
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
  Text,
} from "@tremor/react";
import axios from "axios";
import { format, parse } from "date-fns";
import { useEffect, useState } from "react";
const DATE_FORMAT = "yyyy-MM-dd HH:mm";

const totalUsersByDay = (data) => {
  const counts = {};
  data.forEach((user) => {
    const date = format(new Date(user.updatedAt), DATE_FORMAT);
    counts[date] = (counts[date] || 0) + 1;
  });

  return Object.keys(counts)
    .map((date) => ({
      date,
      ["Registered users"]: counts[date],
    }))
    .sort(
      (a, b) =>
        parse(a.date, DATE_FORMAT, new Date()) -
        parse(b.date, DATE_FORMAT, new Date())
    );
};

const countUsersByDay = (data, type) => {
  const counts = {};
  data
    .filter((user) => user.type === type)
    .forEach((student) => {
      const date = format(new Date(student.updatedAt), "yyyy-MM-dd HH:mm");
      counts[date] = (counts[date] || 0) + 1;
    });

  return Object.keys(counts).map((date) => ({
    date,
    [type === "company" ? `Registered companies` : `Registered ${type}s`]:
      counts[date],
  }));
};

const getUsers = async () => {
  try {
    const response = await axios.get(
      "http://localhost:3001/api/v1/admin/users",
      { withCredentials: "include" }
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export default function AdminPage() {
  const [users, setUsers] = useState([]);
  const [students, setStudents] = useState([]);
  const [professionals, setProfessionals] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [donutData, setDonutData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getUsers();
      setUsers(totalUsersByDay(data));
      setStudents(countUsersByDay(data, "student"));
      setProfessionals(countUsersByDay(data, "professional"));
      setCompanies(countUsersByDay(data, "company"));
      console.log(users);
      setDonutData([
        {
          name: "students",
          total: data.filter((user) => user.type === "student").length,
        },
        {
          name: "professionals",
          total: data.filter((user) => user.type === "professional").length,
        },
        {
          name: "companies",
          total: data.filter((user) => user.type === "company").length,
        },
      ]);
    };
    fetchData();
    return () => {};
  }, []);

  return (
    <main
      className="p-8 bg-slate-900 w-screen h-screen overflow-hidden flex flex-col items-center
     gap-8"
    >
      <header>
        <h1 className="uppercase">Admin Dashboard</h1>
      </header>
      <Flex>
        <TabGroup className="w-2/3">
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
                data={users}
                index="date"
                categories={["Registered users"]}
                colors={["amber"]}
                yAxisWidth={100}
              />
            </TabPanel>
            <TabPanel>
              <Text className="text-2xl mt-6">Students Charts</Text>
              <LineChart
                data={students}
                index="date"
                categories={["Registered students"]}
                colors={["sky"]}
                yAxisWidth={40}
              />
            </TabPanel>
            <TabPanel>
              <Text className="text-2xl mt-6">Professionals Charts</Text>
              <LineChart
                data={professionals}
                index="date"
                categories={["Registered professionals"]}
                colors={["lime"]}
                yAxisWidth={40}
              />
            </TabPanel>
            <TabPanel>
              <Text className="text-2xl mt-6">Companies Charts</Text>
              <LineChart
                data={companies}
                index="date"
                categories={["Registered companies"]}
                colors={["red"]}
                yAxisWidth={40}
              />
            </TabPanel>
          </TabPanels>
        </TabGroup>
        <Flex flexDirection="col" className="w-1/3 gap-6">
          <div>
            <DonutChart
              variant="pie"
              data={donutData}
              category="total"
              index="name"
              colors={["sky", "lime", "red"]}
            />
            <Legend
              categories={["Students", "Professionals", "Companies"]}
              colors={["sky", "lime", "red"]}
              className="mt-4"
            />
          </div>
          <Text className="text-2xl flex flex-col items-center">
            Total users registered
            <strong className="text-4xl text-green-400">
              {donutData.reduce(
                (tot, curr) => Number(tot) + Number(curr.total),
                [0]
              )}
            </strong>
          </Text>
        </Flex>
      </Flex>
    </main>
  );
}
