import React, { useEffect, useState } from 'react';
import dateformat from 'dateformat';

//dateTime
function Datew() {
  const date = new Date();
  const d = dateformat(date, "dddd, dd mmm yy");
  const options = { hour: '2-digit', minute: '2-digit' };
  let time = new Date().toLocaleTimeString([], options);
  const [ctime, setCtime] = useState(time);

  const UpdateTime = () => {
    time = new Date().toLocaleTimeString([], options);
    setCtime(time);
  };
  setInterval(UpdateTime, 1000);
  return (
    <>
      <div>{`${ctime} ${d}`}</div>
    </>
  );
};

export { Datew };

