import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  Link,
} from "react-router-dom";
import Reacthooks from "./components/Reacthooks";
import Chat from "./components/Chat/Chat";
import Print from "./components/Print/Print";
import EventBubbling from "./components/Payments/EventBubbling";
import Accordion from "./components/Accordion";
import TableComponent from "./components/TablePagination";
import SearchableTable from "./components/SearchUsingVoice";
import GoogleSign from "./Auth/GoogleSignin";
import ReactTransitionGroup from "./components/ReactTransitionGroup";
import ProgressiveImage from "./components/ProgressiveImage";
import AutoComplete from "./components/AutoComplete";
import FileExplorer from "./components/FileExplorer";
import VirtualizedList from "./components/VirtualizedList";
import TrafficLight from "./components/SignalLights";
import Clock from "./components/digitalClock";
import JobPostings from "./components/JobPostings";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import ReactQuery from "./components/reactQuery";
import axios from "axios";
import PreFetch from "./components/PreFetch";
import SWR from "./components/preFetchSWR";
import Main from "./Main";

function App() {
  function Div() {
    return (
      <>
        <table style={{ borderCollapse: "collapse", width: "100%" }}>
          <thead>
            <tr>
              <th style={{ border: "1px solid black", padding: "8px" }}>
                Header 1
              </th>
              <th style={{ border: "1px solid black", padding: "8px" }}>
                Header 2
              </th>
              <th style={{ border: "1px solid black", padding: "8px" }}>
                Header 3
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ border: "1px solid black", padding: "8px" }}>
                Row 1, Col 1
              </td>
              <td style={{ border: "1px solid black", padding: "8px" }}>
                Row 1, Col 2
              </td>
              <td style={{ border: "1px solid black", padding: "8px" }}>
                Row 1, Col 3
              </td>
            </tr>
            <tr>
              <td style={{ border: "1px solid black", padding: "8px" }}>
                Row 2, Col 1
              </td>
              <td style={{ border: "1px solid black", padding: "8px" }}>
                Row 2, Col 2
              </td>
              <td style={{ border: "1px solid black", padding: "8px" }}>
                Row 2, Col 3
              </td>
            </tr>
          </tbody>
        </table>
      </>
    );
  }
  const columns = ["Id", "Column1", "Column2", "Column3", "Options"];
  const data = [
    { id: 1, col1: "hii", col2: "hello", col3: "hey" },
    { id: 2, col1: "greetings", col2: "salutations", col3: "howdy" },
    { id: 3, col1: "hola", col2: "bonjour", col3: "ciao" },
    { id: 4, col1: "namaste", col2: "vanakkam", col3: "salaam" },
    { id: 5, col1: "hello", col2: "hi", col3: "hey" },
    { id: 6, col1: "what's up", col2: "yo", col3: "sup" },
    {
      id: 7,
      col1: "good morning",
      col2: "good afternoon",
      col3: "good evening",
    },
    { id: 8, col1: "aloha", col2: "howzit", col3: "cheers" },
    { id: 9, col1: "hey there", col2: "hiya", col3: "hello" },
    { id: 10, col1: "g'day", col2: "mate", col3: "how's it going" },
    { id: 11, col1: "salve", col2: "shalom", col3: "peace" },
    { id: 12, col1: "hey buddy", col2: "hi friend", col3: "yo pal" },
    { id: 13, col1: "hello there", col2: "general kenobi", col3: "haha" },
    { id: 14, col1: "hey yo", col2: "wassup", col3: "sup" },
    { id: 15, col1: "howdy partner", col2: "hey y'all", col3: "hello world" },
    { id: 16, col1: "salutations", col2: "greetings", col3: "good tidings" },
    { id: 17, col1: "hi hi", col2: "hello hello", col3: "hey hey" },
    { id: 18, col1: "bonjourno", col2: "hola amigo", col3: "hello mate" },
    { id: 19, col1: "ahoy", col2: "ahoy matey", col3: "land ho" },
    { id: 20, col1: "yo yo", col2: "check it", col3: "peace out" },
    {
      id: 21,
      col1: "greetings earthling",
      col2: "hello humanoid",
      col3: "alien hello",
    },
    { id: 22, col1: "namaskar", col2: "good day", col3: "hi again" },
    { id: 23, col1: "hola hola", col2: "ciao ciao", col3: "bonjour bonjour" },
    { id: 24, col1: "waving", col2: "nodding", col3: "smiling" },
    { id: 25, col1: "morning", col2: "evening", col3: "night" },
    { id: 26, col1: "hi there", col2: "hello there", col3: "hey there" },
    { id: 27, col1: "yo yo yo", col2: "sup sup", col3: "what's good" },
    {
      id: 28,
      col1: "hola senor",
      col2: "ciao bella",
      col3: "bonjour monsieur",
    },
    {
      id: 29,
      col1: "hello sunshine",
      col2: "hello moonlight",
      col3: "hello starlight",
    },
    { id: 30, col1: "good vibes", col2: "positive energy", col3: "happy days" },
  ];

  const queryClient = new QueryClient();

  const fetchJobPostings = async () => {
    const { data } = await axios.get("https://api.example.com/job-postings");
    return data;
  };

  const prefetchJobPostings = () => {
    queryClient.prefetchQuery(["preFetch"], fetchJobPostings, {
      staleTime: 1000 * 60 * 5,
      cacheTime: 1000 * 60 * 10,
    });
  };

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Router>
          <Routes>
            <Route path="/" element={<Main />} />

            <Route path="/googleSignIn" element={<GoogleSign />} />
            <Route path="/EventBubbling" element={<EventBubbling />} />
            <Route
              path="/Accordion"
              element={<Accordion title={"Custom Accordion"} content={Div()} />}
            />
            <Route
              path="/Table"
              element={
                <TableComponent
                  data={data}
                  columns={columns}
                  rowsPerPage={10}
                />
              }
            />
            <Route path="/Reacthooks" element={<Reacthooks />} />
            <Route path="/Print" element={<Print />} />
            <Route path="/voice" element={<SearchableTable />} />
            <Route path="/ReactTransition" element={<ReactTransitionGroup />} />
            <Route path="/ProgressiveImage" element={<ProgressiveImage />} />
            <Route path="/autoComplete" element={<AutoComplete />} />
            <Route path="/fileExplorer" element={<FileExplorer />} />
            <Route path="/virtualList" element={<VirtualizedList />} />
            <Route path="/trafficLights" element={<TrafficLight />} />
            <Route path="/digitalClock" element={<Clock />} />
            <Route path="/jobPostings" element={<JobPostings />} />
            <Route path="/reactQuery" element={<ReactQuery />} />
            <Route path="/preFetch" element={<PreFetch />} />
            <Route path="/preFetchSWR" element={<SWR />} />
          </Routes>
        </Router>
      </QueryClientProvider>
    </>
  );
}

export default App;
