import React, { useEffect, useState } from "react";
import Select, { SingleValue } from "react-select";
import classNames from "classnames";
import "./ProductsUpload.scss";
import { Button } from "src/features/ui";
import { SelectOptionType } from "./productsUpload.types";
import RequestsService from "src/http/requests";

const ProductsUpload = () => {
  const [isUpdatingCategories, setIsUpdatingCategories] =
    useState<boolean>(false);
  const [options, setOptions] = useState<SelectOptionType[]>(
    [] as SelectOptionType[]
  );
  const [file, setFile] = useState<File>({} as File);
  const [selectedOption, setSelectedOption] = useState<
    SingleValue<SelectOptionType>
  >({ value: -1, label: "Выберите категорию" });

  const handleUpdateCategories = async () => {
    try {
      setIsUpdatingCategories(true);
      const response = await RequestsService.updateCategories();
      setOptions(
        response.data.map((item) => ({ value: item.id, label: item.title }))
      );
      setIsUpdatingCategories(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files![0].name.slice(-3) === "csv") {
      setFile(() => event.target.files![0]);
    }
  };

  const handleSubmitUpload = async () => {
    try {
      const data = new FormData();
      data.append("excelFile", file);
      data.append("category", selectedOption!.value.toString());

      await RequestsService.uploadProducts(data);
      setFile({} as File);
      setSelectedOption({ value: -1, label: "Выберите категорию" });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    async function fetchAllCategories() {
      try {
        const response = await RequestsService.getAllCategories();
        setOptions(
          response.data.map((item) => ({ value: item.id, label: item.title }))
        );
      } catch (error) {
        console.log(error);
      }
    }

    fetchAllCategories();
  }, []);

  return (
    <div className="component">
      <h2 className="component__title">Добавление категории</h2>
      <div className="category-adding">
        <Select
          className="category-adding__select"
          defaultValue={selectedOption}
          onChange={setSelectedOption}
          options={options}
        />
        <Button
          className={classNames(
            "btn",
            "btn--text",
            "category-adding__btn",
            "category-adding__btn--update-categories",
            { "btn--disabled": isUpdatingCategories }
          )}
          onClick={handleUpdateCategories}
        >
          <span className="btn__text">Обновить список категорий</span>
        </Button>
        <label
          className={classNames("category-adding__label", {
            "category-adding__label--selected": file.name,
          })}
          htmlFor="uploadCsv"
        >
          {file.name ? file.name : "Загрузить.csv"}
        </label>
        <input
          className="category-adding__input"
          id="uploadCsv"
          type="file"
          accept=".csv"
          onChange={(e) => handleAddFile(e)}
        />
        <Button
          className={classNames("btn", "btn--text", "category-adding__btn", {
            "btn--disabled": !file.name || selectedOption?.value === -1,
          })}
          onClick={handleSubmitUpload}
        >
          <span className="btn__text">Добавить</span>
        </Button>
      </div>
    </div>
  );
};

export default ProductsUpload;
