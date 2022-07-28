import React, { useState, useEffect } from "react";
import moment from "moment";
import "moment/locale/ru";
moment.locale("ru");

export default function Video(props) {
  function withHOC(Component) {
    return function Wrapper(props) {
      const [dataTime, setDataTime] = useState(null);

      useEffect(() => {
        let event = moment(props.date.date);
        setDataTime(event.startOf("hour").fromNow());
      }, [props]);

      const componentName =
        Component.displayName || Component.name || "Component";
      Wrapper.displayName = `withHOC${componentName}`;

      return <Component data={dataTime} />;
    };
  }


  function DateTime(...props) {
    return <p className="date"> {props[0].data} </p>;
  }

  const DateTimePretty = withHOC(DateTime);

  return (
    <div className="video">
      <iframe
        title="props.url"
        src={props.url}
        frameBorder="0"
        allow="autoplay; encrypted-media"
        allowFullScreen
      ></iframe>{" "}
      <DateTimePretty date={props} />{" "}
    </div>
  );
}
