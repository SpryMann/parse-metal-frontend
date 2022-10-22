import React, { useEffect, useState, useMemo } from "react";
import "./ParserController.scss";
import { useHomePageContext } from "src/hooks/useHomePageContext";
import RequestsService from "src/http/requests";

interface IParseLog {
  categoryName: string;
  completed: boolean;
  success: boolean;
}

const ParserController = () => {
  const { isParsing, setIsParsing, categoriesToParse } = useHomePageContext();
  const [parseLogs, setParseLogs] = useState<IParseLog[]>([] as IParseLog[]);
  const [lastParseTimestamp, setLastParseTimestamp] = useState<number>(0);

  const startParse = async () => {
    try {
      await RequestsService.startParse(
        categoriesToParse.map((category) => ({
          id: category.id,
          name: category.title,
          percent: category.percent,
        }))
      );
    } catch (error) {
      console.log(error);
    }
  };

  const checkParserStatus = async (): Promise<void> => {
    try {
      const response = await RequestsService.getParseStatus();

      if (!parseLogs.length) {
        setParseLogs(response.data.logs);
      } else {
        const newLogs = response.data.logs.slice(
          response.data.logs.indexOf(
            response.data.logs.find(
              (log) => log.categoryName === parseLogs.slice(-1)[0].categoryName
            )!
          ) - 1
        );
        setParseLogs((prev) => [...prev.slice(0, -1), ...newLogs]);
      }

      if (
        response.data.completed &&
        response.data.logs.slice(-1)[0].completed
      ) {
        await new Promise((resolve) => {
          setTimeout(resolve, 1000);
        });

        setParseLogs([] as IParseLog[]);
        setLastParseTimestamp(response.data.lastParsingDate);
        return setIsParsing(false);
      }

      setTimeout(checkParserStatus, 5000);
    } catch (error) {
      console.log(error);
    }
  };

  const beautifiedLastParseDate = useMemo(() => {
    return new Date(lastParseTimestamp).toLocaleString();
  }, [lastParseTimestamp]);

  useEffect(() => {
    let isSubscribed = true;

    async function getStatus() {
      try {
        const response = await RequestsService.getParseStatus();
        return response.data;
      } catch (error) {
        console.log(error);
      }
    }

    getStatus().then((data) => {
      if (isSubscribed) {
        setLastParseTimestamp(data!.lastParsingDate);
      }
    });

    return () => {
      isSubscribed = false;
    };
  }, []);

  useEffect(() => {
    if (isParsing) {
      startParse().then(() => checkParserStatus());
    }
  }, [isParsing]);

  return (
    <div className="component">
      <h2 className="component__title">Парсинг</h2>
      <div className="parse">
        <div className="parse__logs logs">
          {parseLogs.length ? (
            <>
              {parseLogs.map((log) => {
                if (!log.completed) {
                  return (
                    <p className="logs__item" key={log.categoryName}>
                      {log.categoryName} 🔃
                    </p>
                  );
                }
                return (
                  <p className="logs__item" key={log.categoryName}>
                    {log.categoryName} {log.success ? "✅" : "❌"}
                  </p>
                );
              })}
            </>
          ) : (
            <p className="logs__item">Для получения данных начните парсинг</p>
          )}
          {Boolean(lastParseTimestamp) && !isParsing && (
            <p>Дата последнего парсинга: {beautifiedLastParseDate}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ParserController;
