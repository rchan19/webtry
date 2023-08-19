// import { useSelector } from "react-redux";
// import { selectTargetUserPlaylists } from "../state/apiSlice";
import { useFetchUserHistoryDataQuery } from "../state/api";
import DashboardBox from "@/components/DashboardBox";
import SingaporePlaylistDotMap from "./DotMap";

const ViewMap = () => {
  // Use the generated hook from RTK Query
  useFetchUserHistoryDataQuery();

  //   const targetUser = useSelector(selectTargetUserPlaylists);

  return (
    <DashboardBox>
      <SingaporePlaylistDotMap />
    </DashboardBox>
  );
};

export default ViewMap;
