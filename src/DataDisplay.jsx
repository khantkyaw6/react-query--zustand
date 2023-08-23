import React from "react";
import useStore from "./store/store";

const DataDisplay = () => {
  const data = useStore((state) => state.tours);
  const keep = useStore((state) => state.keep);
  console.log(data);

  return <div>DataDisplay</div>;
};

export default DataDisplay;
