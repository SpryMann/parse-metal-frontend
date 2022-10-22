import React, { useState, useEffect } from "react";
import classNames from "classnames";
import { Form, FormInputWrap, FormLabel } from "../Form";
import { FormInputCheckbox, FormInputNumber, Button } from "src/features/ui";
import RequestsService from "src/http/requests";
import { ISettings } from "./settings.types";
import { useStateContext } from "src/hooks/useStateContext";

const Settings = () => {
  const { setAdditionBarState } = useStateContext();
  const [isAutoParsing, setIsAutoparsing] = useState<boolean>(false);
  const [hoursMorning, setHoursMorning] = useState<string>("9");
  const [hoursEvening, setHoursEvening] = useState<string>("19");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault();
      setIsLoading(true);
      const newSettings: ISettings = {
        autoParsing: {
          isEnabled: isAutoParsing,
          timeMorning: parseInt(hoursMorning),
          timeEvening: parseInt(hoursEvening),
        },
      };
      await RequestsService.updateSettings(newSettings);
      setIsLoading(false);
      setAdditionBarState((prev) => ({ ...prev, isEnable: false }));
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    let isSubscribed = true;

    async function fetchSettings() {
      try {
        const response = await RequestsService.getSettings();
        return response.data;
      } catch (error) {
        console.log(error);
      }
    }

    fetchSettings().then((data) => {
      if (isSubscribed) {
        setIsAutoparsing(data!.autoParsing.isEnabled);
        setHoursMorning(data!.autoParsing.timeMorning.toString());
        setHoursEvening(data!.autoParsing.timeEvening.toString());
      }
    });

    return () => {
      isSubscribed = false;
    };
  }, []);

  return (
    <Form onSubmit={(e) => handleSubmit(e)}>
      <FormInputWrap>
        <span className="text text--gray">Автоматический парсинг</span>
        <FormInputCheckbox
          checked={isAutoParsing}
          setChecked={setIsAutoparsing}
        />
      </FormInputWrap>
      {isAutoParsing && (
        <>
          <FormInputWrap>
            <FormLabel>Утром (ч)</FormLabel>
            <FormInputNumber
              min={0}
              max={23}
              value={hoursMorning}
              onChange={(e) => setHoursMorning(e.target.value)}
            />
          </FormInputWrap>
          <FormInputWrap>
            <FormLabel>Вечером (ч)</FormLabel>
            <FormInputNumber
              min={0}
              max={23}
              value={hoursEvening}
              onChange={(e) => setHoursEvening(e.target.value)}
            />
          </FormInputWrap>
        </>
      )}
      <Button
        className={classNames("btn", "btn--text", "btn--full", "form--btn", {
          "btn--disabled": isLoading,
        })}
        type="submit"
        onClick={() => {}}
      >
        <span className="btn__text">Сохранить</span>
      </Button>
    </Form>
  );
};

export default Settings;
