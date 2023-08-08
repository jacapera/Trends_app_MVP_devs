import {
  DonutChart,
  LineChart,
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
  Text,
} from "@tremor/react";
import axios from "axios";
import { format } from "date-fns";
import s from "./adminPage.module.css";
import { useEffect, useState } from "react";

const totalUsersByDay = (data) => {
  const counts = {};
  data.forEach((user) => {
    const date = format(new Date(user.updatedAt), "yyyy-MM-dd HH:mm");
    counts[date] = (counts[date] || 0) + 1;
  });

  return Object.keys(counts).map((date) => ({
    date,
    ["Registered users"]: counts[date],
  }));
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
    <main className={s.container}>
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
              data={users}
              index="date"
              categories={["Registered users"]}
              colors={["amber"]}
              yAxisWidth={100}
            />
          </TabPanel>
          <TabPanel>
            <Text>Students</Text>
            <LineChart
              data={students}
              index="date"
              categories={["Registered students"]}
              colors={["sky"]}
              yAxisWidth={40}
            />
          </TabPanel>
          <TabPanel>
            <Text>Professionals</Text>
            <LineChart
              data={professionals}
              index="date"
              categories={["Registered professionals"]}
              colors={["lime"]}
              yAxisWidth={40}
            />
          </TabPanel>
          <TabPanel>
            <Text>Companies</Text>
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
      <div className={s.donutContainer}>
        <DonutChart
          variant="pie"
          data={donutData}
          category="total"
          index="name"
          colors={["sky", "lime", "red"]}
        />
        <span>
          Total users registered:{" "}
          <strong>
            {donutData.reduce(
              (tot, curr) => Number(tot) + Number(curr.total),
              [0]
            )}
          </strong>
        </span>
      </div>
    </main>
  );
}
