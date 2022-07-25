import React, { useState, useEffect } from "react";
import moment from "moment";
import "moment/locale/ru";
moment.locale("ru");

export default function Video(props) {
  function withData() {
    return function (Component) {
      const Func = function (props) {
        const [dataTime, setDataTime] = useState(null);

        useEffect(() => {
          let event = moment(props.date.date);
          setDataTime(event.startOf('hour').fromNow());
        }, [props]);

        return <Component data={dataTime} />;
      };

      const componentName =
        Component.displayName || Component.name || "Component";
      Func.displayName = `WithData${componentName}`;

      return Func;
    };
  }

  function DateTime(...props) {
    console.log(props);

    return <p className="date">{props[0].data}</p>;
  }

  const userDataDecorator = withData();

  const DateTimePretty = userDataDecorator(DateTime);

  return (
    <div className="video">
      <iframe
        title="props.url"
        src={props.url}
        frameBorder="0"
        allow="autoplay; encrypted-media"
        allowFullScreen
      ></iframe>
      {/* <DateTime date={props.date} /> */}
      <DateTimePretty date={props} />
    </div>
  );
}

// Используя HOC обернуть DateTime в компонент DateTimePretty, так, чтобы он преобразовывал дату к нужному виду.

// Воспользуйтесь готовым файлом App.js и стилями css/index.css из данного каталога в качестве отправной точки (замените ими те, что создаются в create-react-app).
