import {
  Card,
  DonutChart,
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
import { format } from "date-fns";
import { useEffect, useState } from "react";

export default function AdminPage() {
  const [users, setUsers] = useState({});
  const [totalUsers, setTotalUsers] = useState([]);
  const [donutData, setDonutData] = useState([]);

  const formatDate = (date_utc0) => {
    const DATE_BY_MIN = "yyyy-MM-dd HH:mm";
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    return format(new Date(date_utc0), DATE_BY_MIN, {
      timeZone,
    });
  };

  const cleanedData = (users) => {
    if (typeof users === "object" && !Array.isArray(users))
      return {
        students: users.students.map((el) => ({
          ["Estudiantes Registrados"]: el.total,
          creation_date: formatDate(el.creation_date_utc),
        })),
        professionals: users.professionals.map((el) => ({
          ["Profesionales Registrados"]: el.total,
          creation_date: formatDate(el.creation_date_utc),
        })),
        companies: users.companies.map((el) => ({
          ["Compañias Registradas"]: el.total,
          creation_date: formatDate(el.creation_date_utc),
        })),
      };

    if (Array.isArray(users))
      return users.map((el) => ({
        ["Usuarios Registrados"]: el.total,
        creation_date: formatDate(el.creation_date_utc),
      }));
  };

  const mergedUsers = (users) => {
    const results = [];
    const totalUsers = [
      ...users.students,
      ...users.professionals,
      ...users.companies,
    ];
    for (const user of totalUsers) {
      const existResult = results.find(
        (el) => el.creation_date_utc === user.creation_date_utc
      );

      if (existResult) existResult.total += parseInt(user.total);
      else {
        results.push({
          total: parseInt(user.total),
          creation_date_utc: user.creation_date_utc,
        });
      }
    }

    results.sort(
      (a, b) => new Date(a.creation_date_utc) - new Date(b.creation_date_utc)
    );

    return cleanedData(results);
  };

  const getUsers = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:3001/api/v1/admin/users",
        { withCredentials: "include" }
      );
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await getUsers();
      setUsers(cleanedData(data));
      setTotalUsers(mergedUsers(data));
      setDonutData([
        {
          name: "estudiantes",
          total: data?.students.reduce(
            (tot, curr) => tot + parseInt(curr.total),
            0
          ),
        },
        {
          name: "profesionales",
          total: data?.professionals.reduce(
            (tot, curr) => tot + parseInt(curr.total),
            0
          ),
        },
        {
          name: "compañias",
          total: data?.companies.reduce(
            (tot, curr) => tot + parseInt(curr.total),
            0
          ),
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
      <Card>
        <header>
          <h1 className="uppercase">Panel de Administrador</h1>
        </header>
        <div className="flex gap-10">
          <TabGroup className="w-2/3">
            <TabList>
              <Tab>Todos los usuarios</Tab>
              <Tab>Estudiantes</Tab>
              <Tab>Profesionales</Tab>
              <Tab>Compañias</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <Text className="text-2xl mt-6">
                  Graficos sobre todos los usuarios
                </Text>
                <LineChart
                  className="w-full h-96"
                  data={totalUsers}
                  index={
                    totalUsers.length > 0 ? Object.keys(totalUsers[0])[1] : ""
                  }
                  categories={[
                    totalUsers.length > 0 ? Object.keys(totalUsers[0])[0] : "",
                  ]}
                  colors={["amber"]}
                />
              </TabPanel>
              <TabPanel>
                <Text className="text-2xl mt-6">
                  Graficos sobre estudiantes
                </Text>
                <LineChart
                  className="w-full h-96"
                  data={users?.students}
                  index={
                    users.students ? Object.keys(users.students[0])[1] : ""
                  }
                  categories={[
                    users.students ? Object.keys(users.students[0])[0] : "",
                  ]}
                  colors={["sky"]}
                />
              </TabPanel>
              <TabPanel>
                <Text className="text-2xl mt-6">
                  Graficos sobre profesionales
                </Text>
                <LineChart
                  className="w-full h-96"
                  data={users?.professionals}
                  index={
                    users.professionals
                      ? Object.keys(users.professionals[0])[1]
                      : ""
                  }
                  categories={[
                    users.professionals
                      ? Object.keys(users.professionals[0])[0]
                      : "",
                  ]}
                  colors={["lime"]}
                />
              </TabPanel>
              <TabPanel>
                <Text className="text-2xl mt-6">Graficos sobre compañias</Text>
                <LineChart
                  className="w-full h-96"
                  data={users?.companies}
                  index={
                    users.companies ? Object.keys(users.companies[0])[1] : ""
                  }
                  categories={[
                    users.companies ? Object.keys(users.companies[0])[0] : "",
                  ]}
                  colors={["red"]}
                />
              </TabPanel>
            </TabPanels>
          </TabGroup>
          <div className="flex flex-col items-center justify-center w-1/3 gap-20">
            <div className="flex flex-col items-center">
              <DonutChart
                variant="pie"
                data={donutData}
                category="total"
                index="name"
                colors={["sky", "lime", "red"]}
              />
              <Legend
                categories={["Estudiantes", "Profesionales", "Compañias"]}
                colors={["sky", "lime", "red"]}
                className="mt-4"
              />
            </div>
            <Text className="text-2xl flex flex-col items-center">
              Total de usuarios registrados en la plataforma
              <strong className="text-4xl text-green-400">
                {donutData.reduce(
                  (tot, curr) => Number(tot) + Number(curr.total),
                  [0]
                )}
              </strong>
            </Text>
          </div>
        </div>
      </Card>
    </main>
  );
}
