import BoxHeader from "@/components/BoxHeader";
import DashboardBox from "@/components/DashboardBox";
import { useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";
import DotMapTooltip from "./DotMapTooltip";
import { selectFullUserHistoryData } from "../state/apiSlice";
import { useSelector } from "react-redux";

const SingaporePlaylistDotMap = () => {
  // Inside SingaporePlaylistDotMap component

  const userHistoryData = useSelector(selectFullUserHistoryData);
  const coordinates = userHistoryData
    ? userHistoryData.map((data) => [data.longitude, data.latitude])
    : [];

  // Calculate the count of playlists
  const playlistCount = coordinates.length;

  console.log(coordinates);

  const geoUrl = "/data/sg.topojson";
  const [tooltipContent, setTooltipContent] = useState<string | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState<{
    x: number;
    y: number;
  } | null>(null);

  return (
    // the styling is what forces the box to adapt to the map size, which is ok ig
    <DashboardBox
      style={{
        display: "grid",
        gridTemplateRows: "auto 1fr",
      }}
    >
      <BoxHeader
        title="Map of Playlists Generated"
        subtitle="Playlists Generated in Singapore by Location"
        sideText={`${playlistCount} Playlists Generated`}
      />

      <ComposableMap
        projection="geoMercator"
        projectionConfig={{
          scale: 80000,
          center: [103.8198, 1.3],
        }}
        style={{ width: "100%", height: "100%" }}
      >
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                tabIndex={-1}
                style={{
                  default: { fill: "#F8F8F8", outline: "none" },
                  hover: { outline: "none" },
                  pressed: { outline: "none" },
                }}
              />
            ))
          }
        </Geographies>
        {coordinates.map(([longitude, latitude], index) => (
          <Marker key={index} coordinates={[longitude, latitude]}>
            <circle
              r={3}
              fill="#F53"
              onClick={(event) => {
                const data = userHistoryData[index];
                setTooltipContent(
                  `Playlist: ${data.playlistName}, Timestamp: ${data.timestamp}, Longitude: ${longitude}, Latitude: ${latitude}`
                );
                setTooltipPosition({ x: event.clientX, y: event.clientY });
              }}
            />
          </Marker>
        ))}
      </ComposableMap>

      {/* Render the tooltip if there's content to display */}
      {tooltipContent && tooltipPosition && (
        <DotMapTooltip
          content={tooltipContent}
          x={tooltipPosition.x}
          y={tooltipPosition.y}
        />
      )}
    </DashboardBox>
  );
};

export default SingaporePlaylistDotMap;
