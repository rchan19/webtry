import DashboardBox from "@/components/DashboardBox";
import { useMemo } from "react";
import {
  ResponsiveContainer,
  AreaChart,
  XAxis,
  YAxis,
  Area,
  Tooltip,
  BarChart,
  Bar,
} from "recharts";
import { useTheme } from "@mui/material";
import { useSelector } from "react-redux";
import {
  selectUserStats,
  selectPlaylistTimestamps,
  selectPlaylistGeneratedInLastYear,
} from "../state/apiSlice";
import BoxHeader from "@/components/BoxHeader";
import { UserHistoryData } from "../state/types";

const Row1 = () => {
  const { palette } = useTheme();

  // const isLoading = useSelector(selectIsLoading);
  const boxAStats = useSelector(selectUserStats);
  // console.log("boxAStats = " + boxAStats);
  const boxBStats = useSelector(selectPlaylistGeneratedInLastYear);
  // console.log("boxBStats = " + boxAStats);
  const boxCStats = useSelector(selectPlaylistTimestamps);
  // console.log("boxCStats = " + boxAStats);

  // maximum playlist count
  const maxPlaylistCount = useMemo(() => {
    return Math.max(...boxAStats.map((userStat) => userStat.playlistCount));
  }, [boxAStats]);

  // three slices for three components
  // organising data from API call
  // WIP formattedData reducer
  const boxAChartData = useMemo(
    () =>
      boxAStats.map((userStat) => ({
        userId: userStat.userId,
        playlistCount: userStat.playlistCount,
      })),
    [boxAStats]
  );

  // boxBChartData preprocessing
  const currentDate = new Date();
  const startMonth = currentDate.getMonth();
  const startYear = currentDate.getFullYear() - 1; // Subtract 1 to go back a year

  const monthlyData = Array.from({ length: 12 }, (_, i) => {
    const monthDate = new Date(startYear, startMonth + i, 1);
    return {
      month: `${new Intl.DateTimeFormat("en-US", { month: "short" }).format(
        monthDate
      )}-${monthDate.getFullYear().toString().slice(-2)}`,
      count: 0,
    };
  });

  boxBStats.forEach((playlist: UserHistoryData) => {
    const date = new Date(playlist.timestamp);
    const diffMonth =
      date.getMonth() + date.getFullYear() * 12 - (startMonth + 12 * startYear);
    if (diffMonth >= 0 && diffMonth < 12) {
      monthlyData[diffMonth].count += 1;
    }
  });

  // Preprocess the data for Chart C purposes
  // Extracts the hour from the ISO datetime string
  function extractHour(dateString: string) {
    const date = new Date(dateString);
    return date.getHours();
  }

  function preprocessData(timestamps: string[]) {
    const hours = Array(24)
      .fill(0)
      .map((_, idx) => ({ hour: idx, count: 0 }));
    timestamps.forEach((timestamp) => {
      const hour = extractHour(timestamp);
      hours[hour].count += 1;
    });
    return hours;
  }

  const boxCChartData = preprocessData(boxCStats);

  return (
    // Why am i hiding it in an empty component?
    <>
      {/* Recharts Simple Area Charts */}
      {/* Box A */}
      <DashboardBox gridArea="a">
        <BoxHeader
          title="Playlist Count by User"
          subtitle="Playlist distribution number by User"
          sideText="+4%"
        />
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            width={500}
            height={400}
            data={boxAChartData}
            margin={{
              top: 15,
              right: 25,
              left: -10,
              bottom: 60,
            }}
          >
            <defs>
              {/* for the gradient for colorRevenue specifically */}
              <linearGradient id="colorFirstGraph" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor={palette.primary[300]}
                  stopOpacity={0.5}
                />
                <stop
                  offset="95%"
                  stopColor={palette.primary[300]}
                  stopOpacity={0}
                />
              </linearGradient>
              {/* for the gradient for colorExpenses */}
              <linearGradient id="colorSecondGraph" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor={palette.primary[300]}
                  stopOpacity={0.5}
                />
                <stop
                  offset="95%"
                  stopColor={palette.primary[300]}
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="userId"
              tickLine={false}
              style={{ fontSize: "10px" }}
            />
            <YAxis
              tickLine={false}
              axisLine={{ strokeWidth: "0" }}
              style={{ fontSize: "10px" }}
              // REMEMBER TO EDIT
              // setting the range
              domain={[0, maxPlaylistCount]}
            />
            <Tooltip />
            {/* First Graph */}
            <Area
              type="monotone"
              // adjust as neccessary
              dataKey="playlistCount"
              dot={true}
              stroke={palette.primary.main}
              fillOpacity={1}
              fill="url(#colorFirstGraph)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </DashboardBox>

      {/* Copy the other placeholder Charts into this later after fixing the API */}
      {/* Box B */}
      <DashboardBox gridArea="b">
        <BoxHeader
          title="12-Month Playlist Generation Snapshot"
          subtitle="Monthly Trends in Playlist Creation Over the Last Year"
          sideText="+4%"
        />
        <ResponsiveContainer>
          <BarChart
            width={500}
            height={300}
            data={monthlyData}
            margin={{
              top: 15,
              right: 25,
              left: -10,
              bottom: 60,
            }}
          >
            {" "}
            <defs>
              {/* for the gradient for colorRevenue specifically */}
              <linearGradient id="colorFirstGraph" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor={palette.primary[300]}
                  stopOpacity={0.5}
                />
                <stop
                  offset="95%"
                  stopColor={palette.primary[300]}
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="url(#colorFirstGraph)" />
          </BarChart>
        </ResponsiveContainer>
      </DashboardBox>
      {/* Box C */}
      <DashboardBox gridArea="c">
        <BoxHeader
          title="Playlist Generation Time"
          subtitle="Distribution of times that user generated playlists"
          sideText="+4%"
        />
        <ResponsiveContainer>
          <AreaChart
            width={500}
            height={400}
            data={boxCChartData}
            margin={{
              top: 15,
              right: 25,
              left: -10,
              bottom: 60,
            }}
          >
            <defs>
              {/* for the gradient for colorRevenue specifically */}
              <linearGradient id="colorFirstGraph" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor={palette.primary[300]}
                  stopOpacity={0.5}
                />
                <stop
                  offset="45%"
                  stopColor={palette.primary[300]}
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>
            <XAxis dataKey="hour" />
            <YAxis
              tickLine={false}
              axisLine={{ strokeWidth: "0" }}
              style={{ fontSize: "10px" }}
              // REMEMBER TO EDIT
              // setting the range
              domain={[0, 2]}
            />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="count"
              stroke={palette.primary.main}
              fillOpacity={1}
              fill="url(#colorFirstGraph)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </DashboardBox>
    </>
  );
};

export default Row1;
