import React, { useEffect, useState } from "react";
import axios from "axios";

function Test() {
  const [data, setData] = useState();

  const getdata = async () => {
    await axios
      .get(
        "https://raw.githubusercontent.com/M-Media-Group/country-json/master/src/countries-master.json"
      )
      .then((res) => {
        setData(res.data);
      })
      .catch((error) => {});
  };

  useEffect(() => {
    getdata();
  }, []);

  return (
    <div>
      {data?.map((data) => {
        return (
          <div
            style={{ width: "10%", height: "50px", border: "1px solid black" }}
          >
            {data?.country}
          </div>
        );
      })}
    </div>
  );
}

export default Test;
