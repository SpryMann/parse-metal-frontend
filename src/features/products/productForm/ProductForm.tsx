import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import classNames from "classnames";
import {
  Button,
  Form,
  FormInput,
  FormInputWrap,
  FormLabel,
} from "src/features/ui";
import { useSingleCategoryPageContext } from "src/hooks/useSingleCategoryPageContext";
import { useStateContext } from "src/hooks/useStateContext";
import RequestsService from "src/http/requests";
import { IProduct } from "../productsTable/productsTable.types";

const ProductForm = () => {
  const { additionBarState, setAdditionBarState } = useStateContext();
  const { productFormMode, selectedProduct, setSelectedProduct } =
    useSingleCategoryPageContext();
  const { id: categoryId } = useParams();
  const [title, setTitle] = useState<string>("");
  const [link, setLink] = useState<string>("");
  const [targetLink, setTargetLink] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleCreate = async () => {
    setIsLoading(true);
    try {
      await RequestsService.createProduct({
        title,
        link,
        targetLink,
        categoryId: parseInt(categoryId!),
      });
      setIsLoading(false);
      setAdditionBarState((prev) => ({ ...prev, isEnable: false }));
      window.location.reload();
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const handleEdit = async () => {
    setIsLoading(true);
    try {
      await RequestsService.updateProduct(
        selectedProduct.id,
        title,
        link,
        targetLink
      );
      setIsLoading(false);
      setAdditionBarState((prev) => ({ ...prev, isEnable: false }));
      window.location.reload();
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (productFormMode === "create") {
      handleCreate();
    } else {
      handleEdit();
    }
  };

  useEffect(() => {
    if (productFormMode === "edit" && selectedProduct) {
      setTitle(selectedProduct.title);
      setLink(selectedProduct.link);
      setTargetLink(selectedProduct.targetLink);
    }
  }, [productFormMode, selectedProduct]);

  useEffect(() => {
    if (!additionBarState.isEnable) {
      setTitle("");
      setLink("");
      setTargetLink("");
      setSelectedProduct && setSelectedProduct({} as IProduct);
    }
  }, [additionBarState.isEnable, setSelectedProduct]);

  return (
    <Form onSubmit={(e) => handleSubmit(e)}>
      <FormInputWrap>
        <FormLabel>Название</FormLabel>
        <FormInput
          type="text"
          value={title}
          placeholder="Название"
          onChange={(e) => setTitle(e.target.value)}
        />
      </FormInputWrap>

      <FormInputWrap>
        <FormLabel>Ссылка на товар (на Вашем сайте)</FormLabel>
        <FormInput
          type="text"
          value={link}
          placeholder="Ссылка на товар"
          onChange={(e) => setLink(e.target.value)}
        />
      </FormInputWrap>

      <FormInputWrap>
        <FormLabel>Ссылка на товар (на сайте-доноре)</FormLabel>
        <FormInput
          type="text"
          value={targetLink}
          placeholder="Ссылка на товар"
          onChange={(e) => setTargetLink(e.target.value)}
        />
      </FormInputWrap>

      <Button
        className={classNames("btn", "btn--text", "btn--full", {
          "btn--disabled": !title || !link || !targetLink || isLoading,
        })}
        type="submit"
        onClick={() => {}}
      >
        <span className="btn__text">
          {productFormMode === "create" ? "Добавить" : "Сохранить"}
        </span>
      </Button>
    </Form>
  );
};

export default ProductForm;
