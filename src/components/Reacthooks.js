import useFetch from "../hooks/useFetch";
import useLocalStorage from "../hooks/useLocalStorage";
import { useJWTAuth, useLogin, useLogout } from "../hooks/useAuth";
import TableComponent from "../helpers/TableComponent";
import { Button, Chip, Grid2, TextField } from "@mui/material";
import SelectComponent from "../helpers/SelectComponet";

function Reacthooks() {
  const { data, error, loading } = useFetch(
    "https://sports1.gitam.edu/api/gym/updateGymSchedule",
    "POST",
    {
      regdNo: "2023006357",
      start_time: "3:00 PM",
      start_date: "2024-09-26",
      masterID: "676",
      admin_id: "123455",
    }
  );
  const { sdata, message } = useLocalStorage("data", "hello", "GET");

  const { loginStatus, login } = useLogin("jeevanjames", "1234", "user");
  console.log("login: ", loginStatus, login);

  const { logoutStatus, logout } = useLogout("user");
  console.log("logout: ", logout, logoutStatus);

  // const { loggedIn, expiry } = useJWTAuth("tokenweweweweweweweewwew");
  // console.log("loggedIn: ", loggedIn, expiry);

  const Render = () => {
    const columns = [
      {
        header: "Sl.no",
        key: "id",
      },
      {
        header: "Employee name",
        key: "name",
        component: (rowData) => {
          return rowData.isEdit ? (
            <TextField defaultValue={rowData.name} variant="outlined" />
          ) : (
            rowData.name
          );
        },
      },
      {
        header: "Emp salary",
        key: "salary",
      },
      {
        header: "Emp age",
        key: "age",
      },
      {
        header: "Options",
        key: "options",
        component: (rowData) => {
          const handleClick = (rowData) => {
            rowData.isEdit = true;
          };
          return (
            <Grid2 display={"flex"} gap={2}>
              {rowData.isEdit ? (
                <>
                  <Button
                    variant="outlined"
                    onClick={() => handleClick(rowData)}
                  >
                    Cancel
                  </Button>
                  <Button variant="outlined">Save</Button>
                </>
              ) : (
                <Button variant="outlined" onClick={() => handleClick(rowData)}>
                  Edit
                </Button>
              )}
              <Button variant="outlined">Delete</Button>
            </Grid2>
          );
        },
      },
    ];

    const tableData = [
      { id: 1, name: "Jeevan", salary: "300000", age: "24" },
      { id: 2, name: "Naidu", salary: "400000", age: "26" },
      { id: 3, name: "Sai Ram", salary: "600000", age: "29" },
    ];
    return (
      <>
        <TableComponent columns={columns} data={tableData} />
        <SelectComponent
          data={["option1", "option2", "opion3", "....options"]}
        />
        <h1>useFetch hook</h1>
        <h1>useLocalStorage hook</h1>
        <h1>useJWT hook</h1>
        <h1>useLogin hook</h1>
        <h1>useLogout hook</h1>
      </>
    );
  };

  return <div className="App">{loading ? <h1>...Loading</h1> : Render()}</div>;
}

export default Reacthooks;
